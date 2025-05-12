---
title: 获取闪卡卡组列表
---
# 端点

/api/riff/getRiffDecks

[← 返回 Riff API 列表](../pages/riff.html)

# 获取闪卡卡组列表

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/riff.go)

`POST /api/riff/getRiffDecks`

## 描述

获取所有闪卡卡组（间隔重复卡片组）的列表及其基本信息。闪卡是思源笔记中用于实现间隔重复学习的功能，通过将文档内容制作成问答卡片，按照科学的间隔时间进行复习，提高学习效率。

## 请求参数

请求体需要是 JSON 格式，但不需要特定参数。可以是一个空的 JSON 对象 `{}`。

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 包含所有卡组的列表。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "decks": [
      {
        "id": "20220422102227-1rkkq8d",    // 卡组 ID
        "name": "默认卡组",                // 卡组名称
        "created": "20220422102227",       // 创建时间
        "updated": "20220520102227",       // 更新时间
        "size": 125,                       // 卡片数量
        "dueCount": 22,                    // 待复习卡片数量
        "newCount": 15,                    // 新卡片数量
        "description": "我的默认学习卡组"  // 卡组描述
      },
      {
        "id": "20220520162227-a7d5e2f",
        "name": "英语单词",
        "created": "20220520162227",
        "updated": "20220521102227",
        "size": 210,
        "dueCount": 45,
        "newCount": 30,
        "description": "用于英语单词记忆的卡组"
      }
    ]
  }
}
```

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

思源笔记 API 文档
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
