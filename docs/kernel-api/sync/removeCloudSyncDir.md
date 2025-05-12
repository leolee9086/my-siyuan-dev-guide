---
title: /api/sync/removeCloudSyncDir
---
# 端点

/api/sync/removeCloudSyncDir

# /api/sync/removeCloudSyncDir

删除指定云存储提供商上的一个同步目录。

## API 端点详情

-   **路径:** `/api/sync/removeCloudSyncDir`
-   **HTTP 方法:** `POST`
-   **认证:** 需要 (`model.CheckAuth`, `model.CheckAdminRole`, `model.CheckReadonly`)

## 请求参数 (JSON Body)

| 参数名 | 类型 | 是否必需 | 描述 |
| --- | --- | --- | --- |
| `provider` | string | 是 | 云服务提供商的名称。例如：`"S3"`, `"WebDAV"`, `"LocalFolder"`。不能为空。 |
| `path` | string | 是 | 要在云端删除的目录的路径或名称。不能为空。这个通常是之前通过 `/api/sync/listCloudSyncDir` 获取到的目录名。 |

### 请求示例:

```json
{
    "provider": "S3",
    "path": "my-siyuan-sync-repo-to-delete"
}
```

## 响应详情

成功时，API 返回一个标准的成功响应，其中 `data` 字段为 `null`。

### 成功响应示例 (`code: 0`):

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

### 失败响应示例:

如果提供商名称或路径为空，或者删除操作失败，API会返回错误信息。

```json
{
    "code": -1,
    "msg": "provider can not be empty", // 或 "path can not be empty", 或其他底层错误信息
    "data": null
}
```

## 重要提示

-   请谨慎操作此 API，删除的云端目录可能无法恢复。
-   在调用此 API 前，建议使用 `/api/sync/listCloudSyncDir` 确认要删除的目录名和提供商是否正确。
-   如果删除的是当前正在使用的同步目录 (`conf.Sync.CloudName`)，删除后可能需要重新配置同步设置。

## 在线测试

提供商 (provider):   
  
目录路径 (path):   
  
删除云端目录

### 响应:

```
点击按钮测试...
```

© 2024 SiYuan API Documentation
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
