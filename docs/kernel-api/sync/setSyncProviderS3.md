---
title: setSyncProviderS3
---
# 端点

/api/sync/setSyncProviderS3

# 思源笔记 API 文档

[返回首页](../index.html) [返回 sync 分类](index.html)

## /api/sync/setSyncProviderS3

**方法:** POST

**认证:** \`model.CheckAuth\`, \`model.CheckAdminRole\`, \`model.CheckReadonly\` (需要登录，管理员权限，非只读模式)

**功能:** 设置使用 S3 (Amazon Simple Storage Service) 或兼容 S3 协议的对象存储作为同步服务提供商时的具体配置。

在调用此 API 前，应先通过 `/api/sync/setSyncProvider` 将 `provider` 设置为 `2` (S3)。

### 请求参数 (JSON Body)

请求体包含一个名为 `s3` 的对象，其结构如下 (`conf.S3`)：

| `s3` 对象字段 | 类型 | 是否必需 | 描述 |
| --- | --- | --- | --- |
| `endpoint` | string | 是 | S3 服务的端点 URL。例如：`s3.amazonaws.com` 或 `minio.example.com:9000`。 |
| `accessKey` | string | 是 | S3 Access Key ID。 |
| `secretKey` | string | 是 | S3 Secret Access Key。 |
| `bucket` | string | 是 | S3 存储桶 (Bucket) 名称。 |
| `region` | string | 否 | S3 存储区域 (Region)。例如：`us-east-1`。如果 S3 服务不需要或未使用区域概念，可留空。 |
| `pathStyle` | boolean | 否 | 是否使用路径风格的 URL (例如 `endpoint/bucket/key`)。默认为 `false` (即虚拟主机风格 `bucket.endpoint/key`)。某些 S3 兼容服务（如 MinIO）可能需要设置为 `true`。 |
| `skipTlsVerify` | boolean | 否 | 是否跳过 TLS (HTTPS) 证书验证。如果 S3 服务使用自签名证书或内网部署且无法验证证书时，可设为 `true`。默认为 `false`。**警告：设置为 `true` 会降低安全性。** |
| `timeout` | number | 否 | 操作超时时间，单位为秒。如果未提供或为0，则可能使用默认值。 |
| `concurrentReqs` | number | 否 | 并发请求数。如果未提供或为0，则可能使用默认值。 |

### 请求示例

```json
{
    "s3": {
        "endpoint": "s3.us-west-2.amazonaws.com",
        "accessKey": "YOUR_ACCESS_KEY_ID",
        "secretKey": "YOUR_SECRET_ACCESS_KEY",
        "bucket": "my-siyuan-notebooks",
        "region": "us-west-2",
        "pathStyle": false,
        "skipTlsVerify": false,
        "timeout": 60,
        "concurrentReqs": 10
    }
}
```

### 响应结果

成功时，返回的 JSON 对象中 `code` 为 0，`msg` 为空字符串，`data` 为 `null`。

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

失败时 (例如，参数缺失、认证失败、存储桶不存在或网络问题等)，`code` 非 0，`msg` 包含错误信息，`data` 可能包含 `{"closeTimeout": 5000}`。

```json
{
    "code": -1,
    "msg": "Failed to connect to S3: ...error details...",
    "data": {
        "closeTimeout": 5000
    }
}
```

### 在线测试

本文档由 AI 自动生成，可能存在不准确之处，请以实际 API 行为为准。
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
