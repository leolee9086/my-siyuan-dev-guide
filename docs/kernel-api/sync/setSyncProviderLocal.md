---
title: setSyncProviderLocal
---
# 端点

/api/sync/setSyncProviderLocal

# 思源笔记 API 文档

[返回首页](../index.html) [返回 sync 分类](index.html)

## /api/sync/setSyncProviderLocal

**方法:** POST

**认证:** \`model.CheckAuth\`, \`model.CheckAdminRole\`, \`model.CheckReadonly\` (需要登录，管理员权限，非只读模式)

**功能:** 设置使用本地文件系统作为同步服务提供商时的具体配置。

在调用此 API 前，应先通过 `/api/sync/setSyncProvider` 将 `provider` 设置为 `4` (Local File System)。

### 请求参数 (JSON Body)

请求体包含一个名为 `local` 的对象，其结构如下：

| `local` 对象字段 | 类型 | 是否必需 | 描述 |
| --- | --- | --- | --- |
| `endpoint` | string | 是 | 本地文件系统的同步目录的**绝对路径**。例如: `D:\SiyuanSync` 或 `/Users/name/SiyuanSync`。 |
| `timeout` | number | 否 | 操作超时时间，单位为秒。如果未提供或为0，则可能使用默认值。 |
| `concurrentReqs` | number | 否 | 并发请求/操作数。如果未提供或为0，则可能使用默认值。 |

### 请求示例

```json
{
    "local": {
        "endpoint": "/path/to/your/siyuan_sync_folder",
        "timeout": 60,       // 可选, 示例超时60秒
        "concurrentReqs": 5  // 可选, 示例并发数为5
    }
}
```

### 响应结果

成功时，返回的 JSON 对象中 `code` 为 0，`msg` 为空字符串，`data` 为一个包含已设置的 `local` 配置的对象。

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "local": {
            "endpoint": "/path/to/your/siyuan_sync_folder",
            "timeout": 60,
            "concurrentReqs": 5
        }
    }
}
```

失败时 (例如，路径无效、权限不足或设置过程中发生错误)，`code` 非 0，`msg` 包含错误信息，`data` 可能包含 `{"closeTimeout": 5000}`。

```json
{
    "code": -1,
    "msg": "mkdir /invalid/path: no such file or directory", // 示例错误：路径不存在
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
