---
title: 获取文档的反向链接
---
# 端点

/api/ref/getBacklinkDoc

# 获取文档的反向链接

需要认证

## 接口描述

获取指定文档的反向链接文档列表。返回的结果是包含引用了该文档中任意块的其他文档列表，以及这些文档中具体的引用位置（块ID）。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| defID | string | 是 | 目标文档的根块 ID（文档 ID） |
| refID | string | 是 | 被引用的块 ID (通常也是文档 ID，表示整个文档被引用) |
| keyword | string | 否 | 关键词，用于在引用块的内容中进行过滤 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 包含反链文档信息的对象 |
| data.backlinks | array | 反向链接文档及引用块列表 |
| data.backlinks\[\].id | string | 来源文档的根块 ID |
| data.backlinks\[\].rootID | string | 来源文档的根块 ID (同 id) |
| data.backlinks\[\].title | string | 来源文档的标题 |
| data.backlinks\[\].path | string | 来源文档的路径 |
| data.backlinks\[\].blockIDs | array | 该文档中引用了目标文档内容的块 ID 列表 |
| data.refCount | number | 总引用块数量 |
| data.docCount | number | 总引用文档数量 |

请求示例

返回示例

### 请求示例

```
POST /api/ref/getBacklinkDoc HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "defID": "20231027160000-uvwxyz01",
  "refID": "20231027160000-uvwxyz01",
  "keyword": ""
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "backlinks": [
      {
        "id": "20231027160500-abcdefg",
        "rootID": "20231027160500-abcdefg",
        "title": "相关项目笔记",
        "path": "/项目A/相关项目笔记.sy",
        "blockIDs": [
          "20231027160510-hijklmn",
          "20231027160520-opqrstu"
        ]
      },
      {
        "id": "20231027161000-vwxyzab",
        "rootID": "20231027161000-vwxyzab",
        "title": "周会记录",
        "path": "/会议记录/周会记录.sy",
        "blockIDs": [
          "20231027161010-cdefghi"
        ]
      }
      // ... more backlink docs
    ],
    "refCount": 3,
    "docCount": 2
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
