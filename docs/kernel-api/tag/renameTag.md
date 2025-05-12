---
title: 重命名标签
---
# 端点

/api/tag/renameTag

# 重命名标签

需要认证

## 接口描述

将已有的标签重命名为新名称。此操作会修改所有包含该标签的块，将原标签更新为新标签。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| oldName | string | 是 | 原标签名称，不含前导标记符号（如 #） |
| newName | string | 是 | 新标签名称，不含前导标记符号（如 #） |

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
POST /api/tag/renameTag HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "oldName": "笔记",
  "newName": "知识管理"
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

