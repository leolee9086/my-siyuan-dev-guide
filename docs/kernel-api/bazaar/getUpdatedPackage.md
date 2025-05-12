---
title: getUpdatedPackage
---
# 端点

/api/bazaar/getUpdatedPackage

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# getUpdatedPackage

获取所有已安装的集市包（插件、挂件、图标、主题、模板）中需要更新的列表。

**新手提示：** 这个 API 相当于点击了思源笔记设置里的"检查集市包更新"按钮。它会告诉你哪些你已经安装的东西有新版本了，方便你及时更新。

**注意**:

-   此 API 需要认证。
-   这个 API 返回的是**需要更新**的包列表，不是所有已安装的包。
-   结果的准确性依赖于之前是否成功调用了 `batchUpdatePackage` 来刷新本地的集市信息。建议在调用此 API 前先调用 `batchUpdatePackage`。

## 地址

`POST /api/bazaar/getUpdatedPackage`

## 请求体 (JSON)

```json
{
  "frontend": "前端类型"
}
```

-   `frontend`: (`string`) 必填。指定要检查哪个前端平台的更新，通常是 `"desktop"` 或 `"mobile"`。

## 响应体 (JSON)

标准响应体，\`data\` 字段是一个对象，包含了各类需要更新的包列表。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "plugins": [
        // 需要更新的插件包对象数组...
        // 每个对象结构类似 getInstalledPlugin 返回的，但可能包含最新版本信息
    ],
    "widgets": [
        // 需要更新的挂件包对象数组...
    ],
    "icons": [
        // 需要更新的图标包对象数组...
    ],
    "themes": [
        // 需要更新的主题包对象数组...
    ],
    "templates": [
        // 需要更新的模板包对象数组...
    ]
  }
}
```

**注意:**

-   每个数组（如 \`plugins\`, \`themes\` 等）中对象的具体字段取决于后端 \`model.UpdatedPackages\` 函数的实现，通常会包含包名、当前版本、可更新版本、仓库信息等。
-   如果某个类型的包都没有更新，对应的数组会是空的 \`\[\]\`。

## 示例

```javascript
// 检查桌面端有哪些集市包需要更新
fetch('/api/bazaar/getUpdatedPackage', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token YOUR_API_TOKEN' // 替换为你的 API Token
  },
  body: JSON.stringify({ frontend: "desktop" })
})
.then(response => response.json())
.then(data => {
  if (data.code === 0) {
    console.log('获取需要更新的包列表成功:', data.data);
    const updates = data.data;
    if (updates.plugins.length > 0) {
      console.log(`有 ${updates.plugins.length} 个插件需要更新`);
      // 处理插件更新提示
    }
    if (updates.themes.length > 0) {
      console.log(`有 ${updates.themes.length} 个主题需要更新`);
      // 处理主题更新提示
    }
    // ... 检查其他类型的包 ...
    if (updates.plugins.length === 0 && updates.widgets.length === 0 && updates.icons.length === 0 && updates.themes.length === 0 && updates.templates.length === 0) {
        console.log("所有已安装的集市包都已是最新版本！");
    }
  } else {
    console.error('获取需要更新的包列表失败:', data.msg);
  }
})
.catch(error => console.error('请求错误:', error));
```

复制

### 实际应用案例 / Who Uses This API?

如果你的插件、主题或外部工具使用了这个 API（例如，实现了一个自动检查更新的功能），欢迎提交 Pull Request 将你的项目添加到下方列表！

-   暂无 （期待你的贡献！）
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
