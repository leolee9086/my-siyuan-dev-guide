---
title: exportConf
---
# 端点

/api/system/exportConf

# 思源笔记 API 文档

[返回首页](../index.html) [返回 system 分类](index.html)

## /api/system/exportConf

**方法:** POST

**认证:** \`model.CheckAuth\`, \`model.CheckAdminRole\` (需要登录，管理员权限)

**功能:** 导出思源笔记的配置到一个 ZIP 文件。导出的配置是经过清理和脱敏的版本，移除了部分用户特定数据和运行时状态信息。

### 请求参数

此 API 当前版本不需要任何功能性的请求参数。虽然服务器端可能尝试解析JSON请求体，但其中的参数不会影响导出内容。

### 请求示例

可以直接发送 POST 请求，无需特定请求体。

```json
// 空请求体或任意JSON对象均可，例如：
{}
```

### 响应结果

成功时，返回的 JSON 对象中 `code` 为 0，`msg` 为空字符串。`data` 对象包含两个字段：

-   `name` (string): 导出的 JSON 配置文件名 (例如: `siyuan-conf-20231027100000.json`)。
-   `zip` (string): 包含上述 JSON 配置文件的 ZIP 包的相对路径 (例如: `/export/siyuan-conf-20231027100000.json.zip`)。可以通过此路径下载导出的文件。

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "name": "siyuan-conf-20250511212400.json",
        "zip": "/export/siyuan-conf-20250511212400.json.zip"
    }
}
```

失败时 (例如，创建临时文件或 ZIP 包失败)，`code` 非 0，`msg` 包含错误信息。

```json
{
    "code": -1,
    "msg": "Failed to create export directory: ...error details...",
    "data": null // 或者可能包含 closeTimeout
}
```

### 在线测试

本文档由 AI 自动生成，可能存在不准确之处，请以实际 API 行为为准。
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
