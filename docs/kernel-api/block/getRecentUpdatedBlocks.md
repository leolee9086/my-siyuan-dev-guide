---
title: getRecentUpdatedBlocks
---
# 端点

/api/block/getRecentUpdatedBlocks

←

getRecentUpdatedBlocks

⌂

## getRecentUpdatedBlocks

`POST /api/block/getRecentUpdatedBlocks`

获取最近更新的块列表。

此接口不接受任何参数，直接返回系统记录的最近更新的块信息。

鉴权：需要认证 Token。

**请求体参数**

无

**返回值**

成功时返回包含最近更新块信息的对象数组：

```json
{
    "code": 0,
    "msg": "",
    "data": [
        {
            "id": "块ID_1",
            "updated": "更新时间戳_1",
            "content": "块内容摘要_1", // 通常是块的纯文本内容
            "type": "块类型_1", // 例如 'p' (段落), 'h' (标题), 'l' (列表) 等
            "box": {
                "id": "笔记本ID_1",
                "name": "笔记本名称_1",
                "icon": "笔记本图标_1"
            },
            "path": "块所在文档路径_1"
            // 可能包含其他块信息
        },
        {
            "id": "块ID_2",
            // ... 其他块信息
        }
        // ...
    ]
}
```

失败时：

```json
{
    "code": -1, // 或其他错误码
    "msg": "错误信息",
    "data": null
}
```

**请求示例**

```json
{}
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

