---
title: 'API: /api/sync/setSyncMode'
---
# 端点

/api/sync/setSyncMode

# API: /api/sync/setSyncMode

**HTTP Method:** POST

**认证:** 需要登录 (`model.CheckAuth`), 管理员权限 (`model.CheckAdminRole`), 非只读模式 (`model.CheckReadonly`)

## 功能描述

设置数据同步的操作模式。不同的模式决定了数据上传和下载的行为。

## 请求参数 (JSON Body)

| 参数名 | 类型 | 是否必需 | 描述 |
| --- | --- | --- | --- |
| `mode` | number | 是 | 同步模式的值:
-   `1`: 自动双向同步。本地和云端的更改会自动同步。
-   `2`: 手动同步。需要用户手动触发同步操作，通常为双向同步。
-   `3`: 完全手动同步。可能提供更细致的上传/下载控制，具体行为依赖客户端实现。
-   (注：`0` 为内部未设置状态，通常会被初始化为 `1`)

 |

### 请求示例 (设置为自动同步)

```json
{
    "mode": 1
}
```

### 请求示例 (设置为手动同步)

```json
{
    "mode": 2
}
```

## 响应

成功时，HTTP 状态码为 200，响应体中的 `code` 为 0，`msg` 为空，`data` 为 `null`。

### 响应示例 (成功)

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

## 在线测试

同步模式 (`mode`): 自动 (1) 手动 (2) 完全手动 (3) 发送请求

### 响应:

等待请求...
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
