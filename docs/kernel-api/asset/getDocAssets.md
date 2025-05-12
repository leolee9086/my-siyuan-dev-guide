---
title: 获取文档资源文件列表 (getDocAssets)
---
# 端点

/api/asset/getDocAssets

# 获取文档资源文件列表 (getDocAssets)

**方法：**POST **路径：**/api/asset/getDocAssets

[首页](../index.html) | [Asset API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/asset.go#L58)

## 功能描述

此 API 端点 `POST /api/asset/getDocAssets` 用于获取指定文档块（Doc Block）所引用的所有资源文件（Assets）信息列表。

资源文件通常包括图片、附件等。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `id` (string): **必填**。文档块的 ID。

**请求示例:**

```json
{
  "id": "20230315180000-abcdefg"
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 字段包含一个 `assets` 数组。

`assets` 数组中的每个元素是一个对象，代表一个资源文件，通常包含以下字段（具体字段可能依版本或文件类型而不同）：

-   `path` (string): 资源文件的相对路径 (相对于 \`data/assets/\` 目录)。
-   `name` (string): 资源文件的原始文件名。
-   `type` (string): 资源文件的 MIME 类型 (可能不准确或缺失)。
-   `size` (number): 文件大小 (字节)。
-   `box` (string): 资源文件所属的笔记本 ID (通常为空，因为资源是全局的)。
-   `docpath` (string): 首次引用该资源的文档路径 (可能不准确)。
-   `hash` (string): 文件的哈希值 (可能)。
-   其他可能的元数据...

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "assets": [
      {
        "path": "assets/image-20230315180500-hijklmn.png",
        "name": "screenshot.png",
        "type": "image/png",
        "size": 12345,
        "box": "",
        "docpath": "/path/to/document.sy", 
        "hash": "..."
      },
      {
        "path": "assets/attachment-20230315181000-opqrstu.pdf",
        "name": "mydocument.pdf",
        "type": "application/pdf",
        "size": 67890,
        "box": "",
        "docpath": "/path/to/document.sy",
        "hash": "..."
      }
      // ... 更多资源文件
    ]
  }
}
```

如果操作失败（例如文档 ID 无效），将返回非 0 的 `code` 和具体的错误信息 `msg`。

```json
{
  "code": -1,
  "msg": "get doc assets failed: block [xxx] not found", // 示例错误信息
  "data": null
}
```

## 在线测试

您可以在下方输入文档块 ID 进行在线测试。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

