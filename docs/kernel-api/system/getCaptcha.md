---
title: 获取验证码图片 (getCaptcha)
---
# 端点

/api/system/getCaptcha

# 获取验证码图片 (getCaptcha)

[首页](../index.html) | [System API](index.html) | [GitHub Source (model/session.go)](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/session.go)

## 功能描述

此 API 端点 `GET /api/system/getCaptcha` 用于生成并返回一个PNG格式的验证码图片。

验证码的文本会存储在当前用户的会话中，用于后续通过 `/api/system/loginAuth` 或其他需要验证码的接口进行校验。

调用此接口时，通常会附加一个时间戳或随机数作为URL参数 (例如 `?v=1678886400000`) 来防止浏览器缓存验证码图片。

## 请求参数

此 API 通常通过 **GET** 方法调用，不需要请求体 (Request Body)。

可以接受一个可选的URL查询参数，例如：

-   `v` (string, 可选): 一个随机字符串或时间戳，用于防止客户端缓存验证码图片。服务器端不处理此参数的实际值。

**请求示例:**

```http
GET /api/system/getCaptcha?v=1234567890 HTTP/1.1
Host: 127.0.0.1:6806
```

## 响应结果

成功时，服务器将直接返回验证码图片数据，HTTP状态码为 `200 OK`。Content-Type 通常为 `image/png`。

**响应体示例 (图片数据):**

```
[二进制图片数据]
```

如果内部发生错误（例如无法生成图片或保存会话失败），服务器将返回 `500 Internal Server Error`。

## 认证与授权

此 API 端点不需要认证即可访问。它用于登录前的验证码获取过程。

## 备注

-   验证码字符集默认为 `ABCDEFGHKLMNPQRSTUVWXYZ23456789`。
-   图片尺寸默认为 100x26 像素。
-   验证码文本会保存在服务器端的会话 (`workspaceSession.Captcha`) 中，用于后续验证。

## 在线测试

由于此接口直接返回图片，在线测试通常涉及在浏览器中直接打开以下链接 (将 `your-siyuan-address` 替换为实际的思源服务地址和端口，例如 `http://127.0.0.1:6806`):

刷新验证码

图片URL:

您也可以在浏览器的开发者工具中查看网络请求，确认响应头和图片内容。
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
