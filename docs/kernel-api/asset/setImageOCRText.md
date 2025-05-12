---
title: 设置图片 OCR 文本
---
# 端点

/api/asset/setImageOCRText

# 设置图片 OCR 文本

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/asset.go "查看源文件")

需要认证 需要管理员权限

## 接口描述

设置指定图片资源文件的 OCR 文本内容。这通常用于手动修正或添加 OCR 结果。

## 请求参数

（待补充详细参数）

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| path | string | 是 | 图片资源文件的路径 (相对于 assets 目录) |
| text | string | 是 | 要设置的 OCR 文本内容 |

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
    "path": "assets/image-20231027124500-abcdef.png",
    "text": "这是手动修正后的 OCR 文本内容。"
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

