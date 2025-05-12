---
title: 'API: /api/sync/setSyncEnable'
---
# 端点

/api/sync/setSyncEnable

# API: /api/sync/setSyncEnable

**HTTP Method:** POST

**认证:** 需要登录 (`model.CheckAuth`), 管理员权限 (`model.CheckAdminRole`), 非只读模式 (`model.CheckReadonly`)

## 功能描述

全局启用或禁用数据同步功能。

当禁用后，所有自动和手动同步操作都将停止，直到再次启用。

## 请求参数 (JSON Body)

| 参数名 | 类型 | 是否必需 | 描述 |
| --- | --- | --- | --- |
| `enabled` | boolean | 是 | 设置为 `true` 以启用同步功能，设置为 `false` 以禁用同步功能。 |

### 请求示例 (启用同步)

```json
{
    "enabled": true
}
```

### 请求示例 (禁用同步)

```json
{
    "enabled": false
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

是否启用同步 (`enabled`): 是 (true) 否 (false) 发送请求

### 响应:

等待请求...
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
