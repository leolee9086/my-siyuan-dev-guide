---
title: 设置每日历史快照索引保留数量
---
# 端点

/api/repo/setRetentionIndexesDaily

# 设置每日历史快照索引保留数量

需要认证 需要管理员

## 接口描述

设置当前工作空间（仓库）每日自动生成的本地历史快照索引的最大保留数量。这指的是每天保留的索引文件的个数，用于控制每日快照的精细度和存储空间。

如果设置的数量小于 1，则系统会自动将其设置为默认的 180 个。

## 请求参数 (JSON Body)

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| indexes | number | 是 | 每日要保留的历史快照索引的数量。最小值为 1，如果小于 1 则默认为 180。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | null | 成功时固定为 `null`。 |

请求示例

返回示例

### 请求示例 (设置每日保留5个索引)

```
POST /api/repo/setRetentionIndexesDaily HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token YOUR_API_TOKEN_HERE

{
  "indexes": 5
}
```

### 请求示例 (设置小于1，将按默认180个处理)

```
POST /api/repo/setRetentionIndexesDaily HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token YOUR_API_TOKEN_HERE

{
  "indexes": 0
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

### 返回示例 (失败 - 未认证或无管理员权限)

```
{
  "code": -1, // 或 401, 403 等，具体根据服务端实现
  "msg": "API token is missing or invalid / Admin role required",
  "data": null
}
```

