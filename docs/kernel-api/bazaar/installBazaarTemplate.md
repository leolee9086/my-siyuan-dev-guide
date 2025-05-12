---
title: installBazaarTemplate
---
# 端点

/api/bazaar/installBazaarTemplate

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# installBazaarTemplate

从集市下载并安装指定的模板。

**新手提示：** 这个 API 就是你在思源集市里点击模板"安装"按钮时背后执行的操作。

**⚠️ 风险警告！请仔细阅读！ ⚠️**

-   安装模板通常比安装插件风险低，但仍需谨慎。模板文件（如 `template.json`）可能包含执行脚本，或者模板可能加载外部资源。
-   **请仅安装来自你信任的开发者的模板！**
-   恶意或编写拙劣的模板可能引入不必要的脚本、跟踪代码，或导致显示问题。
-   此操作会从网络下载文件并在本地文件系统 (\`data/templates/\`) 中进行安装。
-   需要\*\*管理员权限\*\*并且不能在\*\*只读模式\*\*下运行。
-   安装过程可能因网络、仓库或模板本身的问题而失败。

**请确认来源可靠后再进行安装！**

**注意**: 此 API 需要认证、管理员权限且非只读模式。

## 地址

`POST /api/bazaar/installBazaarTemplate`

## 请求体 (JSON)

```json
{
  "repoURL": "模板的 Git 仓库地址",
  "repoHash": "仓库特定提交的哈希值",
  "packageName": "模板名称",
  "keyword": "可选的关键词"
}
```

-   `repoURL`: (`string`) 必填。模板的来源 Git 仓库 URL。通常从 `getBazaarTemplate` API 获取。
-   `repoHash`: (`string`) 必填。仓库的特定 commit 哈希值，代表要安装的版本。通常从 `getBazaarTemplate` API 获取。
-   `packageName`: (`string`) 必填。要安装的模板的名称。
-   `keyword`: (`string`) 可选。用于安装成功后刷新集市模板列表时的过滤，对安装操作本身影响不大。可以留空。

## 响应体 (JSON)

安装请求成功后，返回标准响应体，\`data\` 字段包含刷新后的集市模板列表。

```json
{
  "code": 0, // 0 表示安装任务启动成功
  "msg": "", // 成功时为空，失败时包含错误信息
  "data": {
    "packages": [
      // 安装后刷新得到的 *所有* 集市可用模板列表 (针对指定 keyword)...
      // (结构同 getBazaarTemplate 返回的 packages)
    ]
  }
}
```

**注意:**

-   `code: 0` 仅表示后端接受了安装请求。实际下载和安装过程可能失败。
-   如果安装失败，`code` 会是非 0 值，`msg` 会包含错误信息。
-   安装模板后，通常需要刷新相关界面或重启思源才能看到效果。

## 示例

```javascript
// 假设要安装名为 "clean-template" 的模板
const repo = "https://github.com/user/siyuan-clean-template";
const hash = "abc123def456"; // 要安装的版本哈希
const pkgName = "clean-template";

// **警告：执行此代码会实际安装模板！**
fetch('/api/bazaar/installBazaarTemplate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token YOUR_API_TOKEN' // 替换为你的管理员 API Token
  },
  body: JSON.stringify({
    repoURL: repo,
    repoHash: hash,
    packageName: pkgName,
    keyword: "" // keyword 通常可以留空
  })
})
.then(response => response.json())
.then(data => {
  if (data.code === 0) {
    console.log('模板安装请求成功，后台正在处理...');
    // 可以根据需要处理返回的 packages 数据，例如刷新界面
  } else {
    console.error('模板安装失败:', data.msg);
    // 向用户显示错误信息 data.msg
  }
})
.catch(error => console.error('请求错误:', error));
```

复制

### 实际应用案例 / Who Uses This API?

如果你的外部工具使用了这个 API 来管理模板安装，欢迎提交 Pull Request 将你的项目添加到下方列表！

-   暂无 （期待你的贡献！）
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
