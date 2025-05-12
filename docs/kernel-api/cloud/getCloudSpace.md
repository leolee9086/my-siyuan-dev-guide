---
title: 获取云端存储空间
---
# 端点

/api/cloud/getCloudSpace

# 获取云端存储空间

需要认证 需要云端账户登录

**注意：** 此接口需要用户在思源笔记客户端登录云端账户才能正常使用。认证方式与本地 API Token 可能不同（取决于思源笔记的具体实现），请参考实际情况。

## 接口描述

获取当前登录的思源笔记云端账户的存储空间使用情况，包括总空间、已用空间、剩余空间等信息。

## 请求参数

此接口通常不需要额外的请求参数，服务器会根据用户的认证信息返回对应的存储空间数据。

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| 无请求参数 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 包含存储空间信息的对象 |
| data.space | number | 总空间大小（单位：字节） |
| data.used | number | 已用空间大小（单位：字节） |
| data.remaining | number | 剩余空间大小（单位：字节） |
| data.humanReadableSpace | string | 易读的总空间大小（例如 "10 GB"） |
| data.humanReadableUsed | string | 易读的已用空间大小（例如 "2.5 GB"） |
| data.humanReadableRemaining | string | 易读的剩余空间大小（例如 "7.5 GB"） |
| data.percent | number | 已用空间百分比（0-100） |

请求示例

返回示例

### 请求示例

```
POST /api/cloud/space HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token // 注意：这里可能需要云端认证凭证

{}
```

### 返回示例 (成功)

```
{
  "code": 0,
  "msg": "",
  "data": {
    "space": 10737418240, // 10 GB
    "used": 2684354560,  // 2.5 GB
    "remaining": 8053063680, // 7.5 GB
    "humanReadableSpace": "10 GB",
    "humanReadableUsed": "2.5 GB",
    "humanReadableRemaining": "7.5 GB",
    "percent": 25
  }
}
```

### 返回示例 (未登录云端账户)

```
{
  "code": -1, // 或其他错误码
  "msg": "请先登录云端账户", 
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
