---
title: /ws/broadcast
---
# 端点

/api/websocket/broadcast

# /ws/broadcast

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/websocket.go "查看源文件")

需要认证 需要管理员权限

## 接口描述

这是 /ws/broadcast 接口的文档。需要补充详细说明。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| {{NAME}} | {{TYPE}} | {{#REQUIRED}}是{{/REQUIRED}}{{^REQUIRED}}否{{/REQUIRED}} | 这是 /ws/broadcast 接口的文档。需要补充详细说明。 |

{{^HAS\_PARAMS}}

此接口不需要参数。

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| {{NAME}} | {{TYPE}} | 这是 /ws/broadcast 接口的文档。需要补充详细说明。 |

请求示例

返回示例

### 请求示例

```
curl -X GET http://127.0.0.1:6806/ws/broadcast \
     -H "Authorization: Token your-token" \
     -H "Content-Type: application/json" \
     -d '{}'
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {}
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
