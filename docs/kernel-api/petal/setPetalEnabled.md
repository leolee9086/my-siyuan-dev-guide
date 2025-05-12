---
title: 设置挂件启用状态 (setPetalEnabled)
---
# 端点

/api/petal/setPetalEnabled

# 设置挂件启用状态 (setPetalEnabled)

[首页](../index.html) | [Petal API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/petal.go#L41)

## 功能描述

此 API 端点 `POST /api/petal/setPetalEnabled` 用于设置指定前端界面中特定挂件（由包名识别）的启用或禁用状态。

通过这个 API，可以动态地控制哪些挂件在特定的前端环境中是激活的。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `packageName` (string): **必填**。要设置状态的挂件的包名（唯一标识符），例如 `"siyuan-petal-clock"`。
-   `enabled` (boolean): **必填**。设置挂件的启用状态，`true` 表示启用，`false` 表示禁用。
-   `frontend` (string): **必填**。指定要设置哪个前端界面的挂件状态，例如 `"desktop"`, `"mobile"` 等。

**请求示例 (启用时钟挂件):**

```json
{
  "packageName": "siyuan-petal-clock",
  "enabled": true,
  "frontend": "desktop"
}
```

**请求示例 (禁用时钟挂件):**

```json
{
  "packageName": "siyuan-petal-clock",
  "enabled": false,
  "frontend": "desktop"
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0。

`data` 字段的内容取决于后端 `model.SetPetalEnabled` 函数的返回值，可能为 `null` 或包含一些确认信息。通常在设置类操作成功后，如果没有特殊数据需要返回，`data` 会是 `null`。

```json
{
  "code": 0,
  "msg": "",
  "data": null // 或其他确认信息
}
```

-   `code`: 0 表示成功，非 0 表示失败（例如找不到指定的挂件包名）。
-   `msg`: 错误信息（如果 code 非 0）。
-   `data`: 操作成功时通常为 \`null\`。

## 在线测试

您可以在下方输入请求参数进行在线测试。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
