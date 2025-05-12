---
title: 设置账户显示选项
---
# 端点

/api/setting/setAccount

# 设置账户显示选项

需要认证 管理员权限 只读模式禁用

## 接口描述

更新用户账户相关的显示配置信息。此接口用于设置是否在界面上显示标题和VIP标识。

## 请求参数 (JSON Body)

请求体是一个代表账户显示配置的 JSON 对象，包含以下字段：

| 参数名 | 类型 | 描述 | 是否必需 | 默认值 |
| --- | --- | --- | --- | --- |
| displayTitle | boolean | 是否显示标题。 | 是 | `true` |
| displayVIP | boolean | 是否显示 VIP 标识。 | 是 | `true` |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 错误信息，成功时为空字符串 |
| data | object | 操作成功时，返回更新后的账户显示配置对象 (包含 `displayTitle` 和 `displayVIP`)。 |

请求示例

返回示例 (成功)

### 请求示例

```
POST /api/setting/setAccount HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token YOUR_API_TOKEN

{
  "displayTitle": false,
  "displayVIP": true
}
```

### 返回示例 (成功)

```
{
  "code": 0,
  "msg": "",
  "data": {
    "displayTitle": false,
    "displayVIP": true
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
