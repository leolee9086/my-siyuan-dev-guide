---
title: 重命名文档
---
# 端点

/api/filetree/renameDoc

# 重命名文档

需要认证

## 接口描述

重命名指定的文档。此接口会更新文档的名称和路径。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| notebook | string | 是 | 笔记本ID |
| path | string | 是 | 文档路径，如"/foo/bar" |
| title | string | 是 | 新的文档标题 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | null | 无返回数据 |

**注意：** 重命名文档会导致引用该文档的链接可能需要更新。系统会自动同步更新文档的父文档、文档标题块，以及文档双链引用。

请求示例

返回示例

### 请求示例

```
POST /api/filetree/renameDoc HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "notebook": "20210808180117-czj9bvb",
  "path": "/教程/思源笔记简介",
  "title": "思源笔记入门指南"
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

