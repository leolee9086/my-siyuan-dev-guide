---
title: 获取块面包屑 (`/api/block/getBlockBreadcrumb`)
---
# 端点

/api/block/getBlockBreadcrumb

## 接口描述

获取指定块 ID 的面包屑路径信息，即从其根节点（通常是文档）到该块自身的路径节点列表。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 需要获取面包屑的块 ID。 |
| excludeTypes | string\[\] | 否 | 一个字符串数组，指定在面包屑路径中需要排除的块类型。例如，传入 \`\["d"\]\` 可以排除文档块节点。常见的类型缩写包括：
-   `d`: 文档 (Document)
-   `h`: 标题 (Heading)
-   `l`: 列表 (List)
-   `i`: 列表项 (ListItem)
-   `p`: 段落 (Paragraph)
-   `b`: 引述 (Blockquote)
-   `t`: 表格 (Table)
-   `c`: 代码块 (CodeBlock)
-   `m`: 数学公式块 (MathBlock)
-   `s`: 超级块 (SuperBlock)
-   `html`: HTML 块
-   `av`: 属性视图 (AttributeView)

注意：此处的类型是内部类型表示，可能与前端显示或 \`type\` 字段的完整名称（如 \`NodeDocument\`）不同。 |

## 返回值

返回一个标准的 API 响应 JSON 对象。

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | `0` 表示成功，非 `0` 表示失败。 |
| msg | string | 如果失败，则包含错误信息。 |
| data | BlockPath\[\] | null | 一个对象数组 (`BlockPath[]`)，按从根节点到目标节点的顺序排列。如果找不到块或发生错误，可能为 `null` 或空数组 `[]`。  
`BlockPath` 对象结构如下:
| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| id | string | 路径节点的块 ID。 |
| name | string | 路径节点的名称。通常是文档标题、标题内容或块的主要文本内容的缩略（经过 HTML 转义）。文档块的 name 可能是 "笔记本名/文档路径"。 |
| type | string | 路径节点的块类型 (例如 "NodeDocument", "NodeHeading", "NodeParagraph", "NodeListItem" 等)。 |
| subType | string | 路径节点的块子类型 (例如 "h1"-"h6" 对于标题, "task" 对于任务列表项)。 |
| children | array | 子路径数组 (在此 API 中通常为空数组 `[]`)。 |

 |
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
