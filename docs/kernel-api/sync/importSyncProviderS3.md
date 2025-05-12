---
title: 导入 S3 同步配置
---
# 端点

/api/sync/importSyncProviderS3

# 导入 S3 同步配置

**API Endpoint:** `POST /api/sync/importSyncProviderS3`

**认证:** 需要登录 (`model.CheckAuth`)、管理员权限 (`model.CheckAdminRole`) 且非只读模式 (`model.CheckReadonly`)。

## 功能描述

此 API 用于导入并应用 S3 (Simple Storage Service) 同步服务的配置。用户需要上传一个配置文件，该文件通常是通过 `/api/sync/exportSyncProviderS3` 接口导出的，其中包含了经过 AES 加密的 S3 连接参数。

上传的文件可以是一个 `.json` 文件，也可以是包含单个 `.json` 文件的 `.zip` 压缩包。系统会自动处理解压（如果需要）、解密，并将解析出的 S3 配置设置为当前激活的同步方式之一（并更新全局配置中的 `sync.s3` 部分）。

## 请求

请求必须为 `multipart/form-data` 类型，包含以下表单字段：

| 字段名 | 类型 | 是否必需 | 描述 |
| --- | --- | --- | --- |
| `file` | File | 是 | 包含 AES 加密的 S3 配置的 `.json` 文件，或者是一个包含此 `.json` 文件的 `.zip` 压缩包。推荐使用由 `/api/sync/exportSyncProviderS3` 导出的文件。 |

## 响应

成功导入并应用配置后，服务器返回 HTTP 状态码 `200` 和一个 JSON 对象，其 `data` 字段包含更新后的 S3 配置信息：

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "s3": {
            "endpoint": "s3.example.com",
            "accessKey": "YOUR_ACCESS_KEY", // 注意：实际响应中 accessKey 和 secretKey 通常不会完整返回，此处仅为结构示例
            "secretKey": "YOUR_SECRET_KEY", // 通常为空或被屏蔽
            "bucket": "my-siyuan-bucket",
            "region": "us-east-1",
            "pathStyle": false,
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
    -   `s3` (object): 更新后的 S3 配置对象 (`conf.S3`)。其结构如下：
        -   `endpoint` (string): S3 服务端点 URL。
        -   `accessKey` (string): Access Key ID。
        -   `secretKey` (string): Secret Access Key (通常在响应中为空或被屏蔽以保安全)。
        -   `bucket` (string): S3 存储桶名称。
        -   `region` (string): S3 存储区域。
        -   `pathStyle` (boolean): 是否使用路径风格的 URL (例如 `endpoint/bucket/key`)。
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
