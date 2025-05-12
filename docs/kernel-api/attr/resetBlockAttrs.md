---
title: resetBlockAttrs
---
# 端点

/api/attr/resetBlockAttrs

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/attr.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/attr.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# resetBlockAttrs

**方法：**POST **路径：**/api/attr/resetBlockAttrs

重置块属性。

**注意**: 此 API 需要管理员权限且非只读模式。

该 API 的行为更像是使用传入的值覆盖现有属性，而不是恢复到某个默认状态。具体逻辑请参考 `model.ResetBlockAttrs` 实现。

## 地址

`POST /api/attr/resetBlockAttrs`

## 请求体 (JSON)

```json
{
  "id": "块 ID",
  "attrs": {
    "属性名1": "新属性值1",
    "属性名2": "新属性值2"
  }
}
```

-   `id`: (`string`) 必填，块 ID。
-   `attrs`: (`object`) 必填，要设置或覆盖的属性键值对。

## 响应体 (JSON)

标准响应体：

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

## 示例

```javascript
fetch('/api/attr/resetBlockAttrs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Token xxx' // 如果需要认证
  },
  body: JSON.stringify({
    id: "20230101120000-abcdefgh",
    attrs: {
      "custom-status": "completed", // 将状态更新为完成
      "memo": ""
    }
  })
})
.then(response => response.json())
.then(data => {
  if (data.code === 0) {
    console.log('重置块属性成功');
  } else {
    console.error('重置块属性失败:', data.msg);
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
