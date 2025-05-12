---
title: 获取文档历史内容
---
# 端点

/api/history/getDocHistoryContent

# 获取文档历史内容

[源文件 (GitHub, 推测位置)](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/history.go#L165 "查看源文件 (推测)")

需要认证 需要管理员权限

## 接口描述

获取指定历史快照中某个特定文档的内容。这允许用户查看或预览文档在过去某个时间点的具体状态。

接口会读取指定的历史 `.sy` 文件，解析其内容（JSON AST），并将其渲染为只读格式返回。如果提供了关键词，会在内容中进行高亮（仅对非大文档生效）。

## 请求参数 (JSON Body)

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| historyPath | string | 是 | 目标历史文档文件的绝对路径（相对于工作空间 `data/` 目录）。例如: `/history/20231027110000/20231027105900-abcdefg/20231027105901-hijklmn.sy`。此路径通常需要结合 `/api/history/getNotebookHistory` 返回的 `hCreated` 和 `items[].path` 手动构造（注意 `items[].path` 可能需要拼接笔记本 ID）。 |
| k | string | 否 | 用于在返回内容中高亮显示的关键词。多个词用空格分隔。 |
| highlight | boolean | 否 | 是否执行关键词高亮，默认为 `true`。仅当参数 `k` 非空时有效，且对大文档无效。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功，非 0 表示失败。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 包含文档历史内容数据。 |
| data.id | string | 文档 ID。 |
| data.rootID | string | 文档的根块 ID。 |
| data.content | string | 渲染后的只读历史文档内容。**格式注意：**对于普通大小的文档，此字段通常包含适用于 Protyle 编辑器的 HTML DOM 字符串；对于大文档（`isLargeDoc` 为 true），此字段可能包含纯文本或 Markdown 格式的内容。 |
| data.isLargeDoc | boolean | 指示该历史文档是否为大文档（文件大小 >= 1MB）。这会影响 `content` 字段的渲染格式和高亮是否生效。 |

请求示例

返回示例

### 请求示例

```
POST /api/history/getDocHistoryContent HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-api-token

{
  "historyPath": "/history/20231027110000/20231027105900-abcdefg/20231027105901-hijklmn.sy",
  "k": "重要 笔记",
  "highlight": true
}
```

### 返回示例 (普通文档)

```
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "20231027105901-hijklmn",
    "rootID": "20231027105901-hijklmn",
    "content": "<div data-node-id=\"20231027105901-hijklmn\" data-type=\"NodeDocument\" class=\"protyle-wysiwyg\"><div data-node-id=\"20231027110500-uvwxyz\" data-type=\"NodeParagraph\" class=\"p\">这是一段<mark data-type=\"search-mark">重要</mark>的<mark data-type=\"search-mark">笔记</mark>内容。</div><!-- More HTML DOM nodes --></div>",
    "isLargeDoc": false
  }
}
```

### 返回示例 (大文档，无高亮)

```
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "20231028120000-largeid",
    "rootID": "20231028120000-largeid",
    "content": "# 大文档标题\n\n这是大文档的第一段...\n\n这是第二段... (内容可能是纯文本或Markdown)",
    "isLargeDoc": true
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
