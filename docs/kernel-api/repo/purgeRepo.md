---
title: 清理本地仓库历史
---
# 端点

/api/repo/purgeRepo

# 清理本地仓库历史

需要认证 需要管理员 检查只读模式

## 接口描述

**警告：这是一个非常危险的操作！**

此接口用于彻底清理（删除）当前本地工作空间（仓库）的所有历史快照数据。这将导致所有版本历史丢失。执行此操作前，请务必确认并备份好重要数据，因为此操作不可逆。

在只读模式下，此操作会被禁止。

## 请求参数

此接口不需要参数。

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 错误信息，成功时为空字符串。失败时会提供具体错误，例如 "purge repo failed: ..."。 |
| data | null or object | 成功时为 `null`。失败时可能返回一个包含 `{"closeTimeout": 5000}` 的对象，提示客户端在一段时间后关闭相关消息提示。 |

请求示例

返回示例

### 请求示例

```
POST /api/repo/purgeRepo HTTP/1.1
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
  "msg": "[405]Readonly mode, Prohibited POST /api/repo/purgeRepo",
  "data": {
    "closeTimeout": 5000
  }
}
```

### 返回示例 (失败 - 其他错误)

```
{
  "code": -1,
  "msg": "purge repo failed: an unexpected error occurred during deletion",
  "data": {
    "closeTimeout": 5000
  }
}
```

