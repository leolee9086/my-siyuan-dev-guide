---
title: 获取图片 OCR 文本
---
# 端点

/api/asset/getImageOCRText

# 获取图片 OCR 文本

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/asset.go "查看源文件")

需要认证 需要管理员权限

## 接口描述

获取指定图片资源文件中包含的 OCR 文本（如果存在）。

## 请求参数

（待补充详细参数）

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| path | string | 是 | 图片资源文件的路径 (相对于 assets 目录) |

## 返回值

返回图片中的 OCR 文本。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | string | 图片中的 OCR 文本内容 |

请求示例

返回示例

### 请求示例

```
{
    "path": "assets/image-20231027124500-abcdef.png"
}
```

### 返回示例

```
{
    "code": 0,
    "msg": "",
    "data": "这是图片中的文字内容..."
}
```

