# CSS 片段：文档块点状格子背景

此代码片段为思源笔记中的文档块提供一种点状格子背景效果。通过为文档块设置自定义属性 `custom-background-style="grid-dotted"`，即可应用此样式。

## 代码片段

::: code-group
```css [点状格子背景 (grid-dotted)]
/* 针对具有 custom-background-style="grid-dotted" 属性的文档块 */
.protyle-wysiwyg[custom-background-style="grid-dotted"] {
    background-color: #ffffff !important;
    background-image:
        radial-gradient(circle at 1px 1px, rgba(204, 204, 204, 0.7) 1px, transparent 0); /* 使用径向渐变创建点 */
    background-size: 15px 15px !important; /* 点的间距 (格子大小) */
    /* 可选： border: 1px solid #e0e0e0 !important; */
}
```
```json [snippet-meta]
{
    "type": "css",
    "id": "doc-block-grid-dotted",
    "name": "文档块点状格子背景 (grid-dotted)"
}
```
:::

## 原理与使用

*   **自定义属性**: 在思源笔记中，选中目标文档块，为其添加自定义属性 `custom-background-style`，并设置值为 `grid-dotted`。
*   **CSS 实现**:
    *   `background-color: #ffffff !important;`: 设置白色背景板。
    *   `radial-gradient(...)`: 使用径向渐变在每个重复单元的左上角绘制一个半透明的灰色小圆点。
    *   `background-size: 15px 15px !important;`: 定义了点与点之间的间距，即格子的大小。

您可以根据需要调整 `background-size` 来改变格子密度，或修改 `radial-gradient` 中的颜色和点的大小。 