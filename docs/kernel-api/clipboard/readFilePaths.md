---
title: 读取剪贴板文件路径 (readFilePaths)
---
# 端点

/api/clipboard/readFilePaths

## 接口描述

此 API 端点 `POST /api/clipboard/readFilePaths` 用于尝试从系统剪贴板中读取文件路径列表。这通常用于处理用户从操作系统的文件管理器复制文件后，在思源笔记中进行粘贴操作的场景，以便获取这些文件的本地路径。

## 认证与授权

调用此 API 端点需要有效的用户认证，并通过 `Authorization` HTTP 头部传递 API Token。

此外，执行此操作需要：

-   **管理员角色 (`model.CheckAdminRole`)**

_注意：此接口没有 `model.CheckReadonly` 中间件，理论上可在只读模式下调用。_

## 请求参数

此接口不需要任何请求参数。可以发送一个空的 JSON 对象 `{}` 作为请求体，或者不包含请求体。

## 响应体

响应体为 JSON 格式。接口总是返回 HTTP 200 OK 状态码，响应体中的 `code` 字段始终为 `0`。

**成功响应 (剪贴板有文件路径，非 Linux 环境):**

```json
{
    "code": 0,
    "msg": "",
    "data": [
        "/path/to/your/file1.txt",
        "/another/path/to/image.png"
    ]
}
```

**成功响应 (剪贴板无文件路径，或在 Linux 环境下调用):**

```json
{
    "code": 0,
    "msg": "",
    "data": []
}
```

`data` 字段是一个包含从剪贴板读取到的文件绝对路径的字符串数组。如果剪贴板中没有文件路径，或者在 Linux 系统上调用此接口，则返回空数组 `[]`。

## 备注

-   此功能在 Linux 系统上会直接返回空数组，因为 Linux 端不再支持在"粘贴为纯文本"操作时处理文件绝对路径。相关讨论见 [GitHub Issue #5825](https://github.com/siyuan-note/siyuan/issues/5825)。
-   此接口依赖于外部库 `github.com/88250/clipboard` 来实现跨平台的剪贴板文件路径读取。
-   即使底层库读取失败，该接口通常也会返回 `"data": []` 而不是错误码。

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
