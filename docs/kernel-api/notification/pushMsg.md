---
title: 推送消息
---
# 端点

/api/notification/pushMsg

[← 返回 Notification API 列表](../pages/notification.html)

# 推送消息

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/notification.go#L25)

`POST /api/notification/pushMsg`

## 描述

向思源笔记界面推送一条通知消息。该 API 会在界面顶部显示一个通知提示，可用于程序间通信或向用户显示重要信息。消息会在指定的超时时间后自动消失。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `msg` | `string` | 要显示的消息内容 | 是 |
| `timeout` | `number` | 消息显示时间（毫秒），默认为 7000 毫秒 | 否 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 包含消息 ID，可用于后续操作。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "abcdefg"  // 消息的唯一标识符（7位随机字符串）
  }
}
```

## 补充说明

消息推送机制会通过 WebSocket 广播给所有已连接的主界面，确保在多窗口环境下都能看到通知。

返回的消息 ID 可以用于后续调用 `/api/notification/pushClearMsg` API 来清除特定消息。

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
