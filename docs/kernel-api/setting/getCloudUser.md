---
title: 思源笔记 Kernel
---
# 端点

/api/setting/getCloudUser


# 思源笔记 Kernel API

[官网](https://b3log.org/siyuan) [GitHub](https://github.com/siyuan-note/siyuan) [API 索引](../index.html)

# /api/setting/getCloudUser

POST /api/setting/getCloudUser

## 认证状态

需要认证 管理员条件性

此接口需要用户登录。如果当前登录用户拥有**管理员权限**，则返回完整的云端账户信息；否则，仅返回有限的登录状态信息。

## 接口描述

获取当前已登录的思源笔记云端账户（如果存在）的相关信息。

返回的信息详细程度取决于调用此接口的用户是否为管理员。非管理员用户通常只能获取到是否已登录云端账户的状态。

## 请求体

此接口不需要请求体。

## 响应体 (JSON)

接口会返回一个标准的 JSON 对象。`data` 对象的具体内容取决于用户权限和登录状态。

### 当用户已登录且为管理员时，`data` 可能包含：

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "loggedIn": true,
        "userCloudEmail": "user@example.com",
        "userCloudName": "用户名",
        "userCloudAvatarURL": "https://example.com/avatar.png",
        "userCloudSpace": 1073741824, // 已用空间 (bytes)
        "userCloudSpaceLimit": 10737418240, // 总空间 (bytes)
        "userCloudSubscribed": true, // 是否为订阅会员
        "userCloudVIPRemoveAds": true, // 会员是否移除广告
        "userCloudDueTime": 1700000000000 // 会员到期时间戳 (毫秒)
        // ... 可能还有其他与云账户相关的字段
    }
}
```

### 当用户已登录但非管理员，或未登录云账户时，`data` 可能类似：

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "loggedIn": false // 或 true，取决于是否登录
        // 可能不包含其他敏感信息
    }
}
```

-   `code` (number): 返回码，`0` 表示成功。
-   `msg` (string): 返回消息。
-   `data` (object): 包含云端用户信息的对象。
    -   `loggedIn` (boolean): 是否已登录云端账户。
    -   `userCloudEmail` (string, 可选): 云端账户邮箱 (管理员可见)。
    -   `userCloudName` (string, 可选): 云端账户昵称 (管理员可见)。
    -   `userCloudAvatarURL` (string, 可选): 云端账户头像 URL (管理员可见)。
    -   `userCloudSpace` (number, 可选): 已使用的云端空间，单位为字节 (管理员可见)。
    -   `userCloudSpaceLimit` (number, 可选): 云端总空间，单位为字节 (管理员可见)。
    -   `userCloudSubscribed` (boolean, 可选): 是否为订阅会员 (管理员可见)。
    -   `userCloudVIPRemoveAds` (boolean, 可选): 订阅会员是否享有去广告特权 (管理员可见)。
    -   `userCloudDueTime` (number, 可选): 订阅会员到期时间的时间戳 (毫秒) (管理员可见)。

## 请求示例

```json
POST /api/setting/getCloudUser
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
