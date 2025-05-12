---
title: 获取文档树内闪卡列表 (getTreeRiffCards)
---
# 端点

/api/riff/getTreeRiffCards

# 获取文档树内闪卡列表 (getTreeRiffCards)

[首页](../index.html) | [Riff API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/riff.go#L121)

## 功能描述

此 API 端点 `POST /api/riff/getTreeRiffCards` 用于获取指定文档树（以某个块为根节点）下的所有闪卡列表（返回的是闪卡对应的块 ID）。

这通常用于获取某个文档及其所有子孙块中的闪卡。

返回结果支持分页。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `id` (string): **必填**。文档树的根块 ID（通常是文档块的 ID）。
-   `page` (number): **必填**。要获取的页码，从 1 开始计数。
-   `pageSize` (number): _可选_。每页返回的闪卡数量，默认为 20。

**请求示例 (获取文档树第一页闪卡):**

```json
{
  "id": "20200812220100-7ck4bsp", // 某个文档块的 ID
  "page": 1,
  "pageSize": 20
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 字段包含闪卡块 ID 列表、总数和分页信息。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "blocks": [
      "20240101100000-hijklmn",
      "20240102110000-opqrstu",
      "20240103120000-uvwxyz0"
      // ... 更多块 ID ...
    ],
    "total": 42, // 该文档树下闪卡总数
    "pageCount": 3 // 总页数 (基于 pageSize)
  }
}
```

-   `code`: 0 表示成功，非 0 表示失败（例如根块 ID 无效）。
-   `msg`: 错误信息（如果 code 非 0）。
-   `data.blocks`: 一个字符串数组，包含当前页闪卡所对应的块 ID。
-   `data.total`: 指定文档树下的闪卡总数量。
-   `data.pageCount`: 根据 \`pageSize\` 计算的总页数。

## 在线测试

您可以在下方输入文档树根块 ID 和页码进行在线测试。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

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
