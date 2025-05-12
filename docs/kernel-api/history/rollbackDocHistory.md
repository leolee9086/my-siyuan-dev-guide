---
title: 回滚单个文档历史
---
# 端点

/api/history/rollbackDocHistory

# 回滚单个文档历史

[源文件 (GitHub, 推测位置)](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/history.go#L228 "查看源文件 (推测)")

需要认证 需要管理员权限 只读模式下不可用

## 接口描述

将**单个文档**恢复到其在指定历史快照中的状态。此操作会将指定的历史 `.sy` 文件复制到当前工作空间，**覆盖**具有相同文档 ID 的现有文件（如果存在）。

**重要注意事项：**

-   此操作仅恢复文档本身的 `.sy` 文件，**不会**恢复该文档可能引用的图片或其他资源文件。
-   它会**直接覆盖**当前工作区中的同 ID 文档，**没有合并机制**。当前文档的内容将丢失。
-   此操作**不会删除任何历史记录**，与回滚整个工作空间的操作不同。
-   建议在执行此操作前，先使用 `/api/history/getDocHistoryContent` 预览历史内容。

**请谨慎使用，建议在操作前备份相关文档。**

## 请求参数 (JSON Body)

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| notebook | string | 是 | 目标文档当前（或应该恢复到）所属的笔记本 ID。 |
| historyPath | string | 是 | 要恢复的目标历史文档文件的绝对路径（相对于工作空间 `data/` 目录），例如: `/history/20231027110000/20231027105900-abcdefg/20231027105901-hijklmn.sy`。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功，非 0 表示失败。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 包含操作结果信息。 |
| data.box | string | 操作的笔记本 ID。 |

请求示例

返回示例

### 请求示例

```
POST /api/history/rollbackDocHistory HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-api-token

{
  "notebook": "20231027105900-abcdefg",
  "historyPath": "/history/20231027110000/20231027105900-abcdefg/20231027105901-hijklmn.sy"
}
```

### 返回示例 (成功)

```
{
  "code": 0,
  "msg": "",
  "data": {
    "box": "20231027105900-abcdefg"
  }
}
```

### 返回示例 (失败 - 历史文件不存在)

```
{
  "code": 0,  
  "msg": "", 
  "data": {
    "box": "20231027105900-abcdefg"
  }
} 
```

_注意：即使历史文件不存在，此 API 目前也可能返回成功 (code 0)，因为底层函数未返回错误。建议通过后续检查确认文档是否真的被恢复。_

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
