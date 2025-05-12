---
title: 获取应用配置 (getConf)
---
# 端点

/api/system/getConf

## 接口描述

此 API 端点 `POST /api/system/getConf` 用于获取当前思源笔记应用的全局配置信息。

返回的配置信息是经过脱敏处理的（通过 `model.GetMaskedConf()`），并且会根据调用者的角色（是否为管理员）进一步隐藏敏感字段（通过 `model.HideConfSecret()`）。

此接口通常在应用启动时由前端调用，以初始化客户端的配置状态。

## 请求参数

此 API 不需要任何功能性的请求参数。发送一个空的 JSON 对象 `{}` 即可。

**请求示例 (空JSON对象):**

```json
{}
```

## 响应体

响应体是一个 JSON 对象，包含以下字段：

-   `code` (number): 状态码，0 表示成功。
-   `msg` (string): 状态信息。
-   `data` (object): 包含实际数据的对象，结构如下：
    -   `conf` (object): 脱敏后的全局配置对象 (对应 \`model.AppConf\` 结构，但部分字段可能被隐藏或置空)。其具体内容庞大，涵盖编辑器、外观、同步、系统设置等多个方面。
    -   `start` (boolean): 一个布尔值，通常表示应用是否处于刚启动、UI尚未完全加载的状态 (其值为 `!util.IsUILoaded`)。
    -   `isPublish` (boolean): 一个布尔值，指示当前环境是否为只读的发布模式。

**成功响应示例 (部分字段):**

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "conf": {
            "appearance": {
                "lang": "zh_CN",
                "theme": "daylight",
                // ... 其他外观配置 (部分敏感信息可能已脱敏)
            },
            "editor": {
                "fontSize": 16,
                // ... 其他编辑器配置
            },
            "sync": {
                "enabled": false,
                "provider": 0,
                "stat": "未开启云端同步服务"
                // ... 其他同步配置 (敏感信息如 token, key 等会被隐藏)
            },
            // ... 更多其他配置项
            "readOnly": false // 根据实际情况，如果是发布模式或非管理员，部分字段会被设为只读或隐藏
        },
        "start": false, // 通常在UI加载后为 false
        "isPublish": false // 是否为发布模式
    }
}
```

**注意:** 响应中 `conf` 对象的具体字段和值会根据服务器配置和调用者权限动态变化，尤其是敏感信息（如认证密钥、API Token等）会被隐藏或屏蔽。

## 认证与授权

此 API 端点不需要显式的用户认证即可访问。但是，返回的配置详细程度取决于调用者的角色：

-   **管理员角色:** 可以获取到相对更完整的配置信息（但仍然是经过初步脱敏的）。
-   **非管理员角色 (包括匿名访问):** 获取到的配置信息会经过更严格的脱敏处理，许多敏感字段将被隐藏或置空。

## 备注

-   返回的 `conf` 对象是思源笔记运行的核心配置，了解其结构有助于理解应用的各项功能设置。
-   由于配置对象的复杂性和动态性，建议开发者在调试时直接观察实际返回的 JSON 数据。

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
