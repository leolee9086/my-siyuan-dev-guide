---
title: Pandoc 转换
---
# 端点

/api/convert/pandoc

[← 返回 Convert API 列表](../pages/convert.html)

# Pandoc 转换

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/pandoc.go#L26)

`POST /api/convert/pandoc`

## 描述

调用系统安装的 Pandoc 工具执行文档格式转换。需要系统中已正确安装并配置 Pandoc。

此接口允许传递任意 Pandoc 命令行参数，实现灵活的格式转换。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `dir` | `string` | 用于 Pandoc 操作的工作目录名称（相对于工作空间下的 `temp/pandoc/` 目录）。如果指定，Pandoc 会在此目录下进行读写操作。如果省略，会自动生成一个随机目录。 | 否 |
| `args` | `[string]` | 要传递给 Pandoc 命令行的参数数组。例如 `["-f", "markdown", "-t", "html", "input.md", "-o", "output.html"]`。 | 是 |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示 Pandoc 命令成功执行，非 0 表示失败（例如 Pandoc 未安装、参数错误等）。`data` 包含 Pandoc 输出文件的相对路径（相对于工作空间下的 `temp/pandoc/<dir>/` 目录）。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "path": "output.html" // Pandoc 输出的文件路径
  }
}
```

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
