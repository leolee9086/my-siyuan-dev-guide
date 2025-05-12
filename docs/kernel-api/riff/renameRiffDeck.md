---
title: 重命名闪卡包 (renameRiffDeck)
---
# 端点

/api/riff/renameRiffDeck

# 重命名闪卡包 (renameRiffDeck)

[首页](../index.html) | [Riff API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/riff.go#L372)

## 功能描述

此 API 端点 `POST /api/riff/renameRiffDeck` 用于重命名指定的闪卡包 (Deck)。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `deckID` (string): **必填**。要重命名的闪卡包的 ID。
-   `name` (string): **必填**。新的闪卡包名称。名称不能为空，且不能与其他现有的闪卡包名称重复。

**请求示例:**

```json
{
  "deckID": "20231027111111-abcdefg",
  "name": "我的学习卡包"
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

如果操作失败（例如卡包 ID 不存在、新名称无效或与其他卡包重名），将返回非 0 的 `code` 和具体的错误信息 `msg`。

```json
{
  "code": -1,
  "msg": "闪卡包 [新名称] 已存在", // 示例错误信息
  "data": null
}
```

## 在线测试

您可以在下方输入要重命名的闪卡包 ID 和新的名称进行在线测试。

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
