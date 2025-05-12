---
title: 删除文件/目录 API (`/api/file/removeFile`)
---
# 端点

/api/file/removeFile

# 删除文件/目录 API (\`/api/file/removeFile\`)

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/file.go#L324) [返回文件 API 列表](../pages/file.html) [返回 API 主页](../index.html)

## 接口描述

删除工作空间中的指定文件或目录。

**注意:** 路径参数相对于工作空间根目录。要删除 `data` 目录下的文件/目录，路径必须以 `data/` 开头。要删除临时目录 `temp` 下的文件/目录，路径必须以 `temp/` 开头。删除其他受限目录可能会失败。

**警告:** 删除操作是不可逆的，请谨慎使用！

## 请求

**方法:** POST

**路径:** \`/api/file/removeFile\`

**认证:** 需要 Token

### 请求体 (JSON)

| 参数 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| \`path\` | string | 是 | 要删除的文件或目录路径，相对于工作空间根目录。例如 `data/assets/image-to-delete.png` 或 `temp/old-archive.zip`。**必须包含正确的路径前缀 (如 `data/` 或 `temp/`)。** |

### 请求示例

删除数据目录下的文件:

```json
{
    "path": "data/assets/obsolete-image.jpg"
}
```

删除临时目录下的目录 (会删除目录及其所有内容):

```json
{
    "path": "temp/unzipped-files"
}
```

## 响应

### 成功响应 (200 OK)

成功删除后，返回一个空数据对象。

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

### 失败响应

如果请求失败（例如，路径无效、文件或目录不存在、权限不足等），将返回错误信息。

```json
{
    "code": -1,
    "msg": "Remove file failed: remove [...] The system cannot find the file specified.", // 或 "Invalid path [...]"
    "data": null
}
```

## 在线测试

path (必填): 

发送请求

### 测试结果:

© 2023 Siyuan Note API 文档

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
