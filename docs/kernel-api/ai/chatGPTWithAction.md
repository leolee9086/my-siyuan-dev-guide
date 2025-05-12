---
title: AI 对话（带动作）
---
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/ai.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/ai.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# AI 对话（带动作）

## 端点

`/api/ai/chatGPTWithAction`

## 接口描述

这个 API 用于对指定内容块执行 AI 动作，例如总结、润色、续写等。与基础的 chatGPT 不同，此接口操作的是文档中的现有内容块，并支持不同的操作模式。

## 请求方法

POST

## 请求参数

| 参数名 | 类型     | 必选 | 描述                                                         |
| ------ | -------- | ---- | ------------------------------------------------------------ |
| ids    | string[] | 是   | 要处理的内容块 ID 数组，可以是多个块                         |
| action | string   | 是   | 要执行的动作类型，支持的值包括：<br/>- "Continue writing" - 续写<br/>- `window.siyuan.languages.aiExtractSummary` - 提取摘要<br/>- `window.siyuan.languages.aiBrainStorm` - 头脑风暴<br/>- `window.siyuan.languages.aiFixGrammarSpell` - 修正语法和拼写<br/>- "Clear context" - 清除上下文<br/>- 其他自定义动作 |

## 返回值

| 参数名 | 类型   | 描述                         |
| ------ | ------ | ---------------------------- |
| code   | number | 返回码，0 表示成功           |
| msg    | string | 返回信息                     |
| data   | string | AI 响应的文本内容（字符串）  |

## 示例

### 请求示例

```json
{
    "ids": ["20220118094456-2tw56z5"],
    "action": "Continue writing"
}
```

### 返回示例

```json
{
    "code": 0,
    "msg": "",
    "data": "续写的文本内容..."
}
```

## 工作原理

1. 将请求中的 `ids` 参数传给系统处理
2. 系统会从这些块 ID 读取内容（通过 `getBlocksContent` 函数）
3. 如果 `action` 是 "Clear context"，则清除上下文缓存并直接返回
4. 其他情况下，将动作类型和块内容组合，发送给 AI 处理
5. 返回 AI 处理的结果文本

## 错误返回

如果未配置 OpenAI API Key，会返回相应错误提示。

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/ai.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/ai.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
