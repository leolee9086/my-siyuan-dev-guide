---
title: 触发启动时同步
---
# 端点

/api/sync/getBootSync

# 触发启动时同步

**API Endpoint:** `POST /api/sync/getBootSync`

**认证:** 需要登录 (`model.CheckAuth`)。

## 功能描述

此 API 用于异步触发一次"启动时同步"（或称为"引导同步"）。该操作会尝试从当前配置的云端同步服务下载初始的数据仓库状态 (`.siyuan/repo`)。这通常在首次设置同步、更换云端同步目标，或者需要从云端完整恢复数据仓库时使用。

**重要提示:**

-   这是一个异步操作。API 调用成功仅表示同步任务已在后台启动，并不代表同步已完成或成功。
-   实际的同步进度、结果或可能发生的错误，需要通过监听相关的 WebSocket 事件来追踪 (例如 `syncProgress`, `syncDone`, `syncFail` 等事件，具体事件名需参考实际实现)。
-   在调用此接口前，请确保已正确配置了同步服务 (通过 `/api/sync/setSyncProvider` 等接口)。

## 请求参数 (JSON Body)

| 参数名 | 类型 | 是否必需 | 描述 |
| --- | --- | --- | --- |
| `app` | string | 是 | 发起同步请求的客户端或应用程序的唯一标识符。此标识符可能用于后续的 WebSocket 通知，以便将同步状态反馈给正确的客户端。 |

请求示例:

```json
{
    "app": "siyuan-desktop-v2.10.0"
}
```

## 响应

成功启动同步任务后，服务器返回 HTTP 状态码 `200` 和一个 JSON 对象，结构如下：

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

-   `code` (number): `0` 表示同步任务已成功启动，其他值表示启动失败。
-   `msg` (string): 错误信息（如果 `code` 非 `0`）。
-   `data` (null): 此接口不返回具体数据，固定为 `null`。

## 在线测试
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
