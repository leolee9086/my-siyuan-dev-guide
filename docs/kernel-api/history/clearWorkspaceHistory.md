---
title: 清理工作空间历史
---
# 端点

/api/history/clearWorkspaceHistory

# 清理工作空间历史

需要认证

**警告：这是一个不可逆的操作！** 清理工作空间历史将永久删除所有笔记本和文档的历史记录。请务必在执行前确认或备份！

## 接口描述

清理当前工作空间的所有历史记录数据，包括笔记本历史和文档历史。这是一个全局性的清理操作。

## 请求参数

此接口不需要请求参数。

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| 无请求参数 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息，成功时通常为空或提示信息 |
| data | null | 无返回数据 |

请求示例

返回示例

### 请求示例

```
POST /api/history/clearWorkspaceHistory HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{}
```

### 返回示例

```
{
  "code": 0,
  "msg": "工作空间历史已清理",
  "data": null
}
```

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

  清空工作区历史 - 思源笔记 API 文档 

# 清空工作区历史

需要认证 需要管理员权限

**危险操作：** 此操作将删除所有历史记录，且不可恢复。请在执行前确认并备份重要数据。

## 接口描述

清空整个工作区的历史记录。此操作会删除所有笔记本的所有历史版本，操作不可撤销，请谨慎使用。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| 无需参数 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | null | 无返回数据 |

请求示例

返回示例

### 请求示例

```
POST /api/history/clearWorkspaceHistory HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{}
```

### 返回示例

```
{
  "code": 0,
  "msg": "工作区历史记录已清空",
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
