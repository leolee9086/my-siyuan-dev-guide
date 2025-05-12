---
title: 'API: /api/sync/setSyncGenerateConflictDoc'
---
# 端点

/api/sync/setSyncGenerateConflictDoc

# API: /api/sync/setSyncGenerateConflictDoc

**HTTP Method:** POST

**认证:** 需要登录 (`model.CheckAuth`), 管理员权限 (`model.CheckAdminRole`), 非只读模式 (`model.CheckReadonly`)

## 功能描述

设置在数据同步过程中，如果检测到内容冲突（例如，同一文档在本地和云端都被修改过），是否自动生成一个包含冲突内容的副本（通常称为"冲突文档"或"Conflict Copy"）。

启用此选项有助于保留所有版本的更改，避免数据丢失。禁用后，冲突的处理方式可能取决于具体的同步模式设置（例如，可能以最后编辑的版本为准）。

## 请求参数 (JSON Body)

| 参数名 | 类型 | 是否必需 | 描述 |
| --- | --- | --- | --- |
| `enabled` | boolean | 是 | 设置为 `true` 以在同步冲突时生成冲突文档，设置为 `false` 则不生成。 |

### 请求示例 (启用生成冲突文档)

```json
{
    "enabled": true
}
```

### 请求示例 (禁用生成冲突文档)

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

是否生成冲突文档 (`enabled`): 是 (true) 否 (false) 发送请求

### 响应:

等待请求...
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
