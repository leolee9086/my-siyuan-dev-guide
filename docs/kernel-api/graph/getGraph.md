---
title: 获取全局关系图
---
# 端点

/api/graph/getGraph

[← 返回 Graph API 列表](../pages/graph.html)

# 获取全局关系图

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/graph.go#L50)

`POST /api/graph/getGraph`

## 描述

获取整个工作空间的全局关系图数据（节点和边）。可以提供关键词和配置项来过滤和定制关系图的显示。

此 API 会根据传入的 `conf` 参数更新并保存全局关系图的配置。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `k` | `string` | 搜索关键词，用于过滤关系图中的节点。空字符串表示不过滤。 | 是 |
| `conf` | `object` | 关系图配置对象，用于定制关系图的生成。具体字段可参考思源笔记关系图设置面板，常见字段包括：
-   `maxNodes` (number): 最大节点数
-   `dailyNoteKeepDays` (number): 仅保留最近 N 天的日记节点（0 不限制）
-   `minRefs` (number): 节点被引次数下限
-   `nodeSize` (object): 节点大小配置 { min, max }
-   `linkWidth` (object): 连线宽度配置 { min, max }
-   `hideRelations` (boolean): 是否隐藏关联
-   `hideParents` (boolean): 是否隐藏父级
-   `hideTypes` (object): 按类型隐藏节点 { "NodeDocument": false, ... }
-   ... 更多配置请参考 `conf.NewGlobalGraph()`

 | 是 |
| `reqId` | `any` | 请求标识符，会原样返回在响应中。 | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 字段包含关系图数据和配置。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "nodes": [
      {
        "id": "20200812220555-lj3enxa",
        "label": "节点标题",
        "type": "NodeDocument", // 节点类型 (NodeDocument, NodeHeading, etc.)
        "value": 10, // 节点大小，可能基于引用数等计算
        "path": "/path/to/doc.sy",
        "box": "笔记本ID",
        "originalType": "d", // 原始类型
        "subType": "d" // 子类型
      },
      // ... more nodes
    ],
    "links": [
      {
        "source": "20200812220555-lj3enxa", // 源节点 ID
        "target": "20210101120000-abcdefg", // 目标节点 ID
        "label": "", // 边的标签 (通常为空)
        "value": 1 // 边的宽度
      },
      // ... more links
    ],
    "conf": { /* 当前生效的关系图配置对象 */ },
    "box": "", // 全局关系图，box ID 通常为空
    "reqId": "请求时传入的 reqId"
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
