---
title: 自动添加空格
---
# 端点

/api/format/autoSpace

# 自动添加空格

需要认证

**注意：** 此操作会直接修改文档内容，建议在操作前进行确认或备份。

## 接口描述

对指定文档的所有块内容进行处理，自动在中文与英文、数字、符号之间添加空格，以符合 Pangu.js 规范，优化排版。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 要处理的文档ID |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | null | 无返回数据（操作直接修改文档） |

请求示例

返回示例

### 请求示例

```
POST /api/format/autoSpace HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "id": "20220301153724-vy37rik"
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": null
}
```

