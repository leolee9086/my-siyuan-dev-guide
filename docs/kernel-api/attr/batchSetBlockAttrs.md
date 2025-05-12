---
title: batchSetBlockAttrs
---
# 端点

/api/attr/batchSetBlockAttrs

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/attr.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/attr.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# batchSetBlockAttrs

**方法：**POST **路径：**/api/attr/batchSetBlockAttrs

批量设置块属性。

**注意**: 此 API 需要管理员权限且非只读模式。

## 地址

`POST /api/attr/batchSetBlockAttrs`

## 请求体 (JSON)

```json
{
  "blockAttrs": [
    {
      "id": "块 ID 1",
      "attrs": {
        "属性名1": "属性值1",
        "属性名2": "属性值2"
      }
    },
    {
      "id": "块 ID 2",
      "attrs": {
        "属性名3": "属性值3",
        "custom-attr": null // 设置为 null 会移除该属性
      }
    }
    // ... 更多块属性
  ]
}
```

-   `blockAttrs`: 数组，包含要设置属性的块信息。
    -   `id`: (`string`) 必填，块 ID。
    -   `attrs`: (`object`) 必填，要设置的属性键值对。

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
fetch('/api/attr/batchSetBlockAttrs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Token xxx' // 如果需要认证
  },
  body: JSON.stringify({
    blockAttrs: [
      {
        id: "20230101120000-abcdefgh",
        attrs: { "custom-status": "processing", "updated": "20240101" }
      },
      {
        id: "20230102130000-ijklmnop",
        attrs: { "memo": "这是一个备注", "custom-oldattr": null } // 移除 custom-oldattr
      }
    ]
  })
})
.then(response => response.json())
.then(data => {
  if (data.code === 0) {
    console.log('批量设置块属性成功');
  } else {
    console.error('批量设置块属性失败:', data.msg);
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
