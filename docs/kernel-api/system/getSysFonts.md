---
title: 获取系统字体列表 (getSysFonts)
---
# 端点

/api/system/getSysFonts

# 获取系统字体列表 (getSysFonts)

[首页](../index.html) | [System API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/system.go#L330)

## 功能描述

此 API 端点 `POST /api/system/getSysFonts` 用于获取当前操作系统上安装的可用字体列表。

主要用于在界面中提供字体选择功能时，动态加载系统支持的字体选项。

## 请求参数

此 API 不需要任何请求参数。发送一个空的 JSON 对象 `{}` 或不发送请求体即可。

**请求示例:**

```json
{}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 是一个包含系统字体名称的字符串数组。

数组中的每个字符串代表一个可用的字体名称。

```json
{
  "code": 0,
  "msg": "",
  "data": [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Microsoft YaHei",
    "SimSun",
    "Source Han Sans CN Regular",
    // ... more font names
  ]
}
```

如果获取字体列表过程中发生错误，理论上会返回非 0 的 `code` 和错误信息，但从实现上看，\`util.GetSysFonts\` 可能直接返回空列表或处理了内部错误。

## 在线测试

您可以在下方直接点击"发送请求"进行在线测试，以获取当前系统安装的字体列表。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
{}  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

