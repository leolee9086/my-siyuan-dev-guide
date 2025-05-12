---
title: /api/setting/setBazaar
---
# 端点

/api/setting/setBazaar

# /api/setting/setBazaar

设置集市相关配置。

该 API 需要进行身份验证，请在请求头中包含 `Authorization` 字段，并确保用户角色为管理员且非只读模式。

## 请求

`POST`

### 参数

使用 JSON 格式在请求体 (body) 中提供以下参数：

-   `trust`: `boolean`，是否信任集市内容。
-   `petalDisabled`: `boolean`，是否禁用花瓣功能。

```
{
    "trust": true,
    "petalDisabled": false
}
```

### 示例

```
curl -X POST -H "Content-Type: application/json" -H "Authorization: Token YOUR_API_TOKEN" -d '{
    "trust": true,
    "petalDisabled": false
}' http://127.0.0.1:6806/api/setting/setBazaar
```

## 响应

如果操作成功，将返回包含更新后集市配置对象的 JSON 数据。

```
{
    "code": 0,
    "msg": "",
    "data": {
        "trust": true,
        "petalDisabled": false,
        "proxyURL": "",
        "proxyAuth": "",
        "proxyEnabled": false
    }
}
```

如果操作失败，`code` 将是非零值，`msg` 中会包含错误信息。

## 在线测试

请求体 (JSON):  
{ "trust": true, "petalDisabled": false }

发送请求

响应:
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
