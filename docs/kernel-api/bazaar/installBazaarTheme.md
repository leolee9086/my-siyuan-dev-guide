---
title: installBazaarTheme
---
# 端点

/api/bazaar/installBazaarTheme

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# installBazaarTheme

从集市下载并安装指定的主题。

**新手提示：** 这个 API 就是你在思源集市里点击主题"安装"按钮时背后执行的操作。

**⚠️ 风险警告！请仔细阅读！ ⚠️**

-   安装主题风险相对较低，但主题（主要是 CSS 文件，也可能包括 `theme.json` 中的配置或少量脚本）仍可能影响界面显示或加载外部资源。
-   **请仅安装来自你信任的开发者的主题！**
-   恶意或编写拙劣的主题可能导致界面错乱、性能问题或引入不必要的外部连接。
-   此操作会从网络下载文件并在本地文件系统 (\`conf/appearance/themes/\` 或 \`data/themes/\`) 中进行安装。
-   需要\*\*管理员权限\*\*并且不能在\*\*只读模式\*\*下运行。
-   安装过程可能因网络、仓库或主题本身的问题而失败。

**请确认来源可靠后再进行安装！**

**‼️ 重要行为注意 ‼️**

成功安装集市主题后，此 API 会自动修改你的外观设置，将 **"外观 -> 跟随操作系统" 选项关闭** (\`appearance.modeOS\` 设置为 \`false\`)，并保存配置。这是为了确保新安装的主题能够被正确应用，而不是被系统模式覆盖。

**注意**: 此 API 需要认证、管理员权限且非只读模式。

## 地址

`POST /api/bazaar/installBazaarTheme`

## 请求体 (JSON)

```json
{
  "repoURL": "主题的 Git 仓库地址",
  "repoHash": "仓库特定提交的哈希值",
  "packageName": "主题名称",
  "mode": 0, // 0: 亮色, 1: 暗色
  "update": false, // 可选, 是否为更新操作, 默认为 false
  "keyword": "" // 可选的关键词
}
```

-   `repoURL`: (`string`) 必填。主题的来源 Git 仓库 URL。通常从 `getBazaarTheme` API 获取。
-   `repoHash`: (`string`) 必填。仓库的特定 commit 哈希值，代表要安装的版本。通常从 `getBazaarTheme` API 获取。
-   `packageName`: (`string`) 必填。要安装的主题的名称。
-   `mode`: (`number`) 必填。指定主题模式，`0` 表示亮色 (light)，`1` 表示暗色 (dark)。
-   `update`: (`boolean`) 可选。如果为 \`true\`，表示这是一个更新操作。默认为 \`false\`。
-   `keyword`: (`string`) 可选。用于安装成功后刷新集市主题列表时的过滤，对安装操作本身影响不大。可以留空。

## 响应体 (JSON)

安装请求成功后，返回标准响应体，\`data\` 字段包含刷新后的集市主题列表和更新后的外观设置。

```json
{
  "code": 0, // 0 表示安装任务启动成功
  "msg": "", // 成功时为空，失败时包含错误信息
  "data": {
    "packages": [
      // 安装后刷新得到的 *所有* 集市可用主题列表 (针对指定 keyword)...
      // (结构同 getBazaarTheme 返回的 packages)
    ],
    "appearance": { 
      // 更新后的外观设置对象 (结构同 /api/system/getConf 返回的 appearance 部分)
      // 注意：modeOS 会被设为 false
    }
  }
}
```

**注意:**

-   `code: 0` 仅表示后端接受了安装请求。实际下载和安装过程可能失败。
-   如果安装失败，`code` 会是非 0 值，`msg` 会包含错误信息。
-   成功安装后，通常需要刷新界面或重启思源才能看到完整的主题效果。
-   成功安装后，**用户的"跟随操作系统"外观模式会被关闭**。

## 示例

```javascript
// 假设要安装名为 "cool-dark-theme" 的暗色主题
const repo = "https://github.com/user/siyuan-cool-dark-theme";
const hash = "fedcba98765"; // 要安装的版本哈希
const pkgName = "cool-dark-theme";

// **警告：执行此代码会实际安装主题并修改外观设置！**
fetch('/api/bazaar/installBazaarTheme', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token YOUR_API_TOKEN' // 替换为你的管理员 API Token
  },
  body: JSON.stringify({
    repoURL: repo,
    repoHash: hash,
    packageName: pkgName,
    mode: 1, // 1 表示安装暗色模式
    update: false,
    keyword: ""
  })
})
.then(response => response.json())
.then(data => {
  if (data.code === 0) {
    console.log('主题安装请求成功，后台正在处理...');
    console.log('外观设置已更新:', data.data.appearance);
    // 可以根据需要处理返回的 packages 数据，例如刷新界面
  } else {
    console.error('主题安装失败:', data.msg);
    // 向用户显示错误信息 data.msg
  }
})
.catch(error => console.error('请求错误:', error));
```

复制

### 实际应用案例 / Who Uses This API?

如果你的外部工具使用了这个 API 来管理主题安装，欢迎提交 Pull Request 将你的项目添加到下方列表！

-   暂无 （期待你的贡献！）
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
