---
title: installBazaarWidget
---
# 端点

/api/bazaar/installBazaarWidget

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# installBazaarWidget

从集市下载并安装指定的挂件 (Widget)。

**新手提示：** 这个 API 主要供**第三方工具开发者或有特殊自动化需求的开发者**使用。普通用户通过思源笔记界面直接操作集市通常更方便和安全。此 API 模拟了在思源集市界面点击挂件"安装"按钮时的后端操作。

**🚨🚨🚨 严重风险警告！请务必仔细阅读并充分理解！ 🚨🚨🚨**

-   安装挂件是\*\*高风险操作\*\*！挂件代码（通常是 HTML/CSS/JavaScript）可以访问你的笔记数据、执行任意脚本，甚至可能连接互联网。
-   **请仅安装来自你完全信任的、声誉良好的开发者的挂件！** 在安装前尽可能了解挂件的功能和来源。
-   恶意或编写拙劣的挂件可能导致\*\*数据泄露、性能问题、界面卡死、甚至安全风险\*\*！
-   此操作会从网络下载代码并在本地文件系统 (\`data/widgets/\`) 中执行安装。
-   需要\*\*管理员权限\*\*并且不能在\*\*只读模式\*\*下运行。
-   安装过程可能因网络、仓库或挂件本身的问题而失败。

**请务必在完全理解风险并信任挂件来源的情况下才执行此操作！后果自负！如果您不确定挂件的安全性，请绝对不要安装！**

**注意**: 此 API 需要认证、**管理员权限**且**非只读模式**。

## 地址

`POST /api/bazaar/installBazaarWidget`

## 请求体 (JSON)

```json
{
  "repoURL": "挂件的 Git 仓库地址",
  "repoHash": "仓库特定提交的哈希值",
  "packageName": "挂件名称",
  "keyword": "可选的关键词"
}
```

-   `repoURL`: (`string`) **必填**。挂件的来源 Git 仓库 URL。通常从 `getBazaarWidget` API 获取。
-   `repoHash`: (`string`) **必填**。仓库的特定 commit 哈希值，代表要安装的版本。通常从 `getBazaarWidget` API 获取。
-   `packageName`: (`string`) **必填**。要安装的挂件的名称。
-   `keyword`: (`string`) **可选**。此关键词用于在安装成功后，API 返回的刷新后的集市挂件列表中进行过滤。如果主要目的是安装挂件而非立即获取特定过滤条件的列表，此参数可以留空或省略。它对实际的安装过程没有直接影响。

## 响应体 (JSON)

安装请求成功后，返回标准响应体，`data` 字段包含刷新后的集市挂件列表（会应用请求中的 `keyword` 进行过滤）。

```json
{
  "code": 0, // 0 表示安装任务启动成功
  "msg": "", // 成功时为空，失败时包含错误信息
  "data": {
    "packages": [
      // 安装后刷新得到的 *所有* 集市可用挂件列表 (如果请求中提供了 keyword，则会基于此 keyword 过滤)。
      // 调用方可以使用此列表更新其界面，而无需再次调用 getBazaarWidget。
      // (结构同 getBazaarWidget 返回的 packages)
    ]
  }
}
```

**注意:**

-   `code: 0` 仅表示后端已成功接收并开始处理安装请求。实际的下载和安装过程仍然可能因为网络问题、仓库问题或挂件本身的问题而失败。
-   如果安装失败（例如，下载失败、解压失败、写入文件失败等），`code` 会是非 0 值，`msg` 会包含具体的错误信息。
-   安装挂件后，思源笔记可能需要刷新挂件列表或重启相关文档才能正确加载和显示新安装的挂件。

## 示例

```javascript
// 假设要安装名为 "simple-clock-widget" 的挂件
const repo = "https://github.com/user/siyuan-simple-clock";
const hash = "aabbccddeeff"; // 要安装的版本哈希
const pkgName = "simple-clock-widget";

// **再次警告：执行此代码会实际安装挂件，请确保来源可信！**
fetch('/api/bazaar/installBazaarWidget', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token YOUR_API_TOKEN' // 替换为你的管理员 API Token
  },
  body: JSON.stringify({
    repoURL: repo,
    repoHash: hash,
    packageName: pkgName,
    keyword: ""
  })
})
.then(response => response.json())
.then(data => {
  if (data.code === 0) {
    console.log('挂件安装请求成功，后台正在处理...');
    // 可以根据需要处理返回的 packages 数据，例如刷新界面
  } else {
    console.error('挂件安装失败:', data.msg);
    // 向用户显示错误信息 data.msg
  }
})
.catch(error => {
    console.error('请求发起失败:', error);
    // 此处通常是网络问题或API服务未运行，提示用户检查网络连接和API服务状态
});
```

复制

### 实际应用案例 / Who Uses This API?

如果你的外部工具使用了这个 API 来管理挂件安装，欢迎提交 Pull Request 将你的项目添加到下方列表！

-   暂无 （期待你的贡献！）
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
