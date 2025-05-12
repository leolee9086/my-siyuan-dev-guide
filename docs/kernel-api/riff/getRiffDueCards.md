---
title: 获取闪卡包内到期闪卡列表 (getRiffDueCards)
---
# 端点

/api/riff/getRiffDueCards

# 获取闪卡包内到期闪卡列表 (getRiffDueCards)

[首页](../index.html) | [Riff API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/riff.go#L259)

## 功能描述

此 API 端点 `POST /api/riff/getRiffDueCards` 用于获取指定闪卡包（Deck）下所有**到期需要复习**的闪卡列表及相关统计信息。

可以传入当前复习会话中已复习的卡片列表，以便在获取下一批卡片时排除它们。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `deckID` (string): **必填**。要查询的闪卡包的 ID。
-   `reviewedCards` (array of objects): _可选_。当前复习会话中已经复习过的卡片列表。数组中的每个对象应至少包含 `cardID` (string) 字段。如果省略或为空数组，则获取所有到期卡片。

**请求示例 (获取卡包所有到期卡):**

```json
{
  "deckID": "20231027111111-abcdefg"
}
```

**请求示例 (获取卡包到期卡，并排除已复习的卡):**

```json
{
  "deckID": "20231027111111-abcdefg",
  "reviewedCards": [
    { "cardID": "20240101100000-hijklmn" },
    { "cardID": "20240102110000-opqrstu" }
  ]
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 字段包含到期闪卡列表和统计信息。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "cards": [
      {
        "ID": "20240103120000-uvwxyz0", // 卡片 ID (等于 BlockID)
        "BlockID": "20240103120000-uvwxyz0", // 块 ID
        "DeckID": "20231027111111-abcdefg", // 卡包 ID
        "Created": "2024-01-03 12:00:00", // 创建时间
        "Updated": "2024-08-10 09:30:00", // 最后更新时间
        "Due": "2024-08-15 10:00:00", // 到期时间
        "State": 1, // 卡片状态 (例如: 0=新, 1=学习中, 2=复习)
        "Reviews": 5, // 复习次数
        "Lapses": 0, // 遗忘次数
        "Interval": 3.5 // 当前间隔天数
        // ... 其他卡片属性 ...
      }
      // ... 更多到期卡片信息 ...
    ],
    "unreviewedCount": 8, // 本次查询到的未复习卡片总数
    "unreviewedNewCardCount": 2, // 其中新卡数量
    "unreviewedOldCardCount": 6 // 其中旧卡数量
  }
}
```

-   `code`: 0 表示成功，非 0 表示失败（例如卡包 ID 无效）。
-   `msg`: 错误信息（如果 code 非 0）。
-   `data.cards`: 一个数组，包含所有当前到期（且未被 reviewedCards 排除）的闪卡详细信息对象。
-   `data.unreviewedCount`: 本次返回的未复习的到期卡片总数。
-   `data.unreviewedNewCardCount`: 本次返回的未复习的到期新卡数量。
-   `data.unreviewedOldCardCount`: 本次返回的未复习的到期旧卡数量。

## 在线测试

您可以在下方输入闪卡包 ID 和可选的已复习卡片列表进行在线测试。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

