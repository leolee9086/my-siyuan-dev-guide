---
title: renderAttributeView
---
# 端点

/api/av/renderAttributeView

# renderAttributeView

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/av.go "查看源文件")

需要认证

## 接口描述

渲染指定的属性视图，返回其结构和数据。支持分页和过滤。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 要渲染的属性视图 ID (Attribute View ID)。 |
| viewID | string | 否 | 要渲染的具体视图 (View) 的 ID。如果省略，则渲染默认视图。 |
| query | string | 否 | 用于过滤数据的查询语句。 |
| page | number | 否 | 分页页码，从 1 开始。默认为 1。 |
| pageSize | number | 否 | 每页返回的数据条数。默认为 -1，表示不分页或使用默认大小。 |

## 返回值

返回一个包含属性视图结构和渲染后数据的对象。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 返回信息 |
| data | object | 包含属性视图详细信息的对象：
-   `name` (string): 属性视图的名称。
-   `id` (string): 属性视图的 ID。
-   `viewType` (string): 当前渲染视图的类型 (例如 "table", "list")。
-   `viewID` (string): 当前渲染视图的 ID。
-   `views` (array): 包含该属性视图所有可用视图信息的数组，每个元素包含 `id`, `icon`, `name`, `hideAttrViewName`, `type`。
-   `view` (object): 当前渲染视图的详细数据，包括列定义、行数据等（结构复杂，具体参考实际返回）。
-   `isMirror` (boolean): 指示该属性视图是否为镜像。

 |

请求示例

返回示例 (结构)

### 请求示例

```
POST /api/av/renderAttributeView
Content-Type: application/json
Authorization: Token your-api-token

{
  "id": "20231027150000-abcdefgh",
  "viewID": "20231027150100-ijklmnop",
  "page": 1,
  "pageSize": 20
}
```

### 返回示例 (结构)

```
{
  "code": 0,
  "msg": "",
  "data": {
    "name": "示例属性视图",
    "id": "20231027150000-abcdefgh",
    "viewType": "table",
    "viewID": "20231027150100-ijklmnop",
    "views": [
      {
        "id": "20231027150100-ijklmnop",
        "icon": "iconTable",
        "name": "表格视图",
        "hideAttrViewName": false,
        "type": "table"
      },
      {
        "id": "20231027150200-qrstuvwx",
        "icon": "iconList",
        "name": "列表视图",
        "hideAttrViewName": false,
        "type": "list"
      }
    ],
    "view": {
      // 具体视图数据结构，可能包含 columns, rows, filters, sorts 等
      "columns": [ /* ... */ ],
      "rows": [ /* ... */ ],
      "pageCount": 5 // 示例：总页数
      // ... other view specific data
    },
    "isMirror": false
  }
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
