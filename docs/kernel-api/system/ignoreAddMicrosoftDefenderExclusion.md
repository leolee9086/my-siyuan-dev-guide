---
title: 忽略添加 Microsoft Defender 排除项 (ignoreAddMicrosoftDefenderExclusion)
---
# 端点

/api/system/ignoreAddMicrosoftDefenderExclusion

## 接口描述

此 API 端点 `POST /api/system/ignoreAddMicrosoftDefenderExclusion` 用于设置一个配置项，标记用户已选择忽略"将思源笔记添加到 Microsoft Defender 排除项"的建议。

**注意：此接口仅在 Windows 操作系统上有效。**在其他操作系统上调用此接口不会执行任何操作，但仍会返回成功响应。

此接口需要管理员权限，并且在只读模式下可能无法成功保存配置。

## 请求参数

此 API 不需要任何请求参数。发送一个空的 JSON 对象 `{}` 即可。

**请求示例 (空JSON对象):**

```json
{}
```

## 响应体

在所有情况下 (包括非 Windows 系统，或 Windows 系统上操作成功)，API 均返回标准的成功 JSON 响应结构：

-   `code` (number): 状态码，始终为 0 表示操作（或尝试操作）被接受。
-   `msg` (string): 状态信息，通常为空字符串。
-   `data` (null): 通常为 `null`。

**标准响应示例:**

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

_注意：即使在只读模式下配置保存失败，或者在非 Windows 系统上调用，此 API 仍然返回 `code: 0`。实际的配置是否成功写入依赖于后端日志和具体环境。_

## 认证与授权

此 API 需要有效的用户认证和管理员权限：

-   必须在 HTTP Header 中提供 `Authorization` 字段，其值为 API Token。
-   调用者必须具有管理员角色 (`model.CheckAdminRole`)。
-   接口会尝试修改配置，因此在只读模式 (`model.CheckReadonly`) 下，配置保存可能失败。

如果认证失败或权限不足，服务器通常会返回相应的错误状态码 (如 HTTP 401 Unauthorized 或 403 Forbidden) 和错误信息，此时响应的 `code` 可能不为 0。

## 备注

-   此接口主要用于思源笔记内部，当用户在 Windows 系统上选择"不再提示"或"忽略"关于添加 Microsoft Defender 排除项的建议时调用。
-   调用后，相关的配置项 `conf.System.MicrosoftDefenderExcluded` 会被设置为 `true` 并尝试保存。

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
