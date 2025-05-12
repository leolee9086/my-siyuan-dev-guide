---
title: 获取云端仓库快照列表
---
# 端点

/api/repo/getCloudRepoSnapshots

# 获取云端仓库快照列表

需要认证 需要管理员

## 接口描述

获取当前用户已登录的云端同步仓库的快照列表，支持分页。

## 请求参数 (JSON Body)

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| page | number | 是 | 页码，从 1 开始计数。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 错误信息，成功时为空字符串 |
| data | object | 包含快照列表和分页信息的对象。
-   `snapshots`: object\[\] - 快照对象数组。每个快照对象的具体字段依赖于云端服务，但通常包含 `id` (快照ID), `timestamp` (时间戳), `memo` (备注), `size` (大小) 等。
-   `pageCount`: number - 总页数。
-   `totalCount`: number - 快照总数量。

 |

请求示例

返回示例

### 请求示例 (获取第一页)

```
POST /api/repo/getCloudRepoSnapshots HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token YOUR_API_TOKEN_HERE

{
  "page": 1
}
```

### 返回示例 (成功)

```
{
  "code": 0,
  "msg": "",
  "data": {
    "snapshots": [
      {
        "id": "20230501100000-abcdefgh",
        "timestamp": 1682906400000,
        "memo": "Manual backup before update",
        "size": 102400,
        "repoKey": "xxxxxxxx" 
      },
      {
        "id": "20230420153000-ijklmnop",
        "timestamp": 1681975800000,
        "memo": "Daily auto backup",
        "size": 98765,
        "repoKey": "xxxxxxxx"
      }
      // ...更多快照
    ],
    "pageCount": 5,
    "totalCount": 48
  }
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

