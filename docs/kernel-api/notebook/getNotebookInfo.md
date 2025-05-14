---
title: 获取笔记本信息
---
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
>
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# 获取笔记本信息

## 端点

/api/notebook/getNotebookInfo

[在 GitHub 上查看源码 (notebook.go)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/notebook.go#L31) [BoxInfo 定义 (box.go)](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/box.go#L380)

需要认证 (检查只读模式)

## 接口描述

获取指定笔记本的基本信息，例如 ID、名称、文档数量、大小以及创建和修改时间等。

此接口会调用内核的 `model.Conf.Box(notebookID).GetInfo()` 方法来获取数据。

此接口需要认证，并且会在只读模式下受限。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| notebook | string | 是 | 要获取信息的笔记本的 ID。 |

## 返回值

返回标准的 JSON 结构，其中 `data` 字段包含一个名为 `boxInfo` 的对象：

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功，其他表示失败。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 成功时，包含 `boxInfo` 对象的容器；失败或笔记本不存在时可能为 null。 |
| data.boxInfo | object | 包含笔记本详细信息的对象 (`BoxInfo` 结构)。 |

### `data.boxInfo` (BoxInfo) 对象结构

`BoxInfo` 对象包含以下字段：

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| id | string | 笔记本的 ID。 |
| name | string | 笔记本的名称 (经过 HTML 转义)。 |
| docCount | number | 笔记本中的文档数量 (不包括隐藏文档和非 .sy 文件)。 |
| size | number | 笔记本中所有文档的总大小（以字节为单位）。 |
| hSize | string | 人类可读的笔记本总大小 (例如 "1.2 MB")。 |
| mtime | number | 笔记本中最新文档的最后修改时间戳 (Unix 秒)。 |
| ctime | number | 笔记本的创建时间戳 (Unix 秒，通常基于笔记本 ID 的前14位解析)。 |
| hMtime | string | 人类可读的笔记本最后修改时间 (格式如 "YYYY-MM-DD HH:MM:SS, N分钟前")。 |
| hCtime | string | 人类可读的笔记本创建时间 (格式如 "YYYY-MM-DD HH:MM:SS, N天前")。 |

请求示例

返回示例

### 请求示例 (JSON)

```json
{
  "notebook": "20200812220409-rng0qan"
}
```

### 成功返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "boxInfo": {
      "id": "20200812220409-rng0qan",
      "name": "我的知识库",
      "docCount": 150,
      "size": 12345678,
      "hSize": "11.77 MB",
      "mtime": 1678888888,
      "ctime": 1597241049,
      "hMtime": "2023-03-15 22:01:28, 2个月前",
      "hCtime": "2020-08-12 22:04:09, 2年前"
    }
  }
}
```

### 失败返回示例 (例如，笔记本ID无效或未找到)

```json
{
  "code": -1, 
  "msg": "notebook [20200812220409-invalid] not found",
  "data": null
}
```

## 在线测试

<script setup>
import ApiTester from '@theme/components/ApiTester.vue';
</script>

<ClientOnly>
  <ApiTester
    title="测试 getNotebookInfo"
    endpoint="/api/notebook/getNotebookInfo"
    method="POST"
    :params="[
      {
        name: 'notebook',
        label: '笔记本 ID',
        type: 'string',
        required: true,
        description: '要获取信息的笔记本的 ID。'
      }
    ]"
  />
</ClientOnly>

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
>
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
