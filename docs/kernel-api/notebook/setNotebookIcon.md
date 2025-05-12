---
title: 设置笔记本图标
---
# 端点

/api/notebook/setNotebookIcon

# 设置笔记本图标

需要认证 (管理员权限，检查只读模式)

## 接口描述

为指定的笔记本设置一个新的图标。图标通常是一个 Emoji 字符。

此接口需要管理员权限，并且会在只读模式下受限。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| notebook | string | 是 | 要设置图标的笔记本的 ID。 |
| icon | string | 是 | 新的笔记本图标，通常是一个 Emoji 字符 (例如 "💡", "📁")。 |

## 返回值

返回标准的 JSON 结构：

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功，其他表示失败。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | null | 成功时，此字段通常为 null。 |

请求示例

返回示例

### 请求示例

```
{
  "notebook": "20200812220409-rng0qan",
  "icon": "🚀"
}
```

### 成功返回示例

```
{
  "code": 0,
  "msg": "",
  "data": null
}
```

### 失败返回示例 (例如，参数缺失)

```
{
  "code": -1,
  "msg": "JSON arg [icon] is required",
  "data": null
}
```

### 失败返回示例 (例如，笔记本ID无效，但此API可能不直接校验，依赖 SetBoxIcon 内部)

```
{
  "code": 0, 
  "msg": "",
  "data": null 
}
```

注意: 即便笔记本 ID 不存在，此接口目前的实现也可能返回成功 (code: 0)，因为 \`model.SetBoxIcon\` 可能不会在笔记本不存在时报错。实际行为请以测试为准。

### 失败返回示例 (只读模式)

```
{
  "code": -1,
  "msg": "只读模式下无法执行该操作",
  "data": {
    "closeTimeout": 5000
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
