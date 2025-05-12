---
title: 获取反向链接与提及 (增强版)
---
# 端点

/api/ref/getBacklink2

# 获取反向链接与提及 (增强版)

需要认证

## 接口描述

根据指定的块 ID，获取其反向链接和提及列表。此接口提供了对反向链接和提及的分别筛选和排序功能。

与 `/api/ref/getBacklink` 相比，此接口在参数和返回结构上有所不同，提供了更灵活的控制。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 要查询反向链接和提及的块 ID。 |
| k | string | 是 | 用于筛选**反向链接**列表的关键词。如果不需要筛选，请传递空字符串 `""`。 |
| mk | string | 是 | 用于筛选**提及**列表的关键词。如果不需要筛选，请传递空字符串 `""`。 |
| sort | string | 否 | **反向链接**列表的排序方式。通常是一个代表排序规则的数字字符串 (例如："0" 表示更新时间降序，"1" 表示更新时间升序，"2" 表示创建时间降序等)。默认为按更新时间降序 (`util.SortModeUpdatedDESC`)。具体值需参考内核 `util` 包相关定义。 |
| mSort | string | 否 | **提及**列表的排序方式。规则同 `sort` 参数，作用于提及列表。默认为按更新时间降序 (`util.SortModeUpdatedDESC`)。 |
| containChildren | boolean | 否 | 是否包含子块中的链接和提及。如果未提供，则使用用户在"设置 - 编辑器 - 反链与提及"中的配置值。 |

## 返回值

返回标准的 JSON 结构，其中 `data` 字段为一个包含以下内容的对象：

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功，其他表示失败。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 包含查询结果的对象，详情见下。 |

### `data` 对象详情

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| backlinks | array | 符合条件的反向链接对象数组。每个对象通常包含块ID、内容预览、路径等信息。 |
| linkRefsCount | number | 符合条件的反向链接总数量。 |
| backmentions | array | 符合条件的提及对象数组。结构类似 `backlinks` 中的对象。 |
| mentionsCount | number | 符合条件的提及总数量。 |
| k | string | 请求中传入的 `k` (反向链接关键词) 值。 |
| mk | string | 请求中传入的 `mk` (提及关键词) 值。 |
| box | string | 被查询块 `id` 所在的笔记本 ID。 |

请求示例

返回示例

### 请求示例 (查询并筛选排序)

```
{
  "id": "20200812220409-rng0qan",
  "k": "思源笔记",
  "mk": "API",
  "sort": "0", 
  "mSort": "2", 
  "containChildren": true
}
```

### 请求示例 (不筛选，使用默认排序和配置)

```
{
  "id": "20210310102030-abcdefg",
  "k": "",
  "mk": ""
}
```

### 成功返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "backlinks": [
      {
        "id": "20230510100000-aabbcc1", 
        "name": "关于思源笔记的讨论", 
        "content": "...提到了思源笔记的API...",
        "hPath": "/文档/技术相关/关于思源笔记的讨论",
        "box": "box123",
        // ... 其他字段
      }
    ],
    "linkRefsCount": 1,
    "backmentions": [
      {
        "id": "20230510100000-aabbcc2", 
        "name": "API设计文档", 
        "content": "...其中包含对API接口的详细说明...",
        "hPath": "/项目/API设计文档",
        "box": "box456",
        // ... 其他字段
      }
    ],
    "mentionsCount": 1,
    "k": "思源笔记",
    "mk": "API",
    "box": "boxSuper"
  }
}
```

### 失败返回示例 (例如，参数缺失)

```
{
  "code": -1,
  "msg": "JSON arg [id] is required",
  "data": null
}
```

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。`backlinks` 和 `backmentions` 数组中对象的具体结构可能因内核版本而异，请以实际返回为准或参考其他相关接口文档。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
