---
title: 创建工作空间目录 (createWorkspaceDir)
---
# 端点

/api/system/createWorkspaceDir

# 创建工作空间目录 (createWorkspaceDir)

[首页](../index.html) | [System API](index.html) | [GitHub Source (workspace.go)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/workspace.go#L80)

## 功能描述

此 API 端点 `POST /api/system/createWorkspaceDir` 用于创建一个新的目录作为思源笔记的工作空间，并将其路径添加到已知的工作空间列表中。

如果指定的目录已存在，则不会重新创建，但仍会将其路径添加到工作空间列表中（如果尚未存在于列表末尾）。

**重要提示：**此 API 仅负责创建指定的目录本身并更新工作空间列表文件 (`workspace.json`)。它 **不会** 自动创建工作空间内部所需的 `conf`、`data` 等子目录和配置文件。如果需要一个功能完整的新工作空间，可能需要结合其他操作或 API。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `path` (string): **必填**。要创建或添加为工作空间的目录的绝对路径。路径名称需要符合思源笔记对工作空间名称的规范（例如，不能包含 "conf", "data" 等，长度不能过长）。

**请求示例:**

```json
{
  "path": "/path/to/create/new_siyuan_workspace"
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

如果操作失败（例如路径名称非法、无法创建目录、无法读写工作空间列表文件等），将返回非 0 的 `code` 和具体的错误信息 `msg`。

```json
{
  "code": -1,
  "msg": "This workspace name is not allowed, please use another name", // 示例错误信息
  "data": null
}
```

```json
{
  "code": -1,
  "msg": "create workspace dir [/path/to/create/...] failed: permission denied", // 示例错误信息
  "data": null
}
```

## 在线测试

您可以在下方输入要创建或添加的工作空间目录的绝对路径进行在线测试。

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
