---
title: 基础 AI 对话
---
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/ai.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/ai.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# 基础 AI 对话

## 端点

`/api/ai/chatGPT`

## 接口描述

向配置好的 AI 服务（如 OpenAI ChatGPT 或兼容接口）发送文本消息，并获取 AI 的回复。需先在设置中配置好 AI 服务。

## 请求方法

POST

## 请求参数

| 参数名 | 类型   | 必选 | 描述               |
| ------ | ------ | ---- | ------------------ |
| msg    | string | 是   | 要发送给 AI 的消息 |

## 返回值

| 参数名 | 类型   | 描述                         |
| ------ | ------ | ---------------------------- |
| code   | number | 返回码，0 表示成功           |
| msg    | string | 返回信息                     |
| data   | string | AI 回复的文本内容（字符串）  |

## 示例

### 请求示例

```json
{
    "msg": "你好，请介绍一下你自己。"
}
```

### 返回示例

```json
{
    "code": 0,
    "msg": "",
    "data": "我是一个大型语言模型，由思源笔记核心驱动。"
}
```

## 工作原理

1. 接收客户端发送的 `msg` 文本。
2. 调用 `model.ChatGPT(msg)` 将消息传递给 AI 模型处理。
3. AI 模型生成回复。
4. 将 AI 回复的文本字符串作为 `data` 字段返回给客户端。

## 错误返回

如果未配置 OpenAI API Key，会返回相应错误提示。

