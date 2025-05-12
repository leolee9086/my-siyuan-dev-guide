---
title: 移除闪卡 (removeRiffCards)
---
# 端点

/api/riff/removeRiffCards

# 移除闪卡 (removeRiffCards)

[首页](../index.html) | [Riff API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/riff.go#L299)

## 功能描述

此 API 端点 `POST /api/riff/removeRiffCards` 用于从指定的闪卡包（Deck）中移除（删除）指定的闪卡（通过块 ID 识别）。

注意：如果将 \`deckID\` 设置为空字符串 `""`，则会从**所有**闪卡包中移除这些块对应的闪卡，相当于彻底删除这些闪卡记录。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `deckID` (string): **必填**。要从中移除闪卡的闪卡包 ID。如果传入空字符串 `""`，则表示从所有卡包中移除。
-   `blockIDs` (array of strings): **必填**。要移除的闪卡所对应的块 ID 列表。

**请求示例 (从特定卡包移除):**

```json
{
  "deckID": "20231027111111-abcdefg",
  "blockIDs": [
    "20240101100000-hijklmn",
    "20240102110000-opqrstu"
  ]
}
```

**请求示例 (从所有卡包移除/删除闪卡记录):**

```json
{
  "deckID": "",
  "blockIDs": [
    "20240101100000-hijklmn"
  ]
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0。

如果请求中指定了有效的 \`deckID\` (非空字符串)，则 `data` 字段会包含更新后的目标闪卡包的详细信息。如果 \`deckID\` 为空字符串，则 `data` 字段为 `null`。

```json
// 示例：从特定卡包移除成功
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "20231027111111-abcdefg", // 卡包 ID
    "name": "我的第一个卡包", // 卡包名
    "box": "20210816155902-kpf7v8m", // 所属笔记本 ID
    "cardCount": 13, // 更新后的卡片总数
    "dueCardCount": 2, // 更新后的到期卡片数
    "newCardCount": 4, // 更新后的新卡数
    "todayReviewedCardCount": 2,
    "conf": { /* ... */ }
  }
}

// 示例：从所有卡包移除成功
{
  "code": 0,
  "msg": "",
  "data": null
}
```

-   `code`: 0 表示成功，非 0 表示失败（例如 deckID 无效、blockIDs 包含无效 ID 等）。
-   `msg`: 错误信息（如果 code 非 0）。
-   `data`: 如果指定了 \`deckID\` 且操作成功，则为更新后的卡包信息对象；否则为 `null`。

## 在线测试

您可以在下方输入闪卡包 ID 和要移除的块 ID 列表进行在线测试。将 \`deckID\` 留空表示从所有卡包移除。

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
