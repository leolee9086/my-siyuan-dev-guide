---
title: Export SY
---
# 端点

/api/export/exportSY

[返回首页](../index.html)

# Export SY

**POST** `/api/export/exportSY`

导出指定的 .sy 文件。

## 请求参数

| 参数名 | 类型 | 是否必需 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 要导出的 .sy 文件 ID。 |

## 返回数据

成功导出的 .sy 文件路径。

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "path": "string" // 导出的 .sy 文件路径
    }
}
```

## 请求示例

```bash
curl -X POST \
  http://127.0.0.1:6806/api/export/exportSY \
  -H 'Authorization: Token YOUR_API_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "id": "20230101..." // .sy 文件 ID
  }'
```

## 响应示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "path": "/path/to/exported/file.sy"
  }
}
```

## 在线测试

  
  
  
  
发送请求

## 导航

-   [返回首页](../index.html)
-   [上一个接口：/api/export/exportNotebook](exportNotebook.html)
-   [下一个接口：/api/export/exportTemplate](exportTemplate.html)
-   [返回 Export API](../pages/export.html)

