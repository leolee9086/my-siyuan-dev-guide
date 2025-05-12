---
title: 获取标题删除事务
---
# 端点

/api/block/getHeadingDeleteTransaction

[← 返回 Block API 列表](../pages/block.html)

# 获取标题删除事务

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block.go#L166)

`POST /api/block/getHeadingDeleteTransaction`

## 描述

获取当删除指定标题块时，需要执行的一系列底层操作（事务）。通常用于插件或脚本在执行删除操作前预览或模拟所需的数据库更改。直接返回事务列表，不执行删除。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `id` | `string` | 要获取删除事务的标题块 ID。 | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 是一个包含多个事务对象的数组。每个事务对象描述了一个具体操作。

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "do": "deleteBlock", // 操作类型
      "id": "20230101120000-headingid", // 操作目标 ID
      "data": null, // 操作相关数据 (这里为 null)
      "sql": "DELETE FROM blocks WHERE id=?", // 对应的 SQL 语句
      "params": ["20230101120000-headingid"] // SQL 参数
    },
    {
      "do": "deleteAttr", // 另一个操作
      "id": "20230101120000-headingid",
      "data": null,
      "sql": "DELETE FROM attributes WHERE block_id=? AND name=?",
      "params": ["20230101120000-headingid", "bookmark"]
    }
    // ... 可能还有其他事务
  ]
}
```

**注意:** 事务的具体内容和格式取决于后端实现，这里仅为示例。

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
