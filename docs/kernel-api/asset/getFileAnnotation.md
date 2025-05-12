---
title: getFileAnnotation
---
# 端点

/api/asset/getFileAnnotation

# getFileAnnotation

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/asset.go#L250)

需要认证

## 接口描述

获取指定资源文件的标注信息 (PDF 文件等)。

## 请求参数

（待补充详细参数）

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| path | string | 是 | 资源文件的路径 (相对于 assets 目录) |

## 返回值

返回文件的标注数据。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 标注数据对象 (具体结构待补充) |

请求示例

返回示例

### 请求示例

```
{
    "path": "assets/document-20231027124000-uvwxyz.pdf"
}
```

### 返回示例

```
{
    "code": 0,
    "msg": "",
    "data": {
        "annotations": [
        ]
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
