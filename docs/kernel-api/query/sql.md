---
title: 执行 SQL 查询
---
# 端点

/api/query/sql

# 执行 SQL 查询

需要认证

## 接口描述

执行 SQL 查询语句，返回查询结果。思源笔记使用 SQLite 作为底层数据库，支持标准的 SQL 查询语法。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| stmt | string | 是 | SQL 查询语句 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功，1 表示失败 |
| msg | string | 错误信息，失败时返回 |
| data | array | 查询结果数组，每个元素是一个对象，对应查询结果的一行记录 |

## 数据库结构

思源笔记的核心数据库表：

-   **blocks**：存储所有的内容块
-   **attributes**：存储块属性
-   **spans**：存储富文本跨度（如加粗、高亮等）
-   **refs**：存储引用关系

请求示例

返回示例

### 请求示例

```
POST /api/query/sql HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-api-token

{
  "stmt": "SELECT * FROM blocks WHERE type = 'h' LIMIT 5"
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "box": "20210817205410-2kvfpfn",
      "content": "标题1",
      "created": "20210817205410",
      "fcontent": "标题1",
      "hash": "5dd5eb66e0b1eaad1799d7ac",
      "hpath": "/标题1",
      "ial": "{: id=\"20210817205410-2kvfpfn\" updated=\"20210817205415\"}",
      "id": "20210817205410-2kvfpfn",
      "length": 3,
      "markdown": "# 标题1",
      "memo": "",
      "name": "",
      "parent_id": "",
      "path": "/20210817205410-2kvfpfn.sy",
      "root_id": "20210817205410-2kvfpfn",
      "sort": 0,
      "subtype": "h1",
      "tag": "",
      "type": "h",
      "updated": "20210817205415"
    },
    {
      "box": "20210808180117-czj9bvb",
      "content": "欢迎使用思源笔记",
      "created": "20210808180117",
      "fcontent": "欢迎使用思源笔记",
      "hash": "7788ce344790b69921fa507c",
      "hpath": "/思源笔记用户指南/请从这里开始",
      "ial": "{: id=\"20210710193634-f2466oo\" updated=\"20210808180117\"}",
      "id": "20210710193634-f2466oo",
      "length": 8,
      "markdown": "# 欢迎使用思源笔记",
      "memo": "",
      "name": "",
      "parent_id": "",
      "path": "/20210710193634-f2466oo.sy",
      "root_id": "20210710193634-f2466oo",
      "sort": 0,
      "subtype": "h1",
      "tag": "",
      "type": "h",
      "updated": "20210808180117"
    }
  ]
}
```

## 常用查询示例

### 查询所有标题块

```
SELECT * FROM blocks WHERE type = 'h'
```

### 查询包含指定文本的块

```
SELECT * FROM blocks WHERE content LIKE '%关键词%'
```

### 查询特定文档下的所有块

```
SELECT * FROM blocks WHERE root_id = '20210817205410-2kvfpfn'
```

### 查询具有特定标签的块

```
SELECT * FROM blocks WHERE tag LIKE '%标签名%'
```

### 查询最近更新的块

```
SELECT * FROM blocks ORDER BY updated DESC LIMIT 10
```

