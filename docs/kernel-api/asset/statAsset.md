---
title: 获取资源统计信息
---
# 端点

/api/asset/statAsset

# 获取资源统计信息

需要认证 需要管理员权限

## 接口描述

获取指定资源文件的统计信息，如大小、修改时间等。

## 请求参数

（待补充详细参数）

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| path | string | 是 | 资源文件的路径 (相对于 assets 目录) |

## 返回值

返回资源的统计信息。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 包含 \`size\` (大小，字节) 和 \`modTime\` (修改时间戳，毫秒) 等字段的统计信息对象 |

请求示例

返回示例

### 请求示例

```
{
    "path": "assets/image-20231027132000-xyz.png"
}
```

### 返回示例

```
{
    "code": 0,
    "msg": "",
    "data": {
        "size": 12345,
        "modTime": 1698384000000 
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
