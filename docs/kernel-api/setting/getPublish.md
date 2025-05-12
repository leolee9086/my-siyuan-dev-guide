---
title: 思源笔记 Kernel
---
# 端点

/api/setting/getPublish

![Logo](../logo.png)

# 思源笔记 Kernel API

[官网](https://b3log.org/siyuan) [GitHub](https://github.com/siyuan-note/siyuan) [API 索引](../index.html)

# /api/setting/getPublish

POST /api/setting/getPublish

## 认证状态

需要认证 需要管理员权限 检查只读模式

此接口需要用户登录，并且当前用户必须拥有管理员权限。只读模式检查依然会执行，但对于获取配置信息的操作，通常不产生直接影响。

## 接口描述

获取当前思源笔记的发布服务配置信息以及该服务正在运行的端口号。

调用此接口时，如果发布服务尚未初始化，系统会尝试进行初始化。成功后返回当前的发布配置详情和端口号。

## 请求体

此接口不需要请求体。

## 响应体 (JSON)

接口会返回一个标准的 JSON 对象，其 `data` 字段包含发布配置和端口信息：

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "port": 6807, // 发布服务运行的端口号
        "publish": { // 完整的发布配置对象 (结构参考 conf.Publish)
            "apiKey": "your-publish-api-key",
            "enabled": true,
            "servePath": "/publish/",
            "cloudServePath": "",
            "cname": "",
            "cors": false,
            "baiduAnalytics": "",
            "googleAnalytics": "",
            "umamiAnalytics": "",
            "canonical": "",
            "responseHeaders": {},
            "customHTMLHead": "",
            "customCSS": "",
            "customJS": "",
            "imageMaxSize": 2048,
            "listSize": 20,
            "sitemap": true,
            "sitemapExcludeKeywords": [],
            "slugBlockLimit": 0,
            "slugUsePropertyKey": "",
            "theme": "",
            "themeMode": 0,
            "themeLight": "",
            "themeDark": "",
            "webhooks": [],
            "rss": true,
            "rssTitle": "",
            "rssDescription": "",
            "rssItemCount": 20,
            "rssFooter": "",
            "rssFullText": false,
            "docAllowList": "",
            "docBlockAllowList": "",
            "publishBlockCount": 0,
            "publishFileCount": 0
            // ... 其他可能的发布配置项
        }
    }
}
```

-   `code` (number): 返回码，`0` 表示成功，其他值表示失败。
-   `msg` (string): 返回消息，通常在失败时（如发布服务初始化失败）提供额外信息。
-   `data` (object): 包含发布信息的对象。
    -   `port` (number): 发布服务当前运行的端口号。
    -   `publish` (object): 一个对象，包含了所有当前的发布配置项。其具体字段和结构对应于思源笔记内部的 \`conf.Publish\` 结构体。

## 请求示例

```json
POST /api/setting/getPublish
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token YOUR_API_TOKEN

{}
```

即使不需要请求体，也建议发送一个空的 JSON 对象 `{}`。

© 2024 B3log Team. All rights reserved.

[赞助我们](https://ld246.com/sponsor)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
