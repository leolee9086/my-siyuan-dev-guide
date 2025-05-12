---
title: 上传资源
---
# 端点

/api/asset/upload

# 上传资源

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/asset.go "查看源文件")

需要认证 需要管理员权限

## 接口描述

上传一个或多个文件到指定的文档块关联的 assets 目录。通常用于通过 HTTP 表单上传文件。

## 请求参数

这是一个 multipart/form-data 请求。

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| assetsDirPath | string | 是 | 资源文件保存的相对路径（通常是 \`assets/\` 加上文档块ID或日期等） |
| file\[\] | file | 是 | 要上传的文件。字段名必须是 \`file\[\]\`，可以包含多个文件。 |

## 返回值

返回上传成功后的资源信息。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 包含 \`errFiles\` (上传失败的文件名列表) 和 \`succMap\` (成功上传的文件名和相对路径映射) |

请求示例 (cURL)

返回示例

### 请求示例 (cURL)

```
curl -X POST \
  http://127.0.0.1:6806/api/asset/upload \
  -H 'Authorization: Token YOUR_API_TOKEN' \
  -F 'assetsDirPath=assets/20231027132500-abcdef' \
  -F 'file[]=@/path/to/your/image.png' \
  -F 'file[]=@/path/to/your/document.pdf'
```

### 返回示例

```
{
    "code": 0,
    "msg": "",
    "data": {
        "errFiles": [],
        "succMap": {
            "image.png": "assets/20231027132500-abcdef/image.png",
            "document.pdf": "assets/20231027132500-abcdef/document.pdf"
        }
    }
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
