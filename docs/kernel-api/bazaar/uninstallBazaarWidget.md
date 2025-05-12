---
title: 卸载集市挂件
---
# 端点

/api/bazaar/uninstallBazaarWidget

# 卸载集市挂件

需要认证 需要管理员权限 非只读模式

## 接口描述

卸载指定的集市挂件。

**🚨🚨🚨 严重警告：文件删除操作！ 🚨🚨🚨**

-   此操作将\*\*永久删除\*\*本地文件系统中的挂件文件 (\`data/widgets/\`)！
-   \*\*请务必确认你要卸载的是正确的挂件！一旦删除，通常无法恢复！\*\*
-   需要\*\*管理员权限\*\*并且不能在\*\*只读模式\*\*下运行。
-   卸载过程可能因文件权限等问题失败。

**操作前请三思！确认无误后再执行！**

## 请求体 (JSON)

```json
{
  "packageName": "要卸载的挂件名称",
  "keyword": "可选的关键词"
}
```

-   `packageName`: (`string`) 必填。要卸载的挂件的名称。通常从 `getInstalledWidget` API 获取。
-   `keyword`: (`string`) 可选。用于卸载成功后刷新集市挂件列表时的过滤。可以留空。

## 响应体 (JSON)

卸载请求成功后，返回标准响应体，\`data\` 字段包含刷新后的集市挂件列表。

```json
{
  "code": 0, // 0 表示卸载成功
  "msg": "", // 成功时为空，失败时包含错误信息
  "data": {
    "packages": [
      // 卸载后刷新得到的 *所有* 集市可用挂件列表 (针对指定 keyword)...
      // (结构同 getBazaarWidget 返回的 packages)
    ]
  }
}
```

**注意:**

-   如果 `packageName` 不存在或卸载失败，`code` 将为非 0 值，`msg` 包含错误信息。

## 实现链接

-   后端路由: [siyuan/kernel/api/router.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/router.go)
-   处理函数: [siyuan/kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) (`uninstallBazaarWidget` 函数)
-   核心逻辑: [siyuan/kernel/model/bazzar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/bazzar.go) (`UninstallBazaarWidget` 函数)

请求示例

返回示例

### 请求示例

```json
{
  "packageName": "widget-name-to-uninstall",
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
      // ... updated list of available widgets ...
    ]
  }
}
```

