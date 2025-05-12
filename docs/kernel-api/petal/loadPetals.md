---
title: 加载插件列表 (loadPetals)
---
# 端点

/api/petal/loadPetals

# 加载插件列表 (loadPetals)

[首页](../index.html) | [Petal API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/petal.go#L29)

## 功能描述

此 API 端点 `POST /api/petal/loadPetals` 用于加载指定前端界面的插件（Petals）列表及其配置信息。

插件是思源笔记的一种扩展机制，允许在界面中嵌入自定义的小部件或面板。此 API 用于获取当前环境下所有已安装或可用的插件。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `frontend` (string): **必填**。指定要加载哪个前端界面的插件列表。常见的值可能包括：
    -   `"desktop"`: 桌面端主界面。
    -   `"mobile"`: 移动端界面。
    -   `"browser-extension"`: 浏览器扩展界面。
    -   _(具体可用值可能需要参考实际应用或文档确认)_

**请求示例:**

```json
{
  "frontend": "desktop"
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 字段是一个包含插件信息的数组。

每个插件对象包含从其 `plugin.json` 文件解析的元数据以及后端动态加载的数据：

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      // --- 从 plugin.json 读取的元数据 ---
      "name": "my-plugin",                // 插件名称 (唯一标识)
      "displayName": "我的插件",             // 插件显示名称 (可能包含多语言)
      "author": "Your Name",                // 作者
      "version": "0.1.0",                 // 版本号
      "description": "这个插件很酷",           // 描述 (可能包含多语言)
      "icon": "icon.png",                 // 图标文件名
      "readme": "README.md",              // README 文件名
      // ... 其他 plugin.json 中的字段也可能包含 ...

      // --- 后端动态确定的状态和加载的数据 ---
      "enabled": true,                   // 当前是否启用 (来自 petals.json)
      "incompatible": false,             // 是否与当前思源版本不兼容
      "js": "console.log('Hello from plugin!');", // dist/index.js 文件内容的字符串
      "css": ".my-plugin-style { color: red; }",   // dist/index.css 文件内容的字符串 (如果存在)
      "i18n": {                        // 加载的 i18n 语言内容 (对象)
        "hello": "你好"
      }
    },
    // ... 其他已启用且兼容的插件信息 ...
  ]
}
```

-   `code`: 0 表示成功，非 0 表示失败。
-   `msg`: 错误信息（如果 code 非 0）。
-   `data`: 一个数组，每个元素代表一个**已启用且兼容**的插件。包含：
    -   **来自 `plugin.json` 的元数据**: 如 `name`, `displayName`, `author`, `version`, `description`, `icon`, `readme` 等。
    -   **后端确定的状态**: `enabled` (插件是否启用), `incompatible` (是否不兼容当前版本)。
    -   **后端加载的内容**: 
        -   `js` (string): 插件 `dist/index.js` 的完整内容字符串。
        -   `css` (string): 插件 `dist/index.css` (如果存在) 的完整内容字符串。
        -   `i18n` (object): 加载的对应语言文件的内容对象。

## 在线测试

您可以在下方输入请求参数进行在线测试。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

