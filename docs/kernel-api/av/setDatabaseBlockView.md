---
title: setDatabaseBlockView
---
# 端点

/api/av/setDatabaseBlockView

# setDatabaseBlockView

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/av.go "查看源文件")

需要认证 需要管理员权限 需要写权限

## 接口描述

设置数据库块（属性视图块）的默认显示视图 (View)。当用户打开该属性视图时，将默认展示这里设置的视图。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 数据库块（属性视图块）的 ID。 |
| viewID | string | 是 | 要设置为默认显示的视图 (View) 的 ID。 |

## 返回值

成功时不返回具体数据。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 返回信息，成功时为空 |
| data | null | 成功时不返回数据，为 null |

请求示例

返回示例

### 请求示例

```
POST /api/av/setDatabaseBlockView
Content-Type: application/json
Authorization: Token your-api-token

{
  "id": "20231027150000-abcdefgh", 
  "viewID": "20231027150100-ijklmnop" 
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": null
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
