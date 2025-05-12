---
title: 下载云端快照 (downloadCloudSnapshot)
---
# 端点

/api/repo/downloadCloudSnapshot

# 下载云端快照 (downloadCloudSnapshot)

[首页](../index.html) | [Repo API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/repo.go#L149)

## 功能描述

此 API 端点 `POST /api/repo/downloadCloudSnapshot` 用于从配置的云端存储（如 S3、WebDAV）下载指定的版本库快照到本地。

云端快照通常与标签（tag）相关联。

这是一个后台异步操作，API 调用成功仅表示下载任务已开始。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `id` (string): **必填**。要下载的云端快照的 ID。
-   `tag` (string): **必填**。该快照在云端所属的标签名。

**请求示例:**

```json
{
  "id": "20231027100000-hijklmn", 
  "tag": "v1.0"
}
```

## 响应结果

如果请求参数有效且下载任务成功启动，将返回一个标准的成功响应。

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

-   `code`: 0 表示下载任务已成功启动。非 0 （例如 -1）表示启动失败（如参数错误、网络配置问题、认证失败等）。
-   `msg`: 错误信息（如果 code 非 0）。
-   `data`: 总是 \`null\`。

**注意：** 这是一个异步操作。API 的成功响应不代表下载已完成。下载进度和最终结果需要通过其他方式（如界面状态、日志或可能的 WebSocket 通知）来确认。

## 在线测试

您可以在下方输入要下载的云端快照 ID 和标签进行在线测试。请确保您已正确配置云端同步设置。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

### 响应结果:

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
