---
title: 获取块 DOM (`/api/block/getBlockDOM`)
---

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# 获取块 DOM

## 端点

`/api/block/getBlockDOM`

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block.go#L639 "查看 getBlockDOM 函数的源码实现")

## 接口描述

获取指定块 ID 对应的渲染后的 HTML DOM 字符串。

注意：目前思源笔记前端代码似乎并未直接调用此 API，可能是为特定场景或第三方开发者保留。

## 认证与授权

此接口需要满足以下条件才能访问:

1.  **用户认证** (`model.CheckAuth`): 需要有效的用户认证,并通过 `Authorization` HTTP 头部传递 API Token。

## 请求方法

POST

## 请求参数

请求体应为 JSON 格式，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 需要获取 DOM 的块 ID。 |

## 返回值

返回标准的 API 响应 JSON 对象。

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码。`0` 表示成功，`-1` 表示失败。 |
| msg | string | 错误信息。成功时为空，失败时（如块不存在）可能为 `block [ID] not found` 或其他数据库错误。 |
| data | object | 包含块信息和 DOM 的对象。 |

成功时 `data` 字段内容:

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| id | string | 请求的块 ID。 |
| dom | string | 块渲染后的 HTML DOM 字符串。 |

失败时 `data` 字段内容 (注意，data 不为 null):

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| closeTimeout | number | 通常为 `7000`，表示错误提示自动关闭的毫秒数。 |

## 示例

### 请求示例

```json
POST /api/block/getBlockDOM
Content-Type: application/json
Authorization: Token your-api-token

{
  "id": "20231018102400-abcde1f"
}
```

### 成功返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "20231018102400-abcde1f",
    "dom": "<div data-node-id=\"20231018102400-abcde1f\" data-type=\"NodeParagraph\" class=\"p\" updated=\"20231018102400\"><div contenteditable=\"true\" spellcheck=\"false\">这是一个段落</div><div class=\"protyle-attr\" contenteditable=\"false\"></div></div>"
  }
}
```

### 失败返回示例 (块不存在)

```json
{
  "code": -1,
  "msg": "query block [20231018102400-xxxxxxx] failed: block not found",
  "data": {
      "closeTimeout": 7000
  }
}
```

## 错误码说明

| 错误码 | 说明 |
| --- | --- |
| 0 | 成功 |
| -1 | 失败，例如块不存在或数据库查询错误 | 

## 备注

*   返回的 `dom` 字符串是块在思源笔记编辑器中渲染后的 HTML 表示，包含了块的属性、内容和结构。
*   可以用于获取块的最新渲染结果，例如在外部应用中展示块内容。

