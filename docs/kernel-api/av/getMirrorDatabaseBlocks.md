---
title: 获取镜像数据库块
---
# 端点

/api/av/getMirrorDatabaseBlocks

# 获取镜像数据库块

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/av.go#L66 "查看源文件")

需要认证

## 接口描述

获取指定属性视图（数据库）的所有镜像块（Mirror Blocks）的 ID 列表。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| avID | string | 是 | 属性视图 ID。 |

## 返回值

返回镜像块 ID 列表。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | string\[\] | 镜像块的 ID 列表。 |

