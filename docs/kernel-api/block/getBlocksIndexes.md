---
title: 批量获取块索引
---
# 端点

/api/block/getBlocksIndexes

[← 返回 Block API 列表](../pages/block.html)

# 批量获取块索引

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block.go#L475)

`POST /api/block/getBlocksIndexes`

## 描述

批量获取一组块 ID 在其各自父块下的位置索引（从 0 开始）。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `ids` | `[string]` | 要获取索引的块 ID 数组。 | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 是一个对象，键是块 ID，值是对应的索引（number）。如果某个块 ID 无效或找不到，则不会包含在结果中。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "20230101120000-block1": 0,
    "20230101120000-block2": 1,
    "20230101120000-block3": 2
    // ... 其他块 ID 和对应的索引
  }
}
```

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

思源笔记 API 文档
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
