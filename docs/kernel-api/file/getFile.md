---
title: 获取文件
---
# 端点

/api/file/getFile

# 获取文件

需要认证

## 接口描述

获取工作空间中指定文件的内容。

**注意:** 路径参数相对于工作空间根目录。要获取 `data` 目录下的文件，路径必须以 `data/` 开头。要获取临时目录 `temp` 下的文件，路径必须以 `temp/` 开头。

出于安全原因，无法直接获取 `conf.json` 文件内容（除非是管理员）。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| \`path\` | string | 是 | 要获取的文件路径，相对于工作空间根目录。例如 `data/assets/image.png` 或 `temp/downloaded.zip`。**必须包含正确的路径前缀 (如 `data/` 或 `temp/`)。** |

### 请求示例

获取数据目录下的图片文件:

```json
{
    "path": "data/assets/image.png"
}
```

获取临时目录下的 zip 文件:

```json
{
    "path": "temp/downloaded.zip"
}
```

## 返回值

如果请求成功，会直接返回文件内容，Content-Type 会根据文件类型自动设置。

如果请求失败，会返回错误信息，格式如下：

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，-1表示参数错误，403表示禁止访问，404表示文件不存在，500表示服务器错误 |
| msg | string | 错误信息 |

请求示例

返回示例

### 请求示例

```
POST /api/file/getFile HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-api-token

{
  "path": "/data/assets/image.png"
}
```

### 返回示例

成功时返回文件内容（二进制数据）

失败时返回错误信息：

```
{
  "code": 404,
  "msg": "stat /data/assets/image.png: no such file or directory"
}
```

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
