---
title: 创建云端同步目录 (createCloudSyncDir)
---
# 端点

/api/sync/createCloudSyncDir

# 创建云端同步目录 (createCloudSyncDir)

POST /api/sync/createCloudSyncDir

## 认证与权限

需要身份验证 (通过 API Token)。

需要管理员权限。

此操作在只读模式下不可用。

## 接口描述

此接口用于在用户当前配置的云同步服务提供商的指定远程路径下创建一个新目录。

例如，如果用户配置了 S3 同步，并且其同步根目录是 `s3://my-bucket/siyuan-sync/`，那么调用此接口并指定 `path` 为 `my-project-backups`，则会在 `s3://my-bucket/siyuan-sync/my-project-backups/` 创建一个新目录。

如果目录已存在或因权限等原因无法创建，接口会返回错误。

## 请求体参数

请求体为一个 JSON 对象，包含以下字段：

| 参数 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| `provider` | string | 是 | 云服务提供商的标识。例如："S3", "WebDAV"。此参数用于确认操作针对哪个已配置的云服务（尽管实际创建目录时，同步引擎会使用当前激活的云服务配置）。 |
| `path` | string | 是 | 要在云端创建的目录的相对路径。路径分隔符应使用 `/`。例如："my-folder" 或 "archive/2024"。 |

## 请求体示例

```json
{
    "provider": "S3",
    "path": "my-new-backup-folder/subfolder"
}
```

## 响应体说明

标准的思源笔记 API 响应结构：

```json
{
    "code": 0,     // 0 表示成功，非 0 表示失败
    "msg": "",      // 成功时为空，失败时为错误信息
    "data": null   // 成功时固定为 null
}
```

可能的错误信息包括：云服务连接失败、权限不足、目录已存在、无效的路径等。

## cURL 调用示例

```bash
curl -X POST \
  http://127.0.0.1:6806/api/sync/createCloudSyncDir \
  -H 'Authorization: Token YOUR_API_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "provider": "WebDAV",
    "path": "remote-documents/project-alpha"
  }'
```

## JavaScript 调用示例

```javascript
async function createRemoteDir(providerName, remotePath) {
    const requestBody = {
        provider: providerName,
        path: remotePath
    };

    try {
        const response = await fetch('/api/sync/createCloudSyncDir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token YOUR_API_TOKEN' // 如果配置了API Token
            },
            body: JSON.stringify(requestBody)
        });
        const result = await response.json();

        if (result.code === 0) {
            console.log(`云端目录 "${remotePath}" 在 ${providerName} 上创建成功。`);
            document.getElementById('apiResponse').textContent = `目录 "${remotePath}" 创建成功。`;
        } else {
            console.error(`创建目录 "${remotePath}" 失败:`, result.msg);
            document.getElementById('apiResponse').textContent = `错误 ${result.code}: ${result.msg}`;
        }
        return result;
    } catch (error) {
        console.error('请求过程中发生错误:', error);
        document.getElementById('apiResponse').textContent = `请求错误: ${error.message}`;
        return null;
    }
}

// 示例：
// createRemoteDir('S3', 'MyNotesArchive/2025');
```

## 在线测试

Provider: S3 WebDAV

远程目录路径: 

创建目录

### 响应:

此处将显示API的响应结果。

**提示:** 在测试前，请确保已在思源笔记中正确配置了相应的云同步服务。创建成功后，可以使用 [/api/sync/listCloudSyncDir](./listCloudSyncDir.html) (如果文档已创建) 接口来验证目录是否已存在。
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
