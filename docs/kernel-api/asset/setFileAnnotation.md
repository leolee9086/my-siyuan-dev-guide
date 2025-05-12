---
title: 设置文件标注
---
# 端点

/api/asset/setFileAnnotation

# 设置文件标注

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/asset.go "查看源文件")

需要认证 需要管理员权限

## 接口描述

设置指定资源文件的标注信息 (通常用于 PDF 文件)。

## 请求参数

（待补充详细参数）

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| path | string | 是 | 资源文件的路径 (相对于 assets 目录) |
| annotations | array (object) | 是 | 标注数据对象数组 (具体结构待补充) |

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
    "path": "assets/document-20231027124000-uvwxyz.pdf",
    "annotations": [
        // 标注对象数组，结构待补充
    ]
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

