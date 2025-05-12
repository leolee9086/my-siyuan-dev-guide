---
title: 压缩文件(zip)
---


# 端点

/api/archive/zip

# 压缩文件

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/archive.go "查看源文件")

需要认证 需要管理员权限

## 接口描述

将指定的文件或目录压缩成一个 zip 文件。

## 请求参数

（待补充详细参数）

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| path | string | 是 | 要压缩的文件或目录的路径 |
| zipPath | string | 是 | 生成的 zip 文件的保存路径 |

## 返回值

标准返回格式，data 为 null。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | null | 固定为 null |

请求示例

返回示例

### 请求示例

```
{
    "path": "temp/my_files_to_zip",
    "zipPath": "exports/my_archive.zip"
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

