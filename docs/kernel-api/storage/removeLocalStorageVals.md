---
title: 批量删除 LocalStorage 条目 (removeLocalStorageVals)
---
# 端点

/api/storage/removeLocalStorageVals

# 批量删除 LocalStorage 条目 (removeLocalStorageVals)

POST /api/storage/removeLocalStorageVals

## 认证与权限

需要身份验证 (通过 API Token)。

需要管理员权限。

此操作在只读模式下不可用。

## 接口描述

此接口用于从思源笔记的内部 LocalStorage (实际存储在 `data/storage/local-storage.json` 文件中) 批量删除一个或多个键值对。

成功删除后，会广播一个 `removeLocalStorageVals` 事件，通知其他客户端更新其 LocalStorage 状态 (不包括发起请求的客户端)。

## 请求体参数

请求体为一个 JSON 对象，包含以下字段：

| 参数 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| `keys` | string\[\] | 是 | 一个包含要删除的键名 (string) 的数组。 |
| `app` | string | 是 | 发起请求的应用/客户端的唯一标识符。用于事件广播时的排除。 |

## 请求体示例

```json
{
    "keys": ["myPluginSettings_v1", "someOldUserData", "temp_flag"],
    "app": "plugin-copilot-xxxxxxxxxxxx"
}
```

## 响应体说明

标准的思源笔记 API 响应结构：

```json
{
    "code": 0,     // 0 表示成功，非 0 表示失败
    "msg": "",      // 成功时为空，失败时为错误信息
    "data": null   // 成功时固定为 null
}
```

如果指定的键在 LocalStorage 中原本就不存在，操作通常也会被视为成功。错误主要指文件读写失败等情况。

## cURL 调用示例

```bash
curl -X POST \
  http://127.0.0.1:6806/api/storage/removeLocalStorageVals \
  -H 'Authorization: Token YOUR_API_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "keys": ["key_to_delete1", "key_to_delete2"],
    "app": "my_js_script_instance_123"
  }'
```

## JavaScript 调用示例

```javascript
async function removeLocalStorageItems(keysArray, appId) {
    const requestBody = {
        keys: keysArray,
        app: appId
    };

    try {
        const response = await fetch('/api/storage/removeLocalStorageVals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token YOUR_API_TOKEN' // 如果配置了API Token
            },
            body: JSON.stringify(requestBody)
        });
        const result = await response.json();

        if (result.code === 0) {
            console.log(`LocalStorage 条目 (${keysArray.join(", ")}) 删除成功。`);
            document.getElementById('apiResponse').textContent = `条目 (${keysArray.join(", ")}) 删除成功。`;
        } else {
            console.error('删除失败:', result.msg);
            document.getElementById('apiResponse').textContent = `错误 ${result.code}: ${result.msg}`;
        }
        return result;
    } catch (error) {
        console.error('请求过程中发生错误:', error);
        document.getElementById('apiResponse').textContent = `请求错误: ${error.message}`;
        return null;
    }
}

// 示例：
// const keysToRemove = ['plugin_setting_A', 'user_preference_X'];
// const currentAppId = 'my-plugin-unique-id-' + Date.now(); // 确保 app ID 唯一性以避免自己收到广播
// removeLocalStorageItems(keysToRemove, currentAppId);
```

## 在线测试

要删除的 Keys (逗号分隔): 

App ID: 

发送删除请求

### 响应:

此处将显示API的响应结果。

**提示:** 你可以先使用 [/api/storage/getLocalStorage](./getLocalStorage.html) (如果已存在文档) 或通过开发者工具查看当前的 LocalStorage 内容，以确定要删除的键。
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
