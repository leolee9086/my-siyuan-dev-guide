---
title: HTTP 请求转发代理 (forwardProxy)
---
# 端点

/api/network/forwardProxy

# HTTP 请求转发代理 (forwardProxy)

[首页](../index.html) | [Network API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/network.go#L151)

## 功能描述

此 API 端点 `POST /api/network/forwardProxy` 提供了一个通用的 HTTP 请求转发代理功能。

它允许客户端（如插件）通过思源笔记后端向任意指定的 URL 发送 HTTP 请求（GET, POST, PUT, DELETE 等），并获取完整的响应（状态码、响应头、响应体）。

主要用途包括：

-   **绕过浏览器跨域限制 (CORS)**：当前端 JavaScript 无法直接访问某些第三方 API 时，可以通过此代理进行访问。
-   **隐藏 API 密钥**：将需要保密的认证信息放在后端进行请求转发。
-   **统一网络请求处理**：方便插件集中管理外部 HTTP 调用。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `url` (string): **必填**。需要请求的目标 URL 地址。
-   `method` (string): 可选。HTTP 请求方法，如 "GET", "POST", "PUT", "DELETE" 等。默认为 "POST"。
-   `timeout` (number): 可选。请求超时时间（毫秒）。默认为 7000 (7秒)。
-   `headers` (array): 可选。一个对象数组，用于设置自定义请求头。每个对象是一个键值对。例如：  
    `[{"Content-Type": "application/x-www-form-urlencoded"}, {"Authorization": "Bearer your_token"}]`
-   `contentType` (string): 可选。用于设置请求的 `Content-Type` 头。如果同时在 `headers` 中也设置了 Content-Type，此参数可能会被覆盖。默认为 "application/json"。
-   `payload` (any): 可选。请求体内容。其格式取决于 `contentType` 和 `payloadEncoding`。
-   `payloadEncoding` (string): 可选。指定 `payload` 字段（如果它是字符串）的编码方式。支持的值：
    -   `json` (默认): payload 会被当作 JSON 对象（或数组等）处理并发送。
    -   `text`: payload 会被当作普通文本字符串处理。
    -   `base64` 或 `base64-std`: payload 是 Base64 标准编码的字符串，服务器会先解码再作为请求体发送。
    -   `base64-url`: payload 是 Base64 URL 安全编码的字符串，服务器会先解码再发送。
    -   `base32` 或 `base32-std`: payload 是 Base32 标准编码的字符串，服务器会先解码再发送。
    -   `base32-hex`: payload 是 Base32 Hex 编码的字符串，服务器会先解码再发送。
    -   `hex`: payload 是 Hex 编码的字符串，服务器会先解码再发送。

**请求示例:**

```json
{
  "url": "https://api.example.com/data",
  "method": "GET",
  "timeout": 5000,
  "headers": [
    {"Authorization": "Bearer your_api_key"}
  ]
}
```

```json
{
  "url": "https://api.example.com/submit",
  "method": "POST",
  "headers": [
      {"X-Custom-ID": "12345"}
  ],
  "contentType": "application/json", // 明确指定 JSON
  "payload": {
      "name": "test",
      "value": 100
  },
  "payloadEncoding": "json" // 对应 payload 是 JSON 对象
}
```

```json
{
  "url": "https://api.example.com/binary",
  "method": "POST",
  "contentType": "application/octet-stream",
  "payload": "SGVsbG8gV29ybGQ=", // "Hello World" 的 Base64 编码
  "payloadEncoding": "base64"
}
```

## 响应结果

无论目标服务器返回什么，此 API 本身成功的请求将返回一个 JSON 对象，`code` 为 0。目标服务器的实际响应包含在 `data` 字段中。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "StatusCode": 200, // 目标服务器返回的 HTTP 状态码
    "Headers": {       // 目标服务器返回的响应头
      "Content-Type": ["application/json"],
      "Date": ["Wed, 21 Feb 2024 10:00:00 GMT"],
      // ... 其他响应头
    },
    "Body": { ... } // 目标服务器返回的响应体 (已自动解码或处理)
                      // - 如果响应是 JSON, 这里是解码后的 JSON 对象/数组
                      // - 如果响应是文本 (text/plain, text/html), 这里是文本字符串
                      // - 如果是其他二进制类型, 这里可能是 Base64 编码的字符串
                      // - 如果请求失败或无响应体，可能为 null
    "BodyContentType": "application/json", // 目标服务器响应的 Content-Type
    "BodyEncoding": "json" // Siyuan 尝试解析 Body 的方式 ('json', 'text', 'base64-std') 
  }
}
```

-   `code`: 0 表示代理请求本身成功（不代表目标服务器响应是 2xx）。
-   `msg`: 代理请求本身的错误信息（如果 code 非 0）。
-   `data.StatusCode`: 目标服务器返回的 HTTP 状态码。
-   `data.Headers`: 目标服务器返回的响应头 (Header)。
-   `data.Body`: 目标服务器返回的响应体。思源后端会尝试根据响应的 \`Content-Type\` 来解析或编码：
    -   如果是 \`application/json\`，会尝试解析为 JSON 对象/数组。
    -   如果是 \`text/\*\` (如 \`text/plain\`, \`text/html\`)，会作为普通字符串返回。
    -   如果是其他类型（如 \`image/\*\`, \`application/octet-stream\` 等），通常会返回 Base64 标准编码的字符串。
    -   如果解析失败或没有响应体，可能为 \`null\`。
-   `data.BodyContentType`: 目标服务器响应头中的原始 \`Content-Type\`。
-   `data.BodyEncoding`: 指示 \`data.Body\` 是如何被处理/编码的（\`json\`, \`text\`, \`base64-std\`）。

如果代理请求过程中发生错误（例如 DNS 解析失败、连接超时、目标 URL 无效等），`code` 会是 -1 或其他非零值，并包含错误信息在 `msg` 字段中，此时 `data` 可能为 \`null\`。

## 在线测试

您可以在下方输入请求参数进行在线测试。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

