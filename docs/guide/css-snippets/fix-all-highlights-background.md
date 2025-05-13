# CSS 片段：完整优化高亮背景 (background1-13) 的断裂效果

此 CSS 片段旨在为思源笔记中所有13种标准高亮背景色（通过颜色变量 `--b3-font-background1` 至 `--b3-font-background13` 实现）提供一个统一的、视觉效果更佳的渲染方式，尤其是在高亮文本跨行显示时，能够避免背景断裂，并呈现平滑的包裹感和圆角效果。

它是对[单个 background1 高亮优化](./fix-background1-highlight.md)的扩展和完整应用。

## 代码片段

由于需要为每一种 `backgroundN` 指定对应的颜色变量 `var(--b3-font-backgroundN)`，以下代码分别针对 `background1` 到 `background13` 定义了样式。

::: code-group
```css [优化所有高亮背景 (bg1-13)]
/* --- 优化 background1 --- */
.protyle-wysiwyg [data-node-id] [spellcheck] span[style*='background1'] {
    background-color: transparent !important;
    background:
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background1) 50%, transparent 51%) left bottom / 0.5rem 0.5rem no-repeat,
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background1) 50%, transparent 51%) right bottom / 0.5rem 0.5rem no-repeat,
    linear-gradient(var(--b3-font-background1), var(--b3-font-background1)) center bottom / calc(100% - 0.5rem) 0.5rem no-repeat;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
}

/* --- 优化 background2 --- */
.protyle-wysiwyg [data-node-id] [spellcheck] span[style*='background2'] {
    background-color: transparent !important;
    background:
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background2) 50%, transparent 51%) left bottom / 0.5rem 0.5rem no-repeat,
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background2) 50%, transparent 51%) right bottom / 0.5rem 0.5rem no-repeat,
    linear-gradient(var(--b3-font-background2), var(--b3-font-background2)) center bottom / calc(100% - 0.5rem) 0.5rem no-repeat;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
}

/* --- 优化 background3 --- */
.protyle-wysiwyg [data-node-id] [spellcheck] span[style*='background3'] {
    background-color: transparent !important;
    background:
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background3) 50%, transparent 51%) left bottom / 0.5rem 0.5rem no-repeat,
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background3) 50%, transparent 51%) right bottom / 0.5rem 0.5rem no-repeat,
    linear-gradient(var(--b3-font-background3), var(--b3-font-background3)) center bottom / calc(100% - 0.5rem) 0.5rem no-repeat;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
}

/* --- 优化 background4 --- */
.protyle-wysiwyg [data-node-id] [spellcheck] span[style*='background4'] {
    background-color: transparent !important;
    background:
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background4) 50%, transparent 51%) left bottom / 0.5rem 0.5rem no-repeat,
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background4) 50%, transparent 51%) right bottom / 0.5rem 0.5rem no-repeat,
    linear-gradient(var(--b3-font-background4), var(--b3-font-background4)) center bottom / calc(100% - 0.5rem) 0.5rem no-repeat;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
}

/* --- 优化 background5 --- */
.protyle-wysiwyg [data-node-id] [spellcheck] span[style*='background5'] {
    background-color: transparent !important;
    background:
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background5) 50%, transparent 51%) left bottom / 0.5rem 0.5rem no-repeat,
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background5) 50%, transparent 51%) right bottom / 0.5rem 0.5rem no-repeat,
    linear-gradient(var(--b3-font-background5), var(--b3-font-background5)) center bottom / calc(100% - 0.5rem) 0.5rem no-repeat;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
}

/* --- 优化 background6 --- */
.protyle-wysiwyg [data-node-id] [spellcheck] span[style*='background6'] {
    background-color: transparent !important;
    background:
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background6) 50%, transparent 51%) left bottom / 0.5rem 0.5rem no-repeat,
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background6) 50%, transparent 51%) right bottom / 0.5rem 0.5rem no-repeat,
    linear-gradient(var(--b3-font-background6), var(--b3-font-background6)) center bottom / calc(100% - 0.5rem) 0.5rem no-repeat;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
}

/* --- 优化 background7 --- */
.protyle-wysiwyg [data-node-id] [spellcheck] span[style*='background7'] {
    background-color: transparent !important;
    background:
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background7) 50%, transparent 51%) left bottom / 0.5rem 0.5rem no-repeat,
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background7) 50%, transparent 51%) right bottom / 0.5rem 0.5rem no-repeat,
    linear-gradient(var(--b3-font-background7), var(--b3-font-background7)) center bottom / calc(100% - 0.5rem) 0.5rem no-repeat;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
}

/* --- 优化 background8 --- */
.protyle-wysiwyg [data-node-id] [spellcheck] span[style*='background8'] {
    background-color: transparent !important;
    background:
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background8) 50%, transparent 51%) left bottom / 0.5rem 0.5rem no-repeat,
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background8) 50%, transparent 51%) right bottom / 0.5rem 0.5rem no-repeat,
    linear-gradient(var(--b3-font-background8), var(--b3-font-background8)) center bottom / calc(100% - 0.5rem) 0.5rem no-repeat;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
}

/* --- 优化 background9 --- */
.protyle-wysiwyg [data-node-id] [spellcheck] span[style*='background9'] {
    background-color: transparent !important;
    background:
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background9) 50%, transparent 51%) left bottom / 0.5rem 0.5rem no-repeat,
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background9) 50%, transparent 51%) right bottom / 0.5rem 0.5rem no-repeat,
    linear-gradient(var(--b3-font-background9), var(--b3-font-background9)) center bottom / calc(100% - 0.5rem) 0.5rem no-repeat;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
}

/* --- 优化 background10 --- */
.protyle-wysiwyg [data-node-id] [spellcheck] span[style*='background10'] {
    background-color: transparent !important;
    background:
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background10) 50%, transparent 51%) left bottom / 0.5rem 0.5rem no-repeat,
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background10) 50%, transparent 51%) right bottom / 0.5rem 0.5rem no-repeat,
    linear-gradient(var(--b3-font-background10), var(--b3-font-background10)) center bottom / calc(100% - 0.5rem) 0.5rem no-repeat;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
}

/* --- 优化 background11 --- */
.protyle-wysiwyg [data-node-id] [spellcheck] span[style*='background11'] {
    background-color: transparent !important;
    background:
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background11) 50%, transparent 51%) left bottom / 0.5rem 0.5rem no-repeat,
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background11) 50%, transparent 51%) right bottom / 0.5rem 0.5rem no-repeat,
    linear-gradient(var(--b3-font-background11), var(--b3-font-background11)) center bottom / calc(100% - 0.5rem) 0.5rem no-repeat;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
}

/* --- 优化 background12 --- */
.protyle-wysiwyg [data-node-id] [spellcheck] span[style*='background12'] {
    background-color: transparent !important;
    background:
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background12) 50%, transparent 51%) left bottom / 0.5rem 0.5rem no-repeat,
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background12) 50%, transparent 51%) right bottom / 0.5rem 0.5rem no-repeat,
    linear-gradient(var(--b3-font-background12), var(--b3-font-background12)) center bottom / calc(100% - 0.5rem) 0.5rem no-repeat;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
}

/* --- 优化 background13 --- */
.protyle-wysiwyg [data-node-id] [spellcheck] span[style*='background13'] {
    background-color: transparent !important;
    background:
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background13) 50%, transparent 51%) left bottom / 0.5rem 0.5rem no-repeat,
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background13) 50%, transparent 51%) right bottom / 0.5rem 0.5rem no-repeat,
    linear-gradient(var(--b3-font-background13), var(--b3-font-background13)) center bottom / calc(100% - 0.5rem) 0.5rem no-repeat;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
}
```
```json [snippet-meta]
{
    "type": "css",
    "id": "custom-all-highlights-fix-complete",
    "name": "优化所有高亮背景 (bg1-13) - 完整版"
}
```
:::

**注意**: 上述 CSS 代码已是完整版本。由于 CSS 本身不直接支持在选择器或属性值中通过变量来动态构造数字序列（例如，无法简单地用一个循环生成 `backgroundN` 和 `var(--b3-font-backgroundN)`），因此需要手动（或通过预处理器）生成这13组样式规则。

## 原理详解

本片段的核心渲染技术与 [优化单个 background1 高亮的原理](./fix-background1-highlight.md#原理详解) 完全相同。主要区别在于选择器的应用范围和颜色变量的替换。

1.  **选择器**: 为确保每种高亮背景 (`background1` 至 `background13`) 都能被正确处理，需要为它们分别定义 CSS 选择器，例如：
    *   `... span[style*='background1']`
    *   `... span[style*='background2']`
    *   ...
    *   `... span[style*='background13']`

2.  **颜色变量**: 在每个对应的样式规则块中，用于绘制背景的颜色变量也必须从 `var(--b3-font-background1)` 替换为该规则所针对的特定背景编号对应的变量，如 `var(--b3-font-background2)`，以此类推。

3.  **样式复用**: 核心的 `background-color: transparent !important;`，三层 `background` 图像的绘制逻辑，以及 `box-decoration-break: clone;` 属性对于每一条规则都是相同的，只是其中的颜色变量需要改变。

由于 CSS 本身不直接支持在选择器或属性值中通过变量来动态构造数字序列（例如，无法简单地用一个循环生成 `backgroundN` 和 `var(--b3-font-backgroundN)`），因此需要手动（或通过预处理器）生成这13组样式规则。

## 适用场景与注意事项

同 [优化单个 background1 高亮的适用场景与注意事项](./fix-background1-highlight.md#适用场景与注意事项)。此完整版片段旨在提供一个全局的、一致的高亮背景美化方案。

**重要提示**: 包含全部13条规则的完整 CSS 片段会比较长。在实际应用时，请确保代码的准确复制和修改。 