---
title: 解析资源路径
---
# 端点

/api/asset/resolveAssetPath

# 解析资源路径

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/asset.go "查看源文件")

需要认证

## 接口描述

将相对于 assets 目录的资源路径解析为其在当前操作系统上的绝对路径。

## 请求参数

（待补充详细参数）

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| path | string | 是 | 要解析的资源文件路径 (相对于 assets 目录) |

## 返回值

返回解析后的绝对路径。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | string | 解析后的资源文件绝对路径 |

请求示例

返回示例

### 请求示例

```
{
    "path": "assets/image-20231027132000-xyz.png"
}
```

### 返回示例

```
{
    "code": 0,
    "msg": "",
    "data": "/Users/YourName/SiYuan/data/assets/image-20231027132000-xyz.png"
}
```

