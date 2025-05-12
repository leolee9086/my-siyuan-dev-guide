---
title: 获取属性视图的过滤和排序
---
# 端点

/api/av/getAttributeViewFilterSort

# 获取属性视图的过滤和排序

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/av.go "查看源文件")

需要认证

## 接口描述

获取指定属性视图（数据库）特定视图（View）的过滤（Filter）和排序（Sort）规则。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| avID | string | 是 | 属性视图 ID。 |
| avViewID | string | 是 | 属性视图下的特定视图 (View) ID。 |

## 返回值

返回指定视图的过滤和排序规则。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 过滤和排序规则。 |
| data.filter | object | 过滤规则对象 (结构复杂, 包含 \`operator\`, \`conditions\` 等)。 |
| data.sorts | object\[\] | 排序规则列表 (每个对象包含 \`keyID\`, \`order\` - 'asc'/'desc')。 |

