---
title: 写入文件 API (`/api/file/putFile`)
---
# 端点

/api/file/putFile

# 写入文件 API (\`/api/file/putFile\`)

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/file.go#L361) [返回文件 API 列表](../pages/file.html) [返回 API 主页](../index.html)

## 接口描述

该接口用于向工作空间指定路径写入文件内容。如果文件已存在，将会被覆盖；如果不存在，将会创建新文件（包括必要的父目录）。

通常用于上传资源文件、创建配置文件或写入其他类型的文件。

**注意:** 路径参数相对于工作空间根目录。要写入 `data` 目录，路径必须以 `data/` 开头。要写入临时目录 `temp`，路径必须以 `temp/` 开头。写入其他受限目录可能会失败。

## 请求

**方法:** POST

**路径:** \`/api/file/putFile\`

**认证:** 需要 Token

### 请求体 (multipart/form-data)

请求体必须是 `multipart/form-data` 格式。

| 字段名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| \`path\` | string | 是 | 目标文件或目录路径，相对于工作空间根目录。例如 `data/assets/my-image.png` (数据目录) 或 `temp/my-upload.zip` (临时目录)。**必须包含正确的路径前缀 (如 `data/` 或 `temp/`)。** |
| \`file\` | file | 否 (当 \`isDir=true\` 时非必需) | 要上传的文件内容。当 \`isDir=false\` 时必需。 |
| \`isDir\` | string ("true" or "false") | 是 | 指明 \`path\` 是否是目录。如果为 "true"，则只创建目录；如果为 "false"，则写入 \`file\` 字段提供的文件内容。 |
| \`modTime\` | string (毫秒时间戳) | 是 | 文件的修改时间戳（毫秒）。 |

### 请求示例 (使用 curl)

写入数据目录下的文件:

```bash
# 假设当前目录下有 my-local-image.jpg 文件
API_TOKEN="YOUR_API_TOKEN"
TARGET_PATH="data/assets/uploaded-image.jpg"
MOD_TIME=$(date +%s000) # 获取当前时间的毫秒时间戳 (示例, bash可能不同)

curl -X POST http://127.0.0.1:6806/api/file/putFile \
     -H "Authorization: Token $API_TOKEN" \
     -F "path=$TARGET_PATH" \
     -F "file=@my-local-image.jpg" \
     -F "isDir=false" \
     -F "modTime=$MOD_TIME"
```

写入临时目录下的文件:

```bash
API_TOKEN="YOUR_API_TOKEN"
TARGET_PATH="temp/uploaded-archive.zip"
MOD_TIME=$(date +%s000)

curl -X POST http://127.0.0.1:6806/api/file/putFile \
     -H "Authorization: Token $API_TOKEN" \
     -F "path=$TARGET_PATH" \
     -F "file=@local-archive.zip" \
     -F "isDir=false" \
     -F "modTime=$MOD_TIME"
```

创建数据目录下的目录:

```bash
API_TOKEN="YOUR_API_TOKEN"
TARGET_PATH="data/widgets/new-widget"
MOD_TIME=$(date +%s000)

curl -X POST http://127.0.0.1:6806/api/file/putFile \
     -H "Authorization: Token $API_TOKEN" \
     -F "path=$TARGET_PATH" \
     -F "isDir=true" \
     -F "modTime=$MOD_TIME"
```

## 响应

### 成功响应 (200 OK)

成功写入文件或创建目录后，返回一个空数据对象。

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

### 失败响应

如果请求失败（例如，路径无效、写入权限不足、数据解析错误等），将返回错误信息。

```json
{
    "code": -1,
    "msg": "Invalid path [path=...]", // 或 "Write file failed: ...", "Parse form file failed: ..."
    "data": null
}
```

## 在线测试

**注意:** 由于浏览器无法直接在表单中构造 `multipart/form-data` 并上传本地文件，且参数类型与之前文档描述不同，在线测试功能\*\*暂不可用\*\*。请使用 \`curl\` 或其他工具进行测试。

path (必填): 

isDir (必填): false (文件) true (目录)

modTime (必填, ms 时间戳): 

发送请求 (不可用)

### 测试结果:

```
在线测试暂不可用
```

© 2023 Siyuan Note API 文档

