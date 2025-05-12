---
title: 获取局部关系图
---
# 端点

/api/graph/getLocalGraph

[← 返回 Graph API 列表](../pages/graph.html)

# 获取局部关系图

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/graph.go#L90)

`POST /api/graph/getLocalGraph`

## 描述

获取以指定文档或块 ID 为中心的局部关系图数据（节点和边）。可以提供关键词和配置项来过滤和定制关系图的显示范围和样式。

此 API 会根据传入的 `conf` 参数更新并保存局部关系图的配置。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `id` | `string` | 中心文档或块的 ID。关系图将围绕此节点构建。 | 是 |
| `k` | `string` | 搜索关键词，用于过滤关系图中的节点。空字符串表示不过滤。 | 是 |
| `conf` | `object` | 局部关系图配置对象。常见字段包括：
-   `maxNodes` (number): 最大节点数
-   `neighborDepth` (number): 邻居节点深度
-   `nodeSize` (object): 节点大小配置 { min, max }
-   `linkWidth` (object): 连线宽度配置 { min, max }
-   `hideRelations` (boolean): 是否隐藏关联
-   `hideParents` (boolean): 是否隐藏父级
-   ... 更多配置请参考 `conf.NewLocalGraph()`

 | 是 |
| `reqId` | `any` | 请求标识符，会原样返回在响应中。 | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 字段包含关系图数据和配置。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "请求传入的中心节点ID",
    "nodes": [
      // ... 节点数组，结构同 getGraph ...
    ],
    "links": [
      // ... 边数组，结构同 getGraph ...
    ],
    "conf": { /* 当前生效的局部关系图配置对象 */ },
    "box": "中心节点所在笔记本ID",
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
