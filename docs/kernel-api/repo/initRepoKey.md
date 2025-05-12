---
title: 初始化仓库密钥
---
# 端点

/api/repo/initRepoKey

# 初始化仓库密钥

需要认证 管理员权限 检查只读模式

## 接口描述

初始化一个新的仓库密钥（如果当前仓库尚未设置密钥），或者返回当前已存在的仓库密钥。这个密钥通常用于仓库的加密功能。

## 请求参数

此接口不需要请求参数 (空 Body)。

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功。 |
| msg | string | 错误信息，成功时为空字符串。失败时可能包含特定语言的错误提示。 |
| data | object | 成功时返回包含仓库密钥的对象；失败时可能包含 \`closeTimeout\` 字段。 |
| data.key | string | 成功时返回的仓库密钥字符串 (通常是 Base64 编码的)。 |
| data.closeTimeout | number | 失败时可能返回，提示错误消息框关闭的超时时间（毫秒）。 |

请求示例

返回示例

### 请求示例 (空 Body)

```
POST /api/repo/initRepoKey HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token YOUR_API_TOKEN

{}
```

### 成功返回示例 (获取到密钥)

```
{
  "code": 0,
  "msg": "",
  "data": {
    "key": "generated_or_existing_repo_key_string"
  }
}
```

### 失败返回示例 (例如，初始化失败)

```
{
  "code": -1,
  "msg": "[语言包137] 初始化仓库密钥失败: some error occurred", // 实际错误信息会不同
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
