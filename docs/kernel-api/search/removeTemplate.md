---
title: 删除模板片段
---
# 端点

/api/search/removeTemplate

# 删除模板片段

需要认证

**警告：** 删除操作不可恢复，请谨慎操作。

## 接口描述

删除指定的模板片段文件。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| path | string | 是 | 要删除的模板文件路径，可以通过\`listTemplates\`接口获取 |

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
POST /api/template/removeTemplate HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "path": "/data/templates/要删除的模板.md"
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

