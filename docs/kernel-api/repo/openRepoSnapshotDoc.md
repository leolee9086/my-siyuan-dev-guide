---
title: 打开仓库快照中的文档
---
# 端点

/api/repo/openRepoSnapshotDoc

# 打开仓库快照中的文档

需要认证 需要管理员

## 接口描述

根据提供的历史快照中的文档 ID，获取该文档的详细内容，包括标题、正文内容、用于显示的文本以及更新时间。

## 请求参数 (JSON Body)

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 历史快照中的文档的唯一标识 ID。这个 ID 通常由其他 API（如列出快照内文件或差异对比 API）返回。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 错误信息，成功时为空字符串 |
| data | object | 包含快照文档详细信息的对象。
-   `title`: string - 文档的标题。
-   `content`: string - 文档的主要内容，通常为 HTML 或 Markdown 格式。
-   `displayInText`: string - 用于在特定上下文中（例如差异对比视图）显示的文本版本。具体格式和内容可能取决于快照类型和文档内容。
-   `updated`: number - 文档在该快照中的最后更新时间戳 (毫秒)。

 |

请求示例

返回示例

### 请求示例

```
POST /api/repo/openRepoSnapshotDoc HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token YOUR_API_TOKEN_HERE

{
  "id": "20231027100000-abcdefg-doc-hijklmn"
}
```

### 返回示例 (成功)

```
{
  "code": 0,
  "msg": "",
  "data": {
    "title": "关于新项目A的思考",
    "content": "<p>这是文档的HTML内容...</p>",
    "displayInText": "这是文档的纯文本内容或者特定格式的文本，用于对比显示。",
    "updated": 1682906400000
  }
}
```

### 返回示例 (失败 - ID无效或快照不存在)

```
{
  "code": -1,
  "msg": "open repo snapshot doc [20231027100000-abcdefg-doc-hijklmn] failed: doc not found",
  "data": null
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
