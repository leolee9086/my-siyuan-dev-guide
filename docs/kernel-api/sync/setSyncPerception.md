---
title: setSyncPerception
---
# 端点

/api/sync/setSyncPerception

# 思源笔记 API 文档

[返回首页](../index.html) [返回 sync 分类](index.html)

## /api/sync/setSyncPerception

**方法:** POST

**认证:** \`model.CheckAuth\`, \`model.CheckAdminRole\`, \`model.CheckReadonly\` (需要登录，管理员权限，非只读模式)

**功能:** 设置是否启用同步感知。

同步感知指的是在编辑器中实时感知其他客户端的修改，并在当前编辑器中进行相应的更新提示或自动合并。开启后可以减少多端编辑时的冲突概率，但可能会略微增加网络和性能开销。

### 请求参数 (JSON Body)

| 参数名 | 类型 | 是否必需 | 描述 |
| --- | --- | --- | --- |
| `enabled` | boolean | 是 | `true` 启用同步感知, `false` 禁用同步感知。 |

### 请求示例

```json
{
    "enabled": true
}
```

### 响应结果

成功时，返回的 JSON 对象中 `code` 为 0，`msg` 为空字符串，`data` 为 `null`。

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

失败时，`code` 非 0，`msg` 包含错误信息。

### 在线测试

本文档由 AI 自动生成，可能存在不准确之处，请以实际 API 行为为准。
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
