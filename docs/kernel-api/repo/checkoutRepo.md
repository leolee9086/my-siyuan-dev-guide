---
title: 检出版本库快照 (checkoutRepo)
---
# 端点

/api/repo/checkoutRepo

# 检出版本库快照 (checkoutRepo)

[首页](../index.html) | [Repo API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/repo.go#L137)

## 功能描述

此 API 端点 `POST /api/repo/checkoutRepo` 用于检出（恢复）到指定的版本库快照状态。

执行此操作会将当前工作区的内容恢复到选定快照创建时的状态。这是一个比较危险的操作，可能会覆盖当前未保存的更改。

**注意：** 检出操作通常会导致思源笔记工作空间重新加载或重启才能完全生效。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `id` (string): **必填**。要检出的版本库快照的 ID。这个 ID 可以通过 [/api/repo/getRepoSnapshots](getRepoSnapshots.html) 或 [/api/repo/getCloudRepoSnapshots](getCloudRepoSnapshots.html) 等 API 获取。

**请求示例:**

```json
{
  "id": "20231027100000-abcdefg" // 替换为实际的快照 ID
}
```

## 响应结果

无论检出操作是否在后端成功启动，此 API 都会返回一个标准的成功响应（除非发生非常基础的请求错误）。

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

-   `code`: 0 表示请求已被接收并尝试处理。
-   `msg`: 通常为空。
-   `data`: 总是 \`null\`。

**重要提示：** 此 API 的成功响应不代表检出操作已完成或成功。检出是一个耗时且可能需要重启应用的操作，其最终结果需要通过观察应用状态或可能的 WebSocket 通知来判断。

## 在线测试

**警告：** 在线测试此 API 会尝试将您的思源笔记工作区恢复到指定快照状态，这可能会丢失当前未保存的更改，并可能导致应用重启。请谨慎操作！

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求 (请谨慎)

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

