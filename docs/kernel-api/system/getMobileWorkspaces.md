---
title: 获取移动端工作空间列表 (getMobileWorkspaces)
---
# 端点

/api/system/getMobileWorkspaces

# 获取移动端工作空间列表 (getMobileWorkspaces)

[首页](../index.html) | [System API](index.html) | [GitHub Source (workspace.go)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/workspace.go#L191)

**注意：** 此 API 仅在移动端 (iOS/Android) 环境下有效。在桌面端调用此 API 将不会返回任何数据。

## 功能描述

此 API 端点 `POST /api/system/getMobileWorkspaces` 用于获取当前工作空间所在父目录下，所有看起来可能是思源工作空间的目录列表。

它通过扫描当前工作空间的同级目录，并根据目录名称的合法性进行筛选，旨在方便移动端用户发现和切换同一层级的其他工作空间。

## 请求参数

此 API 不需要任何请求参数。发送一个空的 JSON 对象 `{}` 或不发送请求体即可。

**请求示例:**

```json
{}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 是一个包含扫描到的潜在工作空间目录绝对路径的字符串数组。

```json
{
  "code": 0,
  "msg": "",
  "data": [
    "/path/to/parent/workspace1",
    "/path/to/parent/another_workspace",
    "/path/to/parent/current_workspace" 
    // ... more paths
  ]
}
```

如果在非移动端环境调用，或者读取目录时发生错误，将返回非 0 的 `code` 和具体的错误信息 `msg`（或者在非移动端环境下直接返回空数据）。

```json
{
  "code": -1,
  "msg": "read dir [/path/to/parent] failed: permission denied", // 示例错误信息
  "data": null
}
```

如果没有找到其他符合条件的目录，`data` 数组可能只包含当前工作空间路径，或者为空数组。

## 在线测试

您可以在下方直接点击"发送请求"进行在线测试。**请注意，此测试仅在思源笔记移动端环境下有意义。**

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
{}  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

