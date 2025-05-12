---
title: 获取本地快照文件内容 (getRepoFile)
---
# 端点

/api/repo/getRepoFile

# 获取本地快照文件内容 (getRepoFile)

[首页](../index.html) | [Repo API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/repo.go#L32)

## 功能描述

此 API 端点 `POST /api/repo/getRepoFile` 用于获取当前工作空间本地版本库中某个特定快照里的指定文件内容。

该 API 主要用于查看历史版本的文件。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `id` (string): **必填**。要获取的文件的唯一 ID。此 ID 由快照 ID 和文件路径组成，格式为 `<snapshot-id>:<file-path-in-snapshot>`。
-   例如：`20240315200000-uvwxyz0:data/documents/20231027100000-abcdefg.sy` 表示获取快照 \`20240315200000-uvwxyz0\` 中的文件 \`data/documents/20231027100000-abcdefg.sy\`。

**请求示例:**

```json
{
  "id": "20240315200000-uvwxyz0:data/documents/20231027100000-abcdefg.sy"
}
```

## 响应结果

**重要：**此 API 不返回 JSON 数据。成功的请求将直接返回文件的原始二进制数据。

响应头中的 `Content-Type` 会根据文件的实际类型自动设置（例如 `image/png`, `application/json`, `text/plain; charset=utf-8` 等）。如果无法识别文件类型，则默认为 `application/octet-stream`。

如果发生错误（例如文件 ID 无效、快照不存在、读取文件失败等），将返回标准的 JSON 错误响应：

```json
{
  "code": -1, // 或其他非零错误码
  "msg": "具体的错误信息",
  "data": null
}
```

## 在线测试

您可以在下方输入文件的 ID 进行在线测试。

**注意：**由于此 API 直接返回文件内容，在线测试器可能无法直接显示非文本文件的内容（如图片、压缩包等）。浏览器可能会尝试下载文件或显示乱码。对于文本文件（如 .sy, .md, .txt, .json），通常可以正常显示。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求 (尝试显示文本) 发送请求 (尝试下载)

### 响应结果 (尝试文本预览):

无法直接显示，尝试 [下载文件](#)。

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
