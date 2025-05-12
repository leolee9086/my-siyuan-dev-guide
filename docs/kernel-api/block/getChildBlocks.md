---
title: 获取子块
---
# 端点

/api/block/getChildBlocks

# 获取子块

需要认证

## 接口描述

获取指定块的所有直接子块，不包括孙子块。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 父块ID |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 状态码，0表示成功 |
| msg | string | 消息，用于显示错误信息 |
| data | array | 子块数组 |

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
    "data": [
        {
            "id": "20220118090757-a1b2c3d",
            "type": "p",
            "content": "第一个子块内容",
            "markdown": "第一个子块内容"
        },
        {
            "id": "20220118090757-e5f6g7h",
            "type": "h1",
            "content": "标题块",
            "markdown": "# 标题块"
        }
    ]
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
