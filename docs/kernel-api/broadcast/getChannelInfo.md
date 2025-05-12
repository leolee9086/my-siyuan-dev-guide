---
title: 获取广播频道信息
---
# 端点

/api/broadcast/getChannelInfo

[← 返回 Broadcast API 列表](../pages/broadcast.html)

# 获取广播频道信息

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/broadcast.go#L173)

`POST /api/broadcast/getChannelInfo`

## 描述

获取指定名称的广播频道的信息，主要是频道的名称和当前连接到该频道的 WebSocket 会话数量。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `name` | `string` | 要查询的广播频道名称。 | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功，非 0 表示失败（例如频道不存在）。`data` 包含频道信息。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "channel": {
      "name": "my-channel", // 频道名称
      "count": 2          // 当前连接数
    }
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
