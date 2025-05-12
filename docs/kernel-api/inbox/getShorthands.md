---
title: 获取速记列表
---
# 端点

/api/inbox/getShorthands

# 获取速记列表

## 接口描述

分页获取云端速记 (Cloud Shorthand) 的列表。

## 请求参数 (JSON Body)

| 参数名 | 类型 | 描述 | 是否必需 |
| --- | --- | --- | --- |
| page | number | 要获取的速记列表的页码。通常从 1 开始。 | 是 |

## 返回值 (JSON)

返回一个包含速记列表和分页信息的 JSON 对象。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，`0` 表示成功，其他值表示失败。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 包含速记列表及可能的分页信息。例如： - `records` (array): 速记对象数组，每个对象包含速记的详细信息 (id, content, created, updated 等)。 - `totalCount` (number): 速记总数量 (可能存在)。 - `pageCount` (number): 总页数 (可能存在)。 - `pageSize` (number): 每页数量 (可能存在)。 - `page` (number): 当前页码 (可能存在)。 |

请求示例

返回示例

### 请求示例

```
POST /api/inbox/getShorthands HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token YOUR_API_TOKEN_IF_REQUIRED

{
  "page": 1
}
```

### 成功返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "records": [
      {
        "id": "xxxxxxxxxxxxxx1",
        "content": "这是第一条速记内容。",
        "hPath": "/思源笔记/速记本",
        "box": "20230101000000-abcdefg",
        "created": "2023-10-27T10:00:00Z",
        "updated": "2023-10-27T10:05:00Z"
      },
      {
        "id": "xxxxxxxxxxxxxx2",
        "content": "这是第二条速记内容，带有链接 https://b3log.org",
        "hPath": "/思源笔记/速记本",
        "box": "20230101000000-abcdefg",
        "created": "2023-10-26T11:00:00Z",
        "updated": "2023-10-26T11:05:00Z"
      }
      // ...更多速记对象
    ],
    "pageCount": 5,
    "page": 1,
    "pageSize": 20,
    "totalCount": 98
  }
}
```

### 失败返回示例

```
{
  "code": 1,
  "msg": "Error: failed to retrieve shorthands",
  "data": null
}
```

> **\[织的笔记\]**
> 
> -   此接口的认证要求待确认 (通过检查 `router.go` 或通用 API 指南)。请求示例中暂时加入了 `Authorization` 头作为通用提醒。
> -   `data` 对象中返回的具体字段 (尤其是分页相关的字段名和速记对象内部结构) 依赖于后端 `model.GetCloudShorthands` 的具体实现，上述示例仅为常见实践推测。
> 
> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：<a href="https://afdian.com/a/leolee9086?tab=feed">爱发电</a>
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
