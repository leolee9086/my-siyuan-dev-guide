---
title: 批量设置闪卡到期时间 (batchSetRiffCardsDueTime)
---
# 端点

/api/riff/batchSetRiffCardsDueTime

# 批量设置闪卡到期时间 (batchSetRiffCardsDueTime)

[首页](../index.html) | [Riff API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/riff.go#L50)

## 功能描述

此 API 端点 `POST /api/riff/batchSetRiffCardsDueTime` 用于批量设置指定闪卡（通过块 ID 识别）的下次复习到期时间。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `cardDues` (array of objects): **必填**。一个包含要更新的闪卡信息的数组，每个对象包含：
    -   `id` (string): **必填**。要设置到期时间的闪卡所对应的块 ID。
    -   `due` (string): **必填**。新的到期时间，格式必须是 `YYYYMMDDHHmmss`，例如 `"20241231235959"` 表示 2024 年 12 月 31 日 23 点 59 分 59 秒。

**请求示例:**

```json
{
  "cardDues": [
    {
      "id": "20240101100000-hijklmn",
      "due": "20240815100000"
    },
    {
      "id": "20240102110000-opqrstu",
      "due": "20240816123000"
    }
  ]
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

如果操作失败（例如参数格式错误、ID 无效等），将返回非 0 的 `code` 和具体的错误信息 `msg`。

```json
{
  "code": -1,
  "msg": "具体的错误信息",
  "data": null
}
```

## 在线测试

您可以在下方输入要批量设置到期时间的闪卡信息列表进行在线测试。

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
