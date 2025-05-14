---
title: 设置笔记本配置
---
# 端点

/api/notebook/setNotebookConf

# 设置笔记本配置

需要认证 (管理员权限，检查只读模式)

## 接口描述

修改指定笔记本的配置信息。可以更新笔记本的名称、图标、排序值、关闭状态等。

此接口需要管理员权限，并且会在只读模式下受限。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| notebook | string | 是 | 要修改配置的笔记本的 ID。 |
| conf | object | 是 | 一个包含要更新的配置项的对象。具体可配置项见下。 |

### `conf` 对象详情

| conf 内参数名 | 类型 | 描述 |
| --- | --- | --- |
| name | string | 可选。设置新的笔记本名称。 |
| icon | string | 可选。设置新的笔记本图标 (通常是 Emoji 字符)。 |
| sort | number | 可选。设置新的笔记本排序权重值。 |
| closed | boolean | 可选。设置笔记本是否为关闭状态。`true` 为关闭，`false` 为打开。注意：将此项从 `true` 改为 `false` 仅更新配置，并不会自动挂载（打开）一个先前已关闭（卸载）的笔记本，如需确保笔记本被打开，应调用 `/api/notebook/openNotebook`。 |
| _其他_ | _any_ | 可选。笔记本配置对象中可能还包含其他可自定义的字段，此接口允许通过 `conf` 对象直接更新它们。具体支持的字段依赖于思源笔记内核版本和具体实现。 |

## 返回值

返回标准的 JSON 结构：

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功，其他表示失败。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 成功时，返回包含 `{"notebook": "boxID"}` 的对象。 |

请求示例

返回示例

### 请求示例 (更改名称和图标)

```
{
  "notebook": "20200812220409-rng0qan",
  "conf": {
    "name": "我的新笔记本名称",
    "icon": "💡"
  }
}
```

### 请求示例 (设置关闭状态并修改自定义配置项)

```
{
  "notebook": "20210310102030-abcdefg",
  "conf": {
    "closed": true,
    "customField": "customValue" 
  }
}
```

### 成功返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "notebook": "20200812220409-rng0qan"
  }
}
```

### 失败返回示例 (笔记本ID不存在)

```
{
  "code": -1,
  "msg": "notebook [non-existent-id] not found",
  "data": null
}
```

### 失败返回示例 (conf 参数不是对象)

```
{
  "code": -1,
  "msg": "conf is not an object",
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

<ApiTester 
    apiPath="/api/notebook/setNotebookConf"
    method="POST"
    :payloadExamples="[
        {
            label: '更改名称和图标 (请替换ID)',
            payload: { 
                notebook: '20200812220409-rng0qan', 
                conf: { 
                    name: '我的新笔记本名称', 
                    icon: '💡' 
                }
            }
        },
        {
            label: '设置关闭状态 (请替换ID)',
            payload: { 
                notebook: '20210310102030-abcdefg', 
                conf: { 
                    closed: true 
                }
            }
        },
        {
            label: '修改排序值 (请替换ID)',
            payload: { 
                notebook: '20200812220409-rng0qan', 
                conf: { 
                    sort: 10 
                }
            }
        }
    ]"
>
<template v-slot:warning>
<div style="color: orange; border: 1px solid orange; padding: 10px; margin-top: 10px;">
    <strong>注意:</strong> 此操作需要提供一个实际存在的笔记本 ID。`conf` 对象中的具体可配置项可能随思源版本变化。在只读模式下此操作可能会失败。
</div>
</template>
</ApiTester>

