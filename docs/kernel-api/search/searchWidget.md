---
title: 搜索挂件块
---
# 端点

/api/search/searchWidget

# 搜索挂件块

需要认证

## 接口描述

根据关键词搜索工作空间中的挂件块 (widget)。

挂件块是一种特殊的块，通常由插件或主题提供，用于显示动态信息或提供交互功能，其类型通常为 `widget`。

## 实现链接

-   后端路由: [siyuan/kernel/api/router.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/router.go)
-   处理函数: [siyuan/kernel/api/search.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/search.go) (`searchWidget` 函数)
-   核心逻辑: [siyuan/kernel/model/search.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/search.go) (`SearchWidget` 函数)

## 请求参数

| 参数名 | 类型 | 是否必须 | 描述 |
| --- | --- | --- | --- |
| k | string | 是 | 搜索关键词，用于在挂件块的 ID、名称、别名、备注或内容中搜索。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 包含结果数据的对象。 |
| data.widgets | array | 匹配到的挂件块信息对象数组。 |
| data.widgets\[\].id | string | 挂件块 ID。 |
| data.widgets\[\].name | string | 挂件块名称，关键词会用 `<mark>` 标签高亮。 |
| data.widgets\[\].box | string | 笔记本 ID。 |
| data.widgets\[\].path | string | 挂件块所在文档的路径。 |
| data.widgets\[\].hPath | string | 挂件块的人类可读层级路径。 |
| data.widgets\[\].markdown | string | 挂件块的 Markdown 原文。 |
| data.widgets\[\].updated | string | 更新时间 (YYYYMMDDHHmmss)。 |
| data.k | string | 请求中的关键词 \`k\`。 |
| data.keywords | array | 分词后的关键词数组。 |

请求示例

返回示例

### 请求示例

```json
{
  "k": "天气"
}
```

### 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "widgets": [
      {
        "id": "20231101170000-xxxxxxx",
        "box": "20231026090000-uvwxyz",
        "path": "/widgets/天气挂件.sy",
        "hPath": "/widgets/天气挂件",
        "name": "<mark>天气</mark>挂件",
        "markdown": "{{{Widget id='weather-widget'}}}",
        "updated": "20231101170000"
        // ... 其他块属性
      }
    ],
    "k": "天气",
    "keywords": ["天气"]
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
