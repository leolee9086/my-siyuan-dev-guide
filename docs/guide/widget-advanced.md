# 挂件高级交互技巧

本文档旨在深入探讨思源笔记挂件 (Widgets) 与主编辑器环境进行交互的高级方法，主要包括直接 DOM 操作和通过 `postMessage` 进行通信。

## 1. 利用同源特性获取块 ID

由于挂件的 `<iframe>` **目前版本中，确实与思源主窗口是同源的**，挂件内的 JavaScript 可以直接访问和操作其在父窗口中的 DOM 结构。

**对于挂件想要独立获取其自身所在的块 ID (`data-node-id`)，目前并没有由思源核心直接提供的 API 或注入变量，因此通过以下描述的查找父 DOM 的方式是当前唯一可行的实用方法。**

### 实现方法

可以通过 `window.frameElement` 获取挂件自身的 `<iframe>` 元素，然后使用 `closest()` 方法向上查找最近的带有 `data-node-id` 属性的祖先元素。

```javascript
// 在挂件的 JavaScript 中
function getWidgetBlockId() {
    try {
        const iframeElement = window.frameElement; // 获取自身 iframe 元素
        if (iframeElement) {
            // 根据实际 DOM 结构 (iframe 可能被其他元素包裹),
            // 使用 closest 查找祖先元素是更稳妥的方式。
            const blockElement = iframeElement.closest('[data-node-id]'); 
            if (blockElement) {
                return blockElement.getAttribute('data-node-id');
            }
        }
    } catch (e) {
        console.error('获取挂件块 ID 失败:', e);
    }
    return null;
}

const myBlockId = getWidgetBlockId();
if (myBlockId) {
    console.log('当前挂件块的 ID:', myBlockId);
    // 挂件可以使用这个 ID 来：
    // 1. 作为标识符，用于后续 postMessage 通信
    // 2. 结合 postMessage 请求插件/代码片段操作这个块
} else {
    console.warn('未能获取到挂件块 ID。');
}
```

**⚠️ 使用此方式的考量与风险：**

*   **权宜之计**: 将此方法视为获取块 ID 的一种当前"权宜之计"。它能解决问题，但并非一个稳固的"官方"接口，且依赖于思源 Protyle 编辑器当前的内部 DOM 实现。
*   **高耦合性与脆弱性**: 一旦思源版本更新导致 DOM 结构发生变化，此方法就可能失效，导致挂件功能异常且难以排查。
*   **维护成本**: 长期来看，这种紧耦合会增加挂件的维护难度。

因此，虽然目前获取块 ID 不得不采用此法，但开发者应意识到其风险，并**避免**使用类似方法直接修改父窗口 DOM 或调用未知函数。

## 2. 通过 `postMessage` 与思源交互

对于挂件需要**调用思源 API、传递复杂数据、或与思源进行更受控的双向通信**时，推荐采用一种基于 `postMessage` 并通过**开发者自行编写的插件或代码片段作为桥梁**的模式。

**核心前提与重要安全警告：**

1.  **思源核心不直接处理挂件消息**: 思源的前端本体**目前没有任何内置的、通用的逻辑来监听或处理来自任意挂件通过 `postMessage` 发送的消息**。不要期望你的挂件 `postMessage` 后思源会自动响应。
2.  **开发者必须实现桥梁**: 你需要创建一个简单的**代码片段 (Code Snippet)** 或一个功能更完整的**插件 (Plugin)** 来监听来自你挂件的 `message` 事件，然后由这个插件/代码片段去调用思源的 API，并将结果（如果需要）通过 `postMessage` 回传给挂件。\n3.  **安全是开发者的责任**: 使用 `postMessage` 时，**安全性完全取决于接收端（插件/代码片段）的实现**。**必须在接收消息时进行严格的来源校验 (`event.origin`)**，确保消息确实来自你信任的挂件源地址。**如果省略或错误实现此校验，你的插件/代码片段可能会执行来自任何恶意网页的指令，造成严重安全漏洞，其潜在危害远超同源 DOM 访问的风险！**

### 通信流程

典型的通信流程如下：

1.  **挂件 -> 插件/代码片段**: 挂件使用 `parent.postMessage(message, targetOrigin)` 发送请求。
2.  **插件/代码片段**: 监听 `window` 上的 `message` 事件，接收来自挂件的消息。
3.  **插件/代码片段**: (可选) 调用思源 API (`this.api` 或全局 API)。
4.  **插件/代码片段 -> 挂件**: 使用 `iframeElement.contentWindow.postMessage(replyMessage, widgetOrigin)` 将结果或确认信息发送回挂件。
5.  **挂件**: 监听 `window` 上的 `message` 事件，接收来自插件/代码片段的响应。

### 消息结构约定 (示例)

为了清晰和可扩展性，建议定义一套消息结构，例如：

```typescript
interface WidgetMessage {
    type: 'widget-request' | 'widget-event'; // 消息来源类型
    widgetName: string; // 挂件名称 (widget.json中的name)
    blockId?: string; // 挂件块 ID (可选, 通过 getWidgetBlockId 获取)
    cmd: string; // 具体命令/动作
    callId?: string; // 用于异步请求的唯一 ID
    payload?: any; // 携带的数据
}

interface SiyuanResponse {
    type: 'siyuan-response';
    widgetName: string; // 目标挂件
    cmd: 'apiResult' | 'apiError' | 'event-ack'; // 响应类型
    callId: string; // 对应请求的 callId
    payload?: any; // 返回的数据或错误信息
}
```

### 代码示例

#### a) 挂件端 (`widget.js`)

```javascript
const WIDGET_NAME = 'my-awesome-widget'; // 应与 widget.json 中 name 一致
const myBlockId = getWidgetBlockId(); // 使用前面定义的函数
let messageCallId = 0;

// --- 发送消息给思源 (插件/代码片段) ---
function sendMessageToSiyuan(cmd, payload = {}) {
    const callId = `${WIDGET_NAME}-${myBlockId || 'global'}-${Date.now()}-${messageCallId++}`;
    const message = {
        type: 'widget-request',
        widgetName: WIDGET_NAME,
        blockId: myBlockId,
        cmd: cmd,
        callId: callId,
        payload: payload
    };
    
    // 必须指定思源的 origin，不能用 '*', 以确保安全
    const siyuanOrigin = window.location.origin;
    parent.postMessage(message, siyuanOrigin);
    console.log(`[${WIDGET_NAME}] Sent:`, message);
    return callId; // 可以用于后续匹配响应
}

// --- 监听来自思源 (插件/代码片段) 的消息 ---
window.addEventListener('message', (event) => {
    // 安全校验：确保消息来自同源的父窗口
    if (event.origin !== window.location.origin) {
        console.warn(`[${WIDGET_NAME}] Ignored message from different origin:`, event.origin);
        return;
    }

    const data = event.data;
    if (data && data.type === 'siyuan-response' && data.widgetName === WIDGET_NAME) {
        console.log(`[${WIDGET_NAME}] Received:`, data);
        if (data.cmd === 'apiResult') {
            console.log(`API call ${data.callId} success:`, data.payload);
            // 在这里处理成功的 API 结果，例如更新挂件 UI
            // handleApiResult(data.callId, data.payload);
        } else if (data.cmd === 'apiError') {
            console.error(`API call ${data.callId} error:`, data.payload);
            // 处理 API 调用错误
            // handleApiError(data.callId, data.payload);
        } else {
            // 处理其他类型的响应或事件...
        }
    }
});

// --- 示例：请求获取当前文档名称 ---
document.getElementById('get-doc-name-btn').addEventListener('click', () => {
    sendMessageToSiyuan('getCurrentDocInfo');
});

// ... (getWidgetBlockId 函数定义) ...
```

#### b) 插件/代码片段端 (`plugin.js` 或 `snippet.js`)

```javascript
// 假设这是一个插件
class WidgetHelperPlugin extends Plugin {
    onload() {
        console.log('Widget Helper Plugin loaded.');
        this.messageListener = this.handleWidgetMessage.bind(this);
        window.addEventListener('message', this.messageListener);
    }

    onunload() {
        console.log('Widget Helper Plugin unloaded.');
        window.removeEventListener('message', this.messageListener);
    }

    async handleWidgetMessage(event) {
        // 🛑 **极其重要的安全校验** 🛑
        // 必须严格校验消息来源 (`event.origin`) 是否是你期望的、可信的挂件来源。
        // 对于当前同源的 iframe，`event.origin` 通常等于 `window.location.origin`。
        // 但更严谨的做法是校验它是否等于你挂件部署后的确切源 (例如 "http://127.0.0.1:6806")
        // 或者至少确保它是 file:// 或 http://127.0.0.1:port 这样的本地来源。
        // **绝对禁止** 在这里使用 `*` 或者不做校验！
        // **校验失败必须立即返回，不处理任何消息！**
        // **否则，任何网站都可能向你的插件发送恶意指令！**
        const expectedOrigin = window.location.origin; // 示例：当前简单校验同源
        if (event.origin !== expectedOrigin) {
            console.warn(`[Plugin] Ignored message from untrusted origin: ${event.origin}`);
            return; 
        }

        const data = event.data;
        
        // 校验消息结构和来源类型
        if (!data || data.type !== 'widget-request') {
            // 可以选择忽略非预期结构的消息
            return;
        }
        
        // (可选) 进一步校验 widgetName 是否是此插件想要处理的挂件
        // if (data.widgetName !== 'my-awesome-widget') return;
        
        console.log(`[Plugin] Received message from widget ${data.widgetName}:`, data);

        let responsePayload = null;
        let responseCmd = 'apiResult';

        try {
            switch (data.cmd) {
                case 'getCurrentDocInfo':
                    // 需要找到发送消息的 iframe 对应的 protyle 实例
                    const protyle = this.findProtyleForWidget(event.source);
                    if (protyle && protyle.block && protyle.block.rootID) {
                        // 调用思源 API (注意可能是异步的)
                        const docInfo = await this.api.getBlockAttrs(protyle.block.rootID);
                        responsePayload = { 
                            id: protyle.block.rootID,
                            name: docInfo.name || 'Untitled' // 假设接口返回 name
                        };
                    } else {
                        throw new Error('无法找到对应的 Protyle 实例或文档 ID');
                    }
                    break;
                // case 'otherWidgetCommand':
                //     responsePayload = await this.handleOtherCommand(data.payload);
                //     break;
                default:
                    console.warn(`[Plugin] Unknown command from widget: ${data.cmd}`);
                    // 可以选择不响应未知命令
                    return; 
            }
        } catch (error) {
            console.error(`[Plugin] Error handling widget command ${data.cmd}:`, error);
            responseCmd = 'apiError';
            responsePayload = error.message || '未知错误';
        }

        // 将结果发回给挂件 (event.source 是发送消息的 iframe 的 contentWindow)
        if (event.source) {
            const responseMsg = {
                type: 'siyuan-response',
                widgetName: data.widgetName,
                cmd: responseCmd,
                callId: data.callId, // 将 callId 原样返回，便于挂件匹配
                payload: responsePayload
            };
            event.source.postMessage(responseMsg, event.origin);
            console.log(`[Plugin] Sent response to widget ${data.widgetName}:`, responseMsg);
        }
    }

    // 辅助函数：根据消息源 (iframe.contentWindow) 找到对应的 Protyle 实例
    findProtyleForWidget(sourceWindow) {
        // 实现方式：
        // 1. 遍历文档中所有的 widget iframe
        const iframes = document.querySelectorAll('iframe[data-subtype="widget"]');
        for (let i = 0; i < iframes.length; i++) {
            const iframe = iframes[i];
            if (iframe.contentWindow === sourceWindow) {
                // 2. 找到 iframe 所在的 protyle 实例
                const protyleElement = iframe.closest('.protyle');
                if (protyleElement && protyleElement.protyle) { // 假设 protyle 实例挂载在元素上
                    return protyleElement.protyle;
                }
                break;
            }
        }
        return null;
    }
}

// 如果是代码片段，则直接在全局作用域添加监听器：
// window.addEventListener('message', handleWidgetMessage);
// function handleWidgetMessage(event) { ... }
// 调用 API 可能需要使用全局的 siyuan API (如果可用) 或其他方式
```

### `postMessage` 模式的优势（在正确实现的前提下）

尽管需要额外编写桥接代码并承担安全实现的责任，`postMessage` + 桥梁的模式仍然是推荐的，因为它提供了：

*   **解耦与明确接口**: 定义了清晰的通信契约，降低了挂件与思源核心实现的耦合度。
*   **更强的控制力**: 所有交互都经过桥梁代码，便于实现权限控制、参数校验和错误处理。
*   **适应未来变化**: `postMessage` 是标准 Web API，能更好地适应未来思源可能的沙箱机制变化（如跨域）。

### 注意事项

*   **安全性**: 始终校验 `event.origin`，确保消息来源可靠。不要信任来自未知源的消息。
*   **异步处理**: 思源的许多 API 调用是异步的。插件/代码片段在处理完异步操作后，再通过 `postMessage` 将结果返回。
*   **错误处理**: 插件/代码片段端应捕获 API 调用或处理过程中的错误，并将错误信息通过 `postMessage` 告知挂件。
*   **性能**: 避免过于频繁的 `postMessage` 通信。
*   **查找 Protyle 实例**: 插件需要一种方法将接收到的 `message` 事件与其发生的 Protyle 编辑器实例关联起来，以便正确调用 API（如示例中的 `findProtyleForWidget`）。

通过这种插件/代码片段作为桥梁的 `postMessage` 机制，挂件可以安全、有效地与思源进行交互，实现更强大的功能。 