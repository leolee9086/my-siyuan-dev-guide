---
title: 移除属性视图块
---
# 端点

/api/av/removeAttributeViewBlocks

# 移除属性视图块

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/av.go#L216 "查看源文件")

需要认证

## 接口描述

从指定的属性视图（数据库）中移除块（行）。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| avID | string | 是 | 属性视图 ID。 |
| srcIDs | string\[\] | 是 | 要移除的块 ID 列表。 |

## 返回值

操作成功时不返回 \`data\`。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | null | 成功时为 null。 |

