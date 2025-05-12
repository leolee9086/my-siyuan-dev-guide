---
title: 搜索历史记录
---
# 端点

/api/history/searchHistory

# 搜索历史记录

需要认证

## 接口描述

根据条件搜索历史记录，返回按时间分组的快照列表。

这个接口主要用于历史记录面板的列表展示，用户可以通过它浏览不同时间点的历史快照。

## 实现链接

-   后端路由: [siyuan/kernel/api/router.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/router.go)
-   处理函数: [siyuan/kernel/api/history.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/history.go) (`searchHistory` 函数)
-   核心逻辑: [siyuan/kernel/model/history.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/history.go) (`FullTextSearchHistory` 函数)

## 请求体 (JSON)

```json
{
  "query": "搜索关键词",
  "notebook": "笔记本 ID (可选, 用于过滤)",
  "op": "操作类型 (可选, 如 'all', 'update', 'delete' 等)",
  "type": "历史记录类型",
  "page": "页码 (从 1 开始)"
}
```

-   `query`: (`string`) 必填。搜索的关键词，可以为空字符串表示不进行关键词过滤。
-   `notebook`: (`string`) 可选。如果提供了笔记本 ID，则只在该笔记本范围内搜索。
-   `op`: (`string`) 可选。过滤操作类型，例如只看 'update' 操作。默认为 'all'。
-   `type`: (`number`) 必填。指定要搜索的历史类型。
    -   `0`: 文档名 (doc name)
    -   `1`: 文档内容 (doc content)
    -   `2`: 资源文件 (asset)
    -   `3`: 文档 ID (doc id)
-   `page`: (`number`) 必填。要获取的页码，从 1 开始。每页包含固定数量 (目前是 32) 的历史时间点。

## 响应体 (JSON)

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "histories": [
      "1666861200", // 时间戳 (秒)
      "1666857600",
      // ... 更多时间戳
    ],
    "pageCount": 5, // 总页数
    "totalCount": 150 // 总历史时间点数量
  }
}
```

-   `data.histories`: (`array`) 包含符合条件的、去重后的历史记录创建时间戳 (秒) 字符串数组，按时间降序排列。
-   `data.pageCount`: (`number`) 根据查询条件计算的总页数。
-   `data.totalCount`: (`number`) 符合查询条件的总历史时间点数量 (去重后)。

**注意：**

-   此接口只返回时间戳列表，要获取具体时间点下的修改条目，需要使用这些时间戳调用 `getHistoryItems` 接口。

请求示例

返回示例

### 请求示例

```json
{
  "query": "关键词",
  "notebook": "20231026090000-uvwxyz",
  "op": "update",
  "type": 1,
  "page": 1
}
```

### 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "histories": [
      "1667280000",
      "1667193600"
      // ... more timestamps
    ],
    "pageCount": 2,
    "totalCount": 45
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
