---
title: searchAttributeView
---
# 端点

/api/av/searchAttributeView

# searchAttributeView

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/av.go "查看源文件")

需要认证

## 接口描述

根据关键词搜索属性视图 (Attribute Views)。可以指定需要排除的属性视图。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| keyword | string | 是 | 用于搜索属性视图名称的关键词。 |
| excludes | array (string) | 否 | 一个包含属性视图 ID 的数组，这些 ID 将被排除在搜索结果之外。 |

## 返回值

返回一个包含搜索结果的对象。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 返回信息 |
| data | object | 包含搜索结果的对象：
-   `results` (array): 搜索到的属性视图列表。每个元素是一个对象，包含：
    -   `id` (string): 属性视图的 ID。
    -   `name` (string): 属性视图的名称。

 |

请求示例

返回示例

### 请求示例

```
POST /api/av/searchAttributeView
Content-Type: application/json
Authorization: Token your-api-token

{
  "keyword": "任务",
  "excludes": ["20231027100000-uvwxyzab"]
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "results": [
      {
        "id": "20231027150000-abcdefgh",
        "name": "项目任务列表"
      },
      {
        "id": "20231028110000-ghijklmn",
        "name": "个人任务追踪"
      }
      // ... more results
    ]
  }
}
```

