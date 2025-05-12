---
title: 处理扩展复制内容 (copy)
---
# 端点

/api/extension/copy

# 处理扩展复制内容 (copy)

[首页](../index.html) | [Extension API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/extension.go#L39)

## 功能描述

此 API 端点 `POST /api/extension/copy` 用于处理来自思源笔记扩展（如浏览器剪藏扩展）或其他外部应用复制粘贴的内容。

它的核心功能是将传入的 HTML 内容（`dom` 字段）转换为 Markdown，并自动处理其中引用的外部资源（如图片）。它会下载这些资源，将其保存到思源笔记的本地 `assets` 目录下，并更新 Markdown 中相应的链接，使其指向本地保存的资源。

这使得用户可以方便地将网页片段或其他富文本内容连同其包含的图片等资源一起快速保存到思源笔记中，并转换为 Markdown 格式。

## 请求参数

请求必须使用 `POST` 方法，并且 Content-Type 必须是 `multipart/form-data`。

表单数据应包含以下部分：

-   **`dom`** (string): 必填。包含要处理的 HTML 内容的字符串。
-   **`notebook`** (string): 可选。目标笔记本的 ID。如果提供，资源文件将尝试保存到此笔记本的 `assets/` 目录下（`data/{notebookID}/assets/`）；如果未提供或笔记本不存在，则保存到工作空间的公共 `assets/` 目录（`data/assets/`）。
-   **文件部分**: 若干个文件字段。每个字段的 `name` 必须是该文件在原始 HTML 中的 URL（经过 URL 编码）。服务器会读取这些文件内容并保存到本地。  
    例如，如果 HTML 中有 `<img src="https://example.com/image.png">`，则需要有一个名为 `https%3A%2F%2Fexample.com%2Fimage.png` 的文件字段。

## 响应结果

成功的请求将返回一个 JSON 对象，格式如下：

```json
{
  "code": 0,
  "msg": "", // 成功时通常为空或为语言包中的提示信息，例如 "剪藏成功"
  "data": {
    "md": "处理后的 Markdown 文本", // 包含本地资源链接的 Markdown
    "withMath": false // 布尔值，指示转换后的 Markdown 是否包含数学公式块
  }
}
```

-   `code`: 0 表示成功，非 0 表示失败。
-   `msg`: 错误信息或成功提示。
-   `data.md`: 经过处理的 Markdown 文本，其中原始 HTML 中的外部资源链接已被替换为指向本地 `assets` 目录的相对路径链接。
-   `data.withMath`: 一个布尔值，如果转换过程中检测到并处理了数学公式（例如 MathJax），则为 `true`，否则为 `false`。

如果处理过程中发生错误（如创建目录失败、读取文件失败、写入文件失败等），`code` 将为 -1，并包含错误信息在 `msg` 字段中。

## 在线测试

由于此 API 涉及文件上传和复杂表单数据构造，不适合在简单的 Web 表单中进行在线测试。请使用支持发送 `multipart/form-data` 请求的工具（如 Postman、Insomnia 或 curl）进行测试。

**在线测试已禁用。**

思源笔记 API 文档 | 最后更新时间：

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
