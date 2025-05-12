---
title: 复制属性视图块
---
# 端点

/api/av/duplicateAttributeViewBlock

# 复制属性视图块

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/av.go "查看源文件")

需要认证

## 接口描述

复制指定的属性视图块（行）。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| avID | string | 是 | 属性视图 ID。 |
| blockID | string | 是 | 要复制的块（行）的 ID。 |

## 返回值

返回新创建的块（行）的信息。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 新创建的块信息。 |
| data.blockID | string | 新块的 ID。 |

