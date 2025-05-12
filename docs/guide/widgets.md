# 思源笔记挂件开发指南

本指南参考了官方挂件示例仓库的说明：[siyuan-note/widget-sample](https://github.com/siyuan-note/widget-sample)。

## 挂件基础

思源笔记不仅支持功能强大的插件 (Plugins)，还提供了另一种轻量级的扩展方式：挂件 (Widgets)。挂件通常用于在笔记中嵌入交互式的小部件或展示特定内容。

### 什么是思源挂件？

与主要通过 API 与思源后端和前端交互的插件不同，挂件本质上是一个**独立的、静态伺服的 Web 页面 (或一组页面)**。

*   **技术栈**: 你可以使用任何你喜欢的前端技术（HTML, CSS, JavaScript, Vue, React 等）来构建挂件的用户界面和逻辑，只要最终能生成静态文件即可。
*   **加载方式**: 最常见的方式是使用思源的 `/widget` 块命令，将挂件通过 `<iframe>` 嵌入到笔记的块中。挂件也可以被设计为支持在独立的窗口中打开（如果挂件开发者处理了这种情况）。
*   **交互**: 挂件运行在 `<iframe>` 的沙箱环境中。它与思源主界面的直接交互受限，通常需要通过标准的 Web 技术（如 `postMessage` API）与父窗口（思源编辑器）进行通信（如果需要的话）。它**不直接访问**插件的 `API` 对象。
*   **用途**: 非常适合制作需要自定义 UI 的小工具，如图表生成器、特定数据可视化、交互式计算器、嵌入式小游戏、快速笔记面板等。

### 挂件与插件的区别

| 特性         | 插件 (Plugin)                                  | 挂件 (Widget)                                     |
| :----------- | :--------------------------------------------- | :------------------------------------------------ |
| **核心机制** | 继承 `Plugin` 类，运行在主进程环境 (扩展)     | 独立的静态 Web 页面，运行在 `<iframe>` 沙箱中     |
| **存放位置** | `data/plugins/`                                | `data/widgets/`                                   |
| **配置文件** | `plugin.json`                                  | `widget.json`                                     |
| **主要入口** | `dist/index.js` (后端读取后前端执行)           | `index.html` (或指定的 HTML 文件, 通过 `/widgets/{挂件名称}/` 访问) |
| **与思源交互**| 通过 `API` 对象直接调用前端/后端接口           | 有限，通常需通过 `postMessage` 与父窗口通信     |
| **UI 实现**  | 可通过 `API` 创建标准 UI (设置/菜单/Dock) 或自定义 Tab/Dock | 完全自定义，使用标准 Web 技术构建页面           |
| **典型用途** | 扩展核心功能、自动化、后台任务、复杂 UI       | 嵌入式 UI 小部件、数据可视化、独立小工具          |

### 开发环境建议

为了方便调试，可以直接将你的挂件开发文件夹放置在思源工作空间下的 `data/widgets/你的挂件名称/` 目录下。这样修改代码后，通常只需要在思源笔记中重新加载挂件块（例如，删除后重新插入，或刷新页面）即可看到效果。

### 挂件的基本结构

一个典型的思源挂件项目，最终部署到 `data/widgets/你的挂件名称/` 目录下，或者打包成 `package.zip` 时，**至少**应包含以下文件：

*   **`widget.json` (必需)**: 挂件的清单文件，定义挂件的元信息。详见下文。
*   **`index.html` (或入口 HTML 文件)**: 挂件的主页面。这是通过 `/widget` 命令嵌入时 `<iframe>` 加载的默认目标。
*   **`icon.png` (必需, 160x160 px)**: 挂件在集市或 `/widget` 命令选择时显示的图标。
*   **`preview.png` (必需, 1024x768 px)**: 挂件的预览图，用于集市展示。
*   **`README*.md` (必需)**: 说明文档。需要包含默认的 `README.md`，可以根据 `widget.json` 中的 `readme` 字段提供多语言版本 (如 `README_zh_CN.md`)。
*   **相关的 CSS 文件**: 样式表 (如果 `index.html` 需要)。
*   **相关的 JavaScript 文件**: 交互逻辑 (如果 `index.html` 需要)。

**注意**: 挂件目录下的所有文件都是**静态伺服**的。思源内部会提供一个本地 HTTP 服务器来访问这些文件，路径为 `/widgets/你的挂件名称/`。例如，`icon.png` 的访问路径是 `/widgets/你的挂件名称/icon.png`。这里的 `{你的挂件名称}` 对应 `widget.json` 中定义的 `name` 字段。

### `widget.json` 详解

`widget.json` 文件定义了挂件的核心元数据。以下是主要字段：

*   `name`: (string, 必需) 挂件的唯一标识符 (包名)。**必须和你的 GitHub 仓库名称一致，且在集市中全局唯一**。 不能包含特殊字符，推荐使用小写字母、数字和连字符 `-`。
*   `author`: (string, 必需) 挂件作者的名称。
*   `url`: (string, 必需) 挂件的 **GitHub 仓库地址** (或其他可公开访问的 URL)。
*   `version`: (string, 必需) 挂件的版本号，请遵循 [SemVer](https://semver.org/lang/zh-CN/) 规范 (例如: `"1.0.0"`, `"0.2.1-beta.3"`)。每次发布新版本时需要更新此字段。
*   `minAppVersion`: (string, 可选) 运行此挂件所需的思源笔记最低版本号。如果当前思源版本低于此值，挂件可能无法正常加载或在集市中标记为不兼容。
*   `displayName`: (object, 必需) 多语言支持的挂件显示名称，用于挂件列表和集市。必须包含 `default` 字段，可以包含其他语言代码作为键 (如 `en_US`, `zh_CN`)。
    ```json
    "displayName": {
      "default": "Widget Sample",
      "zh_CN": "挂件示例"
    }
    ```
*   `description`: (object, 必需) 多语言支持的挂件描述，用于挂件列表和集市。结构同 `displayName`。必须包含 `default` 字段。
*   `readme`: (object, 必需) 指定不同语言环境下使用的 README 文件名，用于集市详情页展示。结构同 `displayName`，值为相对于挂件根目录的文件名。必须包含 `default` 字段，其值通常是 `README.md`。
    ```json
    "readme": {
      "default": "README.md",
      "zh_CN": "README_zh_CN.md"
    }
    ```
*   `funding`: (object, 可选) 提供挂件的资助信息链接。
    ```json
    "funding": {
      "openCollective": "your-collective",
      "patreon": "your-patreon",
      "github": "your-github-login", // GitHub Sponsor 用户名
      "custom": [
        "https://your-custom-funding-link.com"
      ]
    }
    ```
*   `keywords`: (array of strings, 可选) 一组关键词，用于在集市或挂件列表中搜索。
*   `backends`: (array of strings, 可选) 声明挂件支持的操作系统后端。有效值包括: `"windows"`, `"linux"`, `"darwin"`, `"docker"`, `"android"`, `"ios"`。如果省略，则假定支持所有后端。
*   `frontends`: (array of strings, 可选) 声明挂件支持的前端环境。有效值包括: `"desktop"`, `"browser"`, `"mobile"`。如果省略，则假定支持所有前端。

**重要**: `name` 字段必须在 `widget.json` 中定义，并且需要与你的挂件仓库名称保持一致。

### 如何使用挂件

在思源编辑器中，输入 `/` 并选择"挂件"命令，然后选择你想要嵌入的挂件即可。思源会自动创建一个包含 `<iframe>` 的块，src 指向你挂件的入口 HTML 文件。

### 开发与调试

1.  **环境**: 建议将开发中的挂件文件夹直接放在 `data/widgets/你的挂件名称/` 下。
2.  **构建**: 使用你选择的前端工具构建你的挂件项目，确保生成静态文件 (HTML, CSS, JS)。
3.  **放置**: 将构建好的**整个文件夹**（包含 `widget.json` 和所有必需的静态资源）复制或链接到思源工作空间下的 `data/widgets/` 目录中，文件夹名称应与 `widget.json` 中的 `name` 一致。
4.  **加载**: 通常不需要重启思源。在编辑器中使用 `/widget` 命令应该就能看到新添加或更新的挂件。如果挂件已插入文档，可能需要删除块后重新插入，或刷新整个思源页面。
5.  **调试**: 由于挂件运行在 `<iframe>` 中，你可以：
    *   在嵌入挂件的思源页面打开主开发者工具 (右下角菜单 -> 开发者工具)。
    *   在 Console 面板的上下文选择器中，切换到对应的 `iframe` 上下文 (通常以挂件的 HTML 文件名或 URL 标识)，就可以看到挂件内部的 `console.log` 输出和错误。
    *   在 Sources 面板中找到对应的 `iframe` 源文件进行断点调试 (同样需要配置好 Source Maps)。
    *   或者，如果挂件支持，尝试直接在浏览器中通过本地服务器地址访问挂件的 HTML 文件进行独立调试。

### 打包 (`package.zip`)

当你准备好发布挂件时，需要将挂件的所有必需文件打包成一个 `package.zip` 文件。这个 zip 文件需要包含挂件根目录下的所有内容，结构如下：

```
package.zip
├── widget.json
├── index.html
├── icon.png
├── preview.png
├── README.md
├── README_zh_CN.md (可选)
└── css/ (可选)
    └── style.css
└── js/ (可选)
    └── script.js
└── ... (其他资源文件)
```

确保 zip 文件解压后直接就是这些文件和文件夹，而不是包含在一个额外的父目录里。

### 上架集市

要将你的挂件发布到思源笔记的社区集市，你需要：

1.  **准备 `package.zip`**: 按照上一节的要求，准备好包含所有必需文件的 `package.zip`。
2.  **创建 GitHub Release**:
    *   在你的挂件 GitHub 仓库中，创建一个新的 Release。
    *   **Tag version**: 使用 `widget.json` 中定义的 `version` 作为 Tag，例如 `v0.1.0`。
    *   **Release title**: 可以是版本号或简要说明。
    *   **Description**: 可以写更新日志。
    *   **上传附件**: 将你准备好的 `package.zip` 文件作为二进制附件 (binary asset) 上传到这个 Release。
    *   点击 "Publish release"。
3.  **首次发布 - 更新集市索引**:
    *   如果你是**第一次**将这个挂件发布到集市，你需要向官方的社区集市仓库 [siyuan-note/bazaar](https://github.com/siyuan-note/bazaar) 提交一个 Pull Request (PR)。
    *   在这个 PR 中，你需要修改根目录下的 `widgets.json` 文件。这是一个 JSON 数组，包含了所有社区挂件的仓库地址。你需要将你的挂件仓库地址（格式为 `"你的用户名/你的仓库名"`）添加到这个数组中。
        ```json
        {
          "repos": [
            "username1/widget-repo1",
            "username2/widget-repo2",
            "你的用户名/你的仓库名" // 添加你的仓库
          ]
        }
        ```
    *   提交 PR 并等待合并。
4.  **后续版本更新**:
    *   对于后续的版本更新，你**只需要**重复步骤 2（创建新的 GitHub Release 并上传新的 `package.zip`）即可。**不需要**再次向 `siyuan-note/bazaar` 提交 PR。
5.  **自动更新**:
    *   社区集市仓库 (`siyuan-note/bazaar`) 会通过 GitHub Actions 定期（通常每小时）自动检查所有已收录仓库的最新 Release，更新索引并部署。你可以在 [bazaar/actions](https://github.com/siyuan-note/bazaar/actions) 页面查看部署状态。

---

## 挂件的渲染与交互

### 渲染机制：IFrame

当用户在思源笔记编辑器中使用 `/widget` 命令并选择你的挂件时，思源本质上是在文档中插入了一个 HTML `<iframe>` 元素。这个过程大致如下（基于对 `protyle/hint/extend.ts` 中 `hintRenderWidget` 函数的分析）：

1.  **触发**: 用户通过斜杠命令 `/` 选择挂件。
2.  **搜索 (可选)**: 如果用户输入关键词，会调用后端 API `/api/search/searchWidget` 进行搜索。
3.  **插入 HTML**: 确定挂件名称 (`name`) 后，调用内部函数（如 `insertHTML`）将以下结构的 `iframe` 插入到当前光标位置：
    ```html
    <iframe 
        src="/widgets/{挂件名称}/" 
        data-subtype="widget" 
        border="0" 
        frameborder="no" 
        framespacing="0" 
        allowfullscreen="true"
    ></iframe>
    ```
    其中 `{挂件名称}` 就是你在 `widget.json` 中定义的 `name` 字段的值。
4.  **加载**: 浏览器加载 `iframe` 的 `src`，即 `/widgets/{挂件名称}/`。根据 Web 服务器的标准行为，这通常会加载该目录下的 `index.html` 文件。
5.  **显示**: 你的挂件页面 (`index.html` 及相关资源) 在 `iframe` 中渲染并显示出来。

因此，挂件的渲染完全依赖于标准的 `<iframe>` 机制。

### 与思源的交互：现实与推荐

挂件的 `<iframe>` **目前版本中，确实与思源主窗口是同源的**。理解这一点对于选择合适的交互方式至关重要。

#### 方式一：直接访问父窗口 DOM (获取块 ID 的当前唯一途径)

由于是同源，挂件内的 JavaScript 理论上可以通过 `window.parent` 或 `window.frameElement` 来直接访问和操作父窗口的 DOM 结构。实际上，**对于挂件想要独立获取其自身所在的块 ID (`data-node-id`)，目前并没有由思源核心直接提供的 API 或注入变量，因此通过 `window.frameElement.closest('[data-node-id]')` 查找父 DOM 是当前唯一可行的实用方法。**

**⚠️ 使用此方式的考量与风险：**

*   **权宜之计**: 将此视为一种当前的"权宜之计"。它能解决获取块 ID 的问题，但并非一个稳固的"官方"接口。
*   **高耦合性与脆弱性**: 这种方法使你的挂件代码严重依赖思源Protyle 编辑器当前的内部 DOM 结构。一旦思源版本更新导致该结构发生变化（即使是细微的），你的挂件获取块 ID 的逻辑就可能失效，导致难以追踪的错误。
*   **维护成本**: 长期来看，这种紧耦合会增加挂件的维护难度。

因此，虽然获取块 ID 不得不采用此法，但对于其他更复杂的交互，应谨慎考虑其弊端。

#### 方式二：通过插件/代码片段桥接的 `postMessage` (推荐用于 API 调用和复杂交互)

对于挂件需要**调用思源 API、传递复杂数据、或与思源进行更受控的双向通信**时，推荐采用一种基于 `postMessage` 并通过**开发者自行编写的插件或代码片段作为桥梁**的模式。

**核心前提与重要安全警告：**

1.  **思源核心不直接处理挂件消息**: 思源的前端本体**目前没有任何内置的、通用的逻辑来监听或处理来自任意挂件通过 `postMessage` 发送的消息**。不要期望你的挂件 `postMessage` 后思源会自动响应。
2.  **开发者必须实现桥梁**: 你需要创建一个简单的**代码片段 (Code Snippet)** 或一个功能更完整的**插件 (Plugin)**。这个桥梁代码的核心职责是：
    *   监听特定来源（你的挂件）的 `message` 事件。
    *   **严格校验消息来源 (`event.origin`)**：确保消息确实来自你预期的挂件同源地址。**如果省略或错误实现此校验，你的插件/代码片段将可能处理来自任何恶意网页的消息，造成严重安全漏洞，这可能比同源 DOM 访问的风险更大！** 浏览器对同源 DOM 的访问本身还有一层同源策略的保护，而 `postMessage` 的安全性完全依赖开发者在接收端的审慎实现。
    *   解析消息内容，并根据约定好的协议调用相应的思源 API (通过插件的 `this.api` 对象)。
    *   如果需要，将 API 的执行结果再通过 `postMessage` 回传给挂件的 `iframe`。

**为何推荐此模式（尽管需要额外工作）：**

*   **解耦与明确接口**: 它在挂件和思源核心功能之间建立了一个由你定义的、清晰的通信契约（消息格式和处理逻辑）。挂件不直接依赖思源内部 DOM 或 JS 实现，桥梁插件/代码片段则成为一个明确的适配层。
*   **更强的控制力**: 所有通过此途径的交互都必须经过你的桥梁代码，你可以在此层面实现更细致的权限控制、参数校验和错误处理。
*   **适应未来变化**: `postMessage` 是标准的 Web API。如果未来思源为了增强安全性或实现某些特性而将挂件放入跨域 `iframe` 中，基于 `postMessage` 的通信模式将更容易适应，而直接的 DOM 访问则会完全失效。

总结来说，获取块 ID 目前依赖直接的 DOM 操作（需注意其风险）；而对于更复杂的、需要调用 API 的交互，通过开发者自行实现的、安全可靠的插件/代码片段桥梁来使用 `postMessage`，是构建更健壮、可维护且具备一定前瞻性的挂件交互功能的推荐路径。

**(获取块 ID 的具体 DOM 操作示例、`postMessage` 通信模式以及如何编写桥接插件/代码片段的详细内容，将在 **[挂件高级交互](./widget-advanced.md)** 文档中深入讨论。)**

---

**下一步**: 开始编写"挂件高级交互"文档，或继续完善其他部分。 