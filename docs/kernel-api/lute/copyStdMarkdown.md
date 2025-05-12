---
title: copyStdMarkdown
---
# 端点

/api/lute/copyStdMarkdown

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/lute.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/lute.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# copyStdMarkdown

获取指定块的标准 Markdown 文本。

**注意**: 此 API 需要认证。

## 地址

`POST /api/lute/copyStdMarkdown`

## 请求体 (JSON)

```json
{
  "id": "块 ID"
}
```

-   `id`: (`string`) 必填，目标块的 ID。

## 响应体 (JSON)

标准响应体，其中 \`data\` 字段为导出的 Markdown 字符串。

```json
{
  "code": 0,
  "msg": "",
  "data": "导出的标准 Markdown 文本..."
}
```

## 示例

```javascript
fetch('/api/lute/copyStdMarkdown', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token YOUR_API_TOKEN' // 替换为你的 API Token
  },
  body: JSON.stringify({ id: "20230101120000-abcdefgh" })
})
.then(response => response.json())
.then(data => {
  if (data.code === 0) {
    console.log('获取标准 Markdown 成功:');
    console.log(data.data);
    // 可以将 data.data 复制到剪贴板
    // navigator.clipboard.writeText(data.data);
  } else {
    console.error('获取标准 Markdown 失败:', data.msg);
  }
})
.catch(error => console.error('请求错误:', error));
```
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
