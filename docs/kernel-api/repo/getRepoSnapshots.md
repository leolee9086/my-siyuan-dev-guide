---
title: 获取本地快照列表 (getRepoSnapshots)
---
# 端点

/api/repo/getRepoSnapshots

# 获取本地快照列表 (getRepoSnapshots)

[首页](../index.html) | [Repo API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/repo.go#L189)

## 功能描述

此 API 端点 `POST /api/repo/getRepoSnapshots` 用于获取当前工作空间本地版本库的快照列表。

返回的结果支持分页。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `page` (number): **必填**。要获取的快照列表的页码，从 1 开始计数。

**请求示例 (获取第 1 页):**

```json
{
  "page": 1
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 字段包含本地快照列表和分页信息。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "snapshots": [
      {
        "time": 1678886400,
        "hTime": "2024-03-15 20:00:00",
        "id": "20240315200000-uvwxyz0",
        "memo": "日常同步", // 快照备注
        "tag": "daily-sync", // 快照标签
        "size": 123456,
        "hSize": "121 KB"
      },
      {
        "time": 1678800000,
        "hTime": "2024-03-14 20:00:00",
        "id": "20240314200000-stuvwx1",
        "memo": "",
        "tag": "",
        "size": 112233,
        "hSize": "110 KB"
      }
      // ... 更多快照信息 ...
    ],
    "pageCount": 10, // 总页数
    "totalCount": 95 // 快照总数
  }
}
```

-   `code`: 0 表示成功，非 0 表示失败（例如读取仓库失败）。
-   `msg`: 错误信息（如果 code 非 0）。
-   `data.snapshots`: 一个数组，包含当前页的本地快照信息对象。每个对象包含 \`id\`, \`time\` (时间戳), \`hTime\` (可读时间), \`memo\` (备注), \`tag\` (标签名), \`size\` (字节大小), \`hSize\` (可读大小) 等字段。
-   `data.pageCount`: 本地快照的总页数。
-   `data.totalCount`: 本地快照的总数量。

## 在线测试

您可以在下方输入要获取的页码进行在线测试。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

