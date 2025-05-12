---
title: 重置闪卡复习状态 (resetRiffCards)
---
# 端点

/api/riff/resetRiffCards

# 重置闪卡复习状态 (resetRiffCards)

[首页](../index.html) | [Riff API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/riff.go#L75)

## 功能描述

此 API 端点 `POST /api/riff/resetRiffCards` 用于重置指定范围内的闪卡的复习状态。

重置操作会将卡片的复习进度（如复习次数、间隔、状态等）恢复到初始状态，使其类似于一张新卡。

可以按笔记本、文档树或闪卡包的范围进行重置，并且可以选择性地只重置范围内的部分卡片。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `type` (string): **必填**。指定重置的范围类型。有效值：
    -   `"notebook"`: 按笔记本范围重置。
    -   `"tree"`: 按文档树（以某个块为根）范围重置。
    -   `"deck"`: 按闪卡包范围重置。
-   `id` (string): **必填**。与 `type` 对应的 ID。
    -   当 `type` 为 `"notebook"` 时，此为笔记本 ID。
    -   当 `type` 为 `"tree"` 时，此为文档树的根块 ID。
    -   当 `type` 为 `"deck"` 时，此为闪卡包 ID。
-   `deckID` (string): **必填**。目标卡包 ID。即使 `type` 不是 `"deck"`，也需要提供此参数。通常，当 `type` 为 `"deck"` 时，此 ID 与 `id` 相同。
-   `blockIDs` (array of strings): _可选_。一个块 ID 列表。
    -   如果提供此列表，则**仅**重置列表中属于由 `type`, `id`, `deckID` 确定的范围内的闪卡。
    -   如果**不提供**此列表或提供一个空数组 (`[]`)，则重置由 `type`, `id`, `deckID` 确定的范围内的**所有**闪卡。

**请求示例 (重置卡包 \`deck-abc\` 中的所有卡片):**

```json
{
  "type": "deck",
  "id": "deck-abc",
  "deckID": "deck-abc",
  "blockIDs": [] // 或者省略 blockIDs 字段
}
```

**请求示例 (重置笔记本 \`nb-xyz\` 中，卡包 \`deck-123\` 内的特定几张卡片):**

```json
{
  "type": "notebook",
  "id": "nb-xyz",
  "deckID": "deck-123",
  "blockIDs": [
    "20240101100000-hijklmn",
    "20240102110000-opqrstu"
  ]
}
```

**请求示例 (重置文档树 \`root-doc\` 下的所有属于卡包 \`deck-learn\` 的卡片):**

```json
{
  "type": "tree",
  "id": "root-doc",
  "deckID": "deck-learn"
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 为 `null`。

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

如果操作失败（例如参数无效、ID 不存在等），将返回非 0 的 `code` 和具体的错误信息 `msg`。

```json
{
  "code": -1,
  "msg": "无效的类型参数", // 示例错误信息
  "data": null
}
```

## 在线测试

您可以在下方输入参数进行在线测试。请谨慎操作，重置卡片状态后可能需要重新学习。

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
