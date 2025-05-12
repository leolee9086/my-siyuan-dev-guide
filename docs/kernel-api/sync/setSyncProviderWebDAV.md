---
title: setSyncProviderWebDAV
---
# 端点

/api/sync/setSyncProviderWebDAV

# 思源笔记 API 文档

[返回首页](../index.html) [返回 sync 分类](index.html)

## /api/sync/setSyncProviderWebDAV

**方法:** POST

**认证:** \`model.CheckAuth\`, \`model.CheckAdminRole\`, \`model.CheckReadonly\` (需要登录，管理员权限，非只读模式)

**功能:** 设置使用 WebDAV 作为云同步服务提供商时的具体配置。

**重要提示:** 在调用此 API 前，应先通过 `/api/sync/setSyncProvider` 将 `provider` 设置为 `3` (WebDAV)。

### 请求参数 (JSON Body)

请求体包含一个名为 `webdav` 的对象，其结构如下 (对应 `conf.WebDAV`)：

| `webdav` 对象字段 | 类型 | 是否必需 | 描述 |
| --- | --- | --- | --- |
| `endpoint` | string | 是 | WebDAV 服务的完整 URL。例如：`https://dav.example.com/siyuan-data/`。 |
| `username` | string | 是 | WebDAV 服务的认证用户名。 |
| `password` | string | 是 (但可为空) | WebDAV 服务的认证密码。某些 WebDAV 服务可能允许匿名或不需要密码。 |
| `skipTlsVerify` | boolean | 否 | 是否跳过 TLS (HTTPS) 证书验证。如果 WebDAV 服务使用自签名证书或部署在无法验证证书的内网环境，可设为 `true`。默认为 `false`。**警告：设置为 `true` 会降低连接安全性。** |
| `timeout` | number | 否 | 操作超时时间，单位为秒。如果未提供或为0，则可能使用思源笔记内部的默认值。 |
| `concurrentReqs` | number | 否 | 并发请求数量。如果未提供或为0，则可能使用思源笔记内部的默认值。 |

### 请求示例

```json
{
    "webdav": {
        "endpoint": "https://dav.box.com/dav",
        "username": "your_username",
        "password": "your_password",
        "skipTlsVerify": false,
        "timeout": 60,
        "concurrentReqs": 5
    }
}
```

### 响应结果

成功时，返回的 JSON 对象中 `code` 为 0，`msg` 为空字符串，`data` 中包含已成功设置的 `webdav` 配置对象。

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "webdav": {
            "endpoint": "https://dav.box.com/dav",
            "username": "your_username",
            "password": "your_password", // 通常会返回密码字段，前端应注意处理
            "skipTlsVerify": false,
            "timeout": 60,
            "concurrentReqs": 5
        }
    }
}
```

失败时 (例如，参数缺失、认证失败、无法连接到 WebDAV 服务器等)，`code` 非 0，`msg` 包含错误信息，`data` 可能包含 `{"closeTimeout": 5000}`。

```json
{
    "code": -1,
    "msg": "Missing required WebDAV configuration parameters: endpoint and username are required",
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
