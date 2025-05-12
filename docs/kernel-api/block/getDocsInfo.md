---
title: /api/block/getDocsInfo
---
# 端点

/api/block/getDocsInfo

# /api/block/getDocsInfo

[返回 Block API 索引](./index.html)   |    [返回 API 总索引](../index.html)   |    [查看源码](https://github.com/siyuan-note/siyuan/blob/e47b8efc2f2611163beca9fad4ee5424001515ff/kernel/api/block.go#L34)

## 功能描述

根据提供的文档根块 ID 列表，批量获取这些文档的相关信息。

## 请求

**方法：** POST

**路径：** `/api/block/getDocsInfo`

**请求体 (Body)：**

需要发送一个 JSON 对象，包含以下键：

-   `ids` (string\[\]): 必须。一个包含文档根块 ID 的字符串数组。

**请求示例：**

```json
{
  "ids": ["20200812220409-ps9q5gn", "20210812220409-abcdefg"]
}
```

## 响应

**成功响应 (`code: 0`)：**

返回一个 JSON 对象，`data` 字段是一个以文档 ID 为键，文档信息对象为值的 Map。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "20200812220409-ps9q5gn": {
      "id": "20200812220409-ps9q5gn",
      "rootID": "20200812220409-ps9q5gn",
      "name": "文档标题1", // 文档名
      "name1": "",         // 文档别名
      "alias": "",         // 文档别名
      "memo": "",          // 文档备注
      "tag": "",           // 文档标签
      "bookmark": "",      // 文档书签
      "icon": "icon-name1",// 文档图标
      "path": "/笔记本名/文档标题1.sy", // 文档路径 (HPath)
      "box": "20230501100000-abcdefg", // 所属笔记本 ID
      "created": "20200812220409", // 创建时间戳 (内部格式)
      "updated": "20231115103000", // 更新时间戳 (内部格式)
      "sort": 0,           // 排序号
      "subFileCount": 10,  // 子文档数量
      "refCount": 5,       // 引用数量
      "size": 10240,       // 文档大小 (字节)
      "type": "d"          // 类型 ('d' for document)
      // ... 可能还有其他字段
    },
    "20210812220409-abcdefg": {
      "id": "20210812220409-abcdefg",
      "rootID": "20210812220409-abcdefg",
      "name": "文档标题2",
      "icon": "icon-name2",
      "path": "/笔记本名/子目录/文档标题2.sy",
      "box": "20230501100000-abcdefg",
      // ... 其他字段
    }
  }
}
```

**失败响应 (`code != 0`)：**

如果请求参数错误或处理过程中发生异常，将返回包含错误信息的 JSON 对象。

```json
{
  "code": -1,
  "msg": "具体的错误信息",
  "data": null
}
```

## 在线测试

{ "ids": \["在此处填入有效的文档ID", "例如: 20200812220409-ps9q5gn"\] } 发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
