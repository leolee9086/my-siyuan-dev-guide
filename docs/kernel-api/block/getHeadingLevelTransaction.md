---
title: 获取标题级别调整事务
---
# 端点

/api/block/getHeadingLevelTransaction

[← 返回 Block API 列表](../pages/block.html)

# 获取标题级别调整事务

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block.go#L190)

`POST /api/block/getHeadingLevelTransaction`

## 描述

获取当调整指定标题块的级别（例如，从 H2 改为 H3）时，需要执行的底层事务操作。同样，只返回事务列表，不实际执行更改。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `id` | `string` | 要调整级别的标题块 ID。 | 是 |
| `level` | `number` | 目标标题级别 (1-6)。 | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 是包含事务对象的数组，描述了调整级别所需的操作。

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "do": "updateBlock", // 操作类型
      "id": "20230101120000-headingid", // 目标 ID
      "data": {
        "dataType": "markdown",
        "data": "### 新标题内容"
      },
      "sql": "UPDATE blocks SET markdown=?, updated=? WHERE id=?",
      "params": [
        "### 新标题内容",
        "timestamp",
        "20230101120000-headingid"
      ]
    }
    // ... 可能还有其他相关事务
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
