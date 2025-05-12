---
title: 获取笔记本内到期闪卡列表 (getNotebookRiffDueCards)
---
# 端点

/api/riff/getNotebookRiffDueCards

# 获取笔记本内到期闪卡列表 (getNotebookRiffDueCards)

[首页](../index.html) | [Riff API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/riff.go#L207)

## 功能描述

此 API 端点 `POST /api/riff/getNotebookRiffDueCards` 用于获取指定笔记本（Notebook）下所有**到期需要复习**的闪卡列表及相关统计信息。

可以传入当前复习会话中已复习的卡片列表，以便在获取下一批卡片时排除它们。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `notebook` (string): **必填**。要查询的笔记本的 ID。
-   `reviewedCards` (array of objects): _可选_。当前复习会话中已经复习过的卡片列表。数组中的每个对象应至少包含 `cardID` (string) 字段，即已复习卡片的 ID（通常等于其对应的块 ID）。如果省略或为空数组，则获取所有到期卡片。

**请求示例 (获取笔记本所有到期卡):**

```json
{
  "notebook": "20210816155902-kpf7v8m"
}
```

**请求示例 (获取笔记本到期卡，并排除已复习的卡):**

```json
{
  "notebook": "20210816155902-kpf7v8m",
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
    "unreviewedCount": 12, // 本次查询到的未复习卡片总数
    "unreviewedNewCardCount": 3, // 其中新卡数量
    "unreviewedOldCardCount": 9 // 其中旧卡数量
  }
}
```

-   `code`: 0 表示成功，非 0 表示失败（例如笔记本 ID 无效）。
-   `msg`: 错误信息（如果 code 非 0）。
-   `data.cards`: 一个数组，包含所有当前到期（且未被 reviewedCards 排除）的闪卡详细信息对象。
-   `data.unreviewedCount`: 本次返回的未复习的到期卡片总数。
-   `data.unreviewedNewCardCount`: 本次返回的未复习的到期新卡数量。
-   `data.unreviewedOldCardCount`: 本次返回的未复习的到期旧卡数量。

## 在线测试

您可以在下方输入笔记本 ID 和可选的已复习卡片列表进行在线测试。

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
