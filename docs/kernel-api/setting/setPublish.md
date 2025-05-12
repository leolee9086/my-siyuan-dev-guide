---
title: setPublish
---
# 端点

/api/setting/setPublish

# 思源笔记 API 文档

[返回首页](../index.html)

## /api/setting/setPublish

POST /api/setting/setPublish

### 认证与权限

需要用户认证 (`model.CheckAuth`)。

需要管理员权限 (`model.CheckAdminRole`)。

接口会检查只读模式 (`model.CheckReadonly`)，在只读模式下可能无法进行设置。

### 接口描述

用于设置和更新思源笔记的全局发布服务配置。

成功设置后，如果启用了发布服务 (`enable: true`)，系统会尝试启动或重启发布服务。此操作会修改 `conf.json` 文件中的 `publish` 部分。

如果发布服务因端口冲突等原因启动失败，接口会返回相应的错误信息。

### 请求体 (Request Body)

请求体为一个 JSON 对象，代表完整的发布配置 (`conf.Publish`)。

| 参数 | 类型 | 必需 | 描述 | 默认值 |
| --- | --- | --- | --- | --- |
| `enable` | boolean | 是 | 是否启用发布服务。 | `false` |
| `port` | number (uint16) | 是 | 发布服务监听的端口号。 | `6808` |
| `auth` | object | 是 | Basic 认证配置。 | 见下表 |

#### `auth` 对象结构:

| 参数 | 类型 | 必需 | 描述 | 默认值 |
| --- | --- | --- | --- | --- |
| `enable` | boolean | 是 | 是否为发布服务启用 Basic 认证。 | `true` |
| `accounts` | array | 是 | Basic 认证的账户列表。如果 `auth.enable` 为 `true`，此列表可以为空，表示没有预设账户。 | `[]` (空数组) |

#### `accounts` 数组中对象的结构 (BasicAuthAccount):

| 参数 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| `username` | string | 是 | 认证用户名。 |
| `password` | string | 是 | 认证密码。 |
| `memo` | string | 否 | 账户备注信息。 |

**请求体示例 (JSON):**

```json
{
    "enable": true,
    "port": 6808,
    "auth": {
        "enable": true,
        "accounts": [
            {
                "username": "siyuan_user",
                "password": "publish_password123",
                "memo": "My Publish Account"
            }
        ]
    }
}
```

### 响应体 (Response Body)

响应体为标准的思源笔记 API 返回结构：

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "port": 6808,
        "publish": {
            "enable": true,
            "port": 6808,
            "auth": {
                "enable": true,
                "accounts": [
                    {
                        "username": "siyuan_user",
                        "password": "publish_password123",
                        "memo": "My Publish Account"
                    }
                ]
            }
        }
    }
}
```

其中：

-   `code`: 错误码，`0` 表示成功，其他值表示失败 (例如端口占用)。
-   `msg`: 错误信息，成功时为空字符串。
-   `data`: 成功时包含以下字段：
    -   `port` (number): 发布服务实际运行的端口号。
    -   `publish` (object): 更新后的完整发布配置对象 (`conf.Publish`)。

### 接口调用示例 (JavaScript)

复制代码

```javascript
async function updatePublishSettings() {
    const settings = {
        enable: true,
        port: 6809, // 尝试使用新端口
        auth: {
            enable: true,
            accounts: [
                {
                    username: "reader",
                    password: "secretPass",
                    memo: "Read-only access"
                }
            ]
        }
    };

    try {
        const response = await fetch('/api/setting/setPublish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Token YOUR_API_TOKEN' // 如果API Token已设置
            },
            body: JSON.stringify(settings)
        });
        const result = await response.json();

        if (result.code === 0) {
            console.log('发布设置成功:', result.data);
            alert(`发布服务已在端口 ${result.data.port} 上更新/启动。`);
        } else {
            console.error('发布设置失败:', result.msg);
            alert('发布设置失败: ' + result.msg);
        }
    } catch (error) {
        console.error('请求 /api/setting/setPublish 失败:', error);
        alert('请求失败: ' + error);
    }
}

// updatePublishSettings(); // 调用函数
```

### 在线测试

你可以使用下面的表单来测试此 API。建议先通过 [/api/system/getConf](../system/getConf.html) 获取当前配置作为参考，或者使用 [/api/setting/getPublish](./getPublish.html) 获取当前发布配置。

启用发布服务: 

端口号: 

启用 Basic 认证: 

认证账户 (JSON 数组): \[\]

加载当前配置 发送请求

© 2023-2025 思源笔记. All rights reserved.
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
