---
title: 重置本地仓库密钥
---
# 端点

/api/repo/resetRepo

# 重置本地仓库密钥

需要认证 需要管理员 检查只读模式

## 接口描述

**警告：这是一个非常危险的操作！**

此接口用于重置当前本地工作空间（仓库）的加密密钥。执行此操作将导致：

-   所有现存的本地历史快照均会失效，因为它们是用旧密钥加密的。
-   如果已配置云端同步，需要重新设置和初始化云端同步仓库，因为云端数据与本地密钥不再匹配。

在执行此操作前，请务必理解其后果，并确保已备份所有重要数据。此操作通常仅在密钥泄露或需要彻底更换仓库加密策略时使用。

在只读模式下，此操作会被禁止。

## 请求参数

此接口不需要参数。

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 错误信息，成功时为空字符串。失败时会提供具体错误，例如 "reset repo failed: ..." 并附带语言包中索引为 146 的提示。 |
| data | null or object | 成功时为 `null`。失败时可能返回一个包含 `{"closeTimeout": 5000}` 的对象，提示客户端在一段时间后关闭相关消息提示。 |

请求示例

返回示例

### 请求示例

```
POST /api/repo/resetRepo HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token YOUR_API_TOKEN_HERE

{}
```

### 返回示例 (成功)

```
{
  "code": 0,
  "msg": "",
  "data": null
}
```

### 返回示例 (失败 - 例如只读模式)

```
{
  "code": -1,
  "msg": "[405]Readonly mode, Prohibited POST /api/repo/resetRepo",
  "data": {
    "closeTimeout": 5000
  }
}
```

### 返回示例 (失败 - 其他错误)

```
{
  "code": -1,
  "msg": "重置历史快照仓库失败: an unexpected error occurred",
  "data": {
    "closeTimeout": 5000
  }
}
```

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
