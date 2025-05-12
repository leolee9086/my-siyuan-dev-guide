---
title: 向广播频道发送消息
---
# 端点

/api/broadcast/postMessage

[← 返回 Broadcast API 列表](../pages/broadcast.html)

# 向广播频道发送消息

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/broadcast.go#L128)

`POST /api/broadcast/postMessage`

## 描述

向指定的广播频道发送一条字符串消息。所有连接到该频道的 WebSocket 客户端都会收到这条消息。

广播频道通常用于插件或不同进程间的实时通信。

要接收消息，客户端需要通过 WebSocket 连接到 `ws://<ip>:<port>/ws/broadcast?channel=<channelName>`。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `channel` | `string` | 目标广播频道名称。 | 是 |
| `message` | `string` | 要发送的消息内容（字符串）。 | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功，非 0 表示失败（例如频道不存在或发送失败）。`data` 包含成功发送消息的频道信息和接收到的客户端数量。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "channel": {
      "name": "my-channel",
      "count": 2 // 消息成功发送给 2 个连接
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
