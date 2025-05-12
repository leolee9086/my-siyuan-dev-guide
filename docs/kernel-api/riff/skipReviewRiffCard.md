---
title: 跳过闪卡复习 (skipReviewRiffCard)
---
# 端点

/api/riff/skipReviewRiffCard

# 跳过闪卡复习 (skipReviewRiffCard)

[首页](../index.html) | [Riff API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/riff.go#L188)

## 功能描述

此 API 端点 `POST /api/riff/skipReviewRiffCard` 用于跳过对指定闪卡的当前复习。

当用户选择暂时不复习某张到期卡片时，可以调用此 API。这通常会将该卡片的复习推迟一段时间（具体行为取决于内部实现，例如可能推迟到第二天或当前会话结束）。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `deckID` (string): **必填**。被跳过卡片所在的卡包 ID。
-   `cardID` (string): **必填**。被跳过的卡片 ID。

**请求示例:**

```json
{
  "deckID": "deck-daily-review",
  "cardID": "20240522140000-xyzabcd"
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 为 `null`，表示卡片已被标记为跳过。

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
  "msg": "Failed to skip card review", // 示例错误信息
  "data": null
}
```

## 在线测试

您可以在下方输入参数进行在线测试。这将实际跳过指定卡片的当前复习。

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
