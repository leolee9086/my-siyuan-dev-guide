---
title: 创建闪卡包 (createRiffDeck)
---
# 端点

/api/riff/createRiffDeck

# 创建闪卡包 (createRiffDeck)

[首页](../index.html) | [Riff API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/riff.go#L409)

## 功能描述

此 API 端点 `POST /api/riff/createRiffDeck` 用于创建一个新的闪卡包 (Deck)。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `name` (string): **必填**。要创建的闪卡包的名称。名称不能为空，且不能与现有卡包名称重复。

**请求示例:**

```json
{
  "name": "我的新卡包"
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 字段包含新创建的闪卡包的基本信息。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "20240815153000-xyz1234", // 新卡包的 ID
    "name": "我的新卡包", // 卡包名称
    "size": 0, // 卡片数量 (初始为 0)
    "created": "2024-08-15 15:30:00", // 创建时间
    "updated": "2024-08-15 15:30:00" // 更新时间
  }
}
```

-   `code`: 0 表示成功，非 0 表示失败（例如名称重复、名称无效等）。
-   `msg`: 错误信息（如果 code 非 0）。
-   `data`: 新创建的闪卡包信息对象，包含 ID (`id`), 名称 (`name`), 卡片数 (`size`), 创建时间 (`created`), 更新时间 (`updated`)。

## 在线测试

您可以在下方输入要创建的闪卡包名称进行在线测试。

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
