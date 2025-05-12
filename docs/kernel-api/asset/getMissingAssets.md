---
title: 获取丢失资源
---
# 端点

/api/asset/getMissingAssets

# 获取丢失资源

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/asset.go "查看源文件")

需要认证

## 接口描述

获取工作空间中被引用但实际文件已丢失的资源列表。

## 请求参数

此接口不需要参数。

## 返回值

返回一个包含丢失资源路径的列表。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | array (string) | 丢失资源路径列表 (相对于 assets 目录) |

请求示例

返回示例

### 请求示例

```
{}
```

### 返回示例

```
{
    "code": 0,
    "msg": "",
    "data": [
        "assets/image-deleted-20231027125000-abc.png",
        "assets/attachment-missing-20231027125010-def.pdf"
    ]
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
