---
title: 复习闪卡 (reviewRiffCard)
---
# 端点

/api/riff/reviewRiffCard

# 复习闪卡 (reviewRiffCard)

[首页](../index.html) | [Riff API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/riff.go#L167)

## 功能描述

此 API 端点 `POST /api/riff/reviewRiffCard` 用于记录用户对指定闪卡的复习结果。

当用户完成一张闪卡的复习并对其掌握程度进行评分后，调用此 API 来更新该卡片的学习进度和下一次的到期时间。这是闪卡间隔重复学习算法的核心部分。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `deckID` (string): **必填**。被复习卡片所在的卡包 ID。
-   `cardID` (string): **必填**。被复习的卡片 ID。
-   `rating` (integer): **必填**。用户对卡片掌握程度的评分。这个评分直接影响卡片的下一次复习间隔。
    -   评分通常是一个从 1 到 4 的整数，代表不同的掌握程度（例如：1=忘记, 2=困难, 3=良好, 4=掌握）。具体数值的含义取决于思源笔记内部的间隔重复算法 (基于 SM-2 算法)。
-   `reviewedCards` (array of objects): _可选_。一个对象数组，每个对象包含一个 `cardID` 字段，表示当前复习会话中已经复习过的卡片列表。
    -   例如: `[{ "cardID": "20230101..." }, { "cardID": "20230102..." }]`
    -   这个参数可能用于避免短时间内重复复习同一张卡，或用于某些统计目的。如果不需要，可以省略此字段或传递一个空数组 `[]`。

**请求示例:**

```json
{
  "deckID": "deck-english-vocab",
  "cardID": "20240520100000-abcdefg",
  "rating": 3, // 用户觉得掌握得"良好"
  "reviewedCards": [
    { "cardID": "20240520095500-hijklmn" },
    { "cardID": "20240520095800-opqrstu" }
  ]
}
```

**请求示例 (不传递 reviewedCards):**

```json
{
  "deckID": "deck-programming-concepts",
  "cardID": "20240521110000-vwxyz01",
  "rating": 4 // 用户觉得完全"掌握"
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 为 `null`，表示卡片复习状态已成功更新。

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

如果操作失败（例如参数无效、ID 不存在、评分超出范围等），将返回非 0 的 `code` 和具体的错误信息 `msg`。

```json
{
  "code": -1,
  "msg": "Card not found", // 示例错误信息
  "data": null
}
```

## 在线测试

您可以在下方输入参数进行在线测试。这将实际更新指定卡片的复习状态。

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
