---
title: 获取书签标签
---
# 端点

/api/attr/getBookmarkLabels

# 获取书签标签

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/attr.go "查看源文件")

需要认证

## 接口描述

获取当前工作空间中所有用作书签的标签（即 \`bookmark\` 属性非空的块的 \`tag\` 属性值）。

## 请求参数

此接口不需要请求参数。

## 返回值

返回一个包含所有书签标签字符串的列表。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | string\[\] | 书签标签列表。 |

请求示例 (cURL)

返回示例

### 请求示例 (cURL)

```
curl -X POST \
  http://127.0.0.1:6806/api/attr/getBookmarkLabels \
  -H 'Authorization: Token YOUR_API_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{}'
```

### 返回示例

```
{
    "code": 0,
    "msg": "",
    "data": [
        "重要",
        "待办",
        "阅读"
    ]
}
```

