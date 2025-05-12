---
title: 搜索引用块
---
# 端点

/api/search/searchRefBlock

# 搜索引用块

需要认证

## 接口描述

根据关键词搜索引用了特定块 ID 的块。

这个接口主要用于在编辑界面查找某个块被哪些地方引用了。

## 实现链接

-   后端路由: [siyuan/kernel/api/router.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/router.go)
-   处理函数: [siyuan/kernel/api/search.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/search.go) (`searchRefBlock` 函数)
-   核心逻辑: [siyuan/kernel/model/search.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/search.go) (`SearchRefBlock` 函数)

## 请求参数

| 参数名 | 类型 | 是否必须 | 描述 |
| --- | --- | --- | --- |
| k | string | 是 | 搜索关键词，用于在引用块的内容中进一步筛选。 |
| id | string | 是 | 被引用的目标块 ID。 |
| m | number | 否 | 每个文档或列表项中最多显示的匹配块数量。默认为 7。 |
| b | number | 否 | 每个匹配块最多显示的上下文（前后）字符数量。默认为 64。 |
| sort | number | 否 | 排序模式：0: 相关度排序 (默认), 1: 按创建时间升序, 2: 按创建时间降序, 3: 按更新时间升序, 4: 按更新时间降序, 5: 按文档名升序, 6: 按文档名降序。 |
| group | number | 否 | 分组模式：0: 按文档分组 (默认), 1: 不分组（列表）。 |
| type | string | 否 | 指定要搜索的块类型。可以是 "d" (文档), "h" (标题), "l" (列表), "i" (列表项), "p" (段落), "t" (表格), "b" (引述), "c" (代码块), "m" (数学公式块), "s" (超级块), "html" (HTML 块)。默认为搜索所有类型。 |
| page | number | 否 | 页码，从 1 开始，默认为 1。 |
| pageSize | number | 否 | 每页结果数量，默认为 10。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 包含结果数据的对象。 |
| data.keywords | array | 分词后的关键词数组。 |
| data.refBlocks | array | 引用了目标块的块信息对象数组（未分组时）或按文档分组的对象数组（分组时）。 |
| data.refBlocks\[\].id | string | 引用块的 ID。 |
| data.refBlocks\[\].content | string | 引用块的内容，关键词会用 `<mark>` 标签高亮。 |
| data.refBlocks\[\].box | string | 笔记本 ID。 |
| data.refBlocks\[\].path | string | 引用块所在文档的路径。 |
| data.refBlocks\[\].hPath | string | 引用块的人类可读层级路径。 |
| data.refBlocks\[\].updated | string | 更新时间 (YYYYMMDDHHmmss)。 |
| data.k | string | 请求中的关键词 \`k\`。 |
| data.matchedRefBlockCount | number | 匹配到的引用块总数。 |
| data.matchedRootCount | number | 涉及的文档（根块）总数。 |
| data.pageCount | number | 总页数。 |
| data.backlinks | array | 目标块的反链信息数组 (似乎不直接用于此接口，但模型可能返回)。 |

请求示例

返回示例

### 请求示例

```json
{
  "k": "项目A",
  "id": "20231030100000-aaaaaaa",
  "m": 7,
  "b": 64,
  "sort": 0,
  "group": 0,
  "page": 1,
  "pageSize": 10
}
```

### 返回示例 (按文档分组)

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "refBlocks": [
      {
        "doc": {
          "id": "20231027105900-abcdefg",
          "box": "20231027105900-abcdefg", // Box ID might be same as doc ID
          "path": "/文档A.sy",
          "hPath": "/文档A",
          "name": "文档A",
          "updated": "20231101100000"
        },
        "blocks": [
          {
            "id": "20231101110000-bbbbbbb",
            "content": "关于<mark>项目A</mark>的讨论，参考 ((20231030100000-aaaaaaa))",
            "box": "20231027105900-abcdefg",
            "path": "/文档A.sy",
            "hPath": "/文档A/讨论",
            "updated": "20231101110000"
            // ... 其他块属性
          }
        ]
      }
      // ... 更多文档分组 ...
    ],
    "keywords": ["项目", "a"],
    "k": "项目A",
    "matchedRefBlockCount": 1,
    "matchedRootCount": 1,
    "pageCount": 1,
    "backlinks": [ /* ... */ ]
  }
}
```

