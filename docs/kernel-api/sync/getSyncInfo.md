---
title: 获取同步状态信息
---
# 端点

/api/sync/getSyncInfo

# 获取同步状态信息

**API Endpoint:** `POST /api/sync/getSyncInfo`

**认证:** 需要登录 (`model.CheckAuth`) 和管理员权限 (`model.CheckAdminRole`)。

## 功能描述

此 API 用于获取当前思源笔记的同步状态和相关的基本配置信息。它会返回当前的同步服务提供商、云端目录名、同步是否启用、是否正在同步以及当前的同步进度详情。

## 请求参数

此接口不需要请求参数。发送一个空的 JSON 对象 `{}` 即可。

## 响应

成功时，服务器返回 HTTP 状态码 `200` 和一个 JSON 对象，其 `data` 字段包含以下信息：

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "providerName": "WebDAV",
        "cloudName": "mySiyuanSync",
        "enabled": true,
        "syncing": false,
        "progress": {
            "current": 0, // 当前已处理的项目数
            "total": 0,   // 总共需要处理的项目数
            "info": "空闲", // 当前操作的文本描述 (具体内容和字段名可能依同步状态而变)
            "percent": 0  // 完成百分比 (可能由前端计算或后端直接提供)
            // 可能还包含其他与具体进度阶段相关的字段
        }
    }
}
```

-   `code` (number): `0` 表示成功，其他值表示失败。
-   `msg` (string): 错误信息（如果 `code` 非 `0`）。
-   `data` (object): 包含同步信息的对象。
    -   `providerName` (string): 当前配置的同步服务提供商名称 (例如: "S3", "WebDAV", "SiYuan")。
    -   `cloudName` (string): 云端同步目录或仓库的名称。
    -   `enabled` (boolean): 同步功能当前是否已启用。
    -   `syncing` (boolean): 当前是否正在进行同步操作。
    -   `progress` (object): 当前同步进度详情。
        -   `current` (number): 当前已完成的步骤或文件数量。
        -   `total` (number): 总共需要处理的步骤或文件数量。
        -   `info` (string, 可选): 对当前同步阶段或正在处理内容的文本描述 (例如 "正在上传: file.md", "检查更改中...", "空闲")。注意：此字段的具体名称和内容可能根据实际同步状态和实现有所不同，也可能为 \`details\` 或 \`msg\`。
        -   `percent` (number, 可选): 同步完成的百分比。如果后端未直接提供，前端可能需要根据 `current` 和 `total` 计算。
        -   _(可能还包含其他特定于进度阶段的字段)_

**注意:** `progress` 对象的具体字段和内容可能会根据实际的同步状态和同步引擎的实现有所不同。上述示例仅为一种典型结构。

## 在线测试
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
