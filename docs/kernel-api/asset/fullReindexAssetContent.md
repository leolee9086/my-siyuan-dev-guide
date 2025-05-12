---
title: 全量重建资源内容索引
---
# 端点

/api/asset/fullReindexAssetContent

# 全量重建资源内容索引

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/asset.go "查看源文件")

需要认证 需要管理员权限

## 接口描述

对工作空间内的所有资源文件（assets 目录）执行全量的内容索引重建。这是一个耗时操作，通常在索引出现问题或需要强制更新时使用。

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

