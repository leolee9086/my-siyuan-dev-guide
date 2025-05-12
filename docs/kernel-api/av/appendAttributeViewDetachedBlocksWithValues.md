---
title: 添加游离块并带值到属性视图
---
# 端点

/api/av/appendAttributeViewDetachedBlocksWithValues

# 添加游离块并带值到属性视图

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/av.go "查看源文件")

需要认证

## 接口描述

创建新的游离块（独立块），并将其添加到指定的属性视图中，同时为这些新块设置属性值。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| avID | string | 是 | 属性视图 ID。 |
| rowValues | object\[\] | 是 | 行数据列表，每一行包含要设置的属性键值对。 |
| rowValues\[\].cellValues | object\[\] | 是 | 单元格数据列表，每个对象包含 \`keyID\` 和 \`value\`。 |
| rowValues\[\].cellValues\[\].keyID | string | 是 | 属性列 (Key) 的 ID。 |
| rowValues\[\].cellValues\[\].value | any | 是 | 要设置的值 (类型取决于列类型)。 |

## 返回值

返回操作结果，包含新创建的块 ID。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 操作结果。 |
| data.blockIDs | string\[\] | 新创建的游离块的 ID 列表。 |

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
