---
title: 获取网络设置 (getNetwork)
---
# 端点

/api/system/getNetwork

# 获取网络设置 (getNetwork)

[首页](../index.html) | [System API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/system.go#L37)

## 功能描述

此 API 端点 `POST /api/system/getNetwork` 用于获取当前思源笔记实例配置的网络代理设置。

返回的配置信息是经过脱敏处理的，敏感字段（如果有）会被隐藏。

## 请求参数

此 API 不需要任何请求参数。发送一个空的 JSON 对象 `{}` 或不发送请求体即可。

**请求示例:**

```json
{}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 包含一个名为 `proxy` 的对象，表示当前的网络代理配置。

`proxy` 对象通常包含以下字段 (如果未配置代理，可能为 null 或空对象)：

-   `scheme` (string): 代理协议，例如 "http", "https", "socks5"。
-   `host` (string): 代理服务器的主机名或 IP 地址。
-   `port` (string): 代理服务器的端口号。

**响应示例 (配置了 HTTP 代理):**

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "proxy": {
      "scheme": "http",
      "host": "127.0.0.1",
      "port": "1080"
    }
  }
}
```

**响应示例 (未配置代理):**

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "proxy": null // 或者可能是空对象 {}
  }
}
```

如果获取配置过程中发生错误，将返回非 0 的 `code` 和具体的错误信息 `msg`。

```json
{
  "code": -1,
  "msg": "get conf failed: error message", // 示例错误信息
  "data": null
}
```

## 在线测试

您可以在下方直接点击"发送请求"进行在线测试，以获取当前的网络代理设置。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
{}  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

