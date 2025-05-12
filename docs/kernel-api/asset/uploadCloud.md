---
title: 上传到云端
---
# 端点

/api/asset/uploadCloud

# 上传到云端

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/asset.go "查看源文件")

需要认证 需要管理员权限

## 接口描述

将本地资源文件上传到配置的云存储（如 S3）。通常用于云端同步相关的操作。

## 请求参数

这是一个 multipart/form-data 请求。

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| path | string | 是 | 要上传的本地资源文件路径（相对于工作空间 data 目录） |
| file | file | 是 | 要上传的文件内容。 |

## 返回值

返回上传后的云端路径。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | string | 上传成功后的云端存储路径或 URL |

请求示例 (cURL)

返回示例

### 请求示例 (cURL)

```
curl -X POST \
  http://127.0.0.1:6806/api/asset/uploadCloud \
  -H 'Authorization: Token YOUR_API_TOKEN' \
  -F 'path=assets/image-to-cloud.png' \
  -F 'file=@/path/to/your/image-to-cloud.png'
```

### 返回示例

```
{
    "code": 0,
    "msg": "",
    "data": "s3://your-bucket/assets/image-to-cloud.png" 
}
```

