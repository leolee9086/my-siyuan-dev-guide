---
title: 回滚资源历史
---
# 端点

/api/history/rollbackAssetsHistory

# 回滚资源历史

需要认证 需要管理员权限 非只读模式

## 接口描述

回滚资源文件（assets）的历史版本。

可以将工作空间 `data/assets/` 目录下的某个文件恢复到指定的历史版本。

**警告：**此操作会覆盖当前工作目录中的同名资源文件！请谨慎操作！

## 请求体 (JSON)

```json
{
  "historyPath": "要回滚的资源文件的历史路径"
}
```

-   `historyPath`: (`string`) 必填。要回滚的资源文件在历史记录中的路径。这个路径通常从 `getHistoryItems` (当 \`type\` 为 2 时) 或其他历史相关的 API 获取，它指向 `data/history/{时间戳}-{操作类型}/assets/...` 下的文件。注意：请求体中只需要提供相对于 `data/history/` 的路径，例如 `20231027100000-u/assets/important_image.png`，但在代码实现中会拼接工作空间路径。

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

-   如果回滚成功，目标资源文件会被历史版本覆盖。
-   如果历史路径无效或回滚过程中出错，`code` 将为非 0 值，`msg` 包含错误信息。

## 实现链接

-   后端路由: [siyuan/kernel/api/router.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/router.go)
-   处理函数: [siyuan/kernel/api/history.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/history.go) (`rollbackAssetsHistory` 函数)
-   核心逻辑: [siyuan/kernel/model/history.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/history.go) (`RollbackAssetsHistory` 函数)

请求示例

返回示例

### 请求示例

```json
{
  "historyPath": "20231101100000-u/assets/image.png"
}
```

### 返回示例 (成功)

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

