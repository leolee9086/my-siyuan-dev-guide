---
title: Export Markdown
---
# 端点

/api/export/exportMd

[返回首页](../index.html)

# Export Markdown

**POST** `/api/export/exportMd`

导出 Markdown。

## 请求参数

```json
{
  "id": "string", // 必填，文档/笔记本 id
  "pdf": false, // 可选，是否导出为 PDF
  "paragraphBeginningSpace": false, // 可选，段首是否空两格
  "keepFold": false, // 可选，保持块折叠
  "removeAssets": false // 可选，是否移除资源文件
}
```

## 返回数据

如果导出成功，返回导出的路径。

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "path": "string" // 导出路径
    }
}
```

## 请求示例

```bash
curl -X POST \
  http://127.0.0.1:6806/api/export/exportMd \
  -H 'Authorization: Token YOUR_API_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "id": "20200812220555-z0k8qkk",
    "pdf": false,
    "paragraphBeginningSpace": true,
    "keepFold": false,
    "removeAssets": false
  }'
```

## 响应示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "path": "/path/to/exported/markdown/file.md"
  }
}
```

## 在线测试

  
  
  
{"id": "", "pdf": false, "paragraphBeginningSpace": false, "keepFold": false, "removeAssets": false}  
发送请求

## 导航

-   [返回首页](../index.html)
-   [上一个接口：/api/export/getExportProgress](getExportProgress.html)
-   [下一个接口：/api/export/exportMdContent](exportMdContent.html)
-   [返回 Export API](../pages/export.html)

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
