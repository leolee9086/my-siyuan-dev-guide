---
title: 获取历史条目
---
# 端点

/api/history/getHistoryItems

# 获取历史条目

需要认证

## 接口描述

根据创建时间和查询条件获取历史记录中的具体条目。

这个接口通常在用户点击某个历史时间点时被调用，用于获取该时间点对应的详细修改记录。

## 实现链接

-   后端路由: [siyuan/kernel/api/router.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/router.go)
-   处理函数: [siyuan/kernel/api/history.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/history.go) (`getHistoryItems` 函数)
-   核心逻辑: [siyuan/kernel/model/history.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/history.go) (`FullTextSearchHistoryItems` 函数)

## 请求体 (JSON)

```json
{
  "created": "历史记录的创建时间戳 (秒)",
  "query": "搜索关键词 (通常是文档 ID)",
  "notebook": "笔记本 ID (可选, 用于过滤)",
  "op": "操作类型 (可选, 如 'all', 'update', 'delete' 等)",
  "type": "历史记录类型 (3 表示文档历史)"
}
```

-   `created`: (`string`) 必填。需要查询的具体历史记录的创建时间戳 (秒)，通常从 `searchHistory` 接口返回的列表中获取。
-   `query`: (`string`) 必填。通常传递文档 ID，以获取该文档在该时间点的历史条目。也可以是其他搜索关键词。
-   `notebook`: (`string`) 可选。如果提供了笔记本 ID，则只在该笔记本范围内查找。
-   `op`: (`string`) 可选。过滤操作类型，例如只看 'update' 操作。默认为 'all'。
-   `type`: (`number`) 必填。指定要查询的历史类型。
    -   `3`: 文档历史 (doc)

请求示例

返回示例

### 请求示例

```json
{
  "created": "1667280000",
  "query": "20231027105900-abcdefg",
  "notebook": "",
  "op": "all",
  "type": 3
}
```

### 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "items": [
      {
        "title": "文档A",
        "path": "20231101100000-u/20231027105900-abcdefg.sy",
        "op": "update",
        "notebook": "20231027105900-abcdefg"
      }
    ]
  }
}
```

## 响应体 (JSON)

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "items": [
      {
        "title": "文档或资源标题",
        "path": "历史文件路径 (相对于 data/history/)",
        "op": "操作类型",
        "notebook": "所属笔记本 ID (仅文档历史)"
      }
      // ... 可能有多个条目
    ]
  }
}
```

-   `data.items`: (`array`) 包含在该时间点、满足查询条件的具体历史条目对象数组。
-   `item.title`: (`string`) 被修改的文档或资源的标题。
-   `item.path`: (`string`) 该历史条目对应的实际文件路径，位于 `data/history/` 目录下。
-   `item.op`: (`string`) 该条目对应的操作类型 (如 'update', 'delete' 等)。
-   `item.notebook`: (`string`) 如果是文档历史，这里是文档所属的笔记本 ID。

