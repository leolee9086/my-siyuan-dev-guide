---
title: 获取属性视图
---
# 端点

/api/av/getAttributeView

# 获取属性视图

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/av.go "查看源文件")

需要认证

## 接口描述

获取指定 ID 的属性视图（数据库）的结构和配置信息，但不包含其数据行。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 属性视图 ID。 |

## 返回值

返回属性视图的结构信息。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 属性视图结构信息。 |
| data.id | string | 属性视图 ID。 |
| data.blockID | string | 属性视图所在的块 ID。 |
| data.name | string | 属性视图名称。 |
| data.icon | string | 属性视图图标。 |
| data.keys | object\[\] | 属性视图的列 (Key) 列表。每个 key 包含 id, name, type, icon, options 等。 |
| data.views | object\[\] | 属性视图的视图 (View) 列表。每个 view 包含 id, name, icon, layoutType (table, gallery, board, calendar), filter, sort 等。 |

