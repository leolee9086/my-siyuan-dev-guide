---
title: 删除所有未使用资源
---
# 端点

/api/asset/removeUnusedAssets

# 删除所有未使用资源

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/asset.go "查看源文件")

需要认证 需要管理员权限

## 接口描述

删除工作空间中所有未被任何文档引用的资源文件。这是一个危险操作，请谨慎使用。

## 请求参数

此接口不需要参数。

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
{}
```

### 返回示例

```
{
    "code": 0,
    "msg": "",
    "data": null
}
```

