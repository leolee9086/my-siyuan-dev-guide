---
title: 创建/更新搜索替换条件 (setCriterion)
---
# 端点

/api/storage/setCriterion

# 创建/更新搜索替换条件 (setCriterion)

POST /api/storage/setCriterion

## 认证与权限

需要身份验证 (通过 API Token)。

需要管理员权限。

此操作在只读模式下不可用。

## 接口描述

此接口用于创建或更新一个用户自定义的搜索/替换条件。这些条件保存在 `data/storage/criteria.json` 文件中。

如果请求中提供的 `criterion.name` 已存在，则会更新现有的同名条件；如果不存在，则会创建一个新的条件。

条件的名称 (`criterion.name`) 不能为空。

## 请求体参数

请求体为一个 JSON 对象，包含一个名为 `criterion` 的键，其值为一个完整的搜索/替换条件对象 (`model.Criterion`)。

```json
{
    "criterion": {
        "name": "我的条件", // string, 必需
        "sort": 0,          // int, 0:块类型, 1:创建升, 2:创建降, 3:更新升, 4:更新降, 5:内容顺序
        "group": 0,         // int, 0:不分组, 1:按文档
        "hasReplace": false,// boolean
        "method": 0,        // int, 0:文本, 1:查询语法, 2:SQL, 3:正则
        "hPath": "",         // string, 人类可读路径 (如 "笔记本/文档")
        "idPath": [],       // string[], 块ID路径 (如 ["boxid", "docid"])
        "k": "搜索词",      // string, 搜索关键词
        "r": "替换词",      // string, 替换关键词 (if hasReplace is true)
        "types": {          // CriterionTypes object, 搜索时应用的块类型过滤
            "mathBlock": false,
            "table": true,
            "blockquote": false,
            "superBlock": false,
            "paragraph": true,
            // ... 其他所有 CriterionTypes 中的布尔字段
            "widgetBlock": false
        },
        "replaceTypes": null // CriterionReplaceTypes object or null (if hasReplace is false)
                            // 如果 hasReplace 为 true, 则结构如下:
        // "replaceTypes": {
        //     "text": true,
        //     "imgText": false,
        //     // ... 其他所有 CriterionReplaceTypes 中的布尔字段
        //     "htmlBlock": false
        // }
    }
}
```

### `Criterion` 对象详细说明:

| 字段名 | 类型 | 描述 | 是否必需 |
| --- | --- | --- | --- |
| name | string | 条件名称 | 是 |
| sort | int | 排序方式 (0:块类型, 1:创建升, 2:创建降, 3:更新升, 4:更新降, 5:内容顺序) | 否 (默认为0) |
| group | int | 分组方式 (0:不分组, 1:按文档) | 否 (默认为0) |
| hasReplace | boolean | 是否有替换操作 | 否 (默认为false) |
| method | int | 搜索方法 (0:文本, 1:查询语法, 2:SQL, 3:正则) | 否 (默认为0) |
| hPath | string | 人类可读的路径限制 (可选) | 否 |
| idPath | string\[\] | ID 路径限制 (可选) | 否 |
| k | string | 搜索关键字 | 是 (逻辑上) |
| r | string | 替换关键字 (如果 `hasReplace` 为 true) | 条件性必需 |
| types | object (CriterionTypes) | 搜索时应用的块类型过滤。若为 null，则使用默认值 (通常全为false或true，需参照内核具体实现) | 是 |
| replaceTypes | object (CriterionReplaceTypes) | 替换时应用的文本/块类型过滤。如果 `hasReplace` 为 false，此字段可为 null。 | 条件性必需 |

关于 `CriterionTypes` 和 `CriterionReplaceTypes` 对象的具体字段，请参考 [/api/storage/getCriteria](./getCriteria.html) 接口文档中的说明。

## 响应体说明

标准的思源笔记 API 响应结构：

```json
{
    "code": 0,     // 0 表示成功，非 0 表示失败
    "msg": "",      // 成功时为空，失败时为错误信息 (例如 "Name cannot be empty")
    "data": null   // 成功时固定为 null
}
```

## cURL 调用示例

```bash
curl -X POST \
  http://127.0.0.1:6806/api/storage/setCriterion \
  -H 'Authorization: Token YOUR_API_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '
{
    "criterion": {
        "name": "我的新搜索条件",
        "sort": 0,
        "group": 0,
        "hasReplace": false,
        "method": 1,
        "hPath": "",
        "idPath": [],
        "k": "(important OR urgent) AND NOT done",
        "r": "",
        "types": {
            "mathBlock": false, "table": false, "blockquote": false, "superBlock": false,
            "paragraph": true, "document": true, "heading": true, "list": true,
            "listItem": true, "codeBlock": false, "htmlBlock": false, "embedBlock": false,
            "databaseBlock": false, "audioBlock": false, "videoBlock": false,
            "iframeBlock": false, "widgetBlock": false
        },
        "replaceTypes": null
    }
}'
```

## JavaScript 调用示例

```javascript
async function setSiyuanCriterion(criterionObject) {
    const requestBody = {
        criterion: criterionObject
    };

    try {
        const response = await fetch('/api/storage/setCriterion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token YOUR_API_TOKEN' // 如果配置了API Token
            },
            body: JSON.stringify(requestBody)
        });
        const result = await response.json();

        if (result.code === 0) {
            console.log(`搜索/替换条件 "${criterionObject.name}" 设置成功。`);
            document.getElementById('apiResponse').textContent = `条件 "${criterionObject.name}" 设置成功。`;
        } else {
            console.error(`设置条件 "${criterionObject.name}" 失败:`, result.msg);
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
// const myCriterion = {
//     name: "编程相关待办",
//     sort: 1, // 按创建时间升序
//     group: 0, // 不分组
//     hasReplace: false,
//     method: 1, // 查询语法
//     k: "#coding AND待办",
//     types: { /* ... 根据需要填充 ... document: true, paragraph: true, listItem: true */ },
//     replaceTypes: null
// };
// setSiyuanCriterion(myCriterion);
```

## 在线测试

Criterion JSON 对象:

加载示例 发送请求

### 响应:

此处将显示API的响应结果。
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
