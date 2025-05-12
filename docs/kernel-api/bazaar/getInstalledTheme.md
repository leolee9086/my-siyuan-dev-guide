---
title: getInstalledTheme
---
# 端点

/api/bazaar/getInstalledTheme

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# getInstalledTheme

**方法：**POST **路径：**/api/bazaar/getInstalledTheme

获取当前工作空间中\*\*已安装\*\*的主题包列表。

**新手提示：** 这个 API 列出的是你已经下载到本地的主题，而不是集市里所有可下载的主题。可以用来管理本地已安装的主题资源。

**注意**: 此 API 需要认证。

## 地址

`POST /api/bazaar/getInstalledTheme`

## 请求体 (JSON)

```json
{
  "keyword": "可选的关键词"
}
```

-   `keyword`: (`string`) 可选。用于在已安装的主题包中根据名称、作者或描述进行搜索。如果为空或不提供，则返回所有已安装的主题包。

## 响应体 (JSON)

标准响应体，其中 \`data.packages\` 字段是一个数组，包含已安装的主题包对象。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "packages": [
      {
        "name": "已安装主题包名称",
        "author": "作者",
        "version": "版本号",
        "repoURL": "来源仓库地址", // 可能为空
        "repoHash": "来源仓库哈希", // 可能为空
        "description": "描述",
        "modes": [0, 1], // 支持的模式: 0=亮色, 1=暗色
        "previews": [ { "screenshot": "预览图URL", "mode": 0 }, ... ],
        "displayName": "显示名称",
        "funding": [], // 赞助信息
        "localPath": "本地安装路径", // 相对于 data 目录
        // ... 可能还有其他字段
      }
      // ... 更多已安装的主题包
    ]
  }
}
```

**注意:** \`packages\` 数组中每个对象的具体字段和结构取决于后端 \`model.InstalledThemes\` 函数的实现。

## 示例

```javascript
// 获取所有已安装的主题包
fetch('/api/bazaar/getInstalledTheme', {
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
    console.log('获取已安装主题包列表成功:', data.data.packages);
    // 处理 data.data.packages 列表
  } else {
    console.error('获取已安装主题包列表失败:', data.msg);
  }
})
.catch(error => console.error('请求错误:', error));

// 搜索已安装的包含 "Savor" 关键词的主题包
// fetch('/api/bazaar/getInstalledTheme', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Token YOUR_API_TOKEN' // 替换为你的 API Token
//   },
//   body: JSON.stringify({ keyword: "Savor" })
// })
// // ... 后续处理同上
```

复制

### 实际应用案例 / Who Uses This API?

如果你的插件、主题或外部工具使用了这个 API，欢迎提交 Pull Request 将你的项目添加到下方列表！

-   暂无 （期待你的贡献！）
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
