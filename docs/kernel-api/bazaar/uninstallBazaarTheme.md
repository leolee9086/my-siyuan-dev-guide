---
title: 卸载集市主题
---
# 端点

/api/bazaar/uninstallBazaarTheme

# 卸载集市主题

需要认证 需要管理员权限 非只读模式

## 接口描述

卸载指定的集市主题。

**🚨🚨🚨 严重警告：文件删除操作！ 🚨🚨🚨**

-   此操作将\*\*永久删除\*\*本地文件系统中的主题文件 (\`conf/appearance/themes/\`)！
-   \*\*请务必确认你要卸载的是正确的主题！一旦删除，通常无法恢复！\*\*
-   卸载正在使用的主题可能会导致界面样式异常。
-   需要\*\*管理员权限\*\*并且不能在\*\*只读模式\*\*下运行。
-   卸载过程可能因文件权限等问题失败。

**操作前请三思！确认无误后再执行！**

## 实现

-   后端路由: [siyuan/kernel/api/router.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/router.go)
-   处理函数: [siyuan/kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) (`uninstallBazaarTheme` 函数)
-   核心逻辑: [siyuan/kernel/model/bazzar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/bazzar.go) (`UninstallBazaarTheme` 函数)

## 请求体 (JSON)

```json
{
  "packageName": "要卸载的主题名称",
  "keyword": "可选的关键词"
}
```

-   `packageName`: (`string`) 必填。要卸载的主题的名称。通常从 `getInstalledTheme` API 获取。
-   `keyword`: (`string`) 可选。用于卸载成功后刷新集市主题列表时的过滤。可以留空。

## 响应体 (JSON)

卸载请求成功后，返回标准响应体，\`data\` 字段包含刷新后的集市主题列表和更新后的外观设置。

```json
{
  "code": 0, // 0 表示卸载成功
  "msg": "", // 成功时为空，失败时包含错误信息
  "data": {
    "packages": [
      // 卸载后刷新得到的 *所有* 集市可用主题列表 (针对指定 keyword)...
      // (结构同 getBazaarTheme 返回的 packages)
    ],
    "appearance": { 
      // 更新后的外观设置对象 (结构同 /api/system/getConf 返回的 appearance 部分)
    }
  }
}
```

**注意:**

-   如果 `packageName` 不存在或卸载失败，`code` 将为非 0 值，`msg` 包含错误信息。
-   如果卸载的主题是当前正在使用的亮色或暗色主题，卸载后会自动切换回默认主题。

请求示例

返回示例

### 请求示例

```json
{
  "packageName": "theme-name-to-uninstall",
  "keyword": ""
}
```

### 返回示例 (成功)

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "packages": [
      // ... updated list of available themes ...
    ],
    "appearance": { 
      // ... updated appearance settings ...
    }
  }
}
```

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
