---
title: 获取最近文档列表 (getRecentDocs)
---
# 端点

/api/storage/getRecentDocs

# 获取最近文档列表 (getRecentDocs)

POST /api/storage/getRecentDocs

## 认证与权限

需要身份验证 (通过 API Token)。

## 接口描述

此接口用于获取用户最近打开或编辑的文档列表。列表最多包含 32 条记录，并按最近访问顺序列出。

数据来源于内核维护的 `data/storage/recent-doc.json` 文件，并在返回前会尝试更新文档标题以反映最新状态。

## 请求体参数

该接口不需要请求体参数。

## 请求体示例

```json
{}
```

## 响应体说明

成功时，接口返回一个 JSON 数组，数组中的每个元素代表一个最近访问的文档对象。每个对象包含以下字段：

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| rootID | string | 文档根块的 ID。 |
| icon | string | 文档的图标，通常是一个 Emoji 字符或图片资源的路径。 |
| title | string | 文档的标题。接口会尝试返回最新的标题。 |

## 响应体示例

```json
[
    {
        "rootID": "20230101000000-abcdefgh",
        "icon": "",
        "title": "我最近看的第一篇文档"
    },
    {
        "rootID": "20230215102030-ijklmnop",
        "icon": "💡",
        "title": "一些有趣的想法记录"
    },
    {
        "rootID": "20221225080000-qrstuvwx",
        "icon": "assets/custom-icon-image.png",
        "title": "项目计划书 V3"
    }
    // ... 最多 32 条记录
]
```

## cURL 调用示例

```bash
curl -X POST \
  http://127.0.0.1:6806/api/storage/getRecentDocs \
  -H 'Authorization: Token YOUR_API_TOKEN' \
  -H 'Content-Type: application/json'
```

## JavaScript 调用示例

```javascript
async function getSiyuanRecentDocs() {
    try {
        const response = await fetch('/api/storage/getRecentDocs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token YOUR_API_TOKEN' // 如果配置了API Token
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error('获取最近文档列表失败:', response.status, errorData);
            document.getElementById('apiResponse').textContent = `错误 ${response.status}: ${JSON.stringify(errorData, null, 2)}`;
            return null;
        }
        const data = await response.json();
        console.log('最近文档列表:', data);
        document.getElementById('apiResponse').textContent = JSON.stringify(data, null, 2);
        return data;
    } catch (error) {
        console.error('请求过程中发生错误:', error);
        document.getElementById('apiResponse').textContent = `请求错误: ${error.message}`;
        return null;
    }
}
```

## 在线测试

获取最近文档列表

### 响应:

点击按钮后，此处将显示API的响应结果。
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
