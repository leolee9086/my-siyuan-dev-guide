---
title: addMicrosoftDefenderExclusion
---
# 端点

/api/system/addMicrosoftDefenderExclusion

# 思源笔记 API 文档

[返回首页](../index.html) [返回 system 分类](index.html)

## /api/system/addMicrosoftDefenderExclusion

**方法:** POST

**认证:** \`model.CheckAuth\`, \`model.CheckAdminRole\`, \`model.CheckReadonly\` (需要登录，管理员权限，非只读模式)

**功能:** (仅限 Windows 系统) 尝试将思源笔记的安装目录和工作空间目录添加到 Microsoft Defender (Windows 安全中心) 的排除列表中。

此操作旨在帮助避免 Microsoft Defender 可能引起的性能问题或对思源笔记文件的误报。执行此操作通常需要管理员权限。在非 Windows 系统上调用此 API 不会执行任何操作。

### 请求参数

此 API 不需要任何请求参数。

### 请求示例

由于不需要请求体，可以直接发送 POST 请求。

### 响应结果

成功时 (或在非 Windows 系统上调用时)，返回的 JSON 对象中 `code` 为 0，`msg` 为空字符串，`data` 为 `null`。

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

在 Windows 系统上执行失败时 (例如，没有足够的权限执行 PowerShell 命令，或命令执行出错)，`code` 非 0，`msg` 包含具体的错误信息。

```json
{
    "code": -1,
    "msg": "Failed to add Microsoft Defender exclusion: ...error details...",
    "data": null
}
```

**注意:** 如果用户在思源笔记的设置中选择了"不再提示添加排除"，则通过 `/api/system/ignoreAddMicrosoftDefenderExclusion` 设置后，此 API 可能不再主动触发或其行为可能受到影响 (具体需参考 \`model.AddMicrosoftDefenderExclusion\` 的内部逻辑)。

### 在线测试

本文档由 AI 自动生成，可能存在不准确之处，请以实际 API 行为为准。
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
