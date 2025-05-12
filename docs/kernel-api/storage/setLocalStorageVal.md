---
title: 设置 LocalStorage 条目 (setLocalStorageVal)
---
# 端点

/api/storage/setLocalStorageVal

# 设置 LocalStorage 条目 (setLocalStorageVal)

POST /api/storage/setLocalStorageVal

## 认证与权限

需要身份验证 (通过 API Token)。

需要管理员权限。

此操作在只读模式下不可用。

## 接口描述

此接口用于在思源笔记的内部 LocalStorage (实际存储在 `data/storage/local-storage.json` 文件中) 设置或更新一个键值对。

成功设置后，会广播一个 `setLocalStorageVal` 事件，通知其他客户端更新其 LocalStorage 状态 (不包括发起请求的客户端)。

## 请求体参数

请求体为一个 JSON 对象，包含以下字段：

| 参数 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| `key` | string | 是 | 要设置或更新的键名。 |
| `val` | any | 是 | 要设置的值。可以是任何有效的 JSON 类型 (字符串, 数字, 布尔, 数组, 对象)。 |
| `app` | string | 是 | 发起请求的应用/客户端的唯一标识符。用于事件广播时的排除。 |

## 请求体示例

设置一个简单的字符串值：

```json
{
    "key": "myPlugin_lastActiveTab",
    "val": "tab-settings",
    "app": "plugin-myPlugin-uniqueId-123"
}
```

设置一个对象值：

```json
{
    "key": "userPreferences_theme",
    "val": {
        "name": "Dark+",
        "fontSize": 14,
        "showLineNumbers": true
    },
    "app": "siyuan-desktop-main-window"
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

## cURL 调用示例

```bash
# 设置字符串值
curl -X POST \
  http://127.0.0.1:6806/api/storage/setLocalStorageVal \
  -H 'Authorization: Token YOUR_API_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "key": "plugin_test_flag",
    "val": "enabled",
    "app": "curl_test_session"
  }'

# 设置 JSON 对象值
curl -X POST \
  http://127.0.0.1:6806/api/storage/setLocalStorageVal \
  -H 'Authorization: Token YOUR_API_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "key": "complex_setting_example",
    "val": {"featureA": true, "featureB_threshold": 0.75, "tags": ["dev", "test"]},
    "app": "my_other_script"
  }'
```

## JavaScript 调用示例

```javascript
async function setSiyuanLocalStorageItem(key, value, appId) {
    const requestBody = {
        key: key,
        val: value,
        app: appId
    };

    try {
        const response = await fetch('/api/storage/setLocalStorageVal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token YOUR_API_TOKEN' // 如果配置了API Token
            },
            body: JSON.stringify(requestBody)
        });
        const result = await response.json();

        if (result.code === 0) {
            console.log(`LocalStorage 条目 "${key}" 设置成功。`);
            document.getElementById('apiResponse').textContent = `条目 "${key}" 已设置为: ${JSON.stringify(value, null, 2)}`;
        } else {
            console.error(`设置条目 "${key}" 失败:`, result.msg);
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
// const uniqueAppId = 'my-web-plugin-' + Math.random().toString(36).substring(2);
// setSiyuanLocalStorageItem('lastVisitedPage', '/my-plugin/dashboard', uniqueAppId);
// setSiyuanLocalStorageItem('pluginConfig_v2', { enabled: true, syncFrequency: 'daily' }, uniqueAppId);
```

## 在线测试

Key: 

Value (JSON):

App ID: 

发送设置请求

### 响应:

此处将显示API的响应结果。

**提示:** 设置后，你可以使用 [/api/storage/getLocalStorage](./getLocalStorage.html) (如果已存在文档) 或通过开发者工具查看当前的 LocalStorage 内容，以验证设置是否成功。
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
