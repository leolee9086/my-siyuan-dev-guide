---
title: 获取云端仓库带标签快照列表
---
# 端点

/api/repo/getCloudRepoTagSnapshots

# 获取云端仓库带标签快照列表

需要认证 管理员权限

## 接口描述

获取当前云端仓库中所有带标签的快照信息列表。

## 请求参数

此接口不需要参数。

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 成功时返回包含快照列表的对象。 |
| data.snapshots | array | 带标签的快照对象数组。每个对象通常包含快照的 ID、标签名、创建时间等信息。具体字段需参考 \`model.CloudRepoTagSnapshot\` 结构。 |

请求示例

返回示例

### 请求示例 (空 Body)

```
POST /api/repo/getCloudRepoTagSnapshots HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token YOUR_API_TOKEN

{}
```

### 成功返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "snapshots": [
      {
        "id": "20231026100000-abcdefg", 
        "tag": "v1.0-backup",
        "created": 1698285600000,
        // ... 其他可能的字段
      },
      {
        "id": "20231115143000-hijklmn",
        "tag": "monthly-archive-nov",
        "created": 1700029800000,
        // ... 其他可能的字段
      }
    ]
  }
}
```

### 失败返回示例 (例如，获取失败)

```
{
  "code": -1,
  "msg": "Failed to get cloud repo tag snapshots: network error", // 实际错误信息会不同
  "data": null
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
