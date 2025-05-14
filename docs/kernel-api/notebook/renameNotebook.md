---
title: 重命名笔记本
---
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
>
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# 重命名笔记本

## 端点

/api/notebook/renameNotebook

需要认证 (管理员权限，检查只读模式)

## 接口描述

根据提供的笔记本 ID 和新名称，重命名一个已存在的笔记本。

此接口需要管理员权限，并且会在只读模式下受限。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| notebook | string | 是 | 要重命名的笔记本的 ID。 |
| name | string | 是 | 笔记本的新名称。名称不能为空，且需要符合命名规范。 |

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

```json
{
  "notebook": "20200812220409-rng0qan",
  "name": "新的笔记本名称"
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

### 失败返回示例 (例如，笔记本ID不存在)

```json
{
  "code": -1,
  "msg": "rename box [non-existent-id] failed: notebook [non-existent-id] not found",
  "data": {
    "closeTimeout": 5000
  }
}
```

### 失败返回示例 (例如，新名称不合法)

```json
{
  "code": -1,
  "msg": "box name [\\] is invalid: path segments should not be empty",
  "data": {
    "closeTimeout": 5000
  }
}
```

### 失败返回示例 (只读模式)

```json
{
  "code": -1,
  "msg": "只读模式下无法执行该操作",
  "data": {
    "closeTimeout": 5000
  }
}
```
<script setup>
import ApiTester from '@theme/components/ApiTester.vue';
</script>
<ApiTester 
    apiPath="/api/notebook/renameNotebook"
    method="POST"
    :payloadExamples="[
        { 
            label: '重命名笔记本 (请替换为实际ID和新名称)', 
            payload: { notebook: '20200812220409-rng0qan', name: '新的笔记本名称' } 
        }
    ]"
>
<template v-slot:warning>
<div style="color: orange; border: 1px solid orange; padding: 10px; margin-top: 10px;">
    <strong>注意:</strong> 此操作需要提供一个实际存在的笔记本 ID 和有效的新名称。在只读模式下此操作可能会失败。
</div>
</template>
</ApiTester>

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
>
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

