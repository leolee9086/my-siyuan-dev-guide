---
title: 获取本地存储
---
# 端点

/api/storage/getLocalStorage

# 获取本地存储

需要认证

## 接口描述

获取思源笔记本地存储中指定键的值。本地存储可用于保存各种配置和自定义数据，类似于浏览器的localStorage但在思源笔记的后端实现。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| key | string | 是 | 存储键名 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | string | 键对应的值，如果键不存在则返回空字符串 |

请求示例

返回示例

### 请求示例

```
POST /api/storage/getLocalStorage HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "key": "custom-theme-config"
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": "{\"darkMode\":true,\"fontSize\":16,\"accentColor\":\"#3498db\"}"
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
