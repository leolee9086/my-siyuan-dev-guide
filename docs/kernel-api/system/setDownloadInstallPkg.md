---
title: 设置自动下载安装包 (setDownloadInstallPkg)
---
# 端点

/api/system/setDownloadInstallPkg

## 接口描述

此 API 端点 `POST /api/system/setDownloadInstallPkg` 用于设置思源笔记是否在检测到新版本后自动下载安装包。

此设置对应于用户界面中的"设置"->"系统"->"启动时检查更新并自动下载安装包"选项。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

-   **`downloadInstallPkg`** (boolean, 必需): 是否允许自动下载安装包。
    -   `true`: 允许自动下载。
    -   `false`: 禁止自动下载。

**请求示例 (允许自动下载):**

```json
{
    "downloadInstallPkg": true
}
```

**请求示例 (禁止自动下载):**

```json
{
    "downloadInstallPkg": false
}
```

## 响应体

**成功响应 (HTTP 200 OK):**

成功设置选项后，API 返回：

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

**失败响应 (HTTP 200 OK, 但 code 非 0):**

-   如果请求体不是有效的 JSON，或者缺少必需的 `downloadInstallPkg` 字段，将返回类似：
    
    ```json
    {
        "code": -1,
        "msg": "Request body is not valid JSON", // 或 "downloadInstallPkg is missing"
        "data": null
    }
    ```
    

_注意: 认证失败 (如未提供 API Token、非管理员等) 会由中间件处理，并返回相应的 HTTP 错误状态码 (如 401, 403)。_

## 认证与授权

调用此 API 端点需要有效的用户认证 (通过 `Authorization` HTTP头部传递 API Token)。

此外，执行此操作需要：

-   **管理员角色 (`model.CheckAdminRole`):** 只有管理员用户才能更改此设置。
-   **非只读模式 (`model.CheckReadonly`):** 不能在只读模式下执行此操作。

## 备注

-   此设置会保存到思源笔记的配置文件 `conf.json` 中的 `system.downloadInstallPkg` 字段。
-   更改此设置不会立即触发 UI 重新加载。

> 感谢您对思源笔记的关注与支持！
> 
> [在爱发电上赞助我们](https://afdian.com/a/leolee9086?tab=feed)

© 2024-2025 [思源笔记 B3log.org](https://b3log.org/siyuan). All rights reserved.
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
