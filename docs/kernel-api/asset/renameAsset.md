---
title: 重命名资源
---
# 端点

/api/asset/renameAsset

# 重命名资源

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/asset.go "查看源文件")

需要认证 需要管理员权限

## 接口描述

重命名一个指定的资源文件。同时会自动更新所有引用该资源的地方。

## 请求参数

（待补充详细参数）

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| oldPath | string | 是 | 资源文件的旧路径 (相对于 assets 目录) |
| newPath | string | 是 | 资源文件的新路径 (相对于 assets 目录) |

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
    "oldPath": "assets/image-old-name-20231027131500-abc.png",
    "newPath": "assets/image-new-name-20231027131500-abc.png"
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

