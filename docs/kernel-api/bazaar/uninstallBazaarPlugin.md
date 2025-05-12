---
title: uninstallBazaarPlugin
---
# 端点

/api/bazaar/uninstallBazaarPlugin

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# uninstallBazaarPlugin

卸载指定的插件。

**新手提示：** 这个 API 就是你在思源插件管理界面点击"卸载"按钮时背后执行的操作。

**🚨🚨🚨 极度严重警告：代码和文件删除操作！ 🚨🚨🚨**

-   此操作将\*\*永久删除\*\*本地文件系统中的插件文件夹 (\`data/plugins/\`) 及其包含的所有代码和数据！
-   **请务必再三确认你要卸载的是正确的插件！一旦删除，无法恢复！**
-   卸载插件会移除其所有功能。如果其他插件或你的工作流依赖此插件，可能会导致错误或数据处理中断！
-   需要\*\*管理员权限\*\*并且不能在\*\*只读模式\*\*下运行。
-   卸载过程可能因文件权限等问题失败。

**除非你 100% 清楚后果，否则绝对不要执行此操作！**

**注意**: 此 API 需要认证、管理员权限且非只读模式。

## 地址

`POST /api/bazaar/uninstallBazaarPlugin`

## 请求体 (JSON)

```json
{
  "packageName": "要卸载的插件名称",
  "frontend": "适用的前端 (如 desktop)",
  "keyword": "可选的关键词"
}
```

-   `packageName`: (`string`) 必填。要卸载的插件的名称。通常从 `getInstalledPlugin` API 获取。
-   `frontend`: (`string`) 必填。需要指定前端，例如 `"desktop"` 或 `"mobile"`。用于卸载成功后刷新对应前端的插件列表。
-   `keyword`: (`string`) 可选。用于卸载成功后刷新集市插件列表时的过滤。可以留空。

## 响应体 (JSON)

卸载请求成功后，返回标准响应体，\`data\` 字段包含刷新后的集市插件列表。

```json
{
  "code": 0, // 0 表示卸载成功
  "msg": "", // 成功时为空，失败时包含错误信息
  "data": {
    "packages": [
      // 卸载后刷新得到的 *所有* 集市可用插件列表 (针对指定 frontend 和 keyword)...
      // (结构同 getBazaarPlugin 返回的 packages)
    ]
  }
}
```

**注意:**

-   如果卸载失败 (例如，插件不存在或文件删除失败)，`code` 会是非 0 值，`msg` 会包含错误信息。
-   成功卸载后，插件的功能将完全消失。通常需要重启思源或至少重新加载界面才能完全移除插件的影响。

## 示例

```javascript
// 假设要卸载名为 "sample-plugin" 的插件
const pkgName = "sample-plugin";
const targetFrontend = "desktop";

// **!!! 核警告：执行此代码会实际删除插件代码和文件 !!!**
// **!!! 请确保你理解全部风险并已备份数据 !!!**

// 示例：添加多重确认
if (prompt(`风险操作确认：请输入要卸载的插件名称 "${pkgName}" 以继续。`) === pkgName) {
  if (confirm(`【最终警告】即将永久删除插件 "${pkgName}" 的所有文件！\n\n确定吗？此操作无法撤销！`)) {
    fetch('/api/bazaar/uninstallBazaarPlugin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token YOUR_API_TOKEN' // 替换为你的管理员 API Token
      },
      body: JSON.stringify({
        packageName: pkgName,
        frontend: targetFrontend,
        keyword: ""
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.code === 0) {
        console.log(`插件 "${pkgName}" 卸载成功。`);
        // 可能需要提示用户重启思源
      } else {
        console.error(`插件 "${pkgName}" 卸载失败:`, data.msg);
      }
    })
    .catch(error => console.error('请求错误:', error));
  } else {
    console.log('取消卸载操作。');
  }
} else {
  console.log('插件名称输入错误或取消卸载操作。');
}
```

复制

### 实际应用案例 / Who Uses This API?

如果你的外部工具使用了这个 API 来管理插件卸载，欢迎提交 Pull Request 将你的项目添加到下方列表！

-   暂无 （期待你的贡献！）
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
