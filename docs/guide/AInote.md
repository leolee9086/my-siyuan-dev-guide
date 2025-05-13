# 这个区段由开发者编写,未经允许禁止AI修改



---

## 2025-05-13 织的笔记

*   **新增文件**: `plugins.md`
*   **内容**: 添加了"插件基础"章节，包括插件定义、基本结构、生命周期、开发环境、加载与调试等内容。
*   **目的**: 开始编写思源插件开发指南，作为 `my-siyuan-dev-guide` 的一部分。

## 2025-05-13 00:29 HKT

*   **修改文件**: `plugins.md`
*   **内容**: 根据 `siyuan/app/src/plugin/loader.ts` 的源码，修正了"插件的基本结构"和"加载与调试插件"部分的描述，使其更准确地反映前后端协作的加载流程。明确了后端 API `/api/petal/loadPetals` 的作用，前端通过 `eval` 执行 JS 字符串，以及 CSS 注入方式。添加了关于 JS/CSS 具体获取方式与后端文档不一致的不确定性说明，并链接到后端 API 文档。
*   **目的**: 提高插件加载流程文档的准确性。

## 2025-05-13 00:31 HKT

*   **修改文件**: `plugins.md`
*   **内容**: 根据用户反馈和截图，修正了"加载与调试插件"部分关于如何打开开发者工具的说明。将错误的快捷键方式 (`Ctrl+Shift+I`) 修改为通过界面右下角的菜单按钮打开"总开发者工具"。
*   **目的**: 提供正确的调试工具入口信息。

## 2025-05-13 00:33 HKT

*   **修改文件**: `plugins.md`
*   **内容**: 根据用户提供的更清晰截图，将"开发者工具"菜单项的名称从"总开发者工具"精确修改为"开发者工具"。并 уточчнил описание иконки меню (обычно `?`).
*   **目的**: 确保文档中的菜单项名称与实际界面完全一致。

## 2025-05-13 00:39 HKT

*   **修改文件**: `plugins.md`
*   **内容**: 基于对后端 `model/plugin.go` 的最终确认，再次更新了"插件的基本结构"和"加载与调试插件"部分的描述。明确了后端服务会直接读取 `dist/index.js` 和 `dist/index.css` 文件内容并返回给前端，前端通过 `eval` 执行 JS 并注入 CSS。移除了之前关于加载方式的不确定性说明。调整了语言，使其对新手更友好，并补充了开发时需要重载插件的提示。
*   **目的**: 提供最终准确、清晰且对新手友好的插件加载流程说明。

## 2025-05-13 00:52 HKT

*   **新增文件**: `widgets.md`
*   **内容**: 根据用户要求和对 `model/widget.go` 的分析，创建了挂件开发指南，并添加了"挂件基础"章节。内容包括：
    *   定义了挂件为静态伺服的 Web 页面，通常通过 iframe 加载。
    *   对比了挂件与插件的关键区别（核心机制、位置、配置、入口、交互、UI、用途）。
    *   描述了挂件的基本目录结构（`data/widgets/`, `widget.json` 推测, HTML/CSS/JS 等）。
    *   说明了挂件的使用方式 (`/widget` 命令) 和调试方法 (iframe 上下文)。
*   **目的**: 为挂件开发提供独立的文档入口，并澄清其与插件的区别。

## 2025-05-13 织 (继续深夜更新)

- **文件**: `widgets.md`
- **变更**: 
    - 新增章节"挂件的渲染与交互"。
    - 解释了挂件通过在 Protyle 中插入 `<iframe src="/widgets/{挂件名称}/">` 来渲染，基于对 `protyle/hint/extend.ts` 中 `hintRenderWidget` 函数的分析。
    - 指出由于 iframe 沙箱限制，挂件与思源主窗口的交互需要通过标准的 `Window.postMessage()` API 进行。
    - 简要概述了 `postMessage` 的双向通信流程（挂件 -> 思源，思源 -> 挂件）。
    - 提及了通信协议需要开发者自行设计，并建议参考现有挂件源码。
- **原因**: 用户要求探索挂件的渲染机制。通过分析 `protyle` 目录下的代码，确定了基于 iframe 的渲染方式，并阐述了由此带来的交互限制和 `postMessage` 的必要性，为后续深入交互机制打下基础。

## 2025-05-13 织 (深夜再再更新)

- **文件**: `widgets.md`
- **变更**: 
    - 在"挂件的渲染与交互"章节下，新增"同源特性与交互方式"小节。
    - 明确指出挂件 iframe 与思源主窗口通常是同源的。
    - 提供了通过 `window.frameElement` 及其父元素 DOM 遍历来获取挂件自身块 `data-node-id` 的 JavaScript 代码示例，并指出这是可行的交互方式。
    - 重新定位了 `postMessage` 的作用：虽然获取块 ID 可以直接操作 DOM，但 `postMessage` 仍是调用思源 API 和进行双向通信的**推荐**方式，因为它更健壮、更解耦。
    - 提供了更具体的 `postMessage` 收发伪代码示例，包括 `targetOrigin` 校验和基本的消息结构。
    - 修正了之前关于"必须"使用 `postMessage` 的绝对化描述。
- **原因**: 用户指出了挂件与主窗口的同源特性，使得挂件可以直接访问 DOM 获取块 ID。本次修改旨在根据这一重要信息，修正和完善交互部分的描述，提供更准确、更全面的信息，并恰当说明不同交互方式的适用场景和优劣。

## 2025-05-13 织 (又一次深夜更新)

- **文件**: `widgets.md`
- **变更**: 
    - 根据用户提供的挂件实际 DOM 结构截图，修正了"同源特性与交互方式"小节中获取块 ID 的 JavaScript 代码示例。
    - 将 `iframeElement.parentElement` 修改为 `iframeElement.closest('[data-node-id]')`，以正确地从 iframe 查找到包含 `data-node-id` 的祖先块元素（实际 DOM 中 iframe 被嵌套了额外的 `div.iframe-content`）。
- **原因**: 用户提供了实际的 DOM 结构截图，显示之前的 `parentElement` 写法不准确。使用 `closest` 方法可以更健壮、更准确地获取到挂件所在的块 ID。

## 2025-05-13 织 (凌晨一点半前的执念)

- **文件**: `widgets.md`
- **变更**: 
    - 根据代码搜索结果，修正了"与思源的交互：postMessage"部分的描述。
    - **关键更正**: 明确指出思源核心前端代码**没有**内置通用的 `message` 事件监听器来处理来自挂件的 `postMessage`。
    - **强调插件桥梁**: 强调了超出"通过 DOM 获取块 ID"范围的交互（特别是调用思源 API 或双向通信）**必须依赖插件 (Plugin) 作为桥梁** 来实现。
    - **更新伪代码**: 删除了之前不准确的"思源侧"监听伪代码，替换为更详细的**插件侧**处理 `message` 事件、调用 `this.api`、并将结果 `postMessage` 回挂件的伪代码示例。
    - 更新了"下一步"计划，聚焦于创建具体的插件-挂件通信示例。
- **原因**: 对 `siyuan/app/src` 的代码搜索确认了用户关于思源核心缺乏内置 `postMessage` 监听器的猜测。本次修改旨在反映这一事实，纠正之前不准确的描述，并清晰地指出插件在挂件交互中的关键（且必需的）作用。

## 2025-05-13 织 (终于快两点了)

- **文件**: `widgets.md`
- **变更**: 
    - 重构了"与思源的交互"部分，使其更简洁。
    - 简要说明了如何通过同源特性和 `window.frameElement` 获取块 ID。
    - 简要说明了 `postMessage` 用于 API 调用和复杂交互。
    - **更正与明确**: 指出处理挂件 `postMessage` 的逻辑需要开发者通过 **插件 (Plugin) 或代码片段 (Code Snippet)** 在思源端实现，而非思源核心内置。
    - **移除细节**: 删除了获取块 ID 和 `postMessage` 监听/处理的详细代码示例。
    - **添加占位符**: 添加说明，表示高级交互细节将在单独的文档中介绍。
    - 更新了"下一步"计划。
- **原因**: 用户反馈交互部分的细节过多，且指出处理 `postMessage` 可以通过代码片段而非必须是完整插件。本次修改旨在精简主文档，提高可读性，正确定位交互实现方式（插件或代码片段），并将高级内容移至专门文档。

## 2025-05-13 织 (终于拆分完了)

- **新增文件**: `widget-advanced.md`
- **内容**: 
    - 将之前从 `widgets.md` 中移除的挂件高级交互细节（获取块 ID、`postMessage` 通信）移入此新文件。
    - 提供了获取块 ID 的 `getWidgetBlockId` 函数示例。
    - 详细解释了 `postMessage` 的通信流程和必要性（插件/代码片段桥接）。
    - 提供了建议的消息结构 (TypeScript interface)。
    - 包含了挂件端和服务端（插件/代码片段）的 `postMessage` 收发代码示例。
    - 补充了 `postMessage` 通信的注意事项 (安全、异步、错误处理、性能、查找 Protyle 实例)。
- **目的**: 创建一个专门的文档来存放挂件的高级交互技巧，保持主文档 (`widgets.md`) 的简洁性。

## 2025-05-13 织 (深夜修补)

- **文件**: `widgets.md`
- **变更**: 
    - 在"与思源的交互"部分，重写了关于同源交互和 `postMessage` 的说明。
    - 明确指出了直接操作 `window.parent` 的风险（高耦合、脆弱性、潜在安全风险）。
    - 强调了 `postMessage` 是更健壮、更安全、更解耦的**推荐**交互方式，尤其是在需要调用 API 或进行复杂数据交换时。
    - 保留了需要通过插件或代码片段处理 `postMessage` 的关键信息。
- **原因**: 根据哥哥的建议，调整文档表述，更清晰地解释直接 DOM 操作的弊端，并强调 `postMessage` 作为推荐方案的优势，帮助开发者做出更明智的技术选择。

## 2025-05-13 织 (彻底澄清交互机制)

- **文件**: `widgets.md`
- **变更**: 
    - 再次重写了"与思源的交互"部分，以最大限度地消除误解。
    - 明确肯定了挂件 iframe **当前就是同源的**。
    - 在介绍 `postMessage` 时，**立刻且着重强调**：思源核心**不直接处理**挂件消息，必须由开发者编写**插件或代码片段**作为桥梁来实现监听和响应。
    - 清晰解释了为什么即使需要额外工作，这种基于 `postMessage` + 桥梁的模式仍然是推荐的最佳实践（解耦、可维护性、适应性）。
    - 避免了任何可能暗示 `postMessage` 是"内置功能"的措辞。
- **原因**: 响应哥哥的精确反馈，彻底修正之前可能引起误解的表述，确保文档准确反映挂件交互的现状和推荐模式。

## 2025-05-13 织 (交互方式最终修订)

- **文件**: `widgets.md`
- **变更**: 
    - 根据哥哥的最终指示，再次修订"与思源的交互"部分。
    - **获取块 ID**: 明确指出通过 `window.frameElement.closest('[data-node-id]')` 直接访问父 DOM 是目前挂件独立获取自身块 ID 的**唯一可行途径**，并称其为"权宜之计"，说明其依赖 DOM 结构和未来可能失效的风险。
    - **`postMessage` + 桥梁**: 
        - 主要推荐场景限定为**调用 API 和复杂交互**。
        - 强调**必须由开发者编写插件/代码片段作为桥梁**，思源核心不直接处理。
        - **新增 `postMessage` 安全风险警告**: 明确指出**必须严格校验 `event.origin`**，否则可能比同源 DOM 访问更危险。
        - 调整优势说明，侧重于解耦、明确接口和未来适应性，而非笼统的"安全"。
- **原因**: 采纳哥哥关于获取块 ID 唯一性、务实表述以及 `postMessage` 安全性风险的深刻见解，提供最准确、最平衡的挂件交互指南。

## 2025-05-13 织 (同步修订 widget-advanced.md)

- **文件**: `widget-advanced.md`
- **变更**: 
    - 根据 `widgets.md` 的最终交互逻辑修订，同步更新此高级文档。
    - **获取块 ID**: 明确指出通过 `window.frameElement.closest('[data-node-id]')` 是当前**唯一**实用方法，强调其"权宜之计"性质和风险。
    - **`postMessage` + 桥梁**: 
        - 再次强调思源核心不处理消息，**开发者必须实现桥梁**。
        - 在代码示例的注释和文字说明中，**极其醒目地强调 `event.origin` 校验的极端重要性及其安全含义**，指出校验疏忽比 DOM 访问更危险。
        - 调整 `postMessage` 模式优势的措辞，与 `widgets.md` 保持一致，聚焦解耦、接口、控制和适应性。
- **原因**: 确保基础指南和高级技巧文档在核心交互逻辑、风险提示和推荐实践上完全一致，避免信息混淆。

## 2025-05-13 织 (创建代码片段文档)

- **新增文件**: `snippets-css.md`, `snippets-js.md`
- **内容**: 
    - 为 CSS 和 JS 代码片段分别创建了独立的指南文档。
    - 描述了它们的定义、管理方式、加载机制、作用域、主要用途、局限性/风险以及调试方法。
    - **特别注意**: 根据哥哥指示，JS 代码片段文档中**未**包含将其用作 `postMessage` 桥梁的讨论。
- **原因**: 响应哥哥的建议，将代码片段作为与插件、挂件并列的扩展机制，并为其创建专门的文档分类，提高指南的结构清晰度。

## 2025-05-13 织 (更新首页并创建占位文档)

- **修改文件**: `index.md`
- **变更**: 
    - 在首页的 "features" 列表和下方的快速链接中，添加了指向以下新分类指南的条目：
        - CSS 代码片段 (`/guide/snippets-css`)
        - JS 代码片段 (`/guide/snippets-js`)
        - 模板片段 (`/guide/snippets-template`)
        - 主题开发 (`/guide/themes`)
        - 其它扩展方式 (`/guide/other-extensions`)
- **新增文件**: 
    - `snippets-template.md`: 模板片段指南的占位文件。
    - `themes.md`: 主题开发指南的占位文件。
    - `other-extensions.md`: 其他扩展方式指南的占位文件。
- **原因**: 根据哥哥的要求，丰富首页内容，包含所有主要的扩展类型，并为新增的分类创建基础文档结构，方便后续填充。

## 2025-05-13 织 (为首页部分特性添加新手推荐标记)

- **修改文件**: `index.md`
- **变更**: 
    - 在首页的 "features" 列表中，为以下几个项目的 `details` 字段添加了 "(新手推荐 👍)" 标记：
        - CSS 代码片段
        - JS 代码片段
        - 模板片段指南
        - 其它扩展方式
- **原因**: 根据哥哥的建议，突出显示这些相对简单、适合新手入门的扩展方式。

## 2025-05-13 织 (为 CSS 片段指南添加菜鸟教程链接)

- **修改文件**: `snippets-css.md`
- **变更**: 
    - 在 "定义" 部分后，添加了一段推荐新手访问 "菜鸟教程 CSS" 网站学习基础知识的文字和链接。
- **原因**: 根据哥哥的建议，为学习 CSS 片段的新手提供一个方便的外部学习资源。

---

## 2025-05-13 织 (深夜修正 API 文档)

- **修改文件**: `my-siyuan-dev-guide/docs/kernel-api/snippet/setSnippet.md`
- **变更**: 
    - 根据哥哥的指正和对 `siyuan/kernel/api/snippet.go` 源码的再次核查，彻底修正了 `/api/snippet/setSnippet` 的行为描述。
    - **关键更正**: 明确指出此 API 执行的是**全量替换**操作，而非增量更新或仅基于 ID 的 upsert。调用时提供的 `snippets` 数组会完全覆盖用户当前所有的代码片段。
    - 更新了功能描述、请求参数说明（特别是 `snippets` 数组的含义和 `id` 字段的行为）。
    - 修改了请求示例，并添加了非常醒目的警告，说明示例执行后会导致其他片段丢失。
    - 新增了"如何安全地更新或添加单个片段"章节，详细描述了正确的操作流程（先 get，再本地修改，最后 set 完整列表）。
- **原因**: 此前的文档对 `setSnippet` API 的行为理解有重大偏差，错误地认为其支持增量更新。本次修正是为了提供准确的 API 文档，防止用户因误解 API 行为而导致代码片段数据丢失。这是根据哥哥的反馈进行的关键修正。 

---

## 2025-05-13 织 (修正 CSS 片段一键安装逻辑)

- **修改文件**: `my-siyuan-dev-guide/docs/.vitepress/theme/index.js`
- **变更**: 
    - 修正了 `handleInstallClick` 函数中调用 `/api/snippet/setSnippet` 的逻辑，以解决其全量替换特性导致的数据丢失风险。
    - **新的安装流程**:
        1.  在调用 `setSnippet` 之前，先通过 `/api/snippet/getSnippet` (参数: `{type: "css", enabled: 2}`) 获取所有现存的 CSS 片段。
        2.  检查返回的列表中是否存在与当前要安装的片段同名的 CSS 片段。
        3.  如果存在同名片段，通过 `confirm` 对话框询问用户是否覆盖。若用户同意，则更新列表中该片段的内容和启用状态 (并保留其 ID)；若不同意，则中止安装。
        4.  如果不存在同名片段，则将新片段对象 (ID 为空字符串) 添加到列表中。
        5.  最后，将包含所有片段（包括未改动的、已更新的、新添加的）的完整列表通过 `/api/snippet/setSnippet` 发送给思源。
- **原因**: 此前 `handleInstallClick` 函数直接发送单个新片段到 `setSnippet`，由于该 API 是全量替换，会导致用户所有其他 CSS 片段被删除。本次修改确保了在安装新片段时，会保留用户已有的其他片段，并能正确处理同名片段的更新（覆盖）或添加。 

---

## 2025-05-13 织 (再次修正并完善 CSS 片段一键安装逻辑)

- **修改文件**: `my-siyuan-dev-guide/docs/.vitepress/theme/index.js`
- **变更**: 
    - 进一步完善了 `handleInstallClick` 函数，确保在安装 CSS 片段时不会丢失用户已有的 JS 片段。
    - **关键修正点**:
        1.  调用 `/api/snippet/getSnippet` 时，参数从 `{type: "css", enabled: 2}` 修改为 `{type: "all", enabled: 2}`，以获取所有类型（CSS 和 JS）和所有状态的片段。
        2.  获取到完整片段列表后，将 JS 类型的片段筛选出来并原样保留。
        3.  只对 CSS 类型的片段执行同名检查、用户确认覆盖或添加新 CSS 片段的逻辑。
        4.  最后，将保留的 JS 片段与处理后的 CSS 片段合并，形成最终的完整片段列表，再发送给 `/api/snippet/setSnippet`。
- **原因**: 上一版修正虽然解决了 CSS 片段被覆盖的问题，但由于 `getSnippet` 时只请求了 CSS 类型，导致在 `setSnippet` 时会丢失所有 JS 片段。本次修正是为了确保在操作 CSS 片段时，其他类型的片段也能被正确保留和处理，防止任何代码片段的意外丢失。这再次凸显了 `setSnippet` 全量替换行为的重大影响。

---

## 2025-05-13 织 (为 CSS 片段指南添加 API 文档链接)

- **修改文件**: `my-siyuan-dev-guide/docs/guide/snippets-css.md`
- **变更**: 
    - 在 "加载机制" 章节后，补充了一段关于通过后端 API 进行代码片段程序化管理的说明。
    - 添加了指向以下三个核心 Snippet API 文档的链接及其简要描述：
        - `/api/snippet/getSnippet`
        - `/api/snippet/setSnippet` (并特别注明其全量替换特性)
        - `/api/snippet/removeSnippet`
- **原因**: 方便阅读 CSS 代码片段指南的开发者快速找到相关的后端 API 文档，以便进行更高级的操作或集成。 

---

## 2025-05-14 织 (改进 CSS 片段指南结构)

- **修改文件**: 
    - `my-siyuan-dev-guide/docs/guide/snippets-css.md`
    - `my-siyuan-dev-guide/docs/guide/css-snippets/css-snippet-examples.md` (新创建)
- **变更**:
    - 从 `snippets-css.md` 中提取了 "## 示例" 部分及其内容。
    - 创建了新的 `css-snippets/css-snippet-examples.md` 文件，并将提取的示例内容放入其中。
    - 在 `snippets-css.md` 的原示例位置添加了指向 `css-snippets/css-snippet-examples.md` 的链接。
    - 在新的 `css-snippet-examples.md` 文件的示例列表中，补充了 `fix-all-highlights-background.md` 的链接。
- **原因**: 优化 `snippets-css.md` 的文档结构，使其更专注于指南本身，将示例集中到单独的文件中，方便查阅和管理。

---

## 2025-05-13 织 (为 CSS 片段指南添加 API 文档链接)

- **修改文件**: `my-siyuan-dev-guide/docs/guide/snippets-css.md`
- **变更**: 
    - 在文档末尾添加了指向 `/api/snippet/setSnippet` 和 `/api/snippet/getSnippet` API 文档的链接。
- **原因**: 方便用户在阅读 CSS 片段指南时，快速查阅相关的核心 API 文档。

---

## [2025-05-14 01:52 织] - 补充挂件外部署方式文档

- **新增文件夹**: `my-siyuan-dev-guide/docs/guide/widget-dev/`
  - **目的**: 为各种挂件开发相关的技巧、代码片段或高级主题提供一个集中的存放位置，使其不仅仅局限于单一主题。
- **新增文档**: `my-siyuan-dev-guide/docs/guide/widget-dev/deploying-from-external-page.md`
  - **内容**: 详细说明了如何通过外部 HTML 页面配合 JavaScript 调用思源笔记的 `/api/file/putFile` API 来实现挂件的动态部署。文档内容包括：
    - 此方式的适用场景（开发调试、批量部署、自定义流程）。
    - 核心原理（基于 `/api/file/putFile`）。
    - 所需信息（思源 URL、API Token）。
    - 前端实现步骤（参考 `tinySiyuanWidgets` 项目中的 `deployWidget` 函数），包括获取用户输入、确定文件列表、遍历上传每个文件（读取文件、创建 Blob 和 FormData、发送 API 请求、处理响应）、提供状态反馈。
    - 重要的安全警告，强调 API Token 的安全使用和临时 Token 建议。
    - 指向 `tinySiyuanWidgets` 项目作为示例参考。
  - **目的**: 响应用户要求，为思源挂件开发者提供一种通过外部页面进行部署的详细指南。
- **修改文档**: `my-siyuan-dev-guide/docs/guide/widgets.md`
  - **变更**: 在 "上架集市" 章节之后、"挂件的渲染与交互" 章节之前，新增了 `### 高级部署与开发技巧` 小节。
  - **内容**: 在新小节下添加了一个链接 `* [通过外部页面部署挂件](./widget-dev/deploying-from-external-page.md)`，指向新创建的外部署指南文档。
  - **目的**: 在主挂件指南中提供入口，方便开发者发现和查阅更高级或非标准的部署与开发技巧。
- **总体原因**:
  - 满足用户关于补充"从外部页面调用挂件安装方式"的文档需求。
  - 通过创建 `widget-dev` 文件夹，为未来积累和组织更多样的挂件开发技巧和深入主题打下良好基础，提高开发指南的全面性和实用性。

---

## [2025-05-14 01:56 织] - 更新外部署文档中的示例链接

- **修改文档**: `my-siyuan-dev-guide/docs/guide/widget-dev/deploying-from-external-page.md`
  - **变更**: 在 "示例参考" 部分，将对 `tinySiyuanWidgets` 项目的引用更新为一个更具体的链接。
  - **内容**: 将原来的文本 "具体的实现可以参考开源项目 `tinySiyuanWidgets` 的主页面 `index.html` 中的 `deployWidget` JavaScript 函数。" 修改为 "具体的实现可以参考开源项目 [思源笔记小挂件集合 (tinySiyuanWidgets)](https://leolee9086.github.io/tinySiyuanWidgets/)。其主页面（通常是 `index.html`，源码可以在其 GitHub 仓库，例如 [leolee9086/tinySiyuanWidgets](https://github.com/leolee9086/tinySiyuanWidgets) 找到）中的 `deployWidget` JavaScript 函数展示了这种部署方式。"
  - **目的**: 用户提供了 `tinySiyuanWidgets` 项目的实际在线地址 ([https://leolee9086.github.io/tinySiyuanWidgets/](https://leolee9086.github.io/tinySiyuanWidgets/))，将其更新到文档中可以为读者提供更直接、更有用的参考示例。

---

## 2025-05-14 01:52 织 - 更新 HTML 块渲染说明

- **修改文件**: `my-siyuan-dev-guide/docs/guide/other-extensions.md`
- **变更**: 
    - 详细解释了思源笔记中 HTML 块的渲染机制。
    - **`htmlRender.ts`**: 说明了此文件中的 `htmlRender` 函数如何识别 HTML 块 (通过 `data-type=\"NodeHTMLBlock\"`) 并为这些块的 UI 元素（编辑、更多按钮）添加 `aria-label` 以增强可访问性。
    - **`<protyle-html>` Web Component (`protyle-html.js`)**: 
        - 描述了此 Web Component 如何使用 Shadow DOM 来隔离和渲染 HTML 内容。
        - 解释了 `data-content` 属性的用途，以及构造函数中通过 `Lute.EscapeHTMLStr` 进行的初始内容处理。
        - 详细说明了 `attributeChangedCallback` 中的逻辑：
            - 使用 `Lute.UnEscapeHTMLStr` 反转义内容。
            - 根据 `window.siyuan.config.editor.allowHTMLBLockScript` 配置（默认为 false，即不允许脚本），使用 `DOMPurify.sanitize()` 清理 HTML 以防止 XSS。
            - 特殊处理 `<script>` 标签：对包含 `document.write` 的脚本显示错误信息；对其他脚本，则创建新的 `<script>` 元素并将其附加到 Shadow DOM 中执行。
    - 包含了 `htmlRender.ts` 和 `protyle-html.js` 中关键逻辑的代码示例。
- **原因**: 响应哥哥的要求，参考 `htmlRender.ts` 和 `protyle-html.js` 源码，为开发者提供关于思源 HTML 块渲染、安全处理和脚本执行的详细技术说明。

---

## 2025-05-14 织 (补充 HTML 块内脚本获取块 ID 的方法)

- **修改文件**: `my-siyuan-dev-guide/docs/guide/other-extensions.md`
- **变更**:
    - 在"HTML 内容的实际渲染与管理"章节之后，"示例"章节之前，新增了"### 3. 在 HTML 块内脚本中获取块 ID"小节。
    - **解释了工作原理**: 说明了如何通过 `document.currentScript` (在 Shadow DOM 内的脚本元素) -> `.getRootNode().host` (获取到 `<protyle-html>` 元素) -> `.closest('[data-node-id]')` (查找到包含 ID 的父块元素) 的步骤来获取块 ID。
    - **提供了函数示例**: 给出了一个名为 `getSiyuanBlockId()` 的 JavaScript 函数，可以直接在 HTML 块的 `<script>` 中使用。
    - **提供了用法示例**: 包含了一个完整的 HTML 代码块，演示了如何调用 `getSiyuanBlockId()` 函数，并将获取到的块 ID 显示在 HTML 块内部，方便用户直接复制粘贴到思源笔记中测试效果。
    - **添加了注意事项**: 强调了此方法对 `document.currentScript` 的依赖性，以及在异步或极简 HTML 结构中可能需要注意的问题。
- **原因**: 响应哥哥的要求，为开发者提供一种在 HTML 块内部通过 JavaScript 获取其自身所在思源块 `data-node-id` 的实用方法和示例代码。

---

## 2025-05-14 织 (再次大幅修正"在 HTML 块内脚本中获取块 ID"的方法)

- **修改文件**: `my-siyuan-dev-guide/docs/guide/other-extensions.md`
- **变更**:
    - 在"HTML 内容的实际渲染与管理"章节之后，"示例"章节之前，新增了"### 3. 在 HTML 块内脚本中获取块 ID"小节。
    - **解释了工作原理**: 说明了如何通过 `document.currentScript` (在 Shadow DOM 内的脚本元素) -> `.getRootNode().host` (获取到 `<protyle-html>` 元素) -> `.closest('[data-node-id]')` (查找到包含 ID 的父块元素) 的步骤来获取块 ID。
    - **提供了函数示例**: 给出了一个名为 `getSiyuanBlockId()` 的 JavaScript 函数，可以直接在 HTML 块的 `<script>` 中使用。
    - **提供了用法示例**: 包含了一个完整的 HTML 代码块，演示了如何调用 `getSiyuanBlockId()` 函数，并将获取到的块 ID 显示在 HTML 块内部，方便用户直接复制粘贴到思源笔记中测试效果。
    - **添加了注意事项**: 强调了此方法对 `document.currentScript` 的依赖性，以及在异步或极简 HTML 结构中可能需要注意的问题。
    - **关键更正**: 根据用户 leolee 提供的更优思路，废弃了之前直接在脚本内查找的方式。新方法采用定义一个自定义元素 `<siyuan-script-runner>`，该元素通过一个健壮的 `findHostBlock` 辅助函数（递归查找 `element.host` 和 `element.parentNode`）来定位其所在的思源块。然后，`<siyuan-script-runner>` 会执行其内部的特定类型脚本（如 `<script type="text/siyuan-scope">`），并将找到的宿主块元素 `hostBlock` 和块 ID `blockId` 注入到该脚本的作用域中。文档已更新为包含此自定义元素的完整定义和用法示例。
    - **后续改进 (同日)**: 进一步优化了 `<siyuan-script-runner>` 内的示例用户脚本。为了避免直接操作 `document.body` 或 Shadow Root，现在 `<siyuan-script-runner>` 元素实例本身 (`runnerElement`) 会被传递给用户脚本。示例脚本中创建的元素会通过 `runnerElement.appendChild(p)` 直接附加到 `<siyuan-script-runner>` 内部，使得输出位置更清晰和受控。
    - 修改日期: 2025-05-13
- **原因**: 响应哥哥的要求，为开发者提供一种在 HTML 块内部通过 JavaScript 获取其自身所在思源块 `data-node-id` 的实用方法和示例代码。

---