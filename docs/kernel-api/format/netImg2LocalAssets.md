---
title: 网络图片转本地资源
---
# 端点

/api/format/netImg2LocalAssets

# 网络图片转本地资源

需要认证

**注意：** 此操作会下载网络图片并替换文档中的链接为本地资源路径，会直接修改文档内容，建议在操作前进行确认或备份。

## 接口描述

扫描指定文档中的所有块，查找外部网络图片链接（例如 \`\` 标签或Markdown图片语法），将这些图片下载到本地 \`assets\` 目录，并更新块内容中的链接指向本地资源。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 要处理的文档ID |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | null | 无返回数据（操作直接修改文档） |

请求示例

返回示例

### 请求示例

```
POST /api/format/netImg2LocalAssets HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "id": "20220301153724-vy37rik"
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

