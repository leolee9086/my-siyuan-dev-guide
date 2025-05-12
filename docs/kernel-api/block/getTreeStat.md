---
title: getTreeStat
---
# 端点

/api/block/getTreeStat

←

getTreeStat

⌂

## getTreeStat

`POST /api/block/getTreeStat`

获取指定块（通常是文档块）及其所有子孙块的统计信息。

这对于获取文档或大型块的字数、块数、链接数等统计数据非常有用。

鉴权：需要认证 Token。

**请求体参数**

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `id` | `string` | 必需。目标块（通常是文档根块）的 ID。 |

**返回值**

成功时返回包含统计信息的对象：

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "runeCount": 1234,    // 字符数 (Unicode code points)
        "wordCount": 234,     // 词语数 (按空格分隔)
        "linkCount": 5,       // 链接块数量
        "imageCount": 2,      // 图片块数量
        "refCount": 10,       // 块引用数量
        "blockCount": 50,     // 总块数（包括自身及所有子孙）
        "markdownSize": 5678, // Markdown 文件大小 (字节)
        "hSize": "5.5 KiB"    // 人类可读的文件大小
    }
}
```

如果指定的块 ID 不存在或无效：

```json
{
    "code": 0, // 注意：即使块不存在，code 可能也为 0
    "msg": "",
    "data": {
        "runeCount": 0,
        "wordCount": 0,
        "linkCount": 0,
        "imageCount": 0,
        "refCount": 0,
        "blockCount": 0,
        "markdownSize": 0,
        "hSize": "0 B"
    }
}
```

失败时（例如 ID 格式无效）：

```json
{
    "code": -1, // 或其他错误码
    "msg": "错误信息",
    "data": null
}
```

**请求示例**

获取 ID 为 \`20230101...\` 的文档块的统计信息：

```json
{
    "id": "20230101120000-abcdefgh"
}
```

## 在线测试

服务器地址:

API Token: 

API 路径: 

请求方法: 

请求体:

发送请求

响应结果:

[查看源代码 (block.go)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block.go) | [查看模型代码 (model/block.go)](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/block.go) | [返回 Block API 列表](../pages/block.html) | [返回 API 首页](../index.html)

© 2024 Siyuan Note API Documentation

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
