---
title: 重置全局关系图配置
---
# 端点

/api/graph/resetGraph

[← 返回 Graph API 列表](../pages/graph.html)

# 重置全局关系图配置

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/graph.go#L27)

`POST /api/graph/resetGraph`

## 描述

将全局关系图的显示配置（例如最大节点数、节点大小、隐藏类型等）恢复为系统默认设置，并保存更改。

## 请求参数

此 API 不需要任何请求参数。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| 无 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 字段包含重置后的默认全局关系图配置对象。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "conf": { // 默认的全局关系图配置对象
        "maxNodes": 256,
        "dailyNoteKeepDays": 0,
        "minRefs": 0,
        "nodeSize": {"min": 8, "max": 32},
        "linkWidth": {"min": 1, "max": 5},
        "hideRelations": false,
        "hideParents": false,
        "hideKitchen": false,
        "hideHouse": false,
        "hideDailyNote": false,
        "hideUnreferenced": false,
        "hideFolders": false,
        "hideLost": false,
        "hideFragment": false,
        "hideContent": false,
        "hideTypes": {}
        // ... 其他默认配置字段
    }
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
