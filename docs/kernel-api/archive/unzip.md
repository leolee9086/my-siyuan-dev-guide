---
title: 解压文件(unzip)
---
# 端点

/api/archive/unzip

# 解压文件

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/archive.go "查看源文件")

需要认证 需要管理员权限

## 接口描述

解压一个指定的压缩文件到指定目录。

**注意：**所有路径参数都应相对于工作空间根目录，并且**必须**包含 `data/` 前缀才能正确定位到数据目录下的文件或文件夹。

## 请求参数 (JSON)

请求体必须是 `application/json` 格式。

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| path | string | 是 | 要解压的压缩文件路径 (相对于工作空间根目录，例如: `data/temp/my-package.zip` 或 `data/assets/archive.zip`)。**必须包含 `data/` 前缀。** |
| dest | string | 是 | 解压目标目录路径 (相对于工作空间根目录，例如: `data/widgets/my-widget` 或 `data/temp/unzipped`)。如果目录不存在，将会被创建。**必须包含 `data/` 前缀。** |

## 返回值

标准返回格式，data 为 null。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | null | 固定为 null |

请求示例

返回示例

### 请求示例

假设要将工作空间 `data/temp/widget-pkg.zip` 文件解压到 `data/widgets/new-widget/` 目录：

```
{
    "path": "data/temp/widget-pkg.zip",
    "dest": "data/widgets/new-widget"
}
```

### 返回示例

```
{
    "code": 0,
    "msg": "",
    "data": null
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
