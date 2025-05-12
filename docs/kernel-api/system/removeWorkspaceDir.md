---
title: 移除工作空间目录 (removeWorkspaceDir)
---
# 端点

/api/system/removeWorkspaceDir

# 移除工作空间目录 (removeWorkspaceDir)

[首页](../index.html) | [System API](index.html) | [GitHub Source (workspace.go)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/workspace.go#L130)

## 功能描述

此 API 端点 `POST /api/system/removeWorkspaceDir` 用于从思源笔记的已知工作空间列表中移除一个指定的目录路径。

**重要提示：**此操作仅将该路径从配置文件 (`workspace.json`) 中移除，并不会删除磁盘上实际的目录或文件。如果需要彻底删除工作空间及其内容，请使用 `/api/system/removeWorkspaceDirPhysically` API（高风险！）。

无法移除当前正在使用的工作空间。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `path` (string): **必填**。要从列表中移除的工作空间目录的绝对路径。

**请求示例:**

```json
{
  "path": "/path/to/remove/workspace"
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 为 `null`。

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

如果操作失败（例如尝试移除当前工作空间、无法读写工作空间列表文件等），将返回非 0 的 `code` 和具体的错误信息 `msg`。

```json
{
  "code": -1,
  "msg": "Cannot remove current workspace", // 示例错误信息
  "data": {"closeTimeout": 3000} // 特定情况下可能包含 data
}
```

```json
{
  "code": -1,
  "msg": "write workspace conf [...] failed: ...", // 示例错误信息
  "data": null
}
```

## 在线测试

您可以在下方输入要从列表中移除的工作空间目录的绝对路径进行在线测试。这不会删除实际文件。

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
