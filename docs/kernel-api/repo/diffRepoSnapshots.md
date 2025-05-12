---
title: 对比快照差异 (diffRepoSnapshots)
---
# 端点

/api/repo/diffRepoSnapshots

# 对比快照差异 (diffRepoSnapshots)

[首页](../index.html) | [Repo API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/repo.go#L83)

## 功能描述

此 API 端点 `POST /api/repo/diffRepoSnapshots` 用于对比两个指定的版本库快照之间的差异。

它可以帮助用户或开发者了解两个不同时间点的版本库状态变化，例如哪些文件被添加、修改或删除了。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `left` (string): **必填**。第一个（通常是较旧的）快照的 ID。
-   `right` (string): **必填**。第二个（通常是较新的）快照的 ID。

**请求示例:**

```json
{
  "left": "20231026100000-abcdefg", 
  "right": "20231027100000-hijklmn"
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 字段包含差异信息。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "addsLeft": [ // 相对于 right，left 中新增的文件列表 (通常为空，除非 left 比 right 新)
        // {"path": "/path/to/new/file1.sy", "type": "f", "hash": "...", "size": 123, "hSize": "123 B", "mode": 436, "mtime": 1666771200, "hMtime": "..."},...
    ],
    "updatesLeft": [ // 相对于 right，left 中更新的文件列表
        // {"path": "/path/to/updated/file2.sy", ... },...
    ],
    "updatesRight": [ // 相对于 left，right 中更新的文件列表 (内容应与 updatesLeft 一致)
        // {"path": "/path/to/updated/file2.sy", ... },...
    ],
    "removesRight": [ // 相对于 left，right 中移除的文件列表
        // {"path": "/path/to/removed/file3.sy", ... },...
    ],
    "left": { // 第一个快照的索引信息
      "time": 1666771200,
      "hTime": "2023-10-26 10:00:00",
      "id": "20231026100000-abcdefg",
      "size": 102400,
      "hSize": "100 KB",
      "tag": "", // 快照标签（如果有）
      "files": [ /* ... left 快照中的所有文件列表 ... */ ]
    },
    "right": { // 第二个快照的索引信息
      "time": 1666857600,
      "hTime": "2023-10-27 10:00:00",
      "id": "20231027100000-hijklmn",
      "size": 103424,
      "hSize": "101 KB",
      "tag": "v1.0",
      "files": [ /* ... right 快照中的所有文件列表 ... */ ]
    }
  }
}
```

-   `code`: 0 表示成功，非 0 表示失败（例如快照 ID 无效）。
-   `msg`: 错误信息（如果 code 非 0）。
-   `data.addsLeft`: 一个数组，包含只存在于 \`left\` 快照中的文件信息。
-   `data.updatesLeft`: 一个数组，包含在 \`left\` 和 \`right\` 中都存在但内容不同的文件信息（基于 \`left\` 的视角）。
-   `data.updatesRight`: 一个数组，包含在 \`left\` 和 \`right\` 中都存在但内容不同的文件信息（基于 \`right\` 的视角，文件列表应与 \`updatesLeft\` 相同）。
-   `data.removesRight`: 一个数组，包含只存在于 \`left\` 快照中但在 \`right\` 快照中已被删除的文件信息。
-   `data.left`: \`left\` 快照的完整索引信息，包括时间、ID、大小、标签和文件列表。
-   `data.right`: \`right\` 快照的完整索引信息。

每个文件信息对象通常包含 \`path\` (路径), \`type\` (类型，如 'f' 文件, 'd' 目录), \`hash\` (内容哈希), \`size\` (大小), \`hSize\` (可读大小), \`mode\` (权限), \`mtime\` (修改时间戳), \`hMtime\` (可读修改时间)。

## 在线测试

您可以在下方输入要对比的两个快照 ID 进行在线测试。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
