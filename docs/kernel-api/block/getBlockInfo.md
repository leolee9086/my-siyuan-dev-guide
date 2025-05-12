---
title: 获取块信息
---
# 获取块信息

## 端点

/api/block/getBlockInfo

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block.go#L581 "查看 getBlockInfo 函数的源码实现")

## 接口描述

获取指定 ID 块的基本信息，例如它所属的笔记本、文档路径、根文档 ID、块类型等。

## 认证与授权

此接口需要满足以下条件才能访问:

1.  **用户认证** (`model.CheckAuth`): 需要有效的用户认证,并通过 `Authorization` HTTP 头部传递 API Token。

## 请求方法

POST

## 请求参数

请求体应为 JSON 格式，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 要查询的块 ID。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码。0: 成功; -1: 失败 (例如块不存在或查询错误) |
| msg | string | 返回信息。失败时包含错误信息，例如 `block [ID] not found`。 |
| data | object \| null | 块信息数据。失败时为 `null`。 |

成功时 `data` 字段内容:

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| box | string | 块所在的笔记本 ID。 |
| path | string | 块所在文档的路径 (相对于笔记本根目录)。 |
| rootID | string | 块所在文档的根块 ID。 |
| rootTitle | string | 块所在文档的标题 (根块内容的第一行)。 |
| rootIcon | string | 块所在文档设置的图标。 |
| type | string | 块的类型 (例如："d"-文档, "h"-标题, "p"-段落, "i"-列表项, "b"-引述块, "c"-代码块, "m"-数学公式块, "t"-表格, "s"-超级块, "a"-属性视图, "widget"-挂件, "av"-属性视图)。 |

## 示例

### 请求示例

```json
POST /api/block/getBlockInfo
Content-Type: application/json
Authorization: Token your-api-token

{
  "id": "20210812220409-xyz789a" // 替换为你要查询的块ID
}
```

### 返回示例 (成功)

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "box": "20200812220409-rng0qan", // 笔记本ID
    "path": "/path/to/your/document.sy", // 文档路径
    "rootID": "20210812220400-abc123d", // 根文档ID
    "rootTitle": "这是文档的标题", // 根文档标题
    "rootIcon": "", // 根文档图标 (若未设置则为空)
    "type": "p" // 块类型 (示例为段落)
  }
}
```

### 返回示例 (失败 - 块不存在)

```json
{
  "code": -1,
  "msg": "block [20210812220409-xyz789a] not found",
  "data": null
}
```

## 错误码说明

| 错误码 | 说明 |
| --- | --- |
| 0 | 成功 |
| -1 | 失败，例如块不存在或数据库查询错误 |

## 备注

*   此接口返回的是块的元信息，不包含块的具体内容。
