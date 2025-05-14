---
title: 创建笔记本 (createNotebook)
---
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
>
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# 端点

/api/notebook/createNotebook

## 接口描述

本接口用于创建一个新的笔记本。

创建笔记本后，该笔记本会自动挂载并立即可用。系统会在数据目录下创建一个以唯一ID命名的文件夹作为笔记本的存储位置。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| `name` | string | 是 | 新笔记本的名称。如果为空，则使用默认名称"未命名笔记本"。名称长度不能超过512个字符。 |

## 响应体

成功时，响应体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| `code` | number | 状态码，0 表示成功。 |
| `msg` | string | 错误信息，成功时为空字符串。 |
| `data` | object | 返回数据，包含已创建的笔记本对象。 |

其中，`data.notebook` 包含以下字段：

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| `id` | string | 笔记本 ID，格式为以数字和字母组成的唯一标识符 |
| `name` | string | 笔记本名称 |
| `icon` | string | 笔记本图标（Emoji） |
| `sort` | number | 笔记本排序序号 |
| `closed` | boolean | 笔记本是否关闭，新创建的笔记本为 false |

## 请求示例

```json
{
  "name": "我的新笔记本"
}
```

## 响应示例

成功响应：

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "notebook": {
      "id": "20250509113347-abcdefg",
      "name": "我的新笔记本",
      "icon": "📒",
      "sort": 6,
      "closed": false
    }
  }
}
```

失败响应（名称过长）：

```json
{
  "code": -1,
  "msg": "名称过长",
  "data": null
}
```

## 错误码

| 错误码 | 描述 |
| --- | --- |
| `0` | 成功 |
| `-1` | 失败，可能原因包括：名称过长（超过512个字符）、文件系统错误等 |

## 源码定位

后端实现相关的核心逻辑可以在以下文件中找到：

-   路由定义：`siyuan/kernel/api/router.go`（路由 `/api/notebook/createNotebook`）
-   API 处理函数：`siyuan/kernel/api/notebook.go`（函数 `createNotebook`）
-   模型层实现：`siyuan/kernel/model/mount.go`（函数 `CreateBox`）

创建笔记本时，系统会执行以下主要操作：

1.  清理名称中的无效字符
2.  检查名称长度（≤ 512个字符）
3.  生成唯一ID
4.  在数据目录下创建对应的文件夹
5.  创建并保存笔记本配置文件
6.  将笔记本加载到内存中
7.  发送广播事件通知前端

## 在线测试

<script setup>
import ApiTester from '@theme/components/ApiTester.vue';
</script>

<ClientOnly>
  <ApiTester
    title="测试 createNotebook"
    endpoint="/api/notebook/createNotebook"
    method="POST"
    :params="[
      {
        name: 'name',
        label: '笔记本名称',
        type: 'string',
        required: true,
        default: '我的新笔记本',
        description: '新笔记本的名称。如果为空，则使用默认名称 \'未命名笔记本\'。名称长度不能超过512个字符。'
      }
    ]"
  />
</ClientOnly>

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
>
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
