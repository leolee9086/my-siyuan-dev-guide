---
title: 检查块是否为引用 (`/api/block/checkBlockRef`)
---
# 端点

/api/block/checkBlockRef

# 检查块是否为引用 (\`/api/block/checkBlockRef\`)

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block.go#L33) [返回块 API 列表](../pages/block.html) [返回 API 主页](../index.html)

## 接口描述

检查所提供的一组块 ID 是否均为引用块。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| ids | string\[\] | 是 | 一个字符串数组，包含了需要检查的块 ID。 |

## 返回值

返回一个标准的 API 响应 JSON 对象。

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | `0` 表示成功，非 `0` 表示失败。 |
| msg | string | 如果失败，则包含错误信息。 |
| data | boolean | 布尔值。
-   `true`: 表示请求体 `ids` 数组中的所有 ID 对应的块\*\*都是\*\*引用块。
-   `false`: 表示请求体 `ids` 数组中\*\*至少有一个\*\* ID 对应的块不是引用块。

 |

请求示例

成功响应 (True)

成功响应 (False)

失败响应

### 请求示例

```json
POST /api/block/checkBlockRef HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-api-token

{
  "ids": ["20231018102400-abcde1f", "20231018102500-ghijk2l"]
}
```

### 成功响应示例 (全部为引用块)

```json
{
  "code": 0,
  "msg": "",
  "data": true
}
```

### 成功响应示例 (至少一个不是引用块)

```json
{
  "code": 0,
  "msg": "",
  "data": false
}
```

### 失败响应示例 (参数错误)

```json
{
  "code": -1,
  "msg": "json: cannot unmarshal string into Go struct field .ids of type string",
  "data": null
}
```

## 备注

-   此接口用于判断块的类型是否为引用，而不是检查引用是否存在或有效。

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
