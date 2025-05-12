---
title: 获取所有广播频道
---
# 端点

/api/broadcast/getChannels

[← 返回 Broadcast API 列表](../pages/broadcast.html)

# 获取所有广播频道

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/broadcast.go#L210)

`POST /api/broadcast/getChannels`

## 描述

获取当前存在的所有广播频道及其信息（名称和连接数）。

## 请求参数

此接口不需要请求参数。

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 包含一个频道信息对象的数组。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "channels": [
      {
        "name": "channel-1",
        "count": 3
      },
      {
        "name": "channel-2",
        "count": 1
      }
      // ... more channels
    ]
  }
}
```

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

思源笔记 API 文档
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
