---
title: /api/setting/setEditorReadOnly
---
# 端点

/api/setting/setEditorReadOnly

# /api/setting/setEditorReadOnly

快速设置或切换编辑器的只读状态。

此 API 直接修改全局配置中 `conf.Editor.ReadOnly` 的值并保存。与 `/api/setting/setEditor` 不同，后者需要传递完整的 `conf.Editor` 对象，而此 API 更轻量，仅用于切换只读状态。

该 API 需要进行身份验证，请在请求头中包含 `Authorization` 字段，并确保用户角色为管理员且非只读模式。

## 请求

`POST`

### 参数 (JSON Body)

-   `readonly`: `boolean` - 设置编辑器是否为只读模式。`true` 为只读，`false` 为可编辑。

```
{
    "readonly": true
}
```

### 示例 CURL

```
curl -X POST -H "Content-Type: application/json" -H "Authorization: Token YOUR_API_TOKEN" -d '{
    "readonly": true
}' http://127.0.0.1:6806/api/setting/setEditorReadOnly
```

## 响应

操作成功时，通常返回如下：

```
{
    "code": 0,
    "msg": "",
    "data": null
}
```

如果操作失败，`code` 将是非零值，`msg` 中会包含错误信息。

## 在线测试

API Token: (从思源"设置-关于"中获取)  

只读状态 (readonly): true (只读) false (可编辑)

发送请求

响应:
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
