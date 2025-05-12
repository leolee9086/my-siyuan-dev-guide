---
title: 设置谷歌分析 (setGoogleAnalytics)
---
# 端点

/api/system/setGoogleAnalytics

# 设置谷歌分析 (setGoogleAnalytics)

[首页](../index.html) | [System API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/system.go#L377)

## 功能描述

此 API 端点 `POST /api/system/setGoogleAnalytics` 用于启用或禁用思源笔记的谷歌分析功能。

它修改配置文件中的 `conf.System.DisableGoogleAnalytics` 项。请注意，参数和配置项是相反的逻辑（启用分析=禁用选项设为false）。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `googleAnalytics` (boolean): **必填**。是否启用谷歌分析。
    -   `true`: 启用谷歌分析（将 DisableGoogleAnalytics 设为 false）
    -   `false`: 禁用谷歌分析（将 DisableGoogleAnalytics 设为 true）

**请求示例 (启用谷歌分析):**

```json
{
  "googleAnalytics": true
}
```

**请求示例 (禁用谷歌分析):**

```json
{
  "googleAnalytics": false
}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 为 `null`。

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

如果操作失败（例如参数无效），将返回非 0 的 `code` 和具体的错误信息 `msg`。

```json
{
  "code": -1, // 示例错误码
  "msg": "Invalid parameters", // 示例错误信息
  "data": null
}
```

## 在线测试

您可以在下方选择是否启用谷歌分析进行在线测试。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

### 响应结果:

思源笔记 API 文档 | 最后更新时间：

