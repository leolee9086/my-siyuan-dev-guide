---
title: WebSocket 广播订阅 (/ws/broadcast)
---

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# WebSocket 广播订阅

## 端点

`GET /ws/broadcast?channel={channel-name}`

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/broadcast.go#L377 "查看 broadcast 函数的源码实现")

## 接口描述

此端点用于将当前的 HTTP 连接升级为 WebSocket 连接，并订阅指定名称 (`channel-name`) 的广播频道。

连接成功后，客户端将通过此 WebSocket 接收该频道发布的所有消息。

思源笔记内部使用广播机制来同步状态、推送通知等。第三方应用可以利用此接口来监听思源内部事件。

## 认证与授权

此接口需要满足以下条件才能访问:

1.  **用户认证** (`model.CheckAuth`): 需要有效的用户认证,并通过 `Authorization` HTTP 头部传递 API Token。
2.  **管理员权限** (`model.CheckAdminRole`): 需要管理员权限。

## 请求方法

`GET` (用于发起 WebSocket 升级请求)

## 请求参数

| 参数名 | 位置 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- | --- |
| `channel` | 查询参数 (Query) | string | 是 | 要订阅的广播频道名称。 |
| `Authorization` | HTTP Header | string | 是 | API 访问令牌，格式为 `Token your-token`。 |

(其他标准的 WebSocket 升级请求头，如 `Connection: Upgrade`, `Upgrade: websocket` 等，由客户端库自动处理)

## 消息格式

一旦 WebSocket 连接建立，服务器将推送消息。消息的具体格式取决于发布者。通常是 JSON 字符串。

## 示例 (JavaScript)

以下示例展示了如何在浏览器环境中使用 JavaScript 连接到 `wsjs` 频道：

```javascript
const channelName = 'wsjs'; // 要订阅的频道名
const token = 'your-api-token'; // 你的 API Token

// 构建 WebSocket URL，包含 channel 参数
// 注意：需要将 http/https 替换为 ws/wss
const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const wsURL = `${wsProtocol}//${window.location.host}/ws/broadcast?channel=${channelName}`;

// 创建 WebSocket 连接，并在请求头中添加 Authorization
// 注意：标准 WebSocket API 不直接支持设置自定义 Header，
// 通常需要通过子协议或其他方式传递 Token，或者依赖 Cookie/Session认证。
// 如果直接连接内核 API (非浏览器环境)，可以在请求头发起时添加。
// 在浏览器环境中，更常见的是通过 /api/auth/check?token={token} 验证后再连接
// 或者依赖浏览器已有的认证信息（如果API服务器支持）。
// 这里假设认证已通过其他方式完成。

let ws = null;
try {
  // 尝试创建 WebSocket 连接
  ws = new WebSocket(wsURL);

  ws.onopen = (event) => {
    console.log(`WebSocket connection opened for channel: ${channelName}`);
    // 连接成功后可以发送消息或进行其他操作
    // ws.send('Hello Server!'); 
  };

  ws.onmessage = (event) => {
    console.log('Message from server: ', event.data);
    // 在这里处理接收到的广播消息
    try {
      const messageData = JSON.parse(event.data);
      // 处理解析后的 JSON 数据
      console.log('Parsed message data:', messageData);
    } catch (e) {
      // 如果消息不是 JSON，直接处理原始数据
      console.log('Received non-JSON message.');
    }
  };

  ws.onerror = (error) => {
    console.error('WebSocket Error: ', error);
  };

  ws.onclose = (event) => {
    console.log(`WebSocket connection closed for channel: ${channelName}. Code: ${event.code}, Reason: ${event.reason}`);
    if (event.wasClean) {
      console.log('Connection closed cleanly.');
    } else {
      // 例如服务器进程被杀死或网络中断
      console.error('Connection died uncleanly.');
    }
  };

} catch (error) {
  console.error('Failed to create WebSocket:', error);
}

// 关闭连接 (如果需要)
// if (ws) {
//   ws.close();
// }
```

## 备注

*   这是一个 WebSocket 接口，用于实时接收消息，而不是一次性的请求/响应。
*   客户端需要处理 WebSocket 的生命周期事件（打开、消息、错误、关闭）。
*   思源笔记可能定义了多种广播频道，用于不同的目的。常见的频道包括 `wsjs` (用于前端 JS 交互), `sync` (同步相关) 等。具体可用频道可能需要参考其他文档或通过 `/api/broadcast/getChannels` 获取。
*   如果连接断开，客户端需要实现重连逻辑。
*   由于浏览器环境限制，直接在 WebSocket 请求中添加 `Authorization` 头比较困难。实际应用中可能需要先通过 HTTP API 进行认证，然后建立 WebSocket 连接，或者依赖 Cookie/Session。
