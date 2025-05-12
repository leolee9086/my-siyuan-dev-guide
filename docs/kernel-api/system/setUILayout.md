---
title: 设置界面布局 (setUILayout)
---
# 端点

/api/system/setUILayout

# 设置界面布局 (setUILayout)

[首页](../index.html) | [System API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/system.go#L241)

## 功能描述

此 API 端点 `POST /api/system/setUILayout` 用于设置思源笔记的界面布局配置。

它修改配置文件中的布局相关设置，允许自定义界面的多种参数。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `layout` (object): **必填**。UI布局配置对象，包含界面布局的各种属性。
    
    注意：这是一个复杂对象，具体字段可能随版本变化，建议从 `/api/system/getConf` 获取当前配置后修改需要的部分。
    
    可能包含的字段有窗口尺寸、面板位置、侧边栏状态等布局相关配置。
    

**请求示例 (部分布局配置):**

```json
{
  "layout": {
    "showLayoutMode": 0,
    "hideStatusBar": false,
    "fullscreen": false,
    "dailyNote": {
      "dailyNoteMenu": false,
      "openDaily": false
    },
    "customTitleBar": false,
    "dynamicTitle": true
    // ... 其他布局配置项
  }
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

如果操作失败（例如参数无效或解析错误），将返回非 0 的 `code` 和具体的错误信息 `msg`。

```json
{
  "code": -1,
  "msg": "invalid character '\\n' in string literal",  // 示例错误信息
  "data": null
}
```

## 在线测试

您可以在下方输入UI布局配置进行在线测试。请注意，输入无效的布局可能会导致界面显示异常。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

### 响应结果:

**提示：** 建议先使用 `GET /api/system/getConf` 获取当前配置，然后只修改必要的部分提交，避免覆盖其他设置。

思源笔记 API 文档 | 最后更新时间：

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
