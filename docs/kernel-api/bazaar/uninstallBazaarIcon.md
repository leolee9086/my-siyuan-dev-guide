---
title: uninstallBazaarIcon
---
# 端点

/api/bazaar/uninstallBazaarIcon

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# uninstallBazaarIcon

卸载指定的图标包。

**新手提示：** 这个 API 就是你在思源集市里点击已安装图标包的"卸载"按钮时背后执行的操作。

**🚨🚨🚨 严重警告：文件删除操作！ 🚨🚨🚨**

-   此操作将\*\*永久删除\*\*本地文件系统中的图标包文件 (\`data/widgets/\`)！
-   \*\*请务必确认你要卸载的是正确的图标包！一旦删除，通常无法恢复！\*\*
-   卸载正在使用的图标包可能会导致界面图标显示异常。
-   需要\*\*管理员权限\*\*并且不能在\*\*只读模式\*\*下运行。
-   卸载过程可能因文件权限等问题失败。

**操作前请三思！确认无误后再执行！**

**注意**: 此 API 需要认证、管理员权限且非只读模式。

## 地址

`POST /api/bazaar/uninstallBazaarIcon`

## 请求体 (JSON)

```json
{
  "packageName": "要卸载的图标包名称",
  "keyword": "可选的关键词"
}
```

-   `packageName`: (`string`) 必填。要卸载的图标包的名称。通常从 `getInstalledIcon` API 获取。
-   `keyword`: (`string`) 可选。用于卸载成功后刷新集市图标包列表时的过滤。可以留空。

## 响应体 (JSON)

卸载请求成功后，返回标准响应体，\`data\` 字段包含刷新后的集市图标包列表和更新后的外观设置。

```json
{
  "code": 0, // 0 表示卸载成功
  "msg": "", // 成功时为空，失败时包含错误信息
  "data": {
    "packages": [
      // 卸载后刷新得到的 *所有* 集市可用图标包列表 (针对指定 keyword)...
      // (结构同 getBazaarIcon 返回的 packages)
    ],
    "appearance": { 
      // 更新后的外观设置对象 (结构同 /api/system/getConf 返回的 appearance 部分)
    }
  }
}
```

**注意:**

-   如果卸载失败 (例如，图标包不存在或文件删除失败)，`code` 会是非 0 值，`msg` 会包含错误信息。
-   成功卸载后，界面上的图标可能会恢复为默认状态。

## 示例

```javascript
// 假设要卸载名为 "cute-icons" 的图标包
const pkgName = "cute-icons";

// **!!! 极度危险：执行此代码会实际删除文件 !!!**
// **!!! 请确保你知道自己在做什么 !!!**

// 示例：添加二次确认
if (confirm(`你确定要卸载图标包 "${pkgName}" 吗？这将删除本地文件！`)) {
  if (confirm(`再次确认：真的要永久删除图标包 "${pkgName}" 吗？此操作无法撤销！`)) {
    fetch('/api/bazaar/uninstallBazaarIcon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token YOUR_API_TOKEN' // 替换为你的管理员 API Token
      },
      body: JSON.stringify({
        packageName: pkgName,
        keyword: ""
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.code === 0) {
        console.log(`图标包 "${pkgName}" 卸载成功。`);
        // 可以根据需要处理返回的 packages 和 appearance 数据
      } else {
        console.error(`图标包 "${pkgName}" 卸载失败:`, data.msg);
        // 向用户显示错误信息 data.msg
      }
    })
    .catch(error => console.error('请求错误:', error));
  } else {
    console.log('取消卸载操作。');
  }
} else {
  console.log('取消卸载操作。');
}
```

复制

### 实际应用案例 / Who Uses This API?

如果你的外部工具使用了这个 API 来管理图标包卸载，欢迎提交 Pull Request 将你的项目添加到下方列表！

-   暂无 （期待你的贡献！）
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
