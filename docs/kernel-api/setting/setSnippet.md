---
title: setSnippet
---
# 端点

/api/setting/setSnippet

# 思源笔记 API 文档

[返回首页](../index.html)

## /api/setting/setSnippet

POST /api/setting/setSnippet

### 认证与权限

需要用户认证 (`model.CheckAuth`)。

需要管理员权限 (`model.CheckAdminRole`)。

接口会检查只读模式 (`model.CheckReadonly`)，在只读模式下无法进行设置更改。

### 接口描述

用于设置思源笔记中代码片段的全局启用状态。通过此接口可以统一控制所有自定义 CSS 和 JavaScript 代码片段是否生效。

此操作会修改 `conf.json` 文件中的 `snippet` 部分的 `enabledCSS` 和 `enabledJS` 字段。

**注意:** 此接口仅控制全局的启用/禁用开关。单个代码片段的添加、修改、删除和启用状态管理是通过 [/api/snippet/setSnippet](../snippet/setSnippet.html) (管理列表) 和 [/api/snippet/getSnippet](../snippet/getSnippet.html) (获取列表) 等接口完成的。

### 请求体 (Request Body)

请求体为一个 JSON 对象，代表全局的代码片段启用配置 (`conf.Snpt`)。

| 参数 | 类型 | 必需 | 描述 | 默认值 (来自 `NewSnpt()`) |
| --- | --- | --- | --- | --- |
| `enabledCSS` | boolean | 是 | 是否全局启用所有自定义 CSS 代码片段。 | `true` |
| `enabledJS` | boolean | 是 | 是否全局启用所有自定义 JavaScript 代码片段。 | `true` |

**请求体示例 (JSON):**

```json
{
    "enabledCSS": true,
    "enabledJS": false // 例如，保持 CSS 启用，但禁用 JS
}
```

### 响应体 (Response Body)

响应体为标准的思源笔记 API 返回结构：

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "enabledCSS": true,
        "enabledJS": false
    }
}
```

其中：

-   `code`: 错误码，`0` 表示成功。
-   `msg`: 错误信息，成功时为空字符串。
-   `data`: 成功时，返回更新后的 `conf.Snpt` 对象，包含当前的全局启用状态。

### 接口调用示例 (JavaScript)

复制代码

```javascript
async function updateGlobalSnippetSettings(enableCSS, enableJS) {
    const settings = {
        enabledCSS: enableCSS,
        enabledJS: enableJS
    };

    try {
        const response = await fetch('/api/setting/setSnippet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Token YOUR_API_TOKEN' // 如果API Token已设置
            },
            body: JSON.stringify(settings)
        });
        const result = await response.json();

        if (result.code === 0) {
            console.log('全局代码片段启用状态更新成功:', result.data);
            alert(`CSS 片段: ${result.data.enabledCSS}, JS 片段: ${result.data.enabledJS}`);
        } else {
            console.error('更新失败:', result.msg);
            alert('更新失败: ' + result.msg);
        }
    } catch (error) {
        console.error('请求 /api/setting/setSnippet 失败:', error);
        alert('请求失败: ' + error);
    }
}

// 示例调用：启用 CSS，禁用 JS
// updateGlobalSnippetSettings(true, false);

// 示例调用：全部启用
// updateGlobalSnippetSettings(true, true);
```

### 在线测试

你可以使用下面的表单来测试此 API。建议先通过 [/api/system/getConf](../system/getConf.html) 获取当前配置，查看 `snippet` 部分的当前值。

全局启用 CSS 片段: 

全局启用 JS 片段: 

加载当前配置 发送请求

© 2023-2025 思源笔记. All rights reserved.
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
