# CSS 片段：利用自定义属性为文档块应用不同样式

思源笔记允许用户为内容块设置自定义属性。这些属性不仅可以用于组织和查询信息，还可以作为 CSS 钩子，让我们能够根据特定属性及其值来应用独特的样式。本文将通过一个示例，展示如何利用块的自定义属性（例如 `custom-background-style="grid"`）为整个文档块（通常是 `.protyle-wysiwyg` 容器）应用特殊的背景样式，比如基础的实线格子背景。

## 场景

假设我们想让某些文档块具有一种特殊的背景效果，比如像稿纸一样的格子背景，并且我们通过给这个文档块设置一个自定义属性 `custom-background-style` 为 `grid` 来标记它。

DOM 结构示例（假设已添加 `custom-background-style="grid"` 属性）：
```html
<div class="protyle-wysiwyg protyle-wysiwyg--attr" spellcheck="false" contenteditable="true" style="padding: 16px 96px 220px;" data-realwidth="1235" data-doc-type="NodeDocument" data-readonly="false" custom-background-style="grid">
    <!-- ... block content ... -->
</div>
```
我们的目标是编写 CSS，使其仅对具有 `custom-background-style="grid"` 属性的 `.protyle-wysiwyg` 块生效，并为其添加格子背景。

## 代码片段

::: code-group
```css [自定义文档块背景 (基础格子)]
/* 针对具有 custom-background-style="grid" 属性的文档块，应用格子背景 */
.protyle-wysiwyg[custom-background-style="grid"] {
    /* 首先设置一个基础背景色，例如白色，确保格子线条清晰可见 */
    background-color: #ffffff !important; 
    
    /* 使用两层线性渐变来绘制格子线条 */
    background-image:
        linear-gradient(to right, rgba(204, 204, 204, 0.5) 1px, transparent 1px), /* 垂直方向的浅灰色线条 */
        linear-gradient(to bottom, rgba(204, 204, 204, 0.5) 1px, transparent 1px); /* 水平方向的浅灰色线条 */
    
    /* 定义格子的大小 */
    background-size: 20px 20px !important; /* 每个格子 20px * 20px */
    
    /* 可选：如果需要，可以添加或调整边框来突出显示块区域 */
    /* border: 1px solid #e0e0e0 !important; */
}
```
```json [snippet-meta]
{
    "type": "css",
    "id": "custom-doc-block-style-grid",
    "name": "文档块自定义属性样式 (基础格子背景)"
}
```
:::

## 原理详解

### 1. CSS 选择器

```css
.protyle-wysiwyg[custom-background-style="grid"]
```

*   `.protyle-wysiwyg`: 这个类选择器首先定位到思源笔记中的主要内容编辑区域，即文档块的容器。
*   `[custom-background-style="grid"]`: 这是一个属性选择器。它会进一步筛选出那些同时具有 `custom-background-style` 属性，并且该属性的值恰好是 `grid` 的 `.protyle-wysiwyg` 元素。

通过这种组合，我们可以精确地将样式应用到那些被我们用特定自定义属性（这里是 `grid`）标记了的文档块上。

### 2. 样式属性解析

*   **`background-color: #ffffff !important;`**:
    *   设置一个坚实的背景颜色（这里是白色）。这很重要，因为我们的格子线条是半透明的，并且 `background-image` 会叠加在 `background-color` 之上。如果没有明确的背景色，透明区域可能会透出下层内容。

*   **`background-image: linear-gradient(...), linear-gradient(...);`**:
    *   这里使用了 CSS 的多背景特性，通过逗号分隔定义了两个独立的线性渐变背景层。
    *   **第一个渐变 `linear-gradient(to right, rgba(204, 204, 204, 0.5) 1px, transparent 1px)`**:
        *   `to right`: 渐变方向从左到右。
        *   `rgba(204, 204, 204, 0.5) 1px`: 从起点开始的 `1px` 宽度是半透明的浅灰色 (`#ccc` 50% 透明度)。
        *   `transparent 1px`: 从 `1px` 之后到渐变重复的下一个起点之前都是透明的。
        *   当这个渐变配合 `background-size` 的宽度（例如 `20px`）重复时，就会形成一系列垂直的、间距为 `20px`（减去 `1px` 线条本身）的细线。
    *   **第二个渐变 `linear-gradient(to bottom, rgba(204, 204, 204, 0.5) 1px, transparent 1px)`**:
        *   `to bottom`: 渐变方向从上到下。
        *   逻辑与垂直线条类似，但创建的是水平方向的细线。
    *   这两层渐变叠加在一起，就形成了格子图案。

*   **`background-size: 20px 20px !important;`**:
    *   这个属性定义了每一层背景图像的尺寸。在这里，它同时控制了垂直线条渐变和水平线条渐变的重复单元大小。
    *   `20px 20px` 表示每个背景图像单元（即每个格子）的宽度是 `20px`，高度也是 `20px`。因此，线条会每隔 `20px` 重复一次。
    *   `!important` 用于确保此尺寸设置能生效。

*   **可选边框 `/* border: 1px solid #e0e0e0 !important; */`**:
    *   如果需要，可以取消注释或修改此行，为应用了格子背景的文档块添加一个外边框，以更清晰地区分其范围。

### 3. 整体效果

通过上述 CSS，当一个文档块被赋予 `custom-background-style="grid"` 的自定义属性时，它的背景将呈现为一个由细密的浅灰色线条构成的 `20px × 20px` 的格子图案，底层为白色。

## 其他格子样式配置

除了上述基础的实线格子背景，这里还提供了一些其他风格的格子背景代码片段，它们作为独立的可安装片段提供：

*   **[CSS 片段：文档块点状格子背景](./grid-style-dotted.md)** - 使用点阵创建格子。
*   **[CSS 片段：文档块虚线格子背景](./grid-style-dashed.md)** - 使用虚线创建格子。
*   **[CSS 片段：文档块深色亮线格子背景](./grid-style-dark.md)** - 适用于深色主题的格子。

您可以根据需要选择并安装这些片段，并通过它们各自文档中说明的自定义属性值（如 `grid-dotted`, `grid-dashed`, `grid-dark`）来激活不同的格子样式。

## 如何在思源笔记中使用自定义属性

1.  选中你想要应用特殊样式的文档块。
2.  点击块菜单（通常是块左侧的 `···` 图标或通过快捷键）。
3.  选择 "属性" (Attributes)。
4.  在属性面板中，点击 "添加属性" (+)。
5.  输入属性名，例如 `custom-background-style`。
6.  输入属性值，例如 `grid`。
7.  保存属性。

一旦块拥有了这个自定义属性和值，并且上述 CSS 片段已在你的思源笔记中启用，该块就会自动应用这里定义的格子背景样式。

## 适用场景与注意事项

*   此方法适用于任何你想通过自定义块属性来区分并应用不同背景（或其他）样式的场景。你可以定义任意的属性名和属性值组合。
*   格子的大小（`background-size`）和线条颜色/粗细（`linear-gradient` 中的参数）都可以根据个人喜好进行调整。
*   如果格子线条颜色较深或不透明，可以省略 `background-color` 或将其设为 `transparent`，具体取决于期望效果。
*   CSS 片段的有效性依赖于思源笔记当前的 DOM 结构，特别是 `.protyle-wysiwyg` 作为文档块容器的稳定性。
*   `!important` 的使用是为了确保样式能够生效，但在复杂的样式覆盖场景中应谨慎使用。

## 注意事项

*   此方法适用于任何你想通过自定义块属性来区分并应用不同样式的场景。你可以定义任意的属性名和属性值。
*   CSS 片段的有效性依赖于思源笔记当前的 DOM 结构，特别是 `.protyle-wysiwyg` 作为文档块容器的稳定性。
*   `!important` 的使用是为了确保样式能够生效，但在复杂的样式覆盖场景中应谨慎使用，以免造成维护困难。
*   你可以根据自己的需求修改属性名 (`custom-background-style`)、属性值 (`grid`) 以及具体的 CSS 样式规则。 