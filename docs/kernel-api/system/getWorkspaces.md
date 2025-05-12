---
title: 获取工作空间列表 (getWorkspaces)
---
# 端点

/api/system/getWorkspaces

## 接口描述

此 API 端点 `POST /api/system/getWorkspaces` 用于获取当前用户配置的所有思源笔记工作空间的列表。

在桌面端，它会读取用户配置文件 (例如 Linux/macOS 上的 `~/.siyuan/conf.json` 或 Windows 上的相应路径) 中的 `workspaces` 列表。

**注意：**在移动端 (iOS, Android, HarmonyOS)，此接口会直接返回，不提供工作空间列表。

此接口需要用户认证。

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
-   `data` (array | null):
    -   在桌面端成功时，为一个包含工作空间对象的数组。工作空间对象按路径升序排序。
    -   在移动端，或发生错误时，可能为 `null` 或空数组 (取决于具体错误和平台行为)。

每个工作空间对象的结构如下：

-   `path` (string): 工作空间的绝对路径。
-   `closed` (boolean): 根据当前后端实现，此字段**始终为 `false`**，并未实际反映工作空间的打开/关闭状态。

**成功响应示例 (桌面端):**

```json
{
    "code": 0,
    "msg": "",
    "data": [
        {
            "path": "/Users/username/Documents/SiYuan/MyNotes",
            "closed": false
        },
        {
            "path": "/Users/username/Documents/SiYuan/WorkNotes",
            "closed": false
        }
    ]
}
```

**响应示例 (移动端，可能情况):**

```json
{
    "code": 0,
    "msg": "",
    "data": null // 或者 []
}
```

**失败响应示例 (例如读取配置文件失败):**

```json
{
    "code": -1,
    "msg": "read user conf failed: open /Users/username/.siyuan/conf.json: no such file or directory",
    "data": null
}
```

## 认证与授权

此 API 需要有效的用户认证。请求时必须在 HTTP Header 中提供 `Authorization` 字段，其值为 API Token。

不需要管理员权限。

## 备注

-   此接口可用于在切换工作空间或管理多个工作空间时，获取已配置的工作空间路径列表。
-   `closed` 字段当前不具有实际意义，请勿依赖其值判断工作空间状态。

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
