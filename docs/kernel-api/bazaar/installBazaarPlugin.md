---
title: installBazaarPlugin
---
# 端点

/api/bazaar/installBazaarPlugin

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# installBazaarPlugin

从集市下载并安装指定的插件。

**新手提示：** 这个 API 就是你在思源集市里点击插件"安装"按钮时背后执行的操作。

**🚨🚨🚨 严重风险警告！请务必仔细阅读！ 🚨🚨🚨**

-   安装插件是\*\*高风险操作\*\*！插件代码可以访问你的笔记数据、系统文件，甚至可能连接互联网。
-   **请仅安装来自你完全信任的、声誉良好的开发者的插件！** 在安装前尽可能了解插件的功能和来源。
-   恶意或编写拙劣的插件可能导致\*\*数据丢失、隐私泄露、软件崩溃、性能问题甚至系统安全风险\*\*！
-   此操作会从网络下载代码并在本地文件系统 (\`data/plugins/\`) 中执行安装。
-   需要\*\*管理员权限\*\*并且不能在\*\*只读模式\*\*下运行。
-   安装过程可能因网络、仓库或插件本身的问题而失败。

**后果自负！如果您不确定插件的安全性，请不要安装！**

**注意**: 此 API 需要认证、管理员权限且非只读模式。

## 地址

`POST /api/bazaar/installBazaarPlugin`

## 请求体 (JSON)

```json
{
  "repoURL": "插件的 Git 仓库地址",
  "repoHash": "仓库特定提交的哈希值",
  "packageName": "插件名称",
  "frontend": "前端类型 (例如 desktop)",
  "keyword": "可选的关键词"
}
```

-   `repoURL`: (`string`) 必填。插件的来源 Git 仓库 URL。通常从 `getBazaarPlugin` API 获取。
-   `repoHash`: (`string`) 必填。仓库的特定 commit 哈希值，代表要安装的版本。通常从 `getBazaarPlugin` API 获取。
-   `packageName`: (`string`) 必填。要安装的插件的名称。
-   `frontend`: (`string`) 必填。需要指定前端，例如 `"desktop"` 或 `"mobile"`。虽然安装逻辑本身可能不直接使用，但 API 返回时需要用它来刷新插件列表。
-   `keyword`: (`string`) 可选。用于安装成功后刷新集市插件列表时的过滤，对安装操作本身影响不大。可以留空。

## 响应体 (JSON)

安装请求成功后，返回标准响应体，\`data\` 字段包含刷新后的集市插件列表。

```json
{
  "code": 0, // 0 表示安装任务启动成功
  "msg": "", // 成功时为空，失败时包含错误信息
  "data": {
    "packages": [
      // 安装后刷新得到的 *所有* 集市可用插件列表 (针对指定 frontend)...
      // (结构同 getBazaarPlugin 返回的 packages)
    ]
  }
}
```

**注意:**

-   `code: 0` 仅表示后端接受了安装请求。实际下载、解压和安装可能失败。
-   如果安装失败，`code` 会是非 0 值，`msg` 会包含错误信息。
-   安装插件后，通常需要\*\*重启思源笔记\*\*才能使插件完全生效。

## 示例

```javascript
// 假设要安装名为 "awesome-plugin" 的插件
const repo = "https://github.com/user/siyuan-awesome-plugin";
const hash = "fedcba9876543210"; // 要安装的版本哈希
const pkgName = "awesome-plugin";

// **再次警告：执行此代码会实际安装插件，请确保来源可信！**
fetch('/api/bazaar/installBazaarPlugin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token YOUR_API_TOKEN' // 替换为你的管理员 API Token
  },
  body: JSON.stringify({
    repoURL: repo,
    repoHash: hash,
    packageName: pkgName,
    frontend: "desktop",
    keyword: "" // keyword 通常可以留空
  })
})
.then(response => response.json())
.then(data => {
  if (data.code === 0) {
    console.log('插件安装请求成功，后台正在处理... 可能需要重启思源笔记生效。');
    // 可以根据需要处理返回的 packages 数据，例如刷新界面
  } else {
    console.error('插件安装失败:', data.msg);
    // 向用户显示错误信息 data.msg
  }
})
.catch(error => console.error('请求错误:', error));
```

复制

### 实际应用案例 / Who Uses This API?

如果你的外部工具使用了这个 API 来管理插件安装，欢迎提交 Pull Request 将你的项目添加到下方列表！

-   暂无 （期待你的贡献！）
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
