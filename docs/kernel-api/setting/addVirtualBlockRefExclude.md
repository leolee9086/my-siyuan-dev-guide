---
title: 添加虚拟引用排除关键词
---
# 端点

/api/setting/addVirtualBlockRefExclude

# 添加虚拟引用排除关键词

需要认证 需要管理员 检查只读模式

## 接口描述

添加一批关键词到虚拟块引用的排除列表中。当系统生成虚拟引用（例如，通过某些算法自动发现的潜在关联内容）时，如果目标块或其上下文包含了这些排除列表中的关键词，则这些虚拟引用可能不会被显示或建议。

此功能用于优化虚拟引用的相关性，避免不必要的干扰。在只读模式下，此操作被禁止。

操作成功后，会广播 `setConf` 事件以通知客户端配置已更新。

## 请求参数 (JSON Body)

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| `keywords` | string\[\] | 是 | 要添加到排除列表的关键词数组。 |

## 返回值 (JSON)

标准的思源笔记 API 返回结构：

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

成功时，`code` 为 0，`data` 为 `null`。

## 示例请求

```json
{
    "keywords": ["示例排除词1", "ignore this"]
}
```
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
