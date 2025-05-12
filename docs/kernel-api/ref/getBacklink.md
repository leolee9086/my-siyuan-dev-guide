---
title: 获取块的反向链接
---
# 端点

/api/ref/getBacklink

# 获取块的反向链接

需要认证

## 接口描述

获取指定块的反向链接（Backlinks）和提及（Mentions）。反向链接是指其他块中明确引用了该块的内容，提及是指其他块中提到了该块的名称或别名但未创建链接。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 目标块 ID |
| k | string | 否 | 搜索关键词，用于在反链和提及中进行过滤 |
| mk | string | 否 | 仅在提及（Mentions）中搜索的关键词 |
| sort | number | 否 | 排序方式，默认为 0 (相关度/内容排序?)，其他值待确认 (例如 1: 按创建时间升序, 2: 按创建时间降序, 3: 按更新时间升序, 4: 按更新时间降序) |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 包含反链和提及信息的对象 |
| data.backlinks | array | 反向链接列表 |
| data.backlinks\[\].id | string | 来源块 ID |
| data.backlinks\[\].block | object | 来源块的详细信息 (结构类似 getBlockInfo 返回的 data) |
| data.backmentions | array | 反向提及列表 |
| data.backmentions\[\].id | string | 来源块 ID |
| data.backmentions\[\].block | object | 来源块的详细信息 (结构类似 getBlockInfo 返回的 data) |
| data.k | string | 请求中使用的过滤关键词 \`k\` |
| data.mk | string | 请求中使用的提及过滤关键词 \`mk\` |

请求示例

返回示例

### 请求示例 (获取所有反链和提及)

```
POST /api/ref/getBacklink HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "id": "20231027160000-uvwxyz01"
}
```

### 请求示例 (过滤反链和提及)

```
POST /api/ref/getBacklink HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "id": "20231027160000-uvwxyz01",
  "k": "重要",
  "sort": 4 
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "backlinks": [
      {
        "id": "20231027160500-abcdefg",
        "block": { /* 来源块的详细信息 */ }
      },
      // ... more backlinks
    ],
    "backmentions": [
      {
        "id": "20231027161000-hijklmn",
        "block": { /* 来源块的详细信息 */ }
      }
      // ... more backmentions
    ],
    "k": "重要",
    "mk": ""
  }
}
```

