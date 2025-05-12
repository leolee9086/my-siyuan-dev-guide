---
title: 物理删除工作空间目录 (removeWorkspaceDirPhysically)
---
# 端点

/api/system/removeWorkspaceDirPhysically

# 物理删除工作空间目录 (removeWorkspaceDirPhysically)

[首页](../index.html) | [System API](index.html) | [GitHub Source (workspace.go)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/workspace.go#L159)

**极度危险的操作！数据将永久丢失且无法恢复！**  
调用此 API 将会递归删除您指定的目录以及其中的**所有**文件和子目录！请务必再三确认路径无误，并确保您已做好数据备份！  
如果删除的是当前工作空间，程序将在删除后立即退出！

## 功能描述

此 API 端点 `POST /api/system/removeWorkspaceDirPhysically` 用于从磁盘上**物理删除**一个指定的目录及其全部内容。

与 `/api/system/removeWorkspaceDir` 不同，后者仅从列表中移除工作空间引用，而此 API 会彻底删除文件系统中的数据。

**警告：**这是一个不可逆的操作。强烈建议在执行前进行完整的数据备份。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `path` (string): **必填**。要从磁盘上彻底删除的工作空间目录的绝对路径。

**请求示例:**

```json
{
  "path": "/path/to/permanently/delete/workspace"
}
```

## 响应结果

如果删除的目标不是当前工作空间，且删除成功（或目标路径不存在/不是目录），将返回一个 JSON 对象，`code` 为 0，`data` 为 `null`。

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

如果删除的目标是**当前工作空间**，并且删除成功，API **不会返回响应**，因为程序会立即退出。

如果删除过程中发生错误（例如权限不足），将返回非 0 的 `code` 和具体的错误信息 `msg`。

```json
{
  "code": -1,
  "msg": "remove /path/to/delete/workspace: permission denied", // 示例错误信息
  "data": null
}
```

## 在线测试

**极度危险！请勿轻易尝试！** 在线测试此 API 将永久删除您指定的目录及其所有内容，且无法撤销！如果删除的是当前工作空间，程序会退出！除非您完全理解风险并已备份数据，否则**绝对不要**使用此测试功能！

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求 (极度危险)

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

