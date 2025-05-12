---
title: 为快照打标签
---
# 端点

/api/repo/tagSnapshot

# 为快照打标签

需要认证 需要管理员 检查只读模式

## 接口描述

为指定的本地历史快照（通过其 ID 定位）创建一个标签（通过名称指定）。标签可以帮助用户快速定位到重要的历史版本。

在只读模式下，此操作被禁止。

## 请求参数 (JSON Body)

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| `id` | string | 是 | 要打标签的本地历史快照的唯一标识 ID。 |
| `name` | string | 是 | 要为该快照设置的标签名称。 |

## 返回值 (JSON)

返回标准的 JSON 结构体，包含 `code`, `msg`, `data` 三个字段。

-   `code`: 返回码，`0` 表示成功，其他值表示失败。
-   `msg`: 返回信息，成功时为空字符串，失败时为错误提示。
-   `data`: 返回的具体数据。
    -   成功时: `null`。
    -   失败时: 可能包含 `{"closeTimeout": 5000}`，提示操作失败并可能在一段时间后关闭相关提示。例如，当标签创建失败时，`msg` 字段会包含如 "tag snapshot failed: \[具体错误信息\]" 的内容。

### 返回值示例

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

失败时 (例如，内部错误):

```json
{
    "code": -1,
    "msg": "tag snapshot failed: 具体错误原因",
    "data": {"closeTimeout": 5000}
}
```

## 在线测试
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
