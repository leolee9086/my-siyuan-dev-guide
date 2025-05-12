---
title: getDocImageAssets
---
# 端点

/api/asset/getDocImageAssets

# getDocImageAssets

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/asset.go#L185)

需要鉴权

## 接口描述

获取指定文档块直接引用的所有**图片类型**的资源文件路径列表。

**注意:** 只返回该文档块直接引用的图片资源，不包含子块或非图片类型的资源。

## 请求参数

| 参数名 | 类型 | 是否必须 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 要查询的文档块 ID。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功，非0表示失败 |
| msg | string | 返回信息 |
| data | array (string) | 该文档块引用的图片资源相对路径列表（例如 \`\["assets/xxx.png", "assets/yyy.jpg"\]\`）。如果出错或没有引用图片，可能返回 \`null\` 或空数组 \`\[\]\`。 |

请求示例

返回示例

### 请求示例

```
POST /api/asset/getDocImageAssets
Content-Type: application/json
Authorization: Token your-token

{
  "id": "20230101000000-abcdefgh"
}
```

### 返回示例 (成功)

```
{
  "code": 0,
  "msg": "",
  "data": [
    "assets/image-20240315103000-randomid.png",
    "assets/photo-20240315110000-anotherid.jpg"
  ]
}
```

### 返回示例 (无图片或失败)

```
{
  "code": 0, 
  "msg": "",
  "data": [] 
}
```

```
{
  "code": -1,
  "msg": "具体的错误信息",
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
