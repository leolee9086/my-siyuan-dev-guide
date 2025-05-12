---
title: /api/setting/setEmoji
---
# 端点

/api/setting/setEmoji

# /api/setting/setEmoji

设置编辑器中常用的表情符号列表。

此 API 会更新全局配置 `conf.Editor.Emoji` 的值并保存。成功后会广播 `setEmoji` 事件通知 UI 更新。

该 API 需要进行身份验证，请在请求头中包含 `Authorization` 字段，并确保用户角色为管理员且非只读模式。

## 请求

`POST`

### 参数 (JSON Body)

-   `emojis`: `array` of `string` (必需) - 一个包含常用表情字符的字符串数组。例如：`["😀", "🎉", "👍"]`。

```
{
    "emojis": ["😀", "🎉", "👍", "💡"]
}
```

### 示例 CURL

```
curl -X POST -H "Content-Type: application/json" -H "Authorization: Token YOUR_API_TOKEN" -d '{
    "emojis": ["😀", "🎉", "👍", "💡"]
}' http://127.0.0.1:6806/api/setting/setEmoji
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

常用表情 (emojis - JSON 字符串数组, 例如: `["😀", "✨"]`):  
\["😀", "🎉", "👍", "💡", "😊", "🤔"\]

从 /api/system/getConf 加载当前表情 发送请求

响应:
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
