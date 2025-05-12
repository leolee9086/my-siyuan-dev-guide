---
title: getBazaarTemplate
---
# 端点

/api/bazaar/getBazaarTemplate


# getBazaarTemplate

**方法：**

POST 

**路径：**

/api/bazaar/getBazaarTemplate

获取集市中可用的模板包列表。模板包就是你在思源笔记中新建文档时可以选择套用的那些模板。

**新手提示：** 这个 API 可以帮你列出所有能从集市下载的模板，就像你在思源笔记"设置"->"集市"->"模板"里看到的那样。你还可以输入关键词来快速查找特定类型的模板。

**注意**: 此 API 需要认证。

## 地址

`POST /api/bazaar/getBazaarTemplate`

## 请求体 (JSON)

```json
{
  "keyword": "可选的关键词"
}
```

-   `keyword`: (`string`) 可选。用于搜索模板包名称、作者或描述的关键词。如果为空或不提供，则返回所有可用的模板包。

## 响应体 (JSON)

标准响应体，其中 \`data.packages\` 字段是一个数组，包含模板包对象。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "packages": [
      {
        "name": "模板包名称",
        "author": "作者",
        "version": "版本号",
        "repoURL": "仓库地址",
        "repoHash": "仓库哈希",
        "description": "描述",
        "iconURL": "预览图 URL",
        "displayName": "显示名称",
        "funding": [], // 赞助信息
        // ... 可能还有其他字段
      }
      // ... 更多模板包
    ]
  }
}
```

**注意:** \`packages\` 数组中每个对象的具体字段和结构取决于后端 \`model.BazaarTemplates\` 函数的实现，请以实际返回为准（通常和图标包、插件包的结构类似）。

## 示例

```javascript
// 获取所有可用的模板包
fetch('/api/bazaar/getBazaarTemplate', {
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
    console.log('获取集市模板包列表成功:', data.data.packages);
    // 在界面上渲染 data.data.packages 列表
  } else {
    console.error('获取集市模板包列表失败:', data.msg);
  }
})
.catch(error => console.error('请求错误:', error));

// 搜索包含 "report" 关键词的模板包
fetch('/api/bazaar/getBazaarTemplate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token YOUR_API_TOKEN' // 替换为你的 API Token
  },
  body: JSON.stringify({ keyword: "report" })
})
// ... 后续处理同上
```


> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
