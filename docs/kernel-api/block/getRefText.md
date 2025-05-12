---
title: getRefText
---
# 端点

/api/block/getRefText

←

getRefText

⌂

## getRefText

`POST /api/block/getRefText`

获取指定块的引用文本（Ref Text）。

引用文本是当其他块通过 \`((块ID))\` 语法引用此块时，默认显示的文本内容。通常是块内容的纯文本表示，但也可能受到命名（Name）属性的影响。

鉴权：需要认证 Token。

**请求体参数**

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `id` | `string` | 必需。目标块的 ID。 |

**返回值**

成功时返回块的引用文本字符串：

```json
{
    "code": 0,
    "msg": "",
    "data": "块的引用文本"
}
```

注意：

-   如果块内容为空，\`data\` 字段会返回块的 \`id\`。
-   如果块内容全部由反斜杠 \`\\\` 组成，\`data\` 字段会返回转义后的 HTML 实体字符串（例如 \`\\\\\`）。

失败时（例如 ID 格式无效）：

```json
{
    "code": -1, // 或其他错误码
    "msg": "错误信息",
    "data": null
}
```

**请求示例**

获取 ID 为 \`20230101...\` 的块的引用文本：

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

