---
title: 获取搜索/替换条件列表 (getCriteria)
---
# 端点

/api/storage/getCriteria

# 获取搜索/替换条件列表 (getCriteria)

POST /api/storage/getCriteria

## 认证与权限

需要身份验证 (通过 API Token)。

## 接口描述

此接口用于获取用户保存的所有搜索/替换条件列表。这些条件通常是在思源笔记的搜索或批量替换功能中创建和管理的。

## 请求体参数

该接口不需要请求体参数。

## 请求体示例

```json
{}
```

## 响应体说明

成功时，接口返回一个 JSON 数组，数组中的每个元素代表一个搜索/替换条件对象。每个对象包含以下字段：

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| name | string | 条件名称 |
| sort | int | 排序方式。0：按块类型（默认），1：按创建时间升序，2：按创建时间降序，3：按更新时间升序，4：按更新时间降序，5：按内容顺序（仅在按文档分组时） |
| group | int | 分组方式。0：不分组，1：按文档分组 |
| hasReplace | boolean | 是否有替换操作 |
| method | int | 搜索方法。0：文本，1：查询语法，2：SQL，3：正则表达式 |
| hPath | string | 人类可读的路径（如果适用） |
| idPath | string\[\] | ID 路径数组（如果适用） |
| k | string | 搜索关键字 |
| r | string | 替换关键字（如果 `hasReplace` 为 true） |
| types | object | 搜索时应用的块类型过滤条件。详情见下文。 |
| replaceTypes | object | 替换时应用的文本/块类型过滤条件。详情见下文。 |

### `types` 对象 (CriterionTypes)

包含一系列布尔值，指示哪些块类型被包含在搜索范围内：

-   `mathBlock` (boolean)
-   `table` (boolean)
-   `blockquote` (boolean)
-   `superBlock` (boolean)
-   `paragraph` (boolean)
-   `document` (boolean)
-   `heading` (boolean)
-   `list` (boolean)
-   `listItem` (boolean)
-   `codeBlock` (boolean)
-   `htmlBlock` (boolean)
-   `embedBlock` (boolean)
-   `databaseBlock` (boolean)
-   `audioBlock` (boolean)
-   `videoBlock` (boolean)
-   `iframeBlock` (boolean)
-   `widgetBlock` (boolean)

### `replaceTypes` 对象 (CriterionReplaceTypes)

包含一系列布尔值，指示替换操作应用于哪些类型的文本或块：

-   `text` (boolean): 普通文本
-   `imgText` (boolean): 图片替代文本 (alt)
-   `imgTitle` (boolean): 图片标题
-   `imgSrc` (boolean): 图片链接
-   `aText` (boolean): 链接文本
-   `aTitle` (boolean): 链接标题
-   `aHref` (boolean): 链接地址
-   `code` (boolean): 行内代码
-   `em` (boolean): 斜体
-   `strong` (boolean): 粗体
-   `inlineMath` (boolean): 行内数学公式
-   `inlineMemo` (boolean): 行内备注
-   `blockRef` (boolean): 块引用
-   `fileAnnotationRef` (boolean): 文件注解引用
-   `kbd` (boolean): 键盘按键
-   `mark` (boolean): 标记 (高亮)
-   `s` (boolean): 删除线
-   `sub` (boolean): 下标
-   `sup` (boolean): 上标
-   `tag` (boolean): 标签
-   `u` (boolean): 下划线
-   `docTitle` (boolean): 文档标题
-   `codeBlock` (boolean): 代码块内容
-   `mathBlock` (boolean): 数学块内容
-   `htmlBlock` (boolean): HTML 块内容

## 响应体示例

```json
[
    {
        "name": "我的常用搜索",
        "sort": 0,
        "group": 0,
        "hasReplace": false,
        "method": 1,
        "hPath": "",
        "idPath": [],
        "k": "关键字A AND (tagB OR tagC)",
        "r": "",
        "types": {
            "mathBlock": false,
            "table": true,
            "blockquote": false,
            "superBlock": false,
            "paragraph": true,
            "document": true,
            "heading": true,
            "list": true,
            "listItem": true,
            "codeBlock": false,
            "htmlBlock": false,
            "embedBlock": false,
            "databaseBlock": false,
            "audioBlock": false,
            "videoBlock": false,
            "iframeBlock": false,
            "widgetBlock": false
        },
        "replaceTypes": null
    },
    {
        "name": "批量替换错别字",
        "sort": 0,
        "group": 1,
        "hasReplace": true,
        "method": 0,
        "hPath": "笔记本A/文档B",
        "idPath": ["20230101000000-xxxxxxxx", "20230102000000-yyyyyyyy"],
        "k": "错字",
        "r": "正字",
        "types": {
            "mathBlock": false,
            // ... 其他类型 ...
            "paragraph": true,
            "document": true,
            "heading": true,
            "listItem": true,
            "codeBlock": false
        },
        "replaceTypes": {
            "text": true,
            "imgText": false,
            // ... 其他替换类型 ...
            "aText": true,
            "code": false
        }
    }
]
```

## cURL 调用示例

```bash
curl -X POST \
  http://127.0.0.1:6806/api/storage/getCriteria \
  -H 'Authorization: Token YOUR_API_TOKEN' \
  -H 'Content-Type: application/json'
```

## JavaScript 调用示例

```javascript
async function getSiyuanCriteria() {
    try {
        const response = await fetch('/api/storage/getCriteria', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token YOUR_API_TOKEN' // 如果配置了API Token
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error('获取搜索条件列表失败:', response.status, errorData);
            document.getElementById('apiResponse').textContent = `错误 ${response.status}: ${JSON.stringify(errorData, null, 2)}`;
            return null;
        }
        const data = await response.json();
        console.log('搜索条件列表:', data);
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

获取搜索/替换条件列表

### 响应:

点击按钮后，此处将显示API的响应结果。
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
