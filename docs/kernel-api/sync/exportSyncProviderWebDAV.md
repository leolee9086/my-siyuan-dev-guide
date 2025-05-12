---
title: 导出 WebDAV 同步配置
---
# 端点

/api/sync/exportSyncProviderWebDAV

# 导出 WebDAV 同步配置

**API Endpoint:** `POST /api/sync/exportSyncProviderWebDAV`

**认证:** 需要登录 (`model.CheckAuth`) 和管理员权限 (`model.CheckAdminRole`)。

## 功能描述

此 API 用于导出当前已配置的 WebDAV 同步设置。配置信息会被 AES 加密后打包成一个 ZIP 文件，保存在服务器的临时导出目录中。接口会返回该 ZIP 文件的名称和可用于下载的相对路径。

**重要提示:** 此接口本身不直接提供文件下载。客户端需要根据响应中返回的 `zip` 字段（例如 `/export/siyuan-webdav-xxxx.json.zip`），配合文件下载接口 (例如 `GET /api/file/getExportFile?path=/export/siyuan-webdav-xxxx.json.zip`) 来获取导出的 ZIP 文件。ZIP 文件内包含一个 JSON 文件，该 JSON 文件内容是经过 AES 加密的 WebDAV 配置详情。

## 请求参数

此接口不需要请求参数。

## 响应

成功时，服务器返回 HTTP 状态码 `200` 和一个 JSON 对象，包含以下字段：

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "name": "siyuan-webdav-20231027103000.json",
        "zip": "/export/siyuan-webdav-20231027103000.json.zip"
    }
}
```

-   `code` (number): `0` 表示成功，其他值表示失败。
-   `msg` (string): 错误信息（如果 `code` 非 `0`）。
-   `data` (object): 包含导出文件信息的对象。
    -   `name` (string): 导出的 WebDAV 配置文件名（JSON 格式，不包含 `.zip` 后缀）。
    -   `zip` (string): 包含加密配置的 ZIP 文件在服务器上的相对路径。此路径可用于通过文件下载 API 获取文件。

## 导出的 WebDAV 配置 (`conf.WebDAV`) 结构

ZIP 包内的 JSON 文件（解密后）包含以下字段：

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| `endpoint` | string | WebDAV 服务的 URL 端点。 |
| `username` | string | WebDAV 服务的用户名。 |
| `password` | string | WebDAV 服务的密码。 |
| `skipTlsVerify` | boolean | 是否跳过 TLS (SSL) 证书验证。如果为 `true`，则不验证 HTTPS 证书的有效性。 |
| `timeout` | number | 请求超时时间，单位为秒。 |
| `concurrentReqs` | number | 同步时允许的并发请求数量。 |

## 在线测试
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
