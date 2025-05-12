---
title: 列出云端同步目录
---
# 端点

/api/sync/listCloudSyncDir

# 列出云端同步目录

**API Endpoint:** `POST /api/sync/listCloudSyncDir`

**认证:** 需要登录 (`model.CheckAuth`) 和管理员权限 (`model.CheckAdminRole`)。

## 功能描述

此 API 用于列出当前配置的云存储服务提供商中可用的所有同步目录（数据仓库）。它还会返回这些目录的总大小以及当前在思源配置中选定的同步目录名称。

此接口会首先检查同步功能是否已启用以及云服务是否在线且已配置。

## 请求

此接口为 POST 请求，但不需要请求体。发送一个空的 JSON 对象 `{}` 或无内容的 POST 请求即可。

## 响应

成功后，服务器返回 HTTP 状态码 `200` 和一个 JSON 对象，其 `data` 字段包含以下信息：

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "syncDirs": [
            {"name": "SiyuanData-Main"},
            {"name": "MyArchive"}
            // ...更多目录
        ],
        "hSize": "2.1 GB", // 所有列出目录的总大小（人类可读格式）
        "checkedSyncDir": "SiyuanData-Main" // 当前在 conf.sync.cloudName 中配置的目录名
    }
}
```

-   `code` (number): `0` 表示成功，其他值（如 `1`）表示失败。
-   `msg` (string): 错误信息（如果 `code` 非 `0`）。
-   `data` (object): 包含同步目录信息的对象。
    -   `syncDirs` (array): 一个对象数组，每个对象代表一个云端同步目录。
        -   `name` (string): 目录的名称。
    -   `hSize` (string): 所有 \`syncDirs\` 中列出的目录的总大小，以人类可读的格式表示 (例如 "1.5 GB")。
    -   `checkedSyncDir` (string): 当前在思源配置中 (`model.Conf.Sync.CloudName`) 选定的云端同步目录的名称。

如果发生错误（例如同步未启用、云服务未连接或未配置、或无法列出目录），`code` 将为非零值，`msg` 会包含错误描述，并且 `data` 可能包含 `{"closeTimeout": 5000}`。

## 在线测试
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
