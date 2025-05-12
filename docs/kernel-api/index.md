---
title: Kernel-api Index
---

## 规范

参数和返回值

端点：http://127.0.0.1:6806

均是 POST 方法

需要带参的接口，参数为 JSON 字符串，放置到 body 里，标头 Content-Type 为 application/json

返回值
```json
{
  "code": 0,
  "msg": "",
  "data": {}
}
```

> code：非 0 为异常情况
> msg：正常情况下是空字符串，异常情况下会返回错误文案
> data：可能为 {}、[] 或者 NULL，根据不同接口而不同

## 鉴权

在 设置 - 关于 里查看 API token，请求标头：Authorization: Token xxx

