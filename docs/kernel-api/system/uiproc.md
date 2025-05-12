---
title: 注册 UI 进程 (addUIProcess)
---
# 端点

/api/system/uiproc

## 接口描述

此 API 端点 `POST /api/system/uiproc` 用于向内核注册一个 UI 进程的 ID (PID)。

这通常由思源笔记的前端 UI 进程在启动或特定操作时调用，以便内核能够追踪活跃的 UI 实例。内核会将接收到的 PID 存储在一个全局的映射中 (`util.UIProcessIDs`)。

## 请求参数

此接口通过 URL query 参数接收数据，没有请求体。

-   **`pid`** (string, URL query, 必需): 要注册的 UI 进程的唯一标识符。

**请求示例:**

```text
POST /api/system/uiproc?pid=unique-ui-process-id-12345
```

## 响应体

**成功响应 (HTTP 200 OK):**

此接口在成功处理请求后，通常返回一个 HTTP 200 OK 状态码，但 \*\*响应体为空\*\*。

```text
HTTP/1.1 200 OK
(空响应体)
```

**失败响应:**

由于此接口逻辑非常简单 (仅从 query 中读取参数并存储)，通常不会因为参数格式错误而返回特定的 JSON 错误。如果请求未能被正确路由或服务器内部发生意外错误，可能会返回标准的 HTTP 错误状态码 (如 404 Not Found, 500 Internal Server Error)。

## 认证与授权

调用此 API 端点 \*\*不需要认证\*\*。

## 备注

-   此接口主要用于思源笔记内部机制，用于追踪活跃的 UI 进程。
-   重复使用相同的 `pid` 调用此接口会覆盖之前的值 (因为底层存储是 `sync.Map`)。
-   此接口不返回任何业务数据。

> 感谢您对思源笔记的关注与支持！
> 
> [在爱发电上赞助我们](https://afdian.com/a/leolee9086?tab=feed)

© 2024-2025 [思源笔记 B3log.org](https://b3log.org/siyuan). All rights reserved.
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
