---
title: getRefIDsByFileAnnotationID
---
# 端点

/api/block/getRefIDsByFileAnnotationID

←

getRefIDsByFileAnnotationID

⌂

## getRefIDsByFileAnnotationID

`POST /api/block/getRefIDsByFileAnnotationID`

根据指定的文件注解块 ID，获取所有引用了该文件注解的块 ID 列表及对应的引用文本。

文件注解块是关联到非 \`.sy\` 文件（如 PDF、图片等）的特殊块，通常用于存储对这些文件的评论或标记。

鉴权：需要认证 Token。

**请求体参数**

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `id` | `string` | 必需。目标文件注解块的 ID。 |

**返回值**

成功时返回包含引用块 ID 列表和引用文本列表的对象：

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "refIDs": [
            "引用块ID_1",
            "引用块ID_2",
            // ...
        ],
        "refTexts": [
            "引用文本_1", // 引用块 1 中 ((文件注解块ID "引用文本_1")) 中的文本
            "引用文本_2",
            // ...
        ]
    }
}
```

如果文件注解块不存在或没有被引用，\`refIDs\` 和 \`refTexts\` 会是空数组 \`\[\]\`。

失败时（例如 ID 格式无效）：

```json
{
    "code": -1, // 或其他错误码
    "msg": "错误信息",
    "data": null
}
```

**请求示例**

获取 ID 为 \`20230101...\` 的文件注解块的引用信息：

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
