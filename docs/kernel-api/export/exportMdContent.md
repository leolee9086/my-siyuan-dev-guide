---
title: 导出 Markdown 内容
---
# 端点

/api/export/exportMdContent

# 导出 Markdown 内容

需要认证

## 接口描述

获取指定文档的原始 Markdown 内容，包括文档的层级路径。这个接口不会生成文件，仅返回文档内容。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 文档 ID |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 错误信息，成功时为空 |
| data | object | 导出结果数据 |
| data.hPath | string | 文档的层级路径 |
| data.content | string | 文档的 Markdown 内容 |

请求示例

返回示例

### 请求示例

```
POST /api/export/exportMdContent HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-api-token

{
  "id": "20220714215400-dd0jbge"
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "hPath": "/笔记本/文件夹/文档",
    "content": "# 文档标题\n\n这是文档的内容，包含一些 **Markdown** 格式。\n\n## 二级标题\n\n* 列表项 1\n* 列表项 2\n"
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
