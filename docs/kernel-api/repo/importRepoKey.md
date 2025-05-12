---
title: 导入仓库密钥
---
# 端点

/api/repo/importRepoKey

# 导入仓库密钥

需要认证 管理员权限 检查只读模式

## 接口描述

导入一个 Base64 编码的仓库密钥（通常用于加密的仓库）。成功导入后，会返回处理（可能也是某种形式的编码或校验后）的密钥。

## 请求参数 (JSON Body)

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| key | string | 是 | Base64 编码的仓库密钥字符串。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功。 |
| msg | string | 错误信息，成功时为空字符串。失败时可能包含特定语言的错误提示。 |
| data | object | 成功时返回包含处理后密钥的对象；失败时可能包含 \`closeTimeout\` 字段。 |
| data.key | string | 成功时返回的处理后的密钥字符串。 |
| data.closeTimeout | number | 失败时可能返回，提示错误消息框关闭的超时时间（毫秒）。 |

请求示例

返回示例

### 请求示例 (JSON Body)

```
POST /api/repo/importRepoKey HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token YOUR_API_TOKEN

{
  "key": "your_base64_encoded_repo_key_string"
}
```

### 成功返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "key": "processed_or_validated_key_string"
  }
}
```

### 失败返回示例 (例如，密钥无效)

```
{
  "code": -1,
  "msg": "[语言包137] 导入仓库密钥失败: invalid key format", // 实际错误信息会不同
  "data": {
    "closeTimeout": 5000
  }
}
```

