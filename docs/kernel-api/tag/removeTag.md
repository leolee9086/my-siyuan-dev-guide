---
title: 移除标签
---
# 端点

/api/tag/removeTag

# 移除标签

需要认证

## 接口描述

移除系统中的指定标签。此操作将从所有包含该标签的块中删除该标签。请谨慎使用，因为这将影响所有引用此标签的内容。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| name | string | 是 | 要移除的标签名称，不含前导标记符号（如 #） |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | null | 无返回数据 |

请求示例

返回示例

### 请求示例

```
POST /api/tag/removeTag HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "name": "待办"
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

