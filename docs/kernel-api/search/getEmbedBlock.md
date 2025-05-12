---
title: 获取动态嵌入块内容
---
# 端点

/api/search/getEmbedBlock

# 获取动态嵌入块内容

需要认证

## 接口描述

根据提供的块 ID 列表获取嵌入块内容。

此接口主要用于处理前端通过 JavaScript 脚本 (\`//!js\`) 动态计算得到的块 ID 列表，然后获取这些块的内容以渲染嵌入块。

## 实现链接

-   后端路由: [siyuan/kernel/api/router.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/router.go)
-   处理函数: [siyuan/kernel/api/search.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/search.go) (`getEmbedBlock` 函数)
-   核心逻辑: [siyuan/kernel/model/search.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/search.go) (`GetEmbedBlock` 函数)

## 请求参数

| 参数名 | 类型 | 是否必须 | 描述 |
| --- | --- | --- | --- |
| embedBlockID | string | 是 | 发起请求的嵌入块（通常是 `query_embed` 类型）自身的块 ID。 |
| includeIDs | array | 是 | 一个包含块 ID 字符串的数组，这些是前端通过 \`//!js\` 脚本计算得出的，需要被包含在嵌入结果中的块。 |
| headingMode | number | 否 | 标题渲染模式：0: 包含标题块下方的所有子块 (默认), 1: 只包含标题块自身。 |
| breadcrumb | boolean | 否 | 是否为结果中的每个块包含面包屑路径。默认为 \`false\`。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 包含结果数据的对象。 |
| data.blocks | array | 包含请求的 `includeIDs` 对应的块信息对象数组，数组顺序会按照 `includeIDs` 的顺序排列。 |
| data.blocks\[\].block | object | 包含块的详细信息，结构与 `/api/block/getBlockInfo` 返回的类似。 |
| data.blocks\[\].blockPaths | array | 如果请求中的 `breadcrumb` 为 \`true\`，这里会包含该块的面包屑路径信息数组。 |

请求示例

返回示例

### 请求示例

```json
{
  "embedBlockID": "20231101150000-uvwxyz1",
  "includeIDs": [
    "20231030090000-abcdefg",
    "20231031100000-hijklmn"
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
          "id": "20231030090000-abcdefg",
          "box": "20231027105900-abcdefg",
          "path": "/20231027105900-abcdefg/文档A.sy",
          "hPath": "/文档A/一级标题/目标段落1",
          "name": "目标段落1内容前缀",
          "alias": "",
          "memo": "",
          "tag": "",
          "content": "这是目标段落1的内容。",
          "markdown": "这是目标段落1的内容。",
          "length": 15,
          "type": "p",
          "subtype": "",
          "ial": {},
          "sort": 1,
          "created": "20231030T090000Z",
          "updated": "20231030T090500Z"
        },
        "blockPaths": [
          // ... 面包屑路径对象 ...
        ]
      },
      {
        "block": {
          "id": "20231031100000-hijklmn",
          "box": "20231026090000-uvwxyz",
          "path": "/20231026090000-uvwxyz/文档B.sy",
          "hPath": "/文档B/目标段落2",
          "name": "目标段落2内容前缀",
          "alias": "",
          "memo": "",
          "tag": "",
          "content": "这是目标段落2的内容。",
          "markdown": "这是目标段落2的内容。",
          "length": 15,
          "type": "p",
          "subtype": "",
          "ial": {},
          "sort": 0,
          "created": "20231031T100000Z",
          "updated": "20231031T100500Z"
        },
        "blockPaths": [
          // ... 面包屑路径对象 ...
        ]
      }
    ]
  }
}
```

