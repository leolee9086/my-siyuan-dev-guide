---
title: 移除本地仓库标签快照
---
# 端点

/api/repo/removeRepoTagSnapshot

# 移除本地仓库标签快照

需要认证 需要管理员 检查只读模式

## 接口描述

根据提供的标签名称，从当前本地工作空间（仓库）中移除（删除）指定的标签快照。

在只读模式下，此操作会被禁止。

## 请求参数 (JSON Body)

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| tag | string | 是 | 要移除的本地仓库标签快照的名称。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | null | 成功时固定为 `null`。 |

请求示例

返回示例

### 请求示例

```
POST /api/repo/removeRepoTagSnapshot HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token YOUR_API_TOKEN_HERE

{
  "tag": "my-local-backup-tag"
}
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
  "msg": "[405]Readonly mode, Prohibited POST /api/repo/removeRepoTagSnapshot",
  "data": null
}
```

### 返回示例 (失败 - 标签不存在)

```
{
  "code": -1,
  "msg": "remove repo tag [non-existent-local-tag] failed: snapshot tag not found",
  "data": null
}
```

