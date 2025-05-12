---
title: 获取标签
---
# 端点

/api/tag/getTag

# 获取标签

需要认证

## 接口描述

获取思源笔记中的所有标签及其下的子标签。标签是组织内容的重要方式，允许用户对块和文档进行分类和筛选。

## 请求参数

此接口不需要参数。

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 返回数据 |
| data.tags | array | 标签列表 |
| data.tags\[\].name | string | 标签名称，不含前导标记符号 |
| data.tags\[\].count | number | 使用此标签的块数量 |
| data.tags\[\].id | string | 标签ID |
| data.tags\[\].children | array | 子标签数组，结构与父级相同 |
| data.count | number | 标签总数量 |

请求示例

返回示例

### 请求示例

```
POST /api/tag/getTag HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "tags": [
      {
        "name": "笔记",
        "count": 15,
        "id": "20220301120000-a1b2c3d4",
        "children": [
          {
            "name": "思源",
            "count": 8,
            "id": "20220301120001-e5f6g7h8",
            "children": []
          },
          {
            "name": "教程",
            "count": 7,
            "id": "20220301120002-i9j0k1l2",
            "children": []
          }
        ]
      },
      {
        "name": "开发",
        "count": 10,
        "id": "20220302130000-m3n4o5p6",
        "children": [
          {
            "name": "API",
            "count": 5,
            "id": "20220302130001-q7r8s9t0",
            "children": []
          }
        ]
      },
      {
        "name": "待办",
        "count": 6,
        "id": "20220303140000-u1v2w3x4",
        "children": []
      }
    ],
    "count": 6
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
