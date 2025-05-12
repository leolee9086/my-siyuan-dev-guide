---
title: setKeymap
---
# 端点

/api/setting/setKeymap

# 思源笔记 API 文档

[返回首页](../index.html)

## /api/setting/setKeymap

POST /api/setting/setKeymap

### 认证与权限

需要用户认证 (`model.CheckAuth`)。

需要管理员权限 (`model.CheckAdminRole`)。

接口会检查只读模式 (`model.CheckReadonly`)，在只读模式下可能无法进行设置。

### 接口描述

用于设置和更新思源笔记的全局快捷键配置。

成功设置后，新的快捷键配置将立即生效。此操作会修改 `conf.json` 文件中的 `keymap` 部分。

### 请求体 (Request Body)

请求体为一个 JSON 对象，其中包含一个名为 `data` 的字段。`data` 字段的值是一个 `map[string]interface{}` 类型的对象，代表了完整的快捷键映射配置。

这个映射的键通常是快捷键的功能分类（如 `"general"`, `"editor"`, `"fileTree"` 等），值是另一个映射，其中键是具体的操作命令（如 `"riffCard"`, `"undo"`），值是对应的快捷键组合字符串（如 `"⌘F1"`, `"Ctrl+Z"`）。

具体的键名和结构可能会随着思源笔记版本的更新而变化，建议通过 [/api/system/getConf](../system/getConf.html) 接口获取当前的完整配置作为参考。

**请求体示例 (JSON):**

```json
{
    "data": {
        "general": {
            "riffCard": "⌘F1",
            "lockScreen": "⌘L",
            "dailyNote": "⌘⇧N",
            "selectFile": "⌘P",
            "newFile": "⌘N",
            "saveFile": "⌘S",
            "closeTab": "⌘W",
            "syncNow": "⌘⇧S",
            "toggleDock": "⌘1",
            "toggleOutline": "⌘2",
            "toggleBacklinks": "⌘3",
            "toggleGraphView": "⌘4",
            "toggleBookmark": "⌘5",
            "toggleTag": "⌘6",
            "toggleGlobalGraph": "⌘7",
            "goToNextTab": "Control+Tab",
            "goToPreviousTab": "Control+Shift+Tab",
            "search": "⌘⇧F"
        },
        "editor": {
            "undo": "⌘Z",
            "redo": "⌘⇧Z",
            "bold": "⌘B",
            "italic": "⌘I",
            "underline": "⌘U",
            "strikethrough": "⌘⇧X",
            "inlineCode": "⌘E",
            "inlineMath": "⌘M",
            "clearInlineFormat": "⌘\\\\",
            "copyBlockRef": "⌘⇧C",
            "copyPlainText": "⌘⇧V",
            "jumpToParentBlock": "Escape",
            "quickMakeCard": "Alt+Q",
            "quickMakeList": "Alt+L",
            "quickMakeSuperBlock": "Alt+S",
            "quickMakeDoc": "Alt+D",
            "quickMakeHeading": "Alt+H"
        }
        // ... 可能还有其他分类，如 fileTree, graphView 等
    }
}
```

### 响应体 (Response Body)

响应体为标准的思源笔记 API 返回结构：

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

其中：

-   `code`: 错误码，`0` 表示成功，其他值表示失败。
-   `msg`: 错误信息，成功时为空字符串。
-   `data`: 成功时为 `null`。

### 接口调用示例 (JavaScript)

假设我们想修改"闪卡"的快捷键为 "Alt+Shift+F"。

复制代码

```javascript
async function setCustomKeymap() {
    // 首先，最好从 /api/system/getConf 获取当前的 keymap
    let currentKeymap = {}; // 假设这是从 getConf 获取到的 keymap.general 和 keymap.editor 等
    try {
        const response = await fetch('/api/system/getConf');
        const result = await response.json();
        if (result.code === 0 && result.data && result.data.conf && result.data.conf.keymap) {
            currentKeymap = JSON.parse(JSON.stringify(result.data.conf.keymap)); // 深拷贝
        } else {
            console.error("无法获取当前快捷键配置:", result.msg);
            // 可以选择使用一个预设的默认结构或提示用户
        }
    } catch (error) {
        console.error("获取当前快捷键配置失败:", error);
        // 处理网络错误等
    }

    // 更新或添加快捷键
    if (!currentKeymap.general) {
        currentKeymap.general = {};
    }
    currentKeymap.general.riffCard = "Alt+Shift+F"; // 修改闪卡的快捷键

    const requestBody = {
        data: currentKeymap
    };

    try {
        const response = await fetch('/api/setting/setKeymap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Token YOUR_API_TOKEN' // 如果API Token已设置
            },
            body: JSON.stringify(requestBody)
        });
        const result = await response.json();

        if (result.code === 0) {
            console.log('快捷键设置成功:', result);
            alert('快捷键已成功更新！');
        } else {
            console.error('快捷键设置失败:', result.msg);
            alert('快捷键设置失败: ' + result.msg);
        }
    } catch (error) {
        console.error('请求 /api/setting/setKeymap 失败:', error);
        alert('请求失败: ' + error);
    }
}

// setCustomKeymap(); // 调用函数
```

**注意:** 上述示例中的 `currentKeymap` 获取逻辑是为了保证基于现有配置进行修改。如果直接发送一个不完整的 `data` 对象，可能会覆盖掉其他未包含的快捷键设置。

### 在线测试

你可以使用下面的表单来测试此 API。首先，建议点击"加载当前配置"按钮来填充当前的快捷键设置，然后再进行修改。

快捷键配置 (JSON, data 字段的内容):

加载当前配置 发送请求

© 2023-2025 思源笔记. All rights reserved.
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
