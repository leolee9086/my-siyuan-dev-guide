---
title: 通过 avID 获取属性视图列 (Keys)
---
# 端点

/api/av/getAttributeViewKeysByAvID

# 通过 avID 获取属性视图列 (Keys)

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/av.go#L54 "查看源文件")

需要认证

## 接口描述

获取指定属性视图（数据库）的所有列 (Key) 的信息。根据 Go 源码，此接口与 \`/api/av/getAttributeViewKeys\` 功能高度相似，可能存在冗余，主要区别在于请求参数字段名不同 (\`avID\` vs \`id\`)。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| avID | string | 是 | 属性视图 ID。 |

## 返回值

返回属性视图的所有列信息列表。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object\[\] | 列信息列表，每个对象包含列的详细信息 (id, name, type, icon, options 等)。具体结构同 \`/api/av/getAttributeViewKeys\`。 |

