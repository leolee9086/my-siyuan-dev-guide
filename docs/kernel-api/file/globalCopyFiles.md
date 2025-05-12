---
title: 全局复制文件 API (`/api/file/globalCopyFiles`)
---
# 端点

/api/file/globalCopyFiles

# 全局复制文件 API (\`/api/file/globalCopyFiles\`)

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/file.go#L53) [返回文件 API 列表](../pages/file.html) [返回 API 主页](../index.html)

## 接口描述

将本地文件系统中的多个文件拷贝到工作空间的指定目录。

通常用于从外部导入资源文件。

**注意:** 目标目录路径 (\`destDir\`) 相对于工作空间根目录。要拷贝到 `data` 目录，路径必须以 `data/` 开头。要拷贝到临时目录 `temp`，路径必须以 `temp/` 开头。

源文件路径 (\`srcs\`) 是本地文件系统的绝对路径。

## 请求

**方法:** POST

**路径:** \`/api/file/globalCopyFiles\`

**认证:** 需要 Token

### 请求体 (JSON)

| 参数 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| \`srcs\` | array\[string\] | 是 | 源文件路径数组 (本地文件系统的绝对路径)。例如 `["/Users/user/Downloads/image1.png", "/Users/user/Downloads/image2.jpg"]`。 |
| \`destDir\` | string | 是 | 目标目录路径，相对于工作空间根目录。例如 `data/assets` 或 `temp/uploads`。**必须包含正确的路径前缀。** |

### 请求示例

将本地下载的文件拷贝到数据目录下的 assets:

```json
{
    "srcs": [
        "C:/Users/MyUser/Downloads/report.pdf",
        "/home/user/Pictures/logo.svg"
    ],
    "destDir": "data/assets"
}
```

将本地临时文件拷贝到工作空间的 temp 目录:

```json
{
    "srcs": ["/tmp/temp_export.zip"],
    "destDir": "temp"
}
```

## 响应

### 成功响应 (200 OK)

成功复制后，返回一个对象，其中 \`files\` 字段包含一个映射，键是原始临时文件路径，值是在 \`data/assets/\` 下生成的新文件名。

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "files": {
            "C:/Users/用户名/AppData/Local/Temp/copied-image.png": "assets/20230518120000-abcdefgh.png",
            "/tmp/another-file.pdf": "assets/20230518120001-ijklmnop.pdf"
        }
    }
}
```

### 失败响应

如果请求失败（例如，路径无效、文件不存在、复制失败等），将返回错误信息。

```json
{
    "code": -1,
    "msg": "Copy file failed: ...", // 或其他错误信息
    "data": null
}
```

## 在线测试

**注意:** 此接口操作的是操作系统级的临时文件路径，在线测试器无法直接模拟。你需要确保提供的 \`paths\` 是当前操作系统中实际存在的临时文件路径。

paths (必填, JSON 数组): \[ "你的操作系统临时文件路径1", "你的操作系统临时文件路径2" \]

assetPath (必填): 

发送请求 (需提供有效临时路径)

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
