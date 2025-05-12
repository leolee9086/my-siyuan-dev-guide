---
title: 删除速记
---
# 端点

/api/inbox/removeShorthands

# 删除速记

需要认证 (管理员权限，检查只读模式)

## 接口描述

根据提供的 ID 列表，批量删除速记。

此接口需要管理员权限，并且会在只读模式下受限。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| ids | string\[\] | 是 | 要删除的速记 ID 列表。 |

## 返回值

返回标准的 JSON 结构：

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功，其他表示失败。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | null | 成功时，此字段为 null。 |

请求示例

返回示例

### 请求示例 (JSON)

```
{
  "ids": ["20230510100000-abcdefg", "20230510100001-hijklmn"]
}
```

### 成功返回示例

```
{
  "code": 0,
  "msg": "",
  "data": null
}
```

### 失败返回示例

```
{
  "code": 1,
  "msg": "Error message describing why it failed.",
  "data": null
}
```

