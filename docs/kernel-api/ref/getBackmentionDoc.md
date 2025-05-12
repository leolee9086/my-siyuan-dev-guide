---
title: 获取反向提及文档内容
---
# 端点

/api/ref/getBackmentionDoc

[← 返回 Ref API 列表](./index.html)

# 获取反向提及文档内容

[在 GitHub 上查看源码 (ref.go)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/ref.go#L40)

需要认证

## 接口描述

获取指定定义块（defID）在特定文档树（refTreeID）中的反向提及内容。可以根据关键词过滤，并控制是否包含子块内容以及是否高亮关键词。

此接口调用内核的 `model.GetBackmentionDoc()` 方法。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| defID | string | 是 | 被引用的定义块 ID。 |
| refTreeID | string | 是 | 引用所在文档的根块 ID。 |
| keyword | string | 是 | 用于过滤提及内容的关键词。如果不需要过滤，可以传入空字符串。 |
| containChildren | boolean | 否 | 是否包含子块内容。默认为用户在编辑器设置中的 "反链包含子级文档" 选项 (`model.Conf.Editor.BacklinkContainChildren`)。 |
| highlight | boolean | 否 | 是否高亮关键词。默认为 `true`。 |

## 返回值

返回标准的 JSON 结构，其中 `data` 字段包含一个对象，该对象包含 `backmentions` 和 `keywords` 两个数组：

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功，其他表示失败。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 成功时，包含结果的对象；失败时可能为 null。 |
| data.backmentions | array | 反向提及内容块的数组。具体结构请参考 `model.GetBackmentionDoc` 的返回。 |
| data.keywords | array | 高亮关键词的数组。具体结构请参考 `model.GetBackmentionDoc` 的返回。 |

请求示例

返回示例 (结构参考)

### 请求示例

```json
{
  "defID": "20210310100000-abcdefg",
  "refTreeID": "20200812220409-hijklmn",
  "keyword": "思源笔记",
  "containChildren": true,
  "highlight": true
}
```

### 成功返回示例 (结构参考)

注意：`backmentions` 和 `keywords` 的具体内容和结构取决于实际数据和 `model.GetBackmentionDoc` 的实现细节。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "backmentions": [
      // 示例：可能包含提及块的 ID、内容片段等
      {
        "id": "20220510140000-pqrstuv",
        "content": "这是一个提及了 ...思源笔记... 的块。",
        "type": "p" 
        // ... 其他可能的字段
      }
    ],
    "keywords": [
      // 示例：可能包含高亮关键词的信息
      "思源笔记"
    ]
  }
}
```

### 失败返回示例

```json
{
  "code": -1, 
  "msg": "Specific error message from kernel, e.g., defID not found.",
  "data": null
}
```
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
