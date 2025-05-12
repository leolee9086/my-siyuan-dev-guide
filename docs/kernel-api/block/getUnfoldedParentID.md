---
title: 获取未折叠父块 ID (`/api/block/getUnfoldedParentID`)
---
# 端点

/api/block/getUnfoldedParentID

# 获取未折叠父块 ID (\`/api/block/getUnfoldedParentID\`)

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block.go#L245) [返回块 API 列表](../pages/block.html) [返回 API 主页](../index.html)

## 接口描述

获取指定块 ID 的第一个未折叠的父块 ID。

该接口会沿着块的父级链向上查找，直到找到第一个未被折叠的父块并返回其 ID。如果所有父块都被折叠了，或者指定的块本身就是文档的根块（没有父块），则返回空字符串 `""`。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 需要查询的块 ID。 |

## 返回值

返回一个标准的 API 响应 JSON 对象。

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | `0` 表示成功，非 `0` 表示失败。 |
| msg | string | 如果失败，则包含错误信息。 |
| data | object | null | 包含父块 ID 的对象。如果查询失败，可能为 `null`。 对象结构如下: |

请求示例

成功响应 (找到父块)

成功响应 (未找到/无父块)

失败响应

### 请求示例

```json
POST /api/block/getUnfoldedParentID HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-api-token

{
  "id": "20230518110000-uvwxyz12"
}
```

### 成功响应示例 (找到未折叠父块)

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "parentID": "20230518105900-abcdefgh"
  }
}
```

### 成功响应示例 (所有父块折叠或无父块)

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "parentID": ""
  }
}
```

### 失败响应示例 (参数错误)

```json
{
  "code": -1,
  "msg": "json: cannot unmarshal string into Go struct field .id of type string",
  "data": null
}
```

## 备注

-   此接口可用于判断某个块在当前视图下是否可见（如果其父块都折叠了则可能不可见），或用于导航跳转等场景。

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

© 2024 思源笔记 API 文档 (社区维护)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
