---
title: 设置网络伺服 (setNetworkServe)
---
# 端点

/api/system/setNetworkServe

# 设置网络伺服 (setNetworkServe)

[首页](../index.html) | [System API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/system.go#L355)

## 功能描述

此 API 端点 `POST /api/system/setNetworkServe` 用于设置思源笔记是否在局域网中提供服务（是否可以通过局域网访问）。

它修改配置文件中的 `conf.System.NetworkServe` 项。设置成功后会向用户发送通知，并延迟3秒返回结果。

**注意**：更改此设置后可能需要重启应用才能完全生效。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `networkServe` (boolean): **必填**。是否允许通过局域网访问思源笔记。
    -   `true`: 启用网络伺服，允许局域网访问。
    -   `false`: 禁用网络伺服，仅允许本机访问。

**请求示例 (启用网络伺服):**

```json
{
  "networkServe": true
}
```

**请求示例 (禁用网络伺服):**

```json
{
  "networkServe": false
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 为 `null`。同时会在界面上显示一条提示消息。

**注意**：此 API 会延迟 3 秒钟才返回响应，以便用户看到提示消息。

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
  "msg": "Invalid parameter", // 示例错误信息
  "data": null
}
```

## 在线测试

您可以在下方选择是否启用网络伺服进行在线测试。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

