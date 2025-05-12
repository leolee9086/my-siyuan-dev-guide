---
title: 更改笔记本排序
---
# 端点

/api/notebook/changeSortNotebook

[← 返回 Notebook API 列表](./index.html)

# 更改笔记本排序

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/notebook.go#L70)

需要认证 (管理员权限，检查只读模式)

## 接口描述

根据提供的笔记本 ID 列表的顺序，更改工作空间中笔记本的排序。

此接口会调用内核的 `model.ChangeBoxSort` 方法来实际执行排序操作。

此接口需要管理员权限，并且会在只读模式下受限。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| notebooks | string\[\] | 是 | 笔记本 ID 的有序列表。系统将按照此列表的顺序对笔记本进行排序。 |

## 返回值

返回标准的 JSON 结构：

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功，其他表示失败。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | null | 成功时，此字段为 null。 |

请求示例

返回示例

### 请求示例 (JSON)

```json
{
  "notebooks": [
    "20200812220409-rng0qan",
    "20210310100000-abcdefg",
    "20220520123456-hijklmn"
  ]
}
```

### 成功返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

### 失败返回示例 (例如，参数格式错误或权限不足)

```json
{
  "code": -1, 
  "msg": "Error message describing the failure, e.g., 'readonly mode does not support this operation'",
  "data": null
}
```

> 本文档由 AI 织 协助编写，并由人类监督和审核。
> 
> 如果您觉得此文档对您有帮助，可以考虑 [为爱发电](https://afdian.com/a/leolee9086?tab=feed) 支持我们，感谢您的支持！
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
