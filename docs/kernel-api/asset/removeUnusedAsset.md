---
title: 删除单个未使用资源
---
# 端点

/api/asset/removeUnusedAsset

# 删除单个未使用资源

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/asset.go "查看源文件")

需要认证 需要管理员权限

## 接口描述

删除一个指定的、未被任何文档引用的资源文件。

## 请求参数

（待补充详细参数）

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| path | string | 是 | 要删除的未使用资源文件的路径 (相对于 assets 目录) |

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
    "path": "assets/unused-image-20231027130000-ghi.jpg"
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

