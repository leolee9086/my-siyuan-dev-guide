---
title: 重载属性面板 (reloadAttributeView)
---
# 端点

/api/ui/reloadAttributeView

## 接口描述

此 API 端点 `POST /api/ui/reloadAttributeView` 用于通知前端重载指定块的属性面板视图。

当一个块的属性发生变化（例如通过其他 API 操作），并且需要前端的属性面板（如果当前显示的是该块的属性）更新其内容时，可以调用此接口。内核会通过 WebSocket 将 "reloadattrview" 事件推送给前端。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

-   **`id`** (string, 必需): 需要重载属性面板视图的块的 ID。

**请求示例:**

```json
{
    "id": "20230511230000-abcdefg"
}
```

## 响应体

**成功响应 (HTTP 200 OK):**

成功处理请求后，API 返回：

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

**失败响应 (HTTP 200 OK, 但 code 非 0):**

-   如果请求体不是有效的 JSON，或者缺少必需的 `id` 字段，将返回类似：
    
    ```json
    {
        "code": -1, 
        "msg": "Request body is not valid JSON", // 或 "id is missing"
        "data": null
    }
    ```
    

_注意: 认证失败 (如未提供 API Token、非管理员等) 会由中间件处理，并返回相应的 HTTP 错误状态码 (如 401, 403)。_

## 认证与授权

调用此 API 端点需要有效的用户认证 (通过 `Authorization` HTTP头部传递 API Token)。

此外，执行此操作需要：

-   **管理员角色 (`model.CheckAdminRole`):** 通常情况下，此类 UI 控制接口可能需要管理员权限。
-   **非只读模式 (`model.CheckReadonly`):** 不能在只读模式下执行此操作。

## 备注

-   此接口主要用于触发前端 UI 更新，本身不直接修改数据。
-   内核通过调用 `model.ReloadAttrView(id)` 实现，后者会发送一个类型为 \`reloadattrview\` 包含块 ID 的 WebSocket 消息给客户端。

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
