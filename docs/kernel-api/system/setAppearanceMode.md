---
title: 设置外观模式 (setAppearanceMode)
---
# 端点

/api/system/setAppearanceMode

# 设置外观模式 (setAppearanceMode)

[首页](../index.html) | [System API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/system.go#L358)

## 功能描述

此 API 端点 `POST /api/system/setAppearanceMode` 用于设置思源笔记的界面外观模式（例如亮色模式或暗色模式）。

调用此 API 会更新系统配置，并可能影响界面主题的加载。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `mode` (integer): **必填**。要设置的外观模式代码。
    -   `0`: 亮色模式 (Light Mode)。
    -   `1`: 暗色模式 (Dark Mode)。
    -   （注意：可能存在其他模式代码，例如 `2` 可能代表"跟随系统"，具体请参考思源笔记官方设置。）

**请求示例 (设置为暗色模式):**

```json
{
  "mode": 1
}
```

**请求示例 (设置为亮色模式):**

```json
{
  "mode": 0
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 包含一个名为 `appearance` 的对象，该对象代表**整个更新后的外观设置** (`conf.Appearance` 结构)。

`appearance` 对象包含多个字段，例如：

-   `mode` (integer): 更新后的模式代码。
-   `themeLight` (string): 亮色模式使用的主题名称。
-   `themeDark` (string): 暗色模式使用的主题名称。
-   `themeJS` (boolean): 当前模式对应的主题是否包含 `theme.js` 文件。
-   `icon` (string): 使用的图标主题名称。
-   `codeBlockThemeLight` (string): 亮色模式下代码块的主题。
-   `codeBlockThemeDark` (string): 暗色模式下代码块的主题。
-   ... 以及其他外观相关设置。

**响应示例:**

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "appearance": {
      "mode": 1, // 更新后的模式
      "darkThemes": ["Midnight", "Dark+"],
      "lightThemes": ["Daylight", "GitHub"],
      "themeLight": "Daylight",
      "themeDark": "Midnight",
      "themeJS": true, // 当前主题 (Midnight) 存在 theme.js
      "icon": "material", 
      "codeBlockThemeLight": "github",
      "codeBlockThemeDark": "dracula",
      // ... 其他外观设置字段 ...
    }
  }
}
```

如果操作失败（例如参数无效、保存配置失败等），将返回非 0 的 `code` 和具体的错误信息 `msg`。

```json
{
  "code": -1,
  "msg": "Failed to save configuration", // 示例错误信息
  "data": null
}
```

## 在线测试

您可以在下方输入要设置的外观模式代码进行在线测试。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

