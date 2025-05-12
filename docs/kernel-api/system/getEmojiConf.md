---
title: 获取 Emoji 配置 (getEmojiConf)
---
# 端点

/api/system/getEmojiConf

## 接口描述

此 API 端点 `POST /api/system/getEmojiConf` 用于获取思源笔记中所有可用的 Emoji表情配置，包括内置 Emoji 和用户自定义 Emoji。

它会首先加载内置的 Emoji 配置文件 (`appearance/emojis/conf.json`)，然后扫描用户数据目录下的自定义 Emoji (`data/emojis/`) 并将其合并到结果中。自定义 Emoji 会被优先展示。

此接口需要用户认证。

## 请求参数

此 API 不需要任何请求参数。发送一个空的 JSON 对象 `{}` 即可。

**请求示例 (空JSON对象):**

```json
{}
```

## 响应体

响应体是一个 JSON 数组，其中每个元素代表一个 Emoji 分组对象。结构如下：

-   `code` (number): 状态码，0 表示成功，-1 表示失败。
-   `msg` (string): 状态信息，成功时为空字符串。
-   `data` (array): 包含 Emoji 分组对象的数组。
    -   **自定义 Emoji 分组 (通常是第一个元素):**
        -   `id` (string): 固定为 "custom"。
        -   `title` (string): 分组标题，如 "Custom" (英文环境)。
        -   `title_zh_cn` (string): 中文标题，如 "自定义"。
        -   `title_ja_jp` (string): 日文标题，如 "カスタム"。
        -   `items` (array): 包含自定义 Emoji 对象的数组。每个 Emoji 对象结构如下：
            -   `unicode` (string): Emoji 图片的相对路径 (相对于 `/emojis/` 目录)，例如 `"cool.png"` 或 `"subdir/awesome.gif"`。
            -   `description` (string): Emoji 的描述，通常是去除扩展名的文件名。
            -   `description_zh_cn` (string): 中文描述。
            -   `description_ja_jp` (string): 日文描述。
            -   `keywords` (string): 用于搜索的关键词。
    -   **内置 Emoji 分组 (后续元素):**
        
        这些分组对象来自 `appearance/emojis/conf.json` 文件。其具体结构可能类似自定义分组，包含 `id`, `title` (及各语言版本), 和一个 `items` 数组。`items` 中的每个 Emoji 对象结构也可能包含 `unicode` (这里可能是真实的 Unicode 字符或代号), `description`, `keywords` 等字段。
        
        _注意: 内置 Emoji 的具体字段请参考 `appearance/emojis/conf.json` 的实际内容。_
        

**成功响应示例 (部分):**

```json
{
    "code": 0,
    "msg": "",
    "data": [
        {
            "id": "custom",
            "title": "Custom",
            "title_zh_cn": "自定义",
            "title_ja_jp": "カスタム",
            "items": [
                {
                    "unicode": "my_custom_emoji.png",
                    "description": "my_custom_emoji",
                    "description_zh_cn": "my_custom_emoji",
                    "description_ja_jp": "my_custom_emoji",
                    "keywords": "my_custom_emoji"
                }
                // ... more custom emojis
            ]
        },
        {
            "id": "people",
            "title": "People",
            // ... title translations
            "items": [
                {
                    "unicode": "😀",
                    "description": "grinning face",
                    // ... keywords, etc.
                }
                // ... more built-in emojis in this category
            ]
        }
        // ... more built-in emoji categories
    ]
}
```

**失败响应示例:**

```json
{
    "code": -1,
    "msg": "read emojis conf.json failed: open appearance/emojis/conf.json: no such file or directory",
    "data": null
}
```

## 认证与授权

此 API 需要有效的用户认证。请求时必须在 HTTP Header 中提供 `Authorization` 字段，其值为 API Token。

如果认证失败，服务器通常会返回 HTTP 401 Unauthorized 状态码。

## 备注

-   自定义 Emoji 存储在 `[思源工作空间]/data/emojis/` 目录下。您可以直接在此目录中添加图片文件 (如 .png, .gif, .jpg) 或包含图片文件的子目录来扩展 Emoji 列表。
-   自定义 Emoji 的 `unicode` 字段实际上是其相对于 `/emojis/` 的访问路径，前端可以通过 `<img src="/emojis/[unicode_value]">` 来显示。
-   内置 Emoji 的 `unicode` 字段通常是标准的 Emoji 字符。

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
