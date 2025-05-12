---
title: 设置网络代理 (setNetworkProxy)
---
# 端点

/api/system/setNetworkProxy

# 设置网络代理 (setNetworkProxy)

[首页](../index.html) | [System API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/system.go#L476)

## 功能描述

此 API 端点 `POST /api/system/setNetworkProxy` 用于设置思源笔记的网络代理配置。

它修改配置文件中的 `conf.System.NetworkProxy` 对象，并在设置后立即使代理生效。设置成功后会向用户发送通知。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `scheme` (string): **必填**。代理协议，例如 "http"、"https"、"socks5" 等。
-   `host` (string): **必填**。代理服务器主机名或 IP 地址。
-   `port` (string): **必填**。代理服务器端口号。

**请求示例 (设置 HTTP 代理):**

```json
{
  "scheme": "http",
  "host": "127.0.0.1",
  "port": "7890"
}
```

**请求示例 (设置 SOCKS5 代理):**

```json
{
  "scheme": "socks5",
  "host": "127.0.0.1",
  "port": "1080"
}
```

**请求示例 (清除代理设置):**

```json
{
  "scheme": "",
  "host": "",
  "port": ""
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 为 `null`。同时会在界面上显示一条提示消息。

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
  "msg": "Invalid proxy configuration", // 示例错误信息
  "data": null
}
```

## 在线测试

您可以在下方输入代理设置进行在线测试。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

