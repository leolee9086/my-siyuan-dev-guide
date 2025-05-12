---
title: 插入本地资源
---
# 端点

/api/asset/insertLocalAssets

# 插入本地资源

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/asset.go "查看源文件")

需要认证 需要管理员权限

## 接口描述

将本地文件系统中的一个或多个文件复制到思源笔记的 assets 目录，并返回它们在笔记中可用的资源链接。

## 请求参数

（待补充详细参数）

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| assetPaths | array (string) | 是 | 本地文件的绝对路径列表 |
| id | string | 是 | 要插入这些资源的文档块 ID |

## 返回值

返回插入成功后的资源信息。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 包含 \`succMap\` (成功插入的资源路径和 Markdown 链接映射) 和 \`errFiles\` (插入失败的文件列表) |

请求示例

返回示例

### 请求示例

```
{
    "assetPaths": [
        "C:/Users/YourName/Pictures/image.png",
        "/Users/YourName/Documents/document.pdf"
    ],
    "id": "20231027130500-pqrstuv"
}
```

### 返回示例

```
{
    "code": 0,
    "msg": "",
    "data": {
        "errFiles": [],
        "succMap": {
            "assets/image-20231027130510-wxyz.png": "![image.png](assets/image-20231027130510-wxyz.png)",
            "assets/document-20231027130515-1234.pdf": "[document.pdf](assets/document-20231027130515-1234.pdf)"
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
