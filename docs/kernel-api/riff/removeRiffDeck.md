---
title: 删除闪卡包 (removeRiffDeck)
---
# 端点

/api/riff/removeRiffDeck

# 删除闪卡包 (removeRiffDeck)

[首页](../index.html) | [Riff API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/riff.go#L391)

**🚨 高风险操作警告！** 此 API 用于**永久删除**指定的闪卡包及其包含的**所有**闪卡数据！此操作**不可撤销**，请在执行前务必确认目标卡包 ID 无误，并做好数据备份！

## 功能描述

此 API 端点 `POST /api/riff/removeRiffDeck` 用于删除指定的闪卡包 (Deck)。

再次强调：这是一个破坏性操作，会删除卡包和其中所有的卡片数据，请谨慎使用！

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `deckID` (string): **必填**。要删除的闪卡包的 ID。

**请求示例:**

```json
{
  "deckID": "20231027111111-abcdefg" // 确认这是你想要永久删除的卡包 ID
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

如果操作失败（例如卡包 ID 不存在或无效），将返回非 0 的 `code` 和具体的错误信息 `msg`。

```json
{
  "code": -1,
  "msg": "闪卡包不存在 [deckID: 20231027111111-abcdefg]", // 示例错误信息
  "data": null
}
```

## 在线测试

**在线测试警告：** 在此测试将**立即永久删除**您输入的 ID 对应的闪卡包！除非您完全确定要删除该卡包并且已经备份，否则请勿使用此处的在线测试功能！

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求 (删除卡包！)

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

