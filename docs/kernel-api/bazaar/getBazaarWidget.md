---
title: getBazaarWidget
---
# 端点

/api/bazaar/getBazaarWidget

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# getBazaarWidget

**方法：**POST **路径：**/api/bazaar/getBazaarWidget

获取集市中可用的挂件包 (Widget) 列表。挂件是可以嵌入到文档中的小应用或信息展示块，例如时钟、日历、天气等。

**新手提示：** 这个 API 就像打开了思源笔记的"挂件商店"列表，让你看到所有可以下载安装的挂件。你可以用关键词来查找你感兴趣的挂件。

**注意**: 此 API 需要认证。

## 地址

`POST /api/bazaar/getBazaarWidget`

## 请求体 (JSON)

```json
{
  "keyword": "可选的关键词"
}
```

-   `keyword`: (`string`) 可选。用于搜索挂件包名称、作者或描述的关键词。如果为空或不提供，则返回所有可用的挂件包。

## 响应体 (JSON)

标准响应体，其中 \`data.packages\` 字段是一个数组，包含挂件包对象。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "packages": [
      {
        "name": "挂件包名称",
        "author": "作者",
        "version": "版本号",
        "repoURL": "仓库地址",
        "repoHash": "仓库哈希",
        "description": "描述",
        "iconURL": "预览图 URL", // 通常是挂件的图标
        "displayName": "显示名称",
        "funding": [], // 赞助信息
        // ... 可能还有其他字段
      }
      // ... 更多挂件包
    ]
  }
}
```

**注意:** \`packages\` 数组中每个对象的具体字段和结构取决于后端 \`model.BazaarWidgets\` 函数的实现，请以实际返回为准。

## 示例

```javascript
// 获取所有可用的挂件包
fetch('/api/bazaar/getBazaarWidget', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token YOUR_API_TOKEN' // 替换为你的 API Token
  },
  body: JSON.stringify({ keyword: "" })
})
.then(response => response.json())
.then(data => {
  if (data.code === 0) {
    console.log('获取集市挂件包列表成功:', data.data.packages);
    // 在界面上渲染 data.data.packages 列表
  } else {
    console.error('获取集市挂件包列表失败:', data.msg);
  }
})
.catch(error => console.error('请求错误:', error));

// 搜索包含 "clock" 关键词的挂件包
// fetch('/api/bazaar/getBazaarWidget', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Token YOUR_API_TOKEN' // 替换为你的 API Token
//   },
//   body: JSON.stringify({ keyword: "clock" })
// })
// // ... 后续处理同上
```

复制
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
