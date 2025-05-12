---
title: 获取文档创建保存路径
---
# 端点

/api/filetree/getDocCreateSavePath

# 获取文档创建保存路径

需要认证

## 接口描述

获取在指定笔记本和路径下创建新文档时，系统建议的默认保存路径。这对于需要确定新文档确切存储位置的场景很有用。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| notebook | string | 是 | 笔记本ID |
| path | string | 是 | 目标路径，如"/foo/bar" |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 返回数据 |
| data.path | string | 建议的文档保存路径 |

请求示例

返回示例

### 请求示例

```
POST /api/filetree/getDocCreateSavePath HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "notebook": "20210808180117-czj9bvb",
  "path": "/教程"
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "path": "/教程/未命名文档"
  }
}
```

