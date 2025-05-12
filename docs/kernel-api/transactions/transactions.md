---
title: 执行事务操作 (performTransactions)
---
# 端点

/api/transactions/transactions

## 接口描述

`POST /api/transactions` 是思源笔记中一个核心且功能强大的 API 端点，用于批量执行一系列数据修改操作（称为"事务"）。几乎所有对块、属性、文档结构等的修改都会通过此接口进行。

每个请求可以包含一个或多个事务 (`transactions`)，每个事务又包含一个或多个具体的操作 (`doOperations`)。这种设计允许将多个相关的修改原子化处理或批量提交。

此接口的灵活性和复杂性都很高，因为 `doOperations` 中的 `action` 类型和对应的 `data` 结构多种多样。

## 请求参数

请求体为一个 JSON 对象，包含以下主要字段：

```json
{
    "transactions": [
        {
            "timestamp": 0, // 后端会使用外层的 reqId 覆盖此值
            "doOperations": [
                {
                    "action": "string",     // 必需，具体的操作名称
                    "id": "string",         // 操作目标块的 ID (大多数操作需要)
                    "parentID": "string",   // 父块 ID (例如 insertBlock, moveBlock)
                    "previousID": "string", // 前一个同级块 ID (例如 insertBlock, moveBlock)
                    "nextID": "string",     // 后一个同级块 ID
                    "data": "any",          // 操作的具体数据，结构随 action 不同而变化
                    "dataType": "string",   // 数据类型，例如 "markdown", "dom"
                    "isDetached": false,    // 是否为分离的操作
                    "retData": null         // (仅用于后端返回)
                }
                // ... 更多 operations ...
            ],
            "undoOperations": [] // 可选，用于撤销的操作列表
        }
        // ... 更多 transactions ...
    ],
    "reqId": 1678886400000, // 必需，请求的唯一ID (通常是客户端生成的时间戳)
    "app": "string",        // 必需，发起请求的应用标识 (例如 "SiYuan")
    "session": "string"     // 必需，当前会话ID (例如前端的 wsClientId)
}
```

### `doOperations` 常见 Action 示例

由于 `action` 类型繁多，这里仅列举一些常见的示例。开发者应查阅思源笔记源码 (`kernel/model/` 目录下各操作函数) 以获取特定操作的准确参数结构。

#### 1\. 更新块内容 (updateBlock)

```json
{
    "action": "updateBlock",
    "id": "块ID",
    "data": "新的 Markdown 内容",
    "dataType": "markdown"
}
```

#### 2\. 插入块 (insertBlock)

```json
{
    "action": "insertBlock",
    "dataType": "markdown",
    "data": "新块的 Markdown 内容",
    "previousID": "前一个同级块的ID", // 或 nextID
    "parentID": "父块ID (如果插入到文档顶层，则为文档ID)"
}
```

`previousID` 和 `nextID` 用于指定插入位置，`parentID` 指定父容器。

#### 3\. 设置块属性 (setBlockAttrs)

```json
{
    "action": "setBlockAttrs",
    "id": "块ID",
    "data": {
        "custom-attr-name": "属性值",
        "updated": "新的更新时间戳"
        // ... 其他 name-value 对 ...
    }
}
```

#### 4\. 删除块 (deleteBlock)

```json
{
    "action": "deleteBlock",
    "id": "要删除的块ID"
}
```

#### 5\. 移动块 (moveBlock)

```json
{
    "action": "moveBlock",
    "id": "要移动的块ID",
    "previousID": "目标位置的前一个同级块ID", // 或 nextID
    "parentID": "目标父块ID"
}
```

更多 `action` 类型包括但不限于：`prependBlock`, `appendBlock`, `foldBlock`, `unfoldBlock`, `setBlockReminder`, `doc2Heading`, `heading2Doc`, `li2Doc`, `setAttrViewName` (修改属性视图的名称) 等。

## 响应体

**成功响应 (HTTP 200 OK):**

API 返回一个 JSON 对象，其中 `data` 字段包含了处理后的 `transactions` 数组。每个 `operation` 对象内部的 `retData` 字段会包含该操作的执行结果（如果操作有返回数据）。

```json
{
    "code": 0,
    "msg": "",
    "data": [
        {
            "timestamp": 1678886400000, // (与请求中的 reqId 一致)
            "doOperations": [
                {
                    "action": "updateBlock",
                    "id": "20230512000000-xxxxxxx",
                    "data": "**Updated**",
                    // ...其他输入字段...
                    "retData": { "updateCount": 1 } // 示例性的 retData
                }
            ],
            "undoOperations": []
        }
        // ...
    ]
}
```

响应头中还会包含 `Server-Timing: total;dur=<milliseconds>`，指示服务器处理请求的总时长。

**失败响应:**

-   如果请求体 JSON 解析失败: `{"code": -1, "msg": "parses request failed", "data": null}`
-   如果系统未启动完成: `{"code": -1, "msg": "Kernel is booting, please wait [progress: XX%]", "data": {"closeTimeout": 5000}}`
-   单个操作的失败可能不会导致顶层 `code` 变为非零，但其对应的 `retData` 可能会指示错误或无效果。

_注意: 认证失败 (如未提供 API Token、非管理员等) 会由中间件处理，并返回相应的 HTTP 错误状态码 (如 401, 403)。_

## 认证与授权

调用此 API 端点需要有效的用户认证 (通过 `Authorization` HTTP头部传递 API Token)。

此外，执行此操作需要：

-   **管理员角色 (`model.CheckAdminRole`)**
-   **非只读模式 (`model.CheckReadonly`)**

## 备注

-   这是思源笔记中进行数据修改最核心的接口之一。
-   后端通过 `model.PerformTransactions()` 执行实际操作。
-   操作完成后，内核会通过 WebSocket (事件类型 "transactions") 将处理后的事务推送给客户端，以实现实时同步和界面更新。
-   部分操作 (如移动大纲标题) 可能会触发额外的 WebSocket 事件 (如 "reloadDoc")。
-   由于其复杂性和核心地位，建议开发者在使用此接口前，仔细研究相关的前端调用逻辑或后端模型层代码。

> 感谢您对思源笔记的关注与支持！
> 
> [在爱发电上赞助我们](https://afdian.com/a/leolee9086?tab=feed)

© 2024-2025 [思源笔记 B3log.org](https://b3log.org/siyuan). All rights reserved.
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
