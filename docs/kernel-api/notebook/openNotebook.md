---
title: 打开笔记本
---
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
>
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# 端点

/api/notebook/openNotebook

# 打开笔记本

需要认证 (管理员权限，检查只读模式)

## 接口描述

根据提供的笔记本 ID 打开（挂载）一个笔记本。如果笔记本已经是打开状态，此接口依然会尝试执行挂载操作并返回笔记本信息。

此接口需要管理员权限，并且会在只读模式下受限（用户指南除外）。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| notebook | string | 是 | 要打开的笔记本的 ID。 |
| app | string | 否 | 内部参数，通常用于用户指南打开后的特定应用跳转，一般用户可忽略。 |

## 返回值

返回标准的 JSON 结构：

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功，其他表示失败。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 成功时，包含打开的笔记本信息。 |
| data.box | object | 已打开的笔记本对象。包含笔记本的 ID、名称、图标、配置、是否关闭、排序号等详细信息。其结构与 `/api/notebook/lsNotebooks` 返回的笔记本对象类似。 |
| data.existed | boolean | 表示此笔记本在本次打开操作之前是否已经被挂载过。`true` 表示之前已挂载，`false` 表示本次操作前未挂载。 |

请求示例

返回示例

### 请求示例 (JSON)

```
{
  "notebook": "20200812220409-rng0qan"
}
```

### 成功返回示例 (首次打开)

```
{
  "code": 0,
  "msg": "",
  "data": {
    "box": {
      "id": "20200812220409-rng0qan",
      "name": "我的笔记本",
      "icon": "1f4d4",
      "sort": 0,
      "closed": false,
      "conf": { /* ...笔记本详细配置... */ },
      // ... 其他笔记本属性
    },
    "existed": false
  }
}
```

### 成功返回示例 (笔记本已打开)

```
{
  "code": 0,
  "msg": "",
  "data": {
    "box": { /* ...笔记本对象... */ },
    "existed": true
  }
}
```

### 失败返回示例 (例如，笔记本ID不存在)

```
{
  "code": -1,
  "msg": "Failed to mount box [non-existent-id]: box [non-existent-id] not found",
  "data": null
}
```

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

<script setup>
import ApiTester from '@theme/components/ApiTester.vue';
</script>
<ApiTester 
    apiPath="/api/notebook/openNotebook"
    method="POST"
    :payloadExamples="[
        { label: '打开笔记本 (请替换为实际ID)', payload: { notebook: '20200812220409-rng0qan' } }
    ]"
>
<template v-slot:warning>
<div style="color: red; border: 1px solid red; padding: 10px; margin-top: 10px;">
    <strong>注意:</strong> 此操作需要提供一个实际存在的笔记本 ID。如果笔记本已打开，操作仍会成功。在只读模式下此操作可能会失败。
</div>
</template>
</ApiTester>

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
>
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

