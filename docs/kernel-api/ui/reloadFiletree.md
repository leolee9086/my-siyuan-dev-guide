---
title: 重载文件树 (reloadFiletree)
---
# 端点

/api/ui/reloadFiletree

## 接口描述

此 API 端点 `POST /api/ui/reloadFiletree` 用于通知前端重载文件树视图。

当文件结构发生变化（例如通过 API 创建、删除、移动文档或笔记本），并且需要前端的文件树面板更新其内容时，可以调用此接口。内核会通过 WebSocket 将 "reloadfiletree" 事件推送给前端。

## 请求参数

此接口不需要请求参数。可以发送一个空的 JSON 对象 `{}` 作为请求体，或者不包含请求体。

**请求示例 (空JSON):**

```json
{}
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

**失败响应:**

由于此接口不处理复杂的请求参数，主要的失败场景是认证失败。认证失败 (如未提供 API Token、非管理员等) 会由中间件处理，并返回相应的 HTTP 错误状态码 (如 401, 403)。

## 认证与授权

调用此 API 端点需要有效的用户认证 (通过 `Authorization` HTTP头部传递 API Token)。

此外，执行此操作需要：

-   **管理员角色 (`model.CheckAdminRole`):** 通常情况下，此类 UI 控制接口可能需要管理员权限。
-   **非只读模式 (`model.CheckReadonly`):** 不能在只读模式下执行此操作。

## 备注

-   此接口主要用于触发前端 UI 更新，本身不直接修改数据。
-   内核通过调用 `model.ReloadFiletree()` 实现，后者会发送一个类型为 \`reloadfiletree\` 的 WebSocket 消息给客户端。

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
