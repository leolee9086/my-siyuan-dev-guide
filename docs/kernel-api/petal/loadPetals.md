---
title: 加载挂件列表 (loadPetals)
---
# 端点

/api/petal/loadPetals

# 加载挂件列表 (loadPetals)

[首页](../index.html) | [Petal API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/petal.go#L29)

## 功能描述

此 API 端点 `POST /api/petal/loadPetals` 用于加载指定前端界面的挂件（Petals）列表及其配置信息。

挂件是思源笔记的一种扩展机制，允许在界面中嵌入自定义的小部件或面板。此 API 用于获取当前环境下所有已安装或可用的挂件。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `frontend` (string): **必填**。指定要加载哪个前端界面的挂件列表。常见的值可能包括：
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

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 字段是一个包含挂件信息的数组。

具体的数组元素结构需要参考 `model.LoadPetals` 函数的返回值或实际调用结果来确定。通常会包含以下信息：

```json
{
  "code": 0,
  "msg": "",
  "data": [
    {
      "packageName": "siyuan-petal-clock", // 挂件包名 (唯一标识)
      "name": "时钟挂件",                 // 挂件显示名称
      "author": "Vanessa",                // 作者
      "version": "1.0.0",                 // 版本号
      "description": "一个简单的时钟显示挂件", // 描述
      "enabled": true,                   // 当前是否启用
      "icon": "icon.png",                 // 图标文件名 (相对于挂件包路径)
      "readme": "README.md",              // README 文件名
      // ... 可能还有其他配置或元数据字段 ...
    },
    // ... 其他挂件信息 ...
  ]
}
```

-   `code`: 0 表示成功，非 0 表示失败。
-   `msg`: 错误信息（如果 code 非 0）。
-   `data`: 一个数组，每个元素代表一个挂件，包含其包名、名称、作者、版本、描述、启用状态、图标、README 等信息。

## 在线测试

您可以在下方输入请求参数进行在线测试。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

