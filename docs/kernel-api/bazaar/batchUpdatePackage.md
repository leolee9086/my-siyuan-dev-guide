---
title: batchUpdatePackage
---
# 端点

/api/bazaar/batchUpdatePackage

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# batchUpdatePackage

**方法：**POST **路径：**/api/bazaar/batchUpdatePackage

批量更新指定前端的集市包信息（例如，从远程仓库拉取最新的包列表，检查已安装包的更新等）。这是一个后台操作，API 调用本身只负责触发任务。

**注意**: 此 API 需要管理员权限且非只读模式。

## 地址

`POST /api/bazaar/batchUpdatePackage`

## 请求体 (JSON)

```json
{
  "frontend": "前端类型"
}
```

-   `frontend`: (`string`) 必填，指定前端类型，例如 `"desktop"` 或 `"mobile"`。

## 响应体 (JSON)

标准响应体，表示任务已触发。

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

## 示例

```javascript
// 触发桌面端集市包信息更新
fetch('/api/bazaar/batchUpdatePackage', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token YOUR_API_TOKEN' // 替换为你的 API Token
  },
  body: JSON.stringify({ frontend: "desktop" })
})
.then(response => response.json())
.then(data => {
  if (data.code === 0) {
    console.log('触发集市包更新任务成功');
    // 注意：这仅表示任务已触发，实际更新在后台进行
  } else {
    console.error('触发集市包更新任务失败:', data.msg);
  }
})
.catch(error => console.error('请求错误:', error));
```
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
