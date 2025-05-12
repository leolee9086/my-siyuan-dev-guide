---
title: 查找替换
---
# 端点

/api/search/findReplace

# 查找替换

需要认证

**警告：这是一个不可逆的操作！** 查找替换会直接修改块内容。请务必在执行前确认查找和替换的范围及内容，或进行备份！

## 接口描述

在指定范围（整个工作空间、笔记本或文档）内查找文本，并将其替换为新的文本。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| k | string | 是 | 要查找的关键词 |
| r | string | 是 | 替换后的文本 |
| id | string | 否 | 查找范围的 ID。可以是笔记本 ID 或文档块 ID。如果为空，则在整个工作空间内查找替换。 |
| ignoreCase | boolean | 否 | 是否忽略大小写，默认为 false |
| regex | boolean | 否 | 是否使用正则表达式进行查找，默认为 false |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 包含替换结果的对象 |
| data.replaceCount | number | 成功替换的数量 |
| data.ids | array | 被修改的块 ID 列表 |

请求示例

返回示例

### 请求示例 (在指定文档内查找替换)

```
POST /api/search/findReplace HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "k": "旧文本",
  "r": "新文本",
  "id": "20231027150000-abcdefg", 
  "ignoreCase": false,
  "regex": false
}
```

### 请求示例 (在整个工作空间查找替换，忽略大小写)

```
POST /api/search/findReplace HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "k": "siyuan",
  "r": "思源笔记",
  "id": "", 
  "ignoreCase": true,
  "regex": false
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "replaceCount": 5,
    "ids": [
      "20231027150000-abcdefg",
      "20231027150100-hijklmn",
      "20231027150200-opqrstu",
      "20231027150300-vwxyzab",
      "20231027150400-cdefghi"
    ]
  }
}
```

