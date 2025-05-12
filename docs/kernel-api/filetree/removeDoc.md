---
title: 删除文档
---
# 端点

/api/filetree/removeDoc

# 删除文档

需要认证

**警告：** 删除操作不可恢复，请谨慎操作。删除文档将同时删除其所有子文档和块。

## 接口描述

删除指定的文档及其所有子文档。此操作会将文档移至回收站，可以通过回收站恢复。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| notebook | string | 是 | 笔记本ID |
| path | string | 是 | 文档路径，如"/foo/bar" |

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
POST /api/filetree/removeDoc HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "notebook": "20210808180117-czj9bvb",
  "path": "/教程/思源笔记简介"
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

