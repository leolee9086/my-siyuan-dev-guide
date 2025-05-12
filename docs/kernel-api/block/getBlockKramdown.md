---
title: 获取块Markdown
---
# 端点

/api/block/getBlockKramdown

# 获取块Markdown

需要认证

## 接口描述

获取指定块的Markdown格式内容（Kramdown格式）。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 要获取Markdown内容的块ID |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 状态码，0表示成功 |
| msg | string | 消息，用于显示错误信息 |
| data | object | 返回数据 |
| data.kramdown | string | 块的Markdown（Kramdown格式）内容 |

请求示例

返回示例

### 请求示例

```
{
    "id": "20220118090757-t4455ri"
}
```

### 返回示例

```
{
    "code": 0,
    "msg": "",
    "data": {
        "kramdown": "这是一段 **Markdown** 格式的内容"
    }
}
```

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
