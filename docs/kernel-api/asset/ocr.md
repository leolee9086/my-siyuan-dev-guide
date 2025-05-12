---
title: OCR 识别
---
# 端点

/api/asset/ocr

# OCR 识别

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/asset.go "查看源文件")

需要认证 需要管理员权限

## 接口描述

对指定的图片资源文件执行 OCR（光学字符识别），并将识别出的文本保存起来，以便后续搜索和获取。

## 请求参数

（待补充详细参数）

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 包含该图片资源的块 ID (用于定位图片路径) |
| path | string | 是 | 图片资源文件的路径 (相对于 assets 目录) |

## 返回值

标准返回格式，data 为 null。OCR 结果会异步处理并保存。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功接收任务 |
| msg | string | 返回信息 |
| data | null | 固定为 null |

请求示例

返回示例

### 请求示例

```
{
    "id": "20231027131000-abcdefg",
    "path": "assets/image-needs-ocr-20231027131010-hijkl.png"
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

