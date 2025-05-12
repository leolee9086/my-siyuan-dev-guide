---
title: 强制刷新事务队列 (flushTransaction)
---
# 端点

/api/sqlite/flushTransaction

# 强制刷新事务队列 (flushTransaction)

[首页](../index.html) | [SQLite API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/sql.go#L28)

## 功能描述

此 API 端点 `POST /api/sqlite/flushTransaction` 用于强制将内存中待处理的 SQL 操作队列写入数据库。

思源笔记为了性能，会将一些数据库写入操作先放入内存队列，然后批量写入。调用此 API 可以确保队列中的所有操作立即执行并持久化到数据库文件中。

这通常在需要确保某些操作（例如备份前、关键操作后）已完全写入磁盘时使用。

此 API 不需要任何请求参数。

## 请求参数

无。

请求体可以为空 JSON 对象 `{}` 或完全为空。

## 响应结果

成功的请求将始终返回一个 JSON 对象，`code` 为 0，`data` 为 `null`。

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

此 API 一般不会返回错误，除非发生非常底层的系统问题。

## 在线测试

您可以直接点击下方按钮进行在线测试。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

