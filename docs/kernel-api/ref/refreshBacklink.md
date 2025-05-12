---
title: 刷新反向链接
---
# 端点

/api/ref/refreshBacklink

# 刷新反向链接

需要认证

## 接口描述

根据提供的块 ID，刷新该块的反向链接信息，并刷新事务队列。此接口用于确保指定块的反链数据是最新的。

## 请求参数 (JSON Body)

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 需要刷新反向链接的块 ID。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | null | 成功时固定为 null。 |

请求示例

返回示例

### 请求示例 (JSON Body)

```
POST /api/ref/refreshBacklink HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json

{
  "id": "20230315102130-abcdefg"
}
```

### 成功返回示例

```
{
  "code": 0,
  "msg": "",
  "data": null
}
```

### 失败返回示例 (例如，参数错误)

```
{
  "code": -1,
  "msg": "JSON arg [id] is missing", // 实际错误信息可能不同
  "data": null
}
```

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
