---
title: 创建快照
---
# 端点

/api/repo/createSnapshot

[← 返回 Repo API 列表](../pages/repo.html)

# 创建快照

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/repo.go)

`POST /api/repo/createSnapshot`

## 描述

创建数据仓库的快照，将当前工作区的状态保存为一个快照点。用户可以通过此功能记录重要的工作状态，并在需要时回退到特定的快照状态。快照包含了工作区的文档和资源的完整状态。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `memo` | `string` | 快照备注信息，用于描述此快照的内容或目的 | 是 |
| `tags` | `string[]` | 快照标签，用于分类和组织快照 | 否 |
| `path` | `string` | 指定要快照的路径，如果不指定则快照整个工作区 | 否 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 包含快照的 ID 和创建时间。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "20221015221432-hftdl5o",   // 快照 ID
    "created": "20221015221432"      // 创建时间
  }
}
```

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
