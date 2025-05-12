---
title: 获取本地标签快照列表 (getRepoTagSnapshots)
---
# 端点

/api/repo/getRepoTagSnapshots

# 获取本地标签快照列表 (getRepoTagSnapshots)

[首页](../index.html) | [Repo API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/repo.go#L269)

## 功能描述

此 API 端点 `POST /api/repo/getRepoTagSnapshots` 用于获取当前工作空间本地版本库中所有被打上标签的快照列表。

与 `getRepoSnapshots` 不同，此接口不分页，一次性返回所有带标签的快照。

## 请求参数

此 API 不需要请求参数。

**请求示例:**

```json
{}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 字段包含一个名为 `snapshots` 的数组，其中包含所有带标签的本地快照信息。

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
        "memo": "日常同步", 
        "tag": "daily-sync", // 快照标签
        "size": 123456,
        "hSize": "121 KB"
      },
      {
        "time": 1678627200,
        "hTime": "2024-03-12 20:00:00",
        "id": "20240312200000-mnopqr1",
        "memo": "重要更新", 
        "tag": "v2.1", 
        "size": 145678,
        "hSize": "142 KB"
      }
      // ... 其他带标签的快照信息 ...
    ]
  }
}
```

-   `code`: 0 表示成功，非 0 表示失败（例如读取仓库失败）。
-   `msg`: 错误信息（如果 code 非 0）。
-   `data.snapshots`: 一个数组，包含所有带标签的本地快照信息对象。每个对象包含 \`id\`, \`time\` (时间戳), \`hTime\` (可读时间), \`memo\` (备注), \`tag\` (标签名), \`size\` (字节大小), \`hSize\` (可读大小) 等字段。

## 在线测试

您可以在下方直接点击发送请求进行在线测试。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
{}  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

