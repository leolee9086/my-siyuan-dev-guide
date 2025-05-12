---
title: 获取工作空间历史记录
---
# 端点

/api/history/getNotebookHistory

# 获取工作空间历史记录

[源文件 (GitHub, 推测位置)](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/history.go#L543 "查看源文件 (推测)")

需要认证 需要管理员权限

## 接口描述

获取整个工作空间的历史快照列表。这些快照由思源自动（根据设置）或手动创建，记录了特定时间点附近的文件变更（创建、更新、删除、移动）。

该接口会读取 `data/history/` 目录下的时间戳子目录，并查询 `history.db` 数据库获取详细变更记录。返回结果按快照创建时间降序排列（最新的在前面）。

**注意：**此接口返回的是**所有笔记本**的综合历史记录，反映整个工作空间的变更，而非单个笔记本的独立历史。同时，它不需要任何请求参数。

## 请求参数

此接口不需要参数。

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功，非 0 表示失败。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 包含历史记录数据。 |
| data.histories | array | 历史快照对象数组，按创建时间降序排列。 |
| data.histories\[\].hCreated | string | 快照创建的时间戳字符串 (格式 `YYYYMMDDHHMMSS`)。 |
| data.histories\[\].items | array | 该快照包含的文件变更记录对象数组。 |
| data.histories\[\].items\[\].title | string | 被修改的文档或资源文件的标题/名称。 |
| data.histories\[\].items\[\].path | string | 被修改的文档或资源文件在 `data/` 目录下的相对路径 (相对于历史快照时间点)。 |
| data.histories\[\].items\[\].op | string | 操作类型：`"mk"` (创建), `"u"` (更新), `"rm"` (删除), `"mv"` (移动)。 |
| data.histories\[\].items\[\].notebook | string | 该文件所属的笔记本 ID (Box ID)。 |

请求示例

返回示例

### 请求示例

请求体为空对象。

```
POST /api/history/getNotebookHistory HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-api-token

{}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "histories": [
      {
        "hCreated": "20231027110000",
        "items": [
          {
            "title": "一篇新的笔记",
            "path": "/20231027105900-abcdefg/20231027105901-hijklmn.sy",
            "op": "mk",
            "notebook": "20231027105900-abcdefg"
          },
          {
            "title": "旧笔记标题修改",
            "path": "/20231026090000-uvwxyz/20231026090005-opqrst.sy",
            "op": "u",
            "notebook": "20231026090000-uvwxyz"
          }
        ]
      },
      {
        "hCreated": "20231027100000",
        "items": [
          {
            "title": "被删除的文档",
            "path": "/20231025150000-ghijkl/20231025150010-abcdef.sy",
            "op": "rm",
            "notebook": "20231025150000-ghijkl"
          },
          {
            "title": "important_image.png",
            "path": "/assets/important_image.png",
            "op": "u",
            "notebook": "" // Assets history notebook is empty
          }
        ]
      }
      // ... more history snapshots
    ]
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
