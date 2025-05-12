---
title: 搜索模板
---
# 端点

/api/search/searchTemplate

# 搜索模板

需要认证

## 接口描述

根据关键词搜索工作空间中的模板片段。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| k | string | 是 | 搜索关键词 |
| page | number | 否 | 页码，默认为 1 |
| size | number | 否 | 每页数量，默认为 20 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 包含模板列表和分页信息的对象 |
| data.templates | array | 匹配的模板数组 |
| data.templates\[\].id | string | 模板块 ID |
| data.templates\[\].content | string | 模板内容（通常是片段名称或预览） |
| data.templates\[\].path | string | 模板所在文档路径 |
| data.pageCount | number | 总页数 |

请求示例

返回示例

### 请求示例

```
POST /api/search/searchTemplate HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "k": "会议",
  "page": 1,
  "size": 10
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "templates": [
      {
        "id": "20230115103000-abcdefg",
        "content": "会议记录模板",
        "path": "/模板/会议模板.sy"
      },
      {
        "id": "20230220140000-hijklmn",
        "content": "周会模板",
        "path": "/模板/常用模板.sy"
      }
      // ...更多匹配的模板
    ],
    "pageCount": 1
  }
}
```

