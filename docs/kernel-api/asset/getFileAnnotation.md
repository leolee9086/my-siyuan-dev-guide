---
title: getFileAnnotation
---
# 端点

/api/asset/getFileAnnotation

# getFileAnnotation

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/asset.go#L250)

需要认证

## 接口描述

获取指定资源文件的标注信息 (PDF 文件等)。

## 请求参数

（待补充详细参数）

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| path | string | 是 | 资源文件的路径 (相对于 assets 目录) |

## 返回值

返回文件的标注数据。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 标注数据对象 (具体结构待补充) |

请求示例

返回示例

### 请求示例

```
{
    "path": "assets/document-20231027124000-uvwxyz.pdf"
}
```

### 返回示例

```
{
    "code": 0,
    "msg": "",
    "data": {
        "annotations": [
        ]
    }
}
```

