---
title: 根据块ID获取闪卡信息 (getRiffCardsByBlockIDs)
---
# 端点

/api/riff/getRiffCardsByBlockIDs

# 根据块ID获取闪卡信息 (getRiffCardsByBlockIDs)

[首页](../index.html) | [Riff API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/riff.go#L30)

## 功能描述

此 API 端点 `POST /api/riff/getRiffCardsByBlockIDs` 用于根据提供的块 ID 列表，批量获取这些块对应的闪卡详细信息。

如果一个块不是闪卡，则不会包含在返回结果中。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `blockIDs` (array of strings): **必填**。要查询其闪卡信息的块 ID 列表。

**请求示例:**

```json
{
  "blockIDs": [
    "20240101100000-hijklmn",
    "20240102110000-opqrstu", 
    "20240815100000-notacard" // 假设这个 ID 不是闪卡
  ]
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 字段包含一个名为 `blocks` 的数组，其中包含查询到的闪卡信息对象。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "blocks": [
      {
        "ID": "20240101100000-hijklmn", // 卡片 ID (等于 BlockID)
        "BlockID": "20240101100000-hijklmn", // 块 ID
        "DeckID": "20231027111111-abcdefg", // 卡包 ID
        "Created": "2024-01-01 10:00:00", // 创建时间
        "Updated": "2024-08-12 14:00:00", // 最后更新时间
        "Due": "2024-08-18 09:00:00", // 到期时间
        "State": 2, // 卡片状态
        "Reviews": 8, // 复习次数
        "Lapses": 1, // 遗忘次数
        "Interval": 6.2 // 当前间隔天数
        // ... 其他卡片属性 ...
      },
      {
        "ID": "20240102110000-opqrstu",
        "BlockID": "20240102110000-opqrstu",
        "DeckID": "20231027111111-abcdefg",
        "Created": "2024-01-02 11:00:00",
        "Updated": "2024-08-14 11:00:00",
        "Due": "2024-08-16 12:30:00",
        "State": 1,
        "Reviews": 2,
        "Lapses": 0,
        "Interval": 2.0
        // ... 其他卡片属性 ...
      }
      // 注意："20240815100000-notacard" 不会出现在结果中
    ]
  }
}
```

-   `code`: 0 表示成功，非 0 表示失败。
-   `msg`: 错误信息（如果 code 非 0）。
-   `data.blocks`: 一个数组，包含查询到的闪卡信息对象。如果请求的某个 \`blockID\` 不是闪卡，则对应的条目不会出现在此数组中。

## 在线测试

您可以在下方输入要查询闪卡信息的块 ID 列表进行在线测试。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

