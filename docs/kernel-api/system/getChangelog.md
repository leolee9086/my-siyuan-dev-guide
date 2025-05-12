---
title: 获取更新日志 (getChangelog)
---
# 端点

/api/system/getChangelog

## 接口描述

此 API 端点 `POST /api/system/getChangelog` 用于获取当前思源笔记版本的更新日志内容。

通常在思源笔记启动后，如果配置项 `conf.ShowChangelog` 为 `true`，前端会调用此接口来显示"更新内容"弹窗。成功获取并显示一次后，`conf.ShowChangelog` 会被设置为 `false`，后续调用将不再返回更新日志，除非该配置被重新激活。

## 请求参数

此 API 不需要任何请求参数。发送一个空的 JSON 对象 `{}` 即可。

**请求示例 (空JSON对象):**

```json
{}
```

## 响应体

响应体是一个 JSON 对象，包含以下字段：

-   `code` (number): 状态码，0 表示成功。
-   `msg` (string): 状态信息。
-   `data` (object): 包含实际数据的对象，结构如下：
    -   `show` (boolean): 指示是否应显示更新日志。如果为 `true`，表示成功获取到日志内容。如果为 `false`，则表示未找到日志文件、`conf.ShowChangelog` 为false或读取失败。
    -   `html` (string): 更新日志的 HTML 内容字符串。如果 `show` 为 `false`，此字段通常为空字符串。

**成功响应示例:**

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "show": true,
        "html": "<h2>版本 v3.0.0 更新内容</h2><ul><li>新功能 A</li><li>修复 B</li></ul>"
    }
}
```

**不显示日志时的响应示例:**

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "show": false,
        "html": ""
    }
}
```

## 认证与授权

此 API 端点不需要用户认证即可访问。

## 备注

-   更新日志的源文件位于思源工作目录下的 `changelogs/v<版本号>/v<版本号>[_语言代码].md`。
-   如果特定语言的日志文件不存在，会尝试加载不带语言代码的通用版本。
-   此接口主要由思源前端在启动时自动调用，用于向用户展示版本更新信息。

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
