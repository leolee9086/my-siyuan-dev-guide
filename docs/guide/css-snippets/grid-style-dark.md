# CSS 片段：文档块深色亮线格子背景

此代码片段为思源笔记中的文档块提供一种深色背景配浅色亮线条的格子效果，适合在深色主题下使用。通过为文档块设置自定义属性 `custom-background-style="grid-dark"`，即可应用此样式。

## 代码片段

::: code-group
```css [深色亮线格子背景 (grid-dark)]
/* 针对具有 custom-background-style="grid-dark" 属性的文档块 */
.protyle-wysiwyg[custom-background-style="grid-dark"] {
    background-color: #333333 !important; /* 深灰色背景 */
    background-image:
        linear-gradient(to right, rgba(200, 200, 200, 0.25) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(200, 200, 200, 0.25) 1px, transparent 1px);
    background-size: 25px 25px !important; /* 格子大小 */
    /* 可选： border: 1px solid #555555 !important; */ 
}
```
```json [snippet-meta]
{
    "type": "css",
    "id": "doc-block-grid-dark",
    "name": "文档块深色亮线格子背景 (grid-dark)"
}
```
:::

## 原理与使用

*   **自定义属性**: 在思源笔记中，选中目标文档块，为其添加自定义属性 `custom-background-style`，并设置值为 `grid-dark`。
*   **CSS 实现**:
    *   `background-color: #333333 !important;`: 设置深色背景板。
    *   `linear-gradient(...)`: 使用两层线性渐变绘制半透明的浅色（亮色）线条。
    *   `background-size: 25px 25px !important;`: 定义格子的大小。

您可以根据需要调整背景颜色、线条颜色、透明度以及格子大小，以完美匹配您的深色主题。 