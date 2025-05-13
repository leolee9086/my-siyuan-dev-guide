# 其它扩展方式

(内容待补充，例如：HTML 块、常用外部工具等...) 

## html块

HTML 块允许用户在思源笔记中嵌入自定义的 HTML 代码片段。这些代码片段的渲染和管理涉及以下几个关键部分：

### 1. HTML 块的识别与初步处理 (`siyuan/app/src/protyle/render/htmlRender.ts`)

当含有 HTML 块的文档在编辑器（Protyle）中渲染时，`htmlRender.ts` 中的 `htmlRender` 函数会被调用。它的主要职责是：

- **定位 HTML 块**：该函数会检查传入的元素是否本身就是一个 HTML 块（`data-type="NodeHTMLBlock"`），或者在传入元素的子节点中查找所有具有 `data-type="NodeHTMLBlock"` 属性的元素。这些元素代表了用户在笔记中插入的各个 HTML 块。
- **辅助功能增强**：对于找到的每一个 HTML 块，`htmlRender` 会为其内部的编辑按钮和"更多"操作按钮添加 `aria-label` 属性。这些标签通常来自 `window.siyuan.languages` 对象，用于提供本地化的描述，以增强可访问性 (a11y)。

```typescript
// siyuan/app/src/protyle/render/htmlRender.ts 示例片段
export const htmlRender = (element: Element) => {
    let htmlElements: Element[] = [];
    if (element.getAttribute("data-type") === "NodeHTMLBlock") {
        // 编辑器内代码块编辑渲染
        htmlElements = [element];
    } else {
        htmlElements = Array.from(element.querySelectorAll('[data-type="NodeHTMLBlock"]'));
    }
    if (htmlElements.length === 0) {
        return;
    }
    htmlElements.forEach((e: HTMLDivElement) => {
       // 假设 HTML 块内部结构，为特定子元素设置 aria-label
       e.firstElementChild.firstElementChild.setAttribute("aria-label", window.siyuan.languages.edit);
       e.firstElementChild.lastElementChild.setAttribute("aria-label", window.siyuan.languages.more);
    });
};
```

### 2. HTML 内容的实际渲染与管理 (`siyuan/app/stage/protyle/js/protyle-html.js`)

每个 HTML 块的实际内容展示和交互是由一个名为 `<protyle-html>` 的自定义 Web Component (Custom Element) 负责的。这个组件定义在 `protyle-html.js` 文件中。

```html
<!-- HTML 块在 DOM 中的大致结构 -->
<div data-type="NodeHTMLBlock" data-node-id="20231026104500-abcdefg">
  <protyle-html data-content="<p>用户输入的 HTML 内容</p>"></protyle-html>
</div>
```

`<protyle-html>` 组件的关键行为如下：

- **Shadow DOM 隔离**：它使用 Shadow DOM (`mode: 'open'`) 来渲染 HTML 内容。这有助于将 HTML 块的样式和行为与主文档隔离，避免意外的冲突。
- **内容来源 (`data-content` attribute)**：组件通过其 `data-content` 属性接收原始的 HTML 字符串。
- **构造与初始化 (`constructor`)**:
    - 当组件实例创建时，它会读取 `data-content` 属性的值。
    - 为了处理特定情况 (如 GitHub Issue #11321)，内容会经过 `Lute.EscapeHTMLStr` 转义，然后重新设置回 `data-content` 属性，并作为初始内容填充到 Shadow DOM 中。
- **内容变更监听与处理 (`attributeChangedCallback`)**:
    - 组件会监听 `data-content` 属性的变化。当用户编辑 HTML 块导致此属性更新时，回调函数会执行。
    - **HTML 反转义**：首先，使用 `Lute.UnEscapeHTMLStr` 将 `data-content` 的值反转义回原始 HTML。
    - **安全策略 (DOMPurify)**：
        - 思源笔记默认**不允许**在 HTML 块中执行 JavaScript 脚本，以防止跨站脚本攻击 (XSS)。这是通过检查全局配置 `window.siyuan.config.editor.allowHTMLBLockScript` (注意这里的 `BLock` 可能是 `Block` 的笔误) 来控制的。
        - 如果该配置为 `false`（默认），则 HTML 内容会经过 `DOMPurify.sanitize()` 处理。DOMPurify 是一个强大的 HTML 清理库，它会移除所有潜在的恶意代码，包括 `<script>` 标签、不安全的属性 (如 `onerror`) 等，只保留安全的 HTML 结构和样式。
    - **内容注入**：处理过的（可能已清理的）HTML 字符串会被赋给 Shadow DOM 的 `innerHTML`，从而在页面上渲染出来。
- **脚本执行的特殊处理**:
    - 即使用户通过设置开启了 HTML 块中的脚本执行 (`allowHTMLBLockScript` 为 `true`)，思源仍然对 `<script>` 标签有特殊的处理逻辑：
        1.  **解析脚本**：组件会创建一个临时的 `div`，将 HTML 内容赋给其 `innerHTML`，然后从中提取所有的 `<script>` 标签。
        2.  **`document.write` 的处理**：如果某个 `<script>` 标签内的代码包含 `document.write(...)`，该脚本不会被执行。相反，思源会显示一个错误信息（`window.siyuan.languages.htmlBlockError`），并将该脚本内容包裹在一个 `<textarea>` 中展示给用户。这是因为 `document.write` 在 Shadow DOM 环境中或在文档加载完毕后执行，通常会导致非预期的行为或直接覆盖页面内容。
        3.  **安全脚本的执行**：对于不包含 `document.write` 的脚本，思源会动态创建一个新的 `<script>` 元素，将原始脚本的所有属性（如 `src`, `type` 等）和其文本内容复制到新脚本元素上。然后，这个新创建的 `<script>` 元素会被追加到 `<protyle-html>` 组件的 Shadow DOM 中。这种方式可以确保脚本在 Shadow DOM 的上下文中正确执行，并且能够访问和操作 Shadow DOM 内部的元素。

```javascript
// siyuan/app/stage/protyle/js/protyle-html.js 中的 ProtyleHtml 类 (简化示例)
class ProtyleHtml extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        this.display = this.shadowRoot;
        // 初始内容处理 (涉及 Lute.EscapeHTMLStr)
        const content = Lute.EscapeHTMLStr(this.getAttribute('data-content'));
        this.setAttribute('data-content', content);
        this.display.innerHTML = content;
    }

    static get observedAttributes() {
        return ['data-content'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data-content') {
            let dataContent = Lute.UnEscapeHTMLStr(this.getAttribute('data-content'));

            if (!window.siyuan.config.editor.allowHTMLBLockScript) { // 检查配置
                dataContent = DOMPurify.sanitize(dataContent); // 清理 HTML
            }

            this.display.innerHTML = dataContent; // 渲染到 Shadow DOM

            // 处理 <script> 标签
            const el = document.createElement('div');
            el.innerHTML = dataContent; // 临时容器解析脚本
            const scripts = el.getElementsByTagName('script');
            let fatalHTML = '';
            for (const script of scripts) {
                if (script.textContent.indexOf('document.write') > -1) {
                    // 处理 document.write
                    fatalHTML += `<div>Error: document.write is not allowed...</div>`;
                } else {
                    // 创建并执行安全脚本
                    const s = document.createElement('script');
                    for (const attr of script.attributes) {
                        s.setAttribute(attr.name, attr.value);
                    }
                    s.textContent = script.textContent;
                    this.display.appendChild(s); // 在 Shadow DOM 中执行
                }
            }
            if (fatalHTML) {
                this.display.innerHTML += fatalHTML;
            }
        }
    }
}
customElements.define('protyle-html', ProtyleHtml);
```

这种结合 `htmlRender.ts` 的预处理和 `<protyle-html>` Web Component 的沙箱化渲染及安全机制，使得思源笔记可以在支持用户自定义 HTML 的同时，尽可能保障编辑器的稳定性和安全性。

### 3. 在 HTML 块内脚本中获取块 ID (推荐方法)

当你在 HTML 块中运行 JavaScript 时，通常需要获取该 HTML 块自身所在的思源笔记块的 ID (即 `data-node-id` 属性)。一个更稳健的方法是使用一个自定义 HTML 元素作为脚本的"运行器"。这个自定义元素负责找到其所在的思源块，然后执行用户提供的脚本，并将块相关信息（如块ID和块DOM元素）传递给该脚本。

**工作原理**:

1.  **定义辅助自定义元素**: 你需要在 HTML 块中首先定义一个自定义元素，例如 `<siyuan-script-runner>`。
2.  **查找宿主块**: 这个自定义元素在其生命周期回调（如 `constructor` 或 `connectedCallback`）中，会调用一个辅助函数 (例如 `findHostBlock`)。
3.  **`findHostBlock` 逻辑**:
    *   此函数从自定义元素实例 (`this`) 开始。
    *   它会递归地向上查找：
        *   如果当前检查的元素是 ShadowRoot (`element.host` 存在)，则转移到其宿主元素 (`element.host`)上继续查找。这能有效地"跳出"当前 Shadow DOM 到其宿主。`<siyuan-script-runner>` 本身位于 `<protyle-html>` 的 Shadow DOM 中，所以这一步能帮助定位到 `<protyle-html>` 元素。
        *   如果当前检查的元素不是 ShadowRoot (例如，已经是 `<protyle-html>` 或其父元素)，则检查其 `parentNode` 是否有 `data-node-id` 属性。
    *   一旦找到带有 `data-node-id` 的元素，即为目标宿主块。
4.  **执行用户脚本**: `<siyuan-script-runner>` 找到宿主块后，会查找其内部特定类型的 `<script>` 标签 (例如 `<script type="text/siyuan-scope">`)，读取其内容，并通过 `new Function()` 等方式执行，同时将找到的宿主块元素 (`hostBlock`) 和块ID (`blockId`) 作为参数或作用域内变量传递给用户脚本。

**完整示例**:

以下代码可以直接粘贴到思源笔记的 HTML 块中进行测试。它首先定义了 `<siyuan-script-runner>` 元素，然后使用它来执行一个简单的脚本。

```html
 <div>
    <!-- 步骤 1: 定义 siyuan-script-runner 自定义元素 -->

<script>
  try {
    const findHostBlock = (element) => {
      try {
        if (!element) { // 增加一个检查，防止element为null时继续递归
          return undefined;
        }
        if (element.host) {
          return findHostBlock(element.host);
        }
        if (
          element.parentNode &&
          element.parentNode.getAttribute &&
          element.parentNode.getAttribute("data-node-id")
        ) {
          return element.parentNode;
        }
        return findHostBlock(element.parentNode);
      } catch (e) {
        // console.error('findHostBlock internal error:', e); // 可选的错误处理
        return undefined;
      }
    };

    class SiyuanScriptRunner extends HTMLElement {
      constructor() {
        super();
        // 一般情况下，这个runner本身不需要显示
        // this.style.display = 'none'; 

        const hostBlock = findHostBlock(this);
        const userScriptTag = this.querySelector('script[type="text/siyuan-scope"]');
        const runnerElement = this; // <siyuan-script-runner> 元素实例本身

        if (hostBlock && userScriptTag && userScriptTag.textContent) {
          const blockId = hostBlock.getAttribute('data-node-id');
          try {
            // 通过 new Function 将 hostBlock, blockId 和 runnerElement 注入到用户脚本的作用域
            const userFunction = new Function('hostBlock', 'blockId', 'runnerElement', userScriptTag.textContent);
            userFunction(hostBlock, blockId, runnerElement);
          } catch (e) {
            console.error("Error executing script in SiyuanScriptRunner:", e, {
              scriptContent: userScriptTag.textContent,
              hostBlock,
              blockId
            });
          }
        } else {
          if (!hostBlock) {
            console.warn("SiyuanScriptRunner: Could not find the host Siyuan block element.");
          }
          if (!userScriptTag) {
            console.warn("SiyuanScriptRunner: Could not find a <script type=\"text/siyuan-scope\"> tag inside.");
          } else if (!userScriptTag.textContent) {
            console.warn("SiyuanScriptRunner: The <script type=\"text/siyuan-scope\"> tag is empty.");
          }
        }
      }
    }
    // 使用 try-catch 防止重复定义错误
    if (!customElements.get('siyuan-script-runner')) {
      customElements.define('siyuan-script-runner', SiyuanScriptRunner);
    }
  } catch (e) {
    console.error("Error defining SiyuanScriptRunner:", e);
  }
</script>

<!-- 步骤 2: 使用 siyuan-script-runner 执行你的脚本 -->
<siyuan-script-runner>
  <script type="text/siyuan-scope">
    // 在这个脚本中, 'hostBlock', 'blockId', 和 'runnerElement' 变量是自动可用的
    console.log('My Siyuan Block ID is:', blockId);
    console.log('My Siyuan Host Block element:', hostBlock);
    console.log('My Siyuan Script Runner element:', runnerElement);

    // 示例: 在块内显示块ID (将内容附加到 runnerElement)
    const p = document.createElement('p');
    p.textContent = '此脚本在思源块 [ID: ' + blockId + '] 中运行。输出到 runnerElement。';
    p.style.color = 'darkgreen';
    p.style.fontSize = 'small';

    // 将创建的元素附加到 <siyuan-script-runner> 元素内部
    runnerElement.appendChild(p);

    // 如果需要，也可以直接操作 hostBlock 内的其他内容，但需谨慎
    // 例如: hostBlock.querySelector('.some-target-within-block')?.appendChild(anotherElement);
  </script>
</siyuan-script-runner>

<!-- 你可以在这里添加HTML块的其他内容 -->
<div>这是HTML块中的一些其他静态内容。</div>
</div>
```

**使用说明**:

1.  **定义 `siyuan-script-runner`**: 将上述代码中的第一个 `<script>`块 (包含 `findHostBlock` 和 `SiyuanScriptRunner`类的定义) 放置在你的 HTML 块的较早位置。它只需要定义一次。
2.  **包裹你的脚本**: 将你自己的逻辑代码放在 `<siyuan-script-runner>` 标签内部，并确保你的 `<script>` 标签类型为 `type="text/siyuan-scope"`。
3.  **访问变量**: 在你的 `text/siyuan-scope` 脚本中，你可以直接使用 `hostBlock` (指向包含 `data-node-id` 的 DOM 元素) 和 `blockId` (字符串形式的节点ID) 这两个变量。

这种方法更加健壮，因为它不依赖于脚本自身在 DOM 中的特定层级，而是主动去查找其执行环境的根源，并且能正确处理 Shadow DOM 的边界。

### 示例

原始 HTML 块输入：
```