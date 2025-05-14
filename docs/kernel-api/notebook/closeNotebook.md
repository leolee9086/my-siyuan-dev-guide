---
title: 关闭笔记本
---
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
>
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# 端点

/api/notebook/closeNotebook

[← 返回 Notebook API 列表](./index.html)

# 关闭笔记本

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/notebook.go#L286)

需要认证 (管理员权限，检查只读模式)

## 接口描述

关闭指定的笔记本。此操作会从当前工作空间卸载该笔记本，但不会删除笔记本的物理文件。

此接口会调用内核的 `model.Unmount` 方法来实际执行操作。

此接口需要管理员权限，并且会在只读模式下受限。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| notebook | string | 是 | 要关闭的笔记本的 ID。 |

## 返回值

返回标准的 JSON 结构：

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功，其他表示失败。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | null | 成功时，此字段为 null。如果笔记本 ID 无效或解析参数失败，也可能返回 null，此时应检查 code 和 msg。 |

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
  "data": null
}
```

### 失败返回示例 (例如，笔记本ID无效或只读模式限制)

```json
{
  "code": -1, 
  "msg": "Invalid notebook ID pattern: NotebookID_Pattern_Error_Message_Here / Or readonly mode message",
  "data": null
}
```

## 在线测试

:::danger 注意
此操作会关闭（卸载）指定的笔记本，使其在工作空间中不再可见，但不会删除物理文件。
在不完全信任的网站或工具中输入您的 API Token 存在安全风险。本站点的在线测试功能在您的浏览器本地运行，但仍建议您仅在测试环境或使用临时的、权限受限的 Token。
:::

<script setup>
import ApiTester from '@theme/components/ApiTester.vue';
</script>

<ClientOnly>
  <ApiTester
    title="测试 closeNotebook"
    endpoint="/api/notebook/closeNotebook"
    method="POST"
    :params="[
      {
        name: 'notebook',
        label: '笔记本 ID',
        type: 'string',
        required: true,
        description: '要关闭的笔记本的 ID。'
      }
    ]"
  />
</ClientOnly>

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
>
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
