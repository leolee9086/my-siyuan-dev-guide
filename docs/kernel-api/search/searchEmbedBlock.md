---
title: 查询嵌入块
---
# 端点

/api/search/searchEmbedBlock

# 查询嵌入块

需要认证

## 接口描述

执行嵌入块中的 SQL 查询语句，并返回匹配的块内容。

这是处理形如 `\{\{select * from blocks where ...\}\}` 嵌入块的核心接口。

## 实现链接

-   后端路由: [siyuan/kernel/api/router.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/router.go)
-   处理函数: [siyuan/kernel/api/search.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/search.go) (`searchEmbedBlock` 函数)
-   核心逻辑: [siyuan/kernel/model/search.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/search.go) (`SearchEmbedBlock` 函数)

## 请求参数

| 参数名 | 类型 | 是否必须 | 描述 |
| --- | --- | --- | --- |
| embedBlockID | string | 是 | 发起请求的嵌入块（通常是 `query_embed` 类型）自身的块 ID。 |
| stmt | string | 是 | 要执行的 SQL 查询语句 (通常从嵌入块的 Markdown 内容中提取)。 |
| excludeIDs | array | 是 | 一个包含块 ID 字符串的数组，这些 ID 将从查询结果中排除。通常至少包含嵌入块自身的 ID 和其所在的文档根块 ID，以避免循环嵌入。 |
| headingMode | number | 否 | 标题渲染模式：0: 包含标题块下方的所有子块 (默认), 1: 只包含标题块自身。 |
| breadcrumb | boolean | 否 | 是否为结果中的每个块包含面包屑路径。默认为 \`false\`。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 包含结果数据的对象。 |
| data.blocks | array | SQL 查询匹配到的块信息对象数组。 |
| data.blocks\[\].block | object | 包含块的详细信息，结构与 `/api/block/getBlockInfo` 返回的类似。 |
| data.blocks\[\].blockPaths | array | 如果请求中的 `breadcrumb` 为 \`true\`，这里会包含该块的面包屑路径信息数组。 |

请求示例

返回示例

### 请求示例

```json
{
  "embedBlockID": "20231101160000-abcdefg",
  "stmt": "SELECT * FROM blocks WHERE content LIKE '%思源笔记%' AND type = 'p' ORDER BY updated DESC LIMIT 10",
  "excludeIDs": [
    "20231101160000-abcdefg",
    "20231027105900-hijklmn" 
  ],
  "headingMode": 0,
  "breadcrumb": true
}
```

### 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "blocks": [
      {
        "block": {
          "id": "20231030100000-aaaaaaa",
          "box": "20231027105900-abcdefg",
          "path": "/20231027105900-abcdefg/文档A.sy",
          "hPath": "笔记本名/文档A/介绍", 
          "name": "介绍思源笔记",
          "alias": "",
          "memo": "",
          "tag": "",
          "content": "思源笔记是一款本地优先的笔记软件。",
          "markdown": "思源笔记是一款本地优先的笔记软件。",
          "length": 20,
          "type": "p",
          // ... 其他块属性
        },
        "blockPaths": [
          // ... 面包屑路径对象 ...
        ]
      },
      // ... 更多匹配的块
    ]
  }
}
```
