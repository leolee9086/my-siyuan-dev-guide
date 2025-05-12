---
title: 获取块树信息
---
# 端点

/api/block/getBlockTreeInfos

[← 返回 Block API 列表](../pages/block.html)

# 获取块树信息

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block.go#L32)

`POST /api/block/getBlockTreeInfos`

## 描述

批量获取一组块 ID 对应的基本树状信息，通常用于在 UI 中展示块的摘要信息，例如图标、类型、路径、名称等。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `ids` | `[string]` | 要获取信息的块 ID 数组。 | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 是一个包含每个块树信息的对象数组。具体字段可能较多，取决于 \`model.Block\` 结构体的定义。

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "id": "20230101120000-block1",
      "box": "Inbox",
      "path": "/path/to/doc1",
      "name": "Block Name 1",
      "alias": "",
      "memo": "",
      "type": "p", // 块类型，如 'p', 'h1', 'l', 'i', 'd' 等
      "subType": "", // 子类型
      "icon": "icon-doc", // 图标
      // ... 可能还有其他 Block 属性
    },
    {
      "id": "20230101120000-block2",
      // ... 其他块的信息
    }
    // ...
  ]
}
```

**注意:** 响应数据中的具体字段依赖于后端 \`model.GetBlockTreeInfos\` 函数返回的结构体内容，这里仅为示例。

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

思源笔记 API 文档
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
