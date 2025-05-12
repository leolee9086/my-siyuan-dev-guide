---
title: 列出笔记本
---
# 端点

/api/notebook/lsNotebooks

[← 返回 Notebook API 列表](./index.html)

# 列出笔记本

[在 GitHub 上查看源码 (notebook.go)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/notebook.go#L399) [Box 定义 (box.go)](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/box.go#L48)

需要认证

## 接口描述

列出当前工作空间中的所有笔记本。可以通过参数指定是否只列出包含闪卡功能的笔记本。

此接口会根据参数调用内核的 `model.ListNotebooks()` 或 `model.GetFlashcardNotebooks()` 方法。

## 请求参数

请求体为一个 JSON 对象，可以包含以下可选字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| flashcard | boolean | 否 | 如果为 `true`，则只列出包含闪卡功能的笔记本。默认为 `false`，列出所有笔记本。 |

## 返回值

返回标准的 JSON 结构，其中 `data` 字段包含一个名为 `notebooks` 的数组，数组中的每个元素都是一个 `Box` 对象：

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功，其他表示失败。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 成功时，包含 `notebooks` 数组的对象；失败时可能为 null。 |
| data.notebooks | array | `Box` 对象组成的数组，每个对象代表一个笔记本。 |

### `Box` 对象结构

数组中的每个 `Box` 对象包含以下字段：

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| id | string | 笔记本的唯一标识符 (ID)。 |
| name | string | 笔记本的名称。 |
| icon | string | 笔记本的图标，通常是一个 Emoji 字符或图片文件名。 |
| sort | number | 笔记本的排序值，用于自定义排序。 |
| sortMode | number | 笔记本内文档列表的默认排序模式。具体值请参考 `kernel/util/sort.go` 中的 `SortMode*` 常量。 |
| closed | boolean | 笔记本是否处于关闭状态 (未在工作空间中加载)。 |
| newFlashcardCount | number | 该笔记本中新的闪卡数量。 |
| dueFlashcardCount | number | 该笔记本中到期的闪卡数量。 |
| flashcardCount | number | 该笔记本中总的闪卡数量。 |

请求示例 (所有笔记本)

请求示例 (仅闪卡笔记本)

返回示例

### 请求示例 (列出所有笔记本)

```json
{}
```

或者，可以明确指定 `flashcard: false`:

```json
{
  "flashcard": false
}
```

### 请求示例 (仅列出含闪卡的笔记本)

```json
{
  "flashcard": true
}
```

### 成功返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "notebooks": [
      {
        "id": "20200812220409-rng0qan",
        "name": "我的知识库",
        "icon": "1f4da",
        "sort": 0,
        "sortMode": 0,
        "closed": false,
        "newFlashcardCount": 10,
        "dueFlashcardCount": 5,
        "flashcardCount": 100
      },
      {
        "id": "20210310100000-abcdefg",
        "name": "学习笔记",
        "icon": "",
        "sort": 1,
        "sortMode": 3,
        "closed": true,
        "newFlashcardCount": 0,
        "dueFlashcardCount": 0,
        "flashcardCount": 0
      }
      // ... 可能有更多笔记本对象
    ]
  }
}
```

### 失败返回示例 (例如，内核方法出错)

```json
{
  "code": -1, 
  "msg": "Failed to list notebooks: specific error message from kernel",
  "data": null
}
```
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
