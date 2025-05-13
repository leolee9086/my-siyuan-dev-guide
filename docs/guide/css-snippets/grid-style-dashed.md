# CSS 片段：文档块虚线格子背景

此代码片段为思源笔记中的文档块提供一种虚线格子背景效果。通过为文档块设置自定义属性 `custom-background-style="grid-dashed"`，即可应用此样式。

## 代码片段

::: code-group
```css [虚线格子背景 (grid-dashed)]
/* 针对具有 custom-background-style="grid-dashed" 属性的文档块 */
.protyle-wysiwyg[custom-background-style="grid-dashed"] {
    background-color: #ffffff !important;
    background-image:
        linear-gradient(to right, rgba(180, 180, 180, 0.6) 50%, transparent 50%), /* 水平虚线 */
        linear-gradient(to bottom, rgba(180, 180, 180, 0.6) 50%, transparent 50%); /* 垂直虚线 */
    background-size: 16px 2px, 2px 16px !important; /* 水平线尺寸(长度*2, 高度), 垂直线尺寸(宽度, 高度*2) */
    background-repeat: repeat-x, repeat-y !important;
    /* 可选： border: 1px solid #e0e0e0 !important; */
}
```
```json [snippet-meta]
{
    "type": "css",
    "id": "doc-block-grid-dashed",
    "name": "文档块虚线格子背景 (grid-dashed)"
}
```
:::

## 原理与使用

*   **自定义属性**: 在思源笔记中，选中目标文档块，为其添加自定义属性 `custom-background-style`，并设置值为 `grid-dashed`。
*   **CSS 实现**:
    *   `background-color: #ffffff !important;`: 设置白色背景板。
    *   `linear-gradient(...)`: 使用两层线性渐变分别绘制水平和垂直的虚线段。
        *   第一层渐变配合 `background-size: 16px 2px` 和 `repeat-x` 绘制水平虚线 (每段长8px，高2px，间距8px)。
        *   第二层渐变配合 `background-size: 2px 16px` 和 `repeat-y` 绘制垂直虚线 (每段高8px，宽2px，间距8px)。

您可以根据需要调整 `background-size` 中的值来改变虚线的长度、粗细和间距，或修改颜色与透明度。 