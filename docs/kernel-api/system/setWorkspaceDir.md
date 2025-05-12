---
title: 设置工作空间目录 (setWorkspaceDir)
---
# 端点

/api/system/setWorkspaceDir

# 设置工作空间目录 (setWorkspaceDir)

[首页](../index.html) | [System API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/workspace.go#L265)

## 功能描述

此 API 端点 `POST /api/system/setWorkspaceDir` 用于设置要切换到的下一个工作空间目录。

**重要：**此 API **不会立即切换**工作空间。它主要负责更新工作空间列表文件 (\`conf/workspaces.json\`)，将指定的工作空间路径移动到列表末尾，表明它是"预定"要切换到的工作空间。

实际的切换操作通常需要用户在界面上确认，或者在应用重启后完成（尤其是在移动端，此 API 会尝试触发应用关闭以进行切换）。

此 API 会进行多项检查，例如不允许将当前工作空间、云盘同步目录或（Windows下）安装目录设置为目标工作空间。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `path` (string): **必填**。目标工作空间的绝对路径。

**请求示例:**

```json
{
  "path": "/path/to/your/target/workspace"
}
```

在 Windows 上，路径格式可能像这样：

```json
{
  "path": "D:\\MyWorkspaces\\AnotherSiyuan"
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

如果操作失败（例如路径无效、是当前工作空间、位于禁止的目录下等），将返回非 0 的 `code` 和具体的错误信息 `msg`。某些错误下还会返回 \`data\` 对象包含 \`closeTimeout\`，提示前端显示错误消息的时长。

```json
{
  "code": -1,
  "msg": "Cannot switch to current workspace", // 示例错误信息
  "data": {
    "closeTimeout": 3000
  }
}
```

```json
{
  "code": -1,
  "msg": "Workspace cannot be created in cloud drive synchronization directory", // 示例错误信息
  "data": {
    "closeTimeout": 7000
  }
}
```

```json
{
  "code": -1,
  "msg": "Workspace cannot be created in the installation directory", // 示例错误信息
  "data": {
    "closeTimeout": 5000
  }
}
```

## 在线测试

您可以在下方输入目标工作空间的绝对路径进行在线测试。请确保路径有效且符合要求。

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
