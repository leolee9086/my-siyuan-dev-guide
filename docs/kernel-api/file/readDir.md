---
title: 读取目录 API (`/api/file/readDir`)
---
# 端点

/api/file/readDir

# 读取目录 API (\`/api/file/readDir\`)

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/file.go#L214) [返回文件 API 列表](../pages/file.html) [返回 API 主页](../index.html)

## 接口描述

读取工作空间中指定目录的内容。

**注意:** 路径参数相对于工作空间根目录。要读取 `data` 目录，路径必须以 `data/` 开头。要读取临时目录 `temp`，路径必须以 `temp/` 开头。

## 请求

**方法:** POST

**路径:** \`/api/file/readDir\`

**认证:** 需要 Token

### 请求体 (JSON)

| 参数 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| \`path\` | string | 是 | 要读取的目录路径，相对于工作空间根目录。例如 `data/widgets` 或 `temp`。**必须包含正确的路径前缀 (如 `data/` 或 `temp/`，如果读取根目录下的 temp)。** |

### 请求示例

读取数据目录下的挂件目录:

```json
{
    "path": "data/widgets"
}
```

读取临时目录:

```json
{
    "path": "temp"
}
```

## 响应

### 成功响应 (200 OK)

成功读取后，返回一个包含文件和子目录信息的对象数组。每个对象包含名称、是否为目录以及修改时间。

```json
{
    "code": 0,
    "msg": "",
    "data": [
        {
            "name": "image.png",
            "isDir": false,
            "isSymlink": false, // 是否为符号链接
            "modTime": 1678886400000, // 修改时间戳 (毫秒)
            "size": 10240 // 文件大小 (字节)
        },
        {
            "name": "sub-folder",
            "isDir": true,
            "isSymlink": false,
            "modTime": 1678886401000,
            "size": 0 // 目录的大小通常为 0 或系统相关值
        }
        // ... 其他文件和目录
    ]
}
```

### 失败响应

如果请求失败（例如，路径无效、目录不存在、权限不足等），将返回错误信息。

```json
{
    "code": -1,
    "msg": "Read directory failed: open [...] The system cannot find the path specified.", // 或 "Invalid path [...]"
    "data": null
}
```

## 在线测试

path (必填): 

发送请求

### 测试结果:

© 2023 Siyuan Note API 文档

