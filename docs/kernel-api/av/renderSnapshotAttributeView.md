---
title: renderSnapshotAttributeView
---
# 端点

/api/av/renderSnapshotAttributeView

# renderSnapshotAttributeView

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/av.go "查看源文件")

需要认证 需要管理员权限

## 接口描述

根据指定的属性视图 ID 和仓库快照 (Snapshot) 索引，渲染该属性视图在特定快照中的状态和数据。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 要渲染的属性视图 ID (Attribute View ID)。 |
| snapshot | string | 是 | 仓库快照的索引或 ID。 |

## 返回值

返回一个包含指定快照版本属性视图结构和渲染后数据的对象。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 返回信息 |
| data | object | 包含属性视图详细信息的对象，结构与 \`/api/av/renderAttributeView\` 的返回值类似：
-   `name` (string): 属性视图的名称。
-   `id` (string): 属性视图的 ID。
-   `viewType` (string): 当前渲染视图的类型。
-   `viewID` (string): 当前渲染视图的 ID。
-   `views` (array): 包含该属性视图所有可用视图信息的数组。
-   `view` (object): 当前渲染视图的详细数据（结构复杂）。
-   `isMirror` (boolean): 指示该属性视图是否为镜像。

 |

请求示例

返回示例 (结构)

### 请求示例

```
POST /api/av/renderSnapshotAttributeView
Content-Type: application/json
Authorization: Token your-api-token

{
  "id": "20231027150000-abcdefgh",
  "snapshot": "snapshot-index-or-id"
}
```

### 返回示例 (结构)

```
{
  "code": 0,
  "msg": "",
  "data": {
    "name": "示例属性视图 (快照)",
    "id": "20231027150000-abcdefgh",
    "viewType": "table",
    "viewID": "20231027150100-ijklmnop", // 可能是快照中的视图ID
    "views": [ /* ... 同 renderAttributeView ... */ ],
    "view": { /* ... 快照中的视图数据 ... */ },
    "isMirror": false
  }
}
```

