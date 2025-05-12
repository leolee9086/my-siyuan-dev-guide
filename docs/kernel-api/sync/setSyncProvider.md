---
title: setSyncProvider
---
# 端点

/api/sync/setSyncProvider

# 思源笔记 API 文档

[返回首页](../index.html) [返回 sync 分类](index.html)

## /api/sync/setSyncProvider

**方法:** POST

**认证:** \`model.CheckAuth\`, \`model.CheckAdminRole\`, \`model.CheckReadonly\` (需要登录，管理员权限，非只读模式)

**功能:** 设置当前使用的云同步服务提供商。

选择后，后续的同步操作将针对此提供商进行。具体的提供商配置（如S3的秘钥、WebDAV的地址等）需要通过各自独立的API进行设置 (例如 `/api/sync/setSyncProviderS3`, `/api/sync/setSyncProviderWebDAV`, `/api/sync/setSyncProviderLocal`)。

### 请求参数 (JSON Body)

| 参数名 | 类型 | 是否必需 | 描述 | 可选值与含义 |
| --- | --- | --- | --- | --- |
| `provider` | number | 是 | 云同步服务提供商的标识数字。 | 
-   `0`: SiYuan (思源官方云端服务)
-   `2`: S3 (S3 协议对象存储)
-   `3`: WebDAV (WebDAV 协议服务)
-   `4`: Local (本地文件系统)

 |

### 请求示例

```json
{
    "provider": 2 // 设置为 S3 服务
}
```

```json
{
    "provider": 0 // 设置为思源官方服务
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

失败时 (例如，provider 值无效或设置过程中发生错误)，`code` 非 0，`msg` 包含错误信息，`data` 可能包含 `{"closeTimeout": 5000}`。

```json
{
    "code": -1,
    "msg": "siyuan cloud sync has not been enabled yet", // 示例错误：未开启思源云同步
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
