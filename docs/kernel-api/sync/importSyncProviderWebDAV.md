---
title: 导入 WebDAV 同步配置
---
# 端点

/api/sync/importSyncProviderWebDAV

# 导入 WebDAV 同步配置

**API Endpoint:** `POST /api/sync/importSyncProviderWebDAV`

**认证:** 需要登录 (`model.CheckAuth`)、管理员权限 (`model.CheckAdminRole`) 且非只读模式 (`model.CheckReadonly`)。

## 功能描述

此 API 用于导入并应用 WebDAV (Web Distributed Authoring and Versioning) 同步服务的配置。用户需要上传一个配置文件，该文件通常是通过 `/api/sync/exportSyncProviderWebDAV` 接口导出的，其中包含了经过 AES 加密的 WebDAV 连接参数。

上传的文件可以是一个 `.json` 文件，也可以是包含单个 `.json` 文件的 `.zip` 压缩包。系统会自动处理解压（如果需要）、解密、Hex解码，并将解析出的 WebDAV 配置设置为当前激活的同步方式之一（并更新全局配置中的 `sync.webdav` 部分）。

**重要提示:** 根据代码实现，导入的配置文件内容在 AES 解密后，还会进行一次 Hex 解码。这与 `/api/sync/exportSyncProviderWebDAV` 导出的文件格式（仅 AES 加密）在处理上可能存在不完全对称的情况，请注意上传文件的准备。

## 请求

请求必须为 `multipart/form-data` 类型，包含以下表单字段：

| 字段名 | 类型 | 是否必需 | 描述 |
| --- | --- | --- | --- |
| `file` | File | 是 | 包含 AES 加密的 WebDAV 配置的 `.json` 文件，或者是一个包含此 `.json` 文件的 `.zip` 压缩包。推荐使用由 `/api/sync/exportSyncProviderWebDAV` 导出的文件，但请注意上述关于 Hex 解码的提示。 |

## 响应

成功导入并应用配置后，服务器返回 HTTP 状态码 `200` 和一个 JSON 对象，其 `data` 字段包含更新后的 WebDAV 配置信息：

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "webdav": {
            "endpoint": "https://dav.example.com/dav/",
            "username": "user",
            "password": "", // 密码在响应中通常为空或被屏蔽
            "pathPrefix": "siyuan_data",
            "skipTlsVerify": false,
            "timeout": 30,
            "concurrentReqs": 5
        }
    }
}
```

-   `code` (number): `0` 表示成功，其他值表示失败。
-   `msg` (string): 错误信息（如果 `code` 非 `0`）。
-   `data` (object): 包含同步信息的对象。
    -   `webdav` (object): 更新后的 WebDAV 配置对象 (`conf.WebDAV`)。其结构如下：
        -   `endpoint` (string): WebDAV 服务器 URL。
        -   `username` (string): 用户名。
        -   `password` (string): 密码 (在响应中通常为空或被屏蔽以保安全)。
        -   `pathPrefix` (string): 服务器上的路径前缀。
        -   `skipTlsVerify` (boolean): 是否跳过 TLS (SSL) 证书验证。
        -   `timeout` (number): 请求超时时间（秒）。
        -   `concurrentReqs` (number): 并发请求数。

## 在线测试
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
