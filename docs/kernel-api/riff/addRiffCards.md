---
title: 添加闪卡 (addRiffCards)
---
# 端点

/api/riff/addRiffCards

# 添加闪卡 (addRiffCards)

[首页](../index.html) | [Riff API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/riff.go#L337)

## 功能描述

此 API 端点 `POST /api/riff/addRiffCards` 用于将指定的块（Blocks）制作为闪卡并添加到指定的闪卡包（Deck）中。

一个块可以被添加到多个闪卡包中。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `deckID` (string): **必填**。目标闪卡包的 ID。
-   `blockIDs` (array of strings): **必填**。要添加为闪卡的块 ID 列表。

**请求示例:**

```json
{
  "deckID": "20231027111111-abcdefg",
  "blockIDs": [
    "20240101100000-hijklmn",
    "20240102110000-opqrstu"
  ]
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 字段包含更新后的目标闪卡包的详细信息。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "20231027111111-abcdefg", // 卡包 ID
    "name": "我的第一个卡包", // 卡包名
    "box": "20210816155902-kpf7v8m", // 所属笔记本 ID (Box ID)
    "cardCount": 15, // 卡包内卡片总数
    "dueCardCount": 3, // 到期需复习卡片数
    "newCardCount": 5, // 新卡数量
    "todayReviewedCardCount": 2, // 今日已复习卡片数
    "conf": { // 卡包配置
      // ... 具体配置项 ...
    }
  }
}
```

-   `code`: 0 表示成功，非 0 表示失败（例如 deckID 无效、blockIDs 包含无效 ID 等）。
-   `msg`: 错误信息（如果 code 非 0）。
-   `data`: 更新后的闪卡包信息对象，包含卡包 ID (`id`), 名称 (`name`), 所属笔记本 ID (`box`), 卡片总数 (`cardCount`), 到期卡片数 (`dueCardCount`), 新卡数 (`newCardCount`), 今日已复习数 (`todayReviewedCardCount`) 以及卡包配置 (`conf`) 等。

## 在线测试

您可以在下方输入闪卡包 ID 和要添加的块 ID 列表进行在线测试。

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
