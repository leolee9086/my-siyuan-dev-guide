---
title: 获取工作空间信息 (getWorkspaceInfo)
---
# 端点

/api/system/getWorkspaceInfo

## 接口描述

此 API 端点 `POST /api/system/getWorkspaceInfo` 用于获取当前思源笔记的工作空间基本信息，包括工作空间目录路径和当前思源的版本号。

此接口需要管理员权限。

## 请求参数

此 API 不需要任何请求参数。发送一个空的 JSON 对象 `{}` 即可。

**请求示例 (空JSON对象):**

```json
{}
```

## 响应体

响应体是一个 JSON 对象，包含以下字段：

-   `code` (number): 状态码，0 表示成功。
-   `msg` (string): 状态信息，成功时为空字符串。
-   `data` (object): 包含实际数据的对象，结构如下：
    -   `workspaceDir` (string): 当前工作空间的绝对路径。例如：`"D:\SiyuanWorkspace\MyNotes"`。
    -   `siyuanVer` (string): 当前思源笔记的版本号。例如：`"2.10.0"`。

**成功响应示例:**

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "workspaceDir": "/Users/username/Documents/SiYuan/data",
        "siyuanVer": "2.10.5"
    }
}
```

**失败响应示例 (例如认证失败或无管理员权限):**

```json
{
    "code": -1, // 或其他错误码，如 401 Unauthorized
    "msg": "permission denied", // 或具体的错误信息
    "data": null
}
```

## 认证与授权

此 API 需要有效的用户认证和管理员权限：

-   必须在 HTTP Header 中提供 `Authorization` 字段，其值为 API Token。
-   调用者必须具有管理员角色 (`model.CheckAdminRole`)。
-   接口行为可能在只读模式 (`model.CheckReadonly`) 下受影响，但对于此接口，主要是权限检查。

如果认证失败或权限不足，服务器通常会返回相应的错误状态码 (如 HTTP 401 Unauthorized 或 403 Forbidden) 和错误信息。

## 备注

-   此接口主要用于程序化获取当前环境的基本信息。

> 感谢您对思源笔记的关注与支持！
> 
> [在爱发电上赞助我们](https://afdian.com/a/leolee9086?tab=feed)

© 2024 [思源笔记 B3log.org](https://b3log.org/siyuan). All rights reserved.
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
