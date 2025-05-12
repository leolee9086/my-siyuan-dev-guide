---
title: 复制文档
---
# 端点

/api/filetree/duplicateDoc

# 复制文档

需要认证

## 接口描述

复制指定的文档。此操作将在当前目录下创建一个新的文档，包含原文档的所有内容和子文档结构。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 要复制的文档ID |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 返回数据 |
| data.id | string | 新创建的文档ID |
| data.rootID | string | 新文档根ID |
| data.parentID | string | 新文档的父文档ID |
| data.box | string | 笔记本ID |
| data.path | string | 新文档路径 |
| data.hPath | string | 新文档的人类可读路径 |
| data.name | string | 新文档名称（通常会在原名称后添加后缀） |

请求示例

返回示例

### 请求示例

```
POST /api/filetree/duplicateDoc HTTP/1.1
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
  "data": {
    "id": "20230602100000-ghijk12",
    "rootID": "20230602100000-ghijk12",
    "parentID": "",
    "box": "20210808180117-czj9bvb",
    "path": "/20210808180117-czj9bvb/20230602100000-ghijk12.sy",
    "hPath": "/教程/思源笔记简介 1",
    "name": "思源笔记简介 1"
  }
}
```

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
