---
title: 重命名文件/目录 API (`/api/file/renameFile`)
---
# 端点

/api/file/renameFile

# 重命名文件/目录 API (\`/api/file/renameFile\`)

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/file.go#L279) [返回文件 API 列表](../pages/file.html) [返回 API 主页](../index.html)

## 接口描述

重命名或移动工作空间中的文件或目录。

**注意:** 路径参数相对于工作空间根目录。要操作 `data` 目录下的文件/目录，路径必须以 `data/` 开头。要操作临时目录 `temp` 下的文件/目录，路径必须以 `temp/` 开头。

## 请求

**方法:** POST

**路径:** \`/api/file/renameFile\`

**认证:** 需要 Token

### 请求体 (JSON)

| 参数 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| \`oldPath\` | string | 是 | 旧的文件或目录路径，相对于工作空间根目录。例如 `data/assets/old-name.png` 或 `temp/temp-file.zip`。**必须包含正确的路径前缀。** |
| \`newPath\` | string | 是 | 新的文件或目录路径，相对于工作空间根目录。例如 `data/assets/new-name.png` 或 `data/widgets/my-widget`。**必须包含正确的路径前缀。** |

### 请求示例

重命名数据目录下的文件:

```json
{
    "oldPath": "data/assets/image.jpg",
    "newPath": "data/assets/photo.jpg"
}
```

将临时目录解压出的文件移动到最终位置:

```json
{
    "oldPath": "temp/widget-unzipped",
    "newPath": "data/widgets/my-new-widget"
}
```

## 响应

### 成功响应 (200 OK)

成功重命名后，返回一个空数据对象。

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

### 失败响应

如果请求失败（例如，路径无效、文件不存在、新路径已存在、权限不足等），将返回错误信息。

```json
{
    "code": -1,
    "msg": "Invalid path [...]", // 或 "Rename file failed: ... The system cannot find the file specified.", "Rename file failed: ... The file already exists."
    "data": null
}
```

## 在线测试

oldPath (必填): 

newPath (必填): 

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
