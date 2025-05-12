---
title: 'API: /api/sync/setCloudSyncDir'
---
# 端点

/api/sync/setCloudSyncDir

# API: /api/sync/setCloudSyncDir

**HTTP Method:** POST

**认证:** 需要登录 (`model.CheckAuth`), 管理员权限 (`model.CheckAdminRole`), 非只读模式 (`model.CheckReadonly`)

## 功能描述

设置当前工作空间在当前所选的云服务提供商（如 S3, WebDAV 等）上的同步根文件夹（或存储桶内的顶层路径）的名称。

例如，如果设置为 "MyNotes"，那么所有同步数据都会存放在云端的 `MyNotes/` 目录下。

**重要提示:** 修改此设置后，下次同步时，思源笔记会尝试使用新的云端目录。如果该目录不存在，根据服务商和具体配置，可能会创建它或者同步失败。如果该目录已存在且包含其他非本工作空间的数据，可能会导致数据混乱或丢失。请谨慎操作，并确保理解所选云服务提供商的行为。

## 请求参数 (JSON Body)

| 参数名 | 类型 | 是否必需 | 描述 |
| --- | --- | --- | --- |
| `name` | string | 是 | 要设置的云端同步目录的名称。例如 `"SiYuanCloudSync"`。 |

### 请求示例

```json
{
    "name": "SiYuanBackup"
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

### 响应示例 (失败，例如未登录或非管理员)

```json
{
    "code": -1,
    "msg": "用户需要登录", // 或 "管理员才能操作", "readonly mode" 等
    "data": null
}
```

## 在线测试

云端同步目录名称 (`name`):  发送请求

### 响应:

等待请求...
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
