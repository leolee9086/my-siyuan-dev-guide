---
title: 思源笔记 Kernel
---
# 端点

/api/setting/addVirtualBlockRefInclude

![Logo](../logo.png)

# 思源笔记 Kernel API

[官网](https://b3log.org/siyuan) [GitHub](https://github.com/siyuan-note/siyuan) [API 索引](../index.html)

# /api/setting/addVirtualBlockRefInclude

POST /api/setting/addVirtualBlockRefInclude

## 认证状态

需要认证 需要管理员权限 检查只读模式

此接口需要用户登录，并且当前用户必须拥有管理员权限。在工作空间或笔记本被设置为只读模式时，此接口的操作将被禁止。

## 接口描述

添加一批关键词到虚拟块引用的"包含"列表中。此功能用于帮助用户更精确地控制和优化虚拟引用的结果，使其更符合预期。

操作成功后，系统会广播一个 `setConf` 事件，以通知客户端配置已更新。

## 请求体 (JSON)

请求体需要包含一个 JSON 对象，其中包含以下字段：

```json
{
    "keywords": ["string", "string", "..."]
}
```

-   `keywords` (string\[\], 必需): 一个字符串数组，代表要添加到虚拟块引用包含列表中的关键词。

## 响应体 (JSON)

接口会返回一个标准的 JSON 对象，其结构如下：

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

-   `code` (number): 返回码，`0` 表示成功，其他值表示失败。
-   `msg` (string): 返回消息，通常在失败时提供额外信息。
-   `data` (null): 成功时，此字段为 `null`。

## 请求示例

假设我们要将关键词 "项目A" 和 "核心技术" 添加到虚拟块引用的包含列表中。

```json
POST /api/setting/addVirtualBlockRefInclude
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token YOUR_API_TOKEN

{
    "keywords": ["项目A", "核心技术"]
}
```

## 响应示例 (成功)

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

## 响应示例 (失败 - 例如未提供关键词)

```json
{
    "code": -1,
    "msg": "keywords is required",
    "data": null
}
```

注意: 具体的错误码和消息可能因实际情况而异。

© 2024 B3log Team. All rights reserved.

[赞助我们](https://ld246.com/sponsor)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
