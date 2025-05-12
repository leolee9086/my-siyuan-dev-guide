---
title: 执行启动时同步
---
# 端点

/api/sync/performBootSync

# 执行启动时同步

**API Endpoint:** `POST /api/sync/performBootSync`

**认证:** 需要登录 (`model.CheckAuth`)、管理员权限 (`model.CheckAdminRole`) 且非只读模式 (`model.CheckReadonly`)。

## 功能描述

此 API 用于触发一次"启动时同步"（Boot Sync）。这通常意味着从配置的云端存储服务拉取（下载）整个数据仓库，用于初始化或恢复数据。该操作会调用核心的 `model.BootSyncData()` 函数。

与 `/api/sync/getBootSync` 类似，实际的同步过程是异步的，此 API 调用会相对较快返回。其最终的同步状态和结果需要通过 WebSocket 事件 (如 `syncing`) 或后续调用 `/api/sync/getSyncInfo` 来确认。

API 会尝试返回一个即时状态码，该状态码来源于全局变量 `model.BootSyncSucc`，此变量由 `model.BootSyncData()` 函数在执行过程中更新。

## 请求

此接口为 POST 请求，但不需要请求体。发送一个空的 JSON 对象 `{}` 或无内容的 POST 请求即可。

## 响应

服务器返回 HTTP 状态码 `200` 和一个 JSON 对象：

```json
{
    "code": -1, // 或 0, 或 1
    "msg": "",
    "data": null
}
```

-   `code` (number): 表示尝试触发启动同步后的一个即时状态。
    
    -   `-1`: 初始状态，可能表示 `model.BootSyncData` 尚未执行完成或其状态未被此 API 调用及时捕获。
    -   `0`: 表示 `model.BootSyncData` 内部逻辑在某次执行后将全局状态标记为"成功完成"。
    -   `1`: 表示 `model.BootSyncData` 内部逻辑在某次执行后将全局状态标记为"失败"。
    
    **注意:** 由于同步的异步特性，此 `code` 仅为触发后的即时指示，不代表同步操作已最终完成。实际结果需异步追踪。
    
-   `msg` (string): 通常为空。如果 `model.BootSyncData` 内部遇到并设置了特定错误信息，可能会在此反映，但这不常见。
-   `data` (object): 始终为 `null`。

## 与 `/api/sync/getBootSync` 的对比

-   `/api/sync/getBootSync`: 接收 `app` 参数，明确通过 goroutine (`go model.BootSyncData()`) 异步启动同步，总是返回 `data: null`，不提供即时状态码。
-   `/api/sync/performBootSync`: 不接收参数，直接调用 `model.BootSyncData()`，并尝试返回 `model.BootSyncSucc` 的当前值作为 `code`。

两者都用于触发相同的核心启动同步逻辑 (`model.BootSyncData`)。

## 在线测试
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
