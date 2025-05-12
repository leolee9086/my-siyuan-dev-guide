---
title: 推送错误消息 (pushErrMsg)
---
# 端点

/api/notification/pushErrMsg

# 推送错误消息 (pushErrMsg)

[首页](../index.html) | [Notification API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/notification.go#L58)

## 功能描述

此 API 端点 `POST /api/notification/pushErrMsg` 用于向思源笔记界面推送一条错误类型的通知消息。

这通常用于插件或外部应用需要向用户报告错误状态时使用，消息会以特定的错误样式（例如红色背景）显示。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `msg` (string): 必填，要推送的错误消息内容。
-   `timeout` (number): 可选，消息显示的超时时间（毫秒），默认为 7000ms (7秒)。

```json
{
  "msg": "无法连接到服务器，请检查网络连接。",
  "timeout": 10000 
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，格式如下：

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "unique-message-id" // 返回推送消息的唯一 ID
  }
}
```

-   `code`: 0 表示成功，非 0 表示失败。
-   `msg`: 错误信息（如果 code 非 0）。
-   `data.id`: 推送消息的唯一标识符。

**注意:** 消息是通过 WebSocket 广播给所有连接的界面的。

## 在线测试

您可以在下方输入请求参数进行在线测试。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
