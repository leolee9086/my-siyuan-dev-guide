---
title: 设置跟随系统锁屏 (setFollowSystemLockScreen)
---
# 端点

/api/system/setFollowSystemLockScreen

# 设置跟随系统锁屏 (setFollowSystemLockScreen)

[首页](../index.html) | [System API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/system.go#L314)

## 功能描述

此 API 端点 `POST /api/system/setFollowSystemLockScreen` 用于设置思源笔记应用锁屏相关的行为。

它修改配置文件中的 `conf.System.LockScreenMode` 项。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `lockScreenMode` (integer): **必填**。设置锁屏模式的代码。具体数值的含义可能需要参考思源笔记的设置界面或相关文档，常见的可能包括：
    -   `0`: 可能表示"不启用锁屏"或"手动锁屏"。
    -   `1`: 可能表示"跟随系统锁屏"。
    -   `2`: 可能表示"一段时间无操作后自动锁屏"。
    -   (请根据实际情况确认这些值的具体含义)

**请求示例 (假设 1 代表跟随系统锁屏):**

```json
{
  "lockScreenMode": 1
}
```

**请求示例 (假设 0 代表不启用):**

```json
{
  "lockScreenMode": 0
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 为 `null`。

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

如果操作失败（例如参数无效），将返回非 0 的 `code` 和具体的错误信息 `msg`。

```json
{
  "code": -1, // 示例错误码
  "msg": "error message", // 示例错误信息
  "data": null
}
```

## 在线测试

您可以在下方输入锁屏模式代码进行在线测试。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

