---
title: 列出失效的块引用
---
# 端点

/api/search/listInvalidBlockRefs

# 列出失效的块引用

需要认证

## 接口描述

列出工作空间中所有包含失效块引用的块。

失效块引用是指块链接 `((...))` 或锚文本链接 `[](:siyuan://blocks/...)` 指向的目标块 ID 已经不存在的情况。

此接口通常用于"数据->检查器->失效块引用"功能。

## 实现链接

-   后端路由: [siyuan/kernel/api/router.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/router.go)
-   处理函数: [siyuan/kernel/api/search.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/search.go) (`listInvalidBlockRefs` 函数)
-   核心逻辑: [siyuan/kernel/model/search.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/search.go) (`ListInvalidBlockRefs` 函数)

## 请求参数

| 参数名 | 类型 | 是否必须 | 描述 |
| --- | --- | --- | --- |
| page | number | 否 | 页码，从 1 开始，默认为 1。 |
| pageSize | number | 否 | 每页结果数量，默认为 32。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 包含结果数据的对象。 |
| data.blocks | array | 包含失效块引用的块信息对象数组。 |
| data.blocks\[\].id | string | 块 ID。 |
| data.matchedBlockCount | number | 总共找到的包含失效引用的块数量。 |
| data.matchedRootCount | number | 总共涉及的文档（根块）数量。 |
| data.pageCount | number | 总页数。 |

请求示例

返回示例

### 请求示例

```json
{
  "page": 1,
  "pageSize": 10
}
```

### 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "blocks": [
      {
        "id": "20231030100000-aaaaaaa",
        "box": "20231027105900-abcdefg",
        "path": "/20231027105900-abcdefg/文档A.sy",
        "hPath": "/文档A/引用段落",
        "name": "",
        "alias": "",
        "memo": "",
        "tag": "",
        "content": "这是一个引用 ((20231029000000-bbbbbbb '已删除块'))",
        "markdown": "这是一个引用 ((20231029000000-bbbbbbb '已删除块'))",
        "length": 40,
        "type": "p",
        // ... 其他块属性
      },
      {
        "id": "20231031110000-ccccccc",
        "box": "20231026090000-uvwxyz",
        "path": "/20231026090000-uvwxyz/文档B.sy",
        "hPath": "/文档B/链接段落",
        // ... 其他块属性
        "markdown": "这是一个链接 [已删除锚文本](siyuan://blocks/20231028000000-ddddddd)"
      }
    ],
    "matchedBlockCount": 5,
    "matchedRootCount": 3,
    "pageCount": 1
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
