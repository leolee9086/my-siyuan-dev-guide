---
title: 获取块 DOM (`/api/block/getBlockDOM`)
---
# 端点

/api/block/getBlockDOM

# 获取块 DOM (\`/api/block/getBlockDOM\`)

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block.go#L638) [返回块 API 列表](../pages/block.html) [返回 API 主页](../index.html)

## 接口描述

获取指定块 ID 对应的渲染后的 HTML DOM 字符串。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 需要获取 DOM 的块 ID。 |

## 返回值

返回一个标准的 API 响应 JSON 对象。

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | `0` 表示成功，非 `0` 表示失败。 |
| msg | string | 如果失败，则包含错误信息。 |
| data | object | null | 包含块信息和 DOM 的对象。如果块不存在或发生错误，可能为 `null`。 对象结构如下: |

请求示例

成功响应

失败响应

### 请求示例

```json
POST /api/block/getBlockDOM HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-api-token

{
  "id": "20231018102400-abcde1f"
}
```

### 成功响应示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "20231018102400-abcde1f",
    "dom": "这是一个段落"
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

-   返回的 `dom` 字符串是块在思源笔记编辑器中渲染后的 HTML 表示，包含了块的属性、内容和结构。
-   可以用于获取块的最新渲染结果，例如在外部应用中展示块内容。

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

> 本文档由 AI 织 协助编写，并由人类监督和审核。
> 
> 如果您觉得此文档对您有帮助，可以考虑 [为爱发电](https://afdian.com/a/leolee9086?tab=feed) 支持我们，感谢您的支持！

© 2024 思源笔记 API 文档 (社区维护)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
