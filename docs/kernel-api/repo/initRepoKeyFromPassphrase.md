---
title: 从口令初始化仓库密钥
---
# 端点

/api/repo/initRepoKeyFromPassphrase

# 从口令初始化仓库密钥

需要认证 管理员权限 检查只读模式

## 接口描述

根据用户提供的口令（Passphrase），初始化一个新的仓库密钥。此接口用于通过一个易记的口令来生成和设置仓库的加密密钥。

## 请求参数 (JSON Body)

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| pass | string | 是 | 用于生成仓库密钥的口令字符串。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功。 |
| msg | string | 错误信息，成功时为空字符串。失败时可能包含特定语言的错误提示。 |
| data | object | 成功时返回包含新生成密钥的对象；失败时可能包含 \`closeTimeout\` 字段。 |
| data.key | string | 成功时返回的、根据口令新生成的仓库密钥字符串 (通常是 Base64 编码的)。 |
| data.closeTimeout | number | 失败时可能返回，提示错误消息框关闭的超时时间（毫秒）。 |

请求示例

返回示例

### 请求示例 (JSON Body)

```
POST /api/repo/initRepoKeyFromPassphrase HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token YOUR_API_TOKEN

{
  "pass": "your_secure_passphrase_here"
}
```

### 成功返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "key": "new_repo_key_generated_from_passphrase"
  }
}
```

### 失败返回示例 (例如，生成失败)

```
{
  "code": -1,
  "msg": "[语言包137] 初始化仓库密钥失败: error generating key from passphrase", // 实际错误信息会不同
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
