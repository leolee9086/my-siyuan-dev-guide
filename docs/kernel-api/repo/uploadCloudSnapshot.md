---
title: 上传本地快照至云端
---
# 端点

/api/repo/uploadCloudSnapshot

# 上传本地快照至云端

需要认证 需要管理员 检查只读模式

## 接口描述

将指定的本地历史快照（通过其 ID 和关联的标签名定位）上传到当前配置的云端同步服务提供商。

此操作通常用于备份重要的本地快照版本到云端，或者在不同设备间同步特定的快照状态。在只读模式下，此操作被禁止。

## 请求参数 (JSON Body)

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| `id` | string | 是 | 要上传的本地历史快照的唯一标识 ID。 |
| `tag` | string | 是 | 与此本地快照关联的标签名称。上传到云端后，此标签将用于标识该快照。 |

## 返回值 (JSON)

返回标准的 JSON 结构体，包含 `code`, `msg`, `data` 三个字段。

-   `code`: 返回码，`0` 表示成功，其他值（如 `-1`）表示失败。
-   `msg`: 返回信息，成功时通常为空字符串，失败时为具体的错误提示信息。
-   `data`: 返回的具体数据，成功时通常为 `null`。

### 返回值示例

成功时:

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

失败时 (例如，云端服务未配置或上传失败):

```json
{
    "code": -1,
    "msg": "具体错误信息，例如：upload to cloud failed: ... 或 provider not config",
    "data": null
}
```

## 在线测试
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
