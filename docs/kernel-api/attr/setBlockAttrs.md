---
title: setBlockAttrs
---
# 端点

/api/attr/setBlockAttrs

# setBlockAttrs

需要认证

## 接口描述

设置指定块的自定义属性。可以添加新属性、更新现有属性值，或者通过设置空值来删除属性。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 块 ID |
| attrs | object | 是 | 属性键值对，键为属性名，值为属性值。如果属性值为 null 或空字符串，会删除该属性 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功，-1 表示失败 |
| msg | string | 错误信息，成功时为空 |
| data | null | 无返回数据 |

请求示例

返回示例

### 请求示例

```
POST /api/attr/setBlockAttrs HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-api-token

{
  "id": "20220714215400-dd0jbge",
  "attrs": {
    "custom-attr": "自定义值",
    "style": "color: red;",
    "remove-this-attr": null
  }
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
