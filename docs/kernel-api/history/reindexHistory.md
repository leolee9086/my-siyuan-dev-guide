---
title: 重建历史索引
---
# 端点

/api/history/reindexHistory

# 重建历史索引

需要认证 需要管理员权限 非只读模式

## 接口描述

重建历史记录索引。

当你觉得历史记录搜索结果不准确，或者历史记录功能出现异常时，可以尝试调用此接口来重新扫描并建立所有历史文件的索引。

**注意：**这是一个耗时操作，特别是在历史记录文件很多的情况下。操作期间可能会占用较多系统资源。

## 实现链接

-   后端路由: [siyuan/kernel/api/router.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/router.go)
-   处理函数: [siyuan/kernel/api/history.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/history.go) (`reindexHistory` 函数)
-   核心逻辑: [siyuan/kernel/model/history.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/history.go) (`ReindexHistory` 函数)

## 请求体

无

## 响应体 (JSON)

返回标准的响应体，`data` 字段为空。

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

**注意：**

-   调用此接口后，后台会开始执行重建索引的任务。接口会立即返回成功，但实际重建过程可能需要一段时间才能完成。
-   你可能会在界面底部看到重建索引的进度提示。

请求示例

返回示例

### 请求示例

```json
{
  // 无请求参数
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

