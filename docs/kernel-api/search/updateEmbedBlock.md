---
title: 更新嵌入块
---
# 端点

/api/search/updateEmbedBlock

# 更新嵌入块

需要认证

## 接口描述

更新指定嵌入块 (`query_embed` 类型) 的 SQL 查询语句。

这通常用于在 UI 上修改了嵌入块查询条件后，将其保存回块属性中。

## 实现链接

-   后端路由: [siyuan/kernel/api/router.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/router.go)
-   处理函数: [siyuan/kernel/api/search.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/search.go) (`updateEmbedBlock` 函数)
-   核心逻辑: [siyuan/kernel/model/attribute.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/attribute.go) (`SetBlockAttrs` 函数)

## 请求参数

| 参数名 | 类型 | 是否必须 | 描述 |
| --- | --- | --- | --- |
| embedBlockID | string | 是 | 要更新的嵌入块的 ID。 |
| stmt | string | 是 | 新的 SQL 查询语句。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 通常为 null 或空对象。 |

请求示例

返回示例

### 请求示例

```json
{
  "embedBlockID": "20231101160000-abcdefg",
  "stmt": "SELECT * FROM blocks WHERE content LIKE '%新关键词%' AND type = 'p' ORDER BY created DESC LIMIT 20"
}
```

### 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

