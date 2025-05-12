---
title: 获取属性视图主键列值
---
# 端点

/api/av/getAttributeViewPrimaryKeyValues

# 获取属性视图主键列值

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/av.go#L101 "查看源文件")

需要认证

## 接口描述

获取指定属性视图（数据库）的主键列（通常是文本列）的值，支持分页和关键词搜索。常用于关系列选择关联块。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 属性视图 ID。 |
| page | number | 否 | 页码，从 1 开始，默认为 1。 |
| pageSize | number | 否 | 每页数量，默认为 -1 (不分页)。 |
| keyword | string | 否 | 搜索关键词，用于筛选主键列值。 |

## 返回值

返回包含主键列值的列表以及相关信息。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 返回数据。 |
| data.name | string | 属性视图的名称。 |
| data.blockIDs | string\[\] | 符合条件的块 ID 列表。 |
| data.rows | object\[\] | 行数据列表，每个对象包含块 ID (\`blockID\`) 和主键列的值 (\`value\`)。 |

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
