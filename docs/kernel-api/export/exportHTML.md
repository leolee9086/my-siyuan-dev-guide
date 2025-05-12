---
title: 导出 HTML
---
# 端点

/api/export/exportHTML

# 导出 HTML

需要认证

## 接口描述

将指定文档导出为 HTML 格式，支持导出为 PDF 预览，可以设置是否保持折叠状态以及是否合并导出。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 文档 ID |
| pdf | boolean | 是 | 是否用于 PDF 导出 |
| savePath | string | 是 | 导出文件保存路径 |
| keepFold | boolean | 否 | 是否保持折叠状态，默认为 false |
| merge | boolean | 否 | 是否合并导出，默认为 false |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 错误信息，成功时为空 |
| data | object | 导出结果数据 |
| data.id | string | 文档 ID |
| data.name | string | 导出文件名称 |
| data.content | string | 导出的 HTML 内容 |

请求示例

返回示例

### 请求示例

```
POST /api/export/exportHTML HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-api-token

{
  "id": "20220714215400-dd0jbge",
  "pdf": false,
  "savePath": "/data/export/output.html",
  "keepFold": false,
  "merge": true
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "20220714215400-dd0jbge",
    "name": "文档标题",
    "content": "......"
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
