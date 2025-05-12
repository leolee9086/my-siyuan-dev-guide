---
title: 添加属性视图列 (Key)
---
# 端点

/api/av/addAttributeViewKey

# 添加属性视图列 (Key)

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/av.go "查看源文件")

需要认证

## 接口描述

向指定的属性视图（数据库）中添加一个新的列（Key）。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| avID | string | 是 | 属性视图 ID。 |
| key | object | 是 | 要添加的列信息 (结构见下)。 |
| key.name | string | 是 | 列的名称。 |
| key.type | string | 是 | 列的类型 (例如: 'text', 'number', 'select', 'multiSelect', 'date', 'url', 'email', 'phone', 'checkbox', 'relation', 'rollup')。 |
| key.icon | string | 否 | 列的图标 (emoji)。 |
| key.options | object\[\] | 否 | （仅限 select/multiSelect 类型）选项列表，每个选项包含 \`name\`, \`color\`。 |

## 返回值

返回新创建的列的信息。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 新创建的列信息。 |
| data.id | string | 新列的 ID。 |
| data.name | string | 列的名称。 |
| data.type | string | 列的类型。 |

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
