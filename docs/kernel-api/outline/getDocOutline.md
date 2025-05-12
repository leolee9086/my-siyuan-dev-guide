---
title: 获取文档大纲
---
# 端点

/api/outline/getDocOutline

# 获取文档大纲

需要认证

## 接口描述

获取指定文档的大纲结构，大纲由文档中的标题块（h1-h6）组成。大纲结构对于导航和理解文档结构非常有帮助。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 文档ID |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | array | 大纲数据，每个元素表示一个标题块 |
| data\[\].id | string | 标题块ID |
| data\[\].box | string | 笔记本ID |
| data\[\].path | string | 块路径 |
| data\[\].hPath | string | 人类可读的块路径 |
| data\[\].name | string | 标题文本内容 |
| data\[\].type | string | 块类型，h1到h6之一 |
| data\[\].depth | number | 标题深度，对应h1到h6的数字 |
| data\[\].subType | string | 子类型信息 |
| data\[\].children | array | 子标题列表，结构与父级相同 |

请求示例

返回示例

### 请求示例

```
POST /api/outline/getDocOutline HTTP/1.1
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
  "data": [
    {
      "id": "20220301153816-dj8ul5t",
      "box": "data",
      "path": "/20210808180117-czj9bvb/20220301153724-vy37rik",
      "hPath": "/教程/思源笔记简介",
      "name": "思源笔记简介",
      "type": "h1",
      "depth": 1,
      "subType": "",
      "children": [
        {
          "id": "20220301153927-kq9m7qs",
          "box": "data",
          "path": "/20210808180117-czj9bvb/20220301153724-vy37rik",
          "hPath": "/教程/思源笔记简介",
          "name": "核心特性",
          "type": "h2",
          "depth": 2,
          "subType": "",
          "children": [
            {
              "id": "20220301154036-rk92lbp",
              "box": "data",
              "path": "/20210808180117-czj9bvb/20220301153724-vy37rik",
              "hPath": "/教程/思源笔记简介",
              "name": "块级引用",
              "type": "h3",
              "depth": 3,
              "subType": "",
              "children": []
            },
            {
              "id": "20220301154112-t8i7nvx",
              "box": "data",
              "path": "/20210808180117-czj9bvb/20220301153724-vy37rik",
              "hPath": "/教程/思源笔记简介",
              "name": "双向链接",
              "type": "h3",
              "depth": 3,
              "subType": "",
              "children": []
            }
          ]
        },
        {
          "id": "20220301154203-s0giqb6",
          "box": "data",
          "path": "/20210808180117-czj9bvb/20220301153724-vy37rik",
          "hPath": "/教程/思源笔记简介",
          "name": "使用场景",
          "type": "h2",
          "depth": 2,
          "subType": "",
          "children": []
        }
      ]
    }
  ]
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
