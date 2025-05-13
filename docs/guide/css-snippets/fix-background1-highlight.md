# CSS 片段：优化 background1 高亮背景的断裂与圆角效果

当在思源笔记中使用特定颜色变量（如 `--b3-font-background1`）对文本进行背景高亮时，尤其是在文本跨行显示的情况下，标准的背景渲染方式有时可能导致视觉上的断裂感，或者圆角效果不尽如人意。此 CSS 代码片段旨在通过精细的背景层叠技术和 `box-decoration-break` 属性，提供一个更平滑、更具包裹感的背景高亮效果。

## 代码片段

::: code-group
```css [优化 background1 高亮]
.protyle-wysiwyg [data-node-id] [spellcheck] span[style*='background1'] {
    background-color: transparent !important;
    background:
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background1) 50%, transparent 51%) left bottom / 0.5rem 0.5rem no-repeat,
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background1) 50%, transparent 51%) right bottom / 0.5rem 0.5rem no-repeat,
    linear-gradient(var(--b3-font-background1), var(--b3-font-background1)) center bottom / calc(100% - 0.5rem) 0.5rem no-repeat;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
}
```
```json [snippet-meta]
{
    "type": "css",
    "id": "custom-background1-highlight-fix",
    "name": "优化 background1 高亮背景"
}
```
:::

## 原理详解

### 1. CSS 选择器

```css
.protyle-wysiwyg [data-node-id] [spellcheck] span[style*='background1']
```

*   `.protyle-wysiwyg`: 目标锁定在思源笔记的"所见即所得"编辑区域。
*   `[data-node-id]`: 进一步将范围缩小到编辑区域内具有 `data-node-id` 属性的元素，通常这些是内容块或其子元素。
*   `[spellcheck]`: 再限定于启用了浏览器拼写检查的元素。这可能是为了更精确地定位到可编辑的文本内容区域，或者是利用一个常见的属性来增加选择器的特异性。
*   `span[style*='background1']`: 这是最核心的目标选择，它选中了所有 `style` 内联样式中包含 `background1` 字符串的 `<span>` 元素。在思源中，这通常意味着这些 `<span>` 元素被用户或主题设置了与颜色变量 `--b3-font-background1` 相关的背景高亮。

### 2. 样式属性解析

#### a. 清除原始背景色

```css
background-color: transparent !important;
```
首先，将目标 `<span>` 元素的原有 `background-color` 强制设置为透明。使用 `!important` 是为了确保这条规则能覆盖掉其他可能存在的、由思源自身或主题定义的背景色。这样做是为了给后续通过 `background` 属性精细绘制的多层背景腾出"画布"。

#### b. 多层背景绘制 (Multiple Backgrounds)

```css
background:
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background1) 50%, transparent 51%) left bottom / 0.5rem 0.5rem no-repeat,
    radial-gradient(circle at 0.25rem 50%, var(--b3-font-background1) 50%, transparent 51%) right bottom / 0.5rem 0.5rem no-repeat,
    linear-gradient(var(--b3-font-background1), var(--b3-font-background1)) center bottom / calc(100% - 0.5rem) 0.5rem no-repeat;
```
这里利用了 CSS 的多背景特性，通过逗号分隔定义了三个独立的背景层。这些背景层会按照定义的顺序从上到下（即第一个定义的在最前面）堆叠渲染。

*   **第一层 (左下角圆角)**:
    *   `radial-gradient(circle at 0.25rem 50%, var(--b3-font-background1) 50%, transparent 51%)`: 创建一个径向渐变。
        *   `circle at 0.25rem 50%`: 渐变形状为圆形，圆心位于从元素左边缘 `0.25rem`、垂直方向 `50%` (即居中) 的位置。
        *   `var(--b3-font-background1) 50%, transparent 51%`: 从圆心到半径的 50% 的区域填充为 `--b3-font-background1` 颜色，从半径的 51% 到渐变边缘则为透明。
    *   `left bottom`: 将此渐变图像定位在元素的左下角。
    *   `/ 0.5rem 0.5rem`: 定义背景图像的尺寸为 `0.5rem` 宽、`0.5rem` 高。
    *   `no-repeat`: 背景图像不平铺。
    *   效果：由于圆心（半径 `0.25rem`）在元素的边缘，而背景图尺寸是 `0.5rem x 0.5rem`（即直径为 `0.5rem`），这会在元素的左下角绘制出一个四分之一的、使用 `--b3-font-background1` 颜色的圆角。

*   **第二层 (右下角圆角)**:
    *   与第一层逻辑相同，但通过 `right bottom` 定位，从而在元素的右下角绘制出对称的四分之一圆角。

*   **第三层 (底部矩形填充)**:
    *   `linear-gradient(var(--b3-font-background1), var(--b3-font-background1))`: 创建一个由 `--b3-font-background1` 纯色填充的线性渐变（从A色到A色即为纯色）。
    *   `center bottom`: 将此纯色块定位在元素的底部中心。
    *   `/ calc(100% - 0.5rem) 0.5rem`: 定义背景图像的尺寸。
        *   宽度为 `calc(100% - 0.5rem)`: 元素总宽度减去 `0.5rem`。这 `0.5rem` 正好是左右两个圆角区域的宽度总和 (每个圆角的有效半径是 `0.25rem`)，确保中间的矩形条不会覆盖两侧的圆角。
        *   高度为 `0.5rem`: 与圆角区域的高度保持一致。
    *   `no-repeat`: 背景图像不平铺。
    *   效果：在左右两个圆角之间，绘制了一条高度为 `0.5rem` 的纯色矩形背景条。

**组合效果**：这三层背景巧妙地组合在一起，形成了一个底部平滑、两端带有 `0.25rem` 圆角的背景高亮区域，颜色为 `--b3-font-background1`。

#### c. 处理跨行显示

```css
-webkit-box-decoration-break: clone;
box-decoration-break: clone;
```
这两个属性 (带 `-webkit-` 前缀的是为了兼容旧版 WebKit 内核浏览器) 是实现跨行背景无缝效果的关键。

*   `box-decoration-break` 属性定义了当一个内联元素 (如 `<span>`) 的内容横跨多行时，其边框（`border`）、内边距（`padding`）、背景（`background`）、阴影（`box-shadow`）等装饰性属性如何在行尾和行首处被"打断"和"延续"。
*   默认值是 `slice`，这意味着元素的装饰就像一个完整的盒子被渲染后，再按行切割开，每行只显示盒子的一部分。对于背景而言，这意味着只有第一行的顶部和最后一行的底部会显示完整的边缘（比如圆角）。
*   `clone` 值则使得每一行都被视为一个独立的片段进行装饰。也就是说，元素的背景、边框等会在每一行的开头和结尾都得到应用。对于此 CSS 片段而言，设置了 `clone` 后，每一行高亮文本的底部都会尝试绘制我们定义的那套圆角和填充背景，从而使得即使文本换行，高亮背景的底部圆角和线条也能在每一行都保持一致和连贯。

### 3. 整体效果总结

此 CSS 片段首先清除了目标 `<span>` 元素可能存在的原始背景色，然后利用三层精心设计的背景图像（两个径向渐变构造左右下角圆角，一个线性渐变填充中间底部矩形）绘制出一个具有自定义圆角和平滑底边的背景。最后，通过 `box-decoration-break: clone;` 确保了当高亮文本跨越多行时，这种精美的背景效果能够在每一行都得到完整且连续的展现，避免了背景断裂或圆角丢失的问题。

## 适用场景与注意事项

*   此片段主要针对使用了思源笔记特定颜色变量 `--b3-font-background1` 进行文字背景高亮的场景。如果你的高亮样式未使用此变量，或使用了其他方式实现，则此片段可能不适用或需要修改选择器。
*   CSS 片段的有效性依赖于思源笔记当前的 DOM 结构。若未来思源版本对编辑器区域的 DOM 结构进行了较大调整，此片段中的选择器可能需要更新。
*   你可以根据自己的喜好调整代码中的 `0.25rem` 和 `0.5rem` 值来改变圆角的大小和背景条的高度。 