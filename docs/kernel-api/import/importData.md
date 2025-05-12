---
title: 导入数据
---
# 端点

/api/import/importData

[← 返回 Import API 列表](../pages/import.html)

# 导入数据

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/import.go#L101)

`POST /api/import/importData`

## 描述

导入之前通过"导出数据"功能生成的 `data.zip` 数据包。这个 API 主要用于恢复备份或迁移整个工作空间的数据。

**警告：** 导入数据会覆盖当前工作空间的全部内容（笔记本、配置等），请务必在执行前备份好当前数据！

## 请求参数

请求需要使用 `multipart/form-data` 格式发送。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `file` | `File` | 要导入的 `data.zip` 数据包文件。 | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。导入过程是异步的，API 成功返回仅代表接收文件成功并开始处理。

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

如果请求处理或文件接收过程中出错（例如文件未上传、创建临时文件失败等），`code` 会是 -1，并包含错误信息。

导入操作本身可能耗时较长，并且可能因数据包损坏或格式问题导致失败，这些错误通常会通过系统日志或界面消息提示。

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

思源笔记 API 文档
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
