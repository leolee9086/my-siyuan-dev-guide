---
title: 获取速记
---
# 端点

/api/inbox/getShorthand

# 获取速记

## 接口描述

根据指定的 ID 获取单个云端速记 (Cloud Shorthand) 的详细信息。

## 请求参数 (JSON Body)

| 参数名 | 类型 | 描述 | 是否必需 |
| --- | --- | --- | --- |
| id | string | 要获取的速记的唯一标识符。 | 是 |

## 返回值 (JSON)

返回一个包含速记数据的 JSON 对象。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，`0` 表示成功，其他值表示失败。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 包含速记详细信息的对象。具体字段结构取决于 `CloudShorthand` 数据模型，通常会包含速记的创建时间、更新时间、内容等。 |

请求示例

返回示例

### 请求示例

```
POST /api/inbox/getShorthand HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token YOUR_API_TOKEN_IF_REQUIRED

{
  "id": "xxxxxxxxxxxxxx"
}
```

### 成功返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "xxxxxxxxxxxxxx",
    "content": "这是一条速记内容示例。",
    "hPath": "/思源笔记/速记本",
    "box": "20230101000000-abcdefg",
    "created": "2023-10-26T10:00:00Z",
    "updated": "2023-10-26T10:05:00Z"
    // ... 其他可能的字段
  }
}
```

### 失败返回示例 (例如 ID 不存在)

```
{
  "code": 1,
  "msg": "Error: shorthand not found for id xxxxxxxxxxxxxx",
  "data": null
}
```

> **\[织的笔记\]**
> 
> -   此接口的认证要求待确认 (通过检查 `router.go` 或通用 API 指南)。请求示例中暂时加入了 `Authorization` 头作为通用提醒。
> -   `data` 对象中返回的具体字段依赖于后端 `model.CloudShorthand` 的定义，上述示例仅为推测的常见字段。
> 
> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
