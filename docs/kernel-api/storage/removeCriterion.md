---
title: 删除搜索/替换条件 (removeCriterion)
---
# 端点

/api/storage/removeCriterion

# 删除搜索/替换条件 (removeCriterion)

POST /api/storage/removeCriterion

## 认证与权限

需要身份验证 (通过 API Token)。

需要管理员权限。

此操作在只读模式下不可用。

## 接口描述

此接口用于删除一个已保存的搜索/替换条件。条件是通过其唯一的名称来指定的。

操作成功后，对应的条件将从 `data/storage/criteria.json` 文件中移除。

## 请求体参数

请求体为一个 JSON 对象，包含以下字段：

| 参数 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| `name` | string | 是 | 要删除的搜索/替换条件的名称。 |

## 请求体示例

```json
{
    "name": "我不再需要的搜索条件"
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

如果提供的 `name` 对应的条件不存在，接口仍然可能返回成功 (`code: 0`)，因为目标状态（该名称的条件不存在）已经达成。具体的错误（如文件读写错误）会通过非零 `code` 和 `msg` 反映。

## cURL 调用示例

```bash
curl -X POST \
  http://127.0.0.1:6806/api/storage/removeCriterion \
  -H 'Authorization: Token YOUR_API_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "要删除的条件名称"
  }'
```

## JavaScript 调用示例

```javascript
async function removeSiyuanCriterion(criterionName) {
    const requestBody = {
        name: criterionName
    };

    try {
        const response = await fetch('/api/storage/removeCriterion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token YOUR_API_TOKEN' // 如果配置了API Token
            },
            body: JSON.stringify(requestBody)
        });
        const result = await response.json();

        if (result.code === 0) {
            console.log(`搜索/替换条件 "${criterionName}" 删除成功。`);
            document.getElementById('apiResponse').textContent = `条件 "${criterionName}" 删除成功。`;
        } else {
            console.error(`删除条件 "${criterionName}" 失败:`, result.msg);
            document.getElementById('apiResponse').textContent = `错误 ${result.code}: ${result.msg}`;
        }
        return result;
    } catch (error) {
        console.error('请求过程中发生错误:', error);
        document.getElementById('apiResponse').textContent = `请求错误: ${error.message}`;
        return null;
    }
}

// 示例：先通过 /api/storage/getCriteria 获取现有条件列表，然后选择一个名称进行删除
// getSiyuanCriteria().then(criteria => {
//     if (criteria && criteria.length > 0) {
//         const nameToRemove = criteria[0].name; // 假设删除第一个
//         // removeSiyuanCriterion(nameToRemove);
//     } else {
//         console.log('没有可供删除的条件。');
//     }
// });
```

## 在线测试

要删除的条件名称: 

发送删除请求

### 响应:

此处将显示API的响应结果。

**提示:** 你可以先使用 [/api/storage/getCriteria](./getCriteria.html) 接口获取当前所有已保存条件的列表，以确定要删除的条件名称。
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
