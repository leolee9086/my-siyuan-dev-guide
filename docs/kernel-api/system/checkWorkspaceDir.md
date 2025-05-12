---
title: 检查工作空间目录 (checkWorkspaceDir)
---
# 端点

/api/system/checkWorkspaceDir

# 检查工作空间目录 (checkWorkspaceDir)

[首页](../index.html) | [System API](index.html) | [GitHub Source (workspace.go)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/workspace.go#L35)

## 功能描述

此 API 端点 `POST /api/system/checkWorkspaceDir` 用于检查指定的目录路径是否为一个有效的思源笔记工作空间。

它主要用于在尝试打开或创建工作空间之前的验证步骤，确保目录结构基本符合要求。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `path` (string): **必填**。需要检查的目录的绝对路径。

**请求示例:**

```json
{
  "path": "/path/to/your/siyuan/workspace"
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 包含一个名为 `isWorkspace` 的布尔值。

-   如果指定的路径是一个有效的工作空间（包含 `data` 目录和 `conf/conf.json` 文件），则 `isWorkspace` 为 `true`。
-   如果路径有效但不是一个完整的工作空间结构，则 `isWorkspace` 为 `false`。

**响应示例 (有效的工作空间):**

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "isWorkspace": true
  }
}
```

**响应示例 (路径存在但不是工作空间):**

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "isWorkspace": false
  }
}
```

如果操作失败（例如路径不存在、路径名称非法、无读取权限等），将返回非 0 的 `code` 和具体的错误信息 `msg`，此时 `data` 为 `null`。

```json
{
  "code": -1,
  "msg": "This workspace does not exist", // 示例错误信息
  "data": null
}
```

## 在线测试

您可以在下方输入要检查的目录路径进行在线测试。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

