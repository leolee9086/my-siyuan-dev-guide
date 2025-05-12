---
title: getBazaarPackageREAME
---
# 端点

/api/bazaar/getBazaarPackageREAME

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# getBazaarPackageREAME

**方法：**POST **路径：**/api/bazaar/getBazaarPackageREAME

获取指定集市包（如插件、主题、图标包等）的 README 文件内容。思源笔记会将其转换为 HTML 格式返回，方便在界面上直接展示包的详细说明。

**新手提示：** 当你在思源笔记的集市里点击一个插件或主题查看详情时，看到的那部分介绍文字，很可能就是通过调用这个 API 获取并显示出来的。

**注意**: 此 API 需要认证。

## 地址

`POST /api/bazaar/getBazaarPackageREAME`

## 请求体 (JSON)

```json
{
  "repoURL": "包的 Git 仓库地址",
  "repoHash": "仓库特定提交的哈希值",
  "packageType": "包的类型"
}
```

-   `repoURL`: (`string`) 必填。集市包的来源 Git 仓库 URL。通常可以从获取包列表的 API（如 `getBazaarPlugin`, `getBazaarTheme` 等）返回结果中找到。
-   `repoHash`: (`string`) 必填。对应仓库的一个特定 commit 哈希值，用于确定是哪个版本的 README。同样可以在包列表信息中找到。
-   `packageType`: (`string`) 必填。包的类型，必须是以下之一：`"plugin"`, `"theme"`, `"icon"`, `"template"`, `"widget"`。

## 响应体 (JSON)

标准响应体，其中 \`data.html\` 字段是包含 README 内容的 HTML 字符串。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "html": "<h1>包名</h1><p>这是 README 的内容...</p>"
  }
}
```

**注意:**

-   返回的 \`html\` 字符串可以直接嵌入到网页中显示。
-   如果提供的参数有误（例如 \`repoURL\` 或 \`repoHash\` 不存在），或者网络无法访问仓库，或者仓库中没有 README 文件，API 调用可能会失败，或者返回空的 \`html\` 内容。
-   返回的 HTML 质量依赖于包作者编写的 README.md 文件质量。

## 示例

```javascript
// 假设我们想获取某个插件的 README
const pluginRepo = "https://github.com/user/siyuan-plugin-example";
const pluginHash = "abcdef1234567890"; // 具体的 commit hash

fetch('/api/bazaar/getBazaarPackageREAME', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token YOUR_API_TOKEN' // 替换为你的 API Token
  },
  body: JSON.stringify({
    repoURL: pluginRepo,
    repoHash: pluginHash,
    packageType: "plugin"
  })
})
.then(response => response.json())
.then(data => {
  if (data.code === 0 && data.data && data.data.html) {
    console.log('获取包 README 成功:');
    // 将返回的 HTML 显示在页面某个元素中
    const readmeContainer = document.getElementById('readme-display-area');
    if (readmeContainer) {
      readmeContainer.innerHTML = data.data.html;
    } else {
      console.log(data.data.html); // 如果没有显示区域，就打印出来
    }
  } else {
    console.error('获取包 README 失败:', data.msg || '返回数据格式错误');
  }
})
.catch(error => console.error('请求错误:', error));
```
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
