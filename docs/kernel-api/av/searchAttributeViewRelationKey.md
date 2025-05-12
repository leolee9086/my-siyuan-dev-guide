---
title: searchAttributeViewRelationKey
---
# 端点

/api/av/searchAttributeViewRelationKey

# searchAttributeViewRelationKey

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/av.go "查看源文件")

需要认证 需要管理员权限

## 接口描述

在指定的属性视图 (Attribute View) 中，根据关键词搜索**关系类型**的列 (Key)。关系列用于链接其他属性视图。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| avID | string | 是 | 要在其中搜索列的属性视图 ID。 |
| keyword | string | 是 | 用于搜索列名称的关键词。 |

## 返回值

返回一个包含搜索到的关系列信息的对象。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 返回信息 |
| data | object | 包含搜索结果的对象：
-   `keys` (array): 搜索到的关系列列表。每个元素是一个对象，包含列的详细信息，例如：
    -   `id` (string): 列 (Key) 的 ID。
    -   `name` (string): 列 (Key) 的名称。
    -   `type` (string): 列 (Key) 的类型，固定为 'relation'。
    -   `icon` (string): 列 (Key) 的图标。
    -   `relation` (object): 关系列的配置信息，通常包含关联的属性视图 ID。
        -   `avID` (string): 关联的属性视图 ID。

 |

请求示例

返回示例

### 请求示例

```
POST /api/av/searchAttributeViewRelationKey
Content-Type: application/json
Authorization: Token your-api-token

{
  "avID": "20231027150000-abcdefgh",
  "keyword": "项目"
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "keys": [
      {
        "id": "key-relation-1",
        "name": "关联项目",
        "type": "relation",
        "icon": "iconLink",
        "relation": {
          "avID": "20231029100000-projectav"
        },
        "options": []
        // ... 其他列属性
      }
    ]
  }
}
```

