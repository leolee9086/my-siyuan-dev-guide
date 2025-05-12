---
title: 'API: /api/sync/setSyncInterval'
---
# 端点

/api/sync/setSyncInterval

# API: /api/sync/setSyncInterval

**HTTP Method:** POST

**认证:** 需要登录 (`model.CheckAuth`)

## 功能描述

设置自动数据同步的时间间隔（单位：分钟）。

如果设置为 `0`，则表示禁用自动同步。自动同步仅在同步功能启用时（参见 `/api/sync/setSyncEnable`）且设置了有效的同步服务提供商时才会执行。

## 请求参数 (JSON Body)

| 参数名 | 类型 | 是否必需 | 描述 |
| --- | --- | --- | --- |
| `interval` | number | 是 | 自动同步的时间间隔，单位为分钟。例如，`30` 表示每 30 分钟自动同步一次。设置为 `0` 可禁用自动同步。 |

### 请求示例 (设置每60分钟同步一次)

```json
{
    "interval": 60
}
```

### 请求示例 (禁用自动同步)

```json
{
    "interval": 0
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

同步间隔 (分钟) (`interval`):  发送请求

### 响应:

等待请求...
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
