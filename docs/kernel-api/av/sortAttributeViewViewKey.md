---
title: sortAttributeViewViewKey
---
# 端点

/api/av/sortAttributeViewViewKey

# sortAttributeViewViewKey

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/av.go "查看源文件")

需要认证 需要管理员权限 需要写权限

## 接口描述

对指定属性视图 (Attribute View) 的特定视图 (View) 中的列 (Key) 进行排序，改变它们在该特定视图下的显示顺序。这允许不同的视图（如表格、列表）拥有独立的列排序。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| avID | string | 是 | 属性视图的 ID。 |
| viewID | string | 否 | 要排序的特定视图 (View) 的 ID。如果省略或为空字符串，则对该属性视图的默认列顺序（所有视图共享）进行排序，效果等同于调用 `/api/av/sortAttributeViewKey`。 |
| keyID | string | 是 | 要移动（排序）的列 (Key) 的 ID。 |
| previousKeyID | string | 是 | 目标位置的前一个列 (Key) 的 ID。如果要把 \`keyID\` 移动到该视图的第一列，此参数应为空字符串 \`""\`。 |

## 返回值

成功时不返回具体数据，但会通知前端刷新该属性视图。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 返回信息，成功时为空 |
| data | null | 成功时不返回数据，为 null |

请求示例

返回示例

### 请求示例 (在特定视图 view-list 中将 key-prio 移动到 key-status 之后)

```
POST /api/av/sortAttributeViewViewKey
Content-Type: application/json
Authorization: Token your-api-token

{
  "avID": "20231027150000-abcdefgh", 
  "viewID": "view-list",
  "keyID": "key-prio",
  "previousKeyID": "key-status"
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

