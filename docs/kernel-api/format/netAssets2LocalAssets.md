---
title: 网络资源转本地资源
---
# 端点

/api/format/netAssets2LocalAssets

# 网络资源转本地资源

需要认证

**注意：** 此操作会下载文档中的所有网络资源（图片、音视频等）并替换链接为本地资源路径，会直接修改文档内容，耗时可能较长，建议在操作前进行确认或备份。

## 接口描述

扫描指定文档中的所有块，查找所有外部网络资源链接（包括图片、音视频、iframe等），将这些资源下载到本地 \`assets\` 目录，并更新块内容中的链接指向本地资源。

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
POST /api/format/netAssets2LocalAssets HTTP/1.1
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

