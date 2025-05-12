---
title: 获取唯一文件名
---
# 端点

/api/file/getUniqueFilename

# 获取唯一文件名

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/file.go "查看源文件")

需要认证

## 接口描述

在指定目录下生成一个唯一的文件名（避免覆盖现有文件）。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| path | string | 是 | 目标目录的路径，相对路径（相对于工作空间）。 |
| filename | string | 是 | 期望的文件名（包含扩展名）。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | string | 生成的唯一文件名（不包含路径）。例如，如果 \`example.png\` 已存在，可能返回 \`example 1.png\`。 |

请求示例

返回示例

### 请求示例

```
POST /api/file/getUniqueFilename HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "path": "/data/assets",
  "filename": "image.png"
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": "image 1.png" 
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
