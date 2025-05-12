---
title: 设置自动启动 (setAutoLaunch)
---
# 端点

/api/system/setAutoLaunch

# 设置自动启动 (setAutoLaunch)

[首页](../index.html) | [System API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/system.go#L429)

## 功能描述

此 API 端点 `POST /api/system/setAutoLaunch` 用于设置思源笔记是否在操作系统启动时自动运行。

**注意：**此 API 仅修改思源笔记配置文件中的相关设置 (`conf.System.AutoLaunch2`)。它不直接操作操作系统的启动项。实际的自动启动行为依赖于程序后续读取此配置并与操作系统交互。

## 请求参数

请求体必须是 JSON 格式，包含以下参数：

-   `autoLaunch` (integer): **必填**。设置自动启动的模式代码。
    -   `0`: 关闭自动启动。
    -   `1`: 开启自动启动。
    -   （可能存在其他值，如 `2`，具体含义需参考官方设置。）

**请求示例 (开启自动启动):**

```json
{
  "autoLaunch": 1
}
```

**请求示例 (关闭自动启动):**

```json
{
  "autoLaunch": 0
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

如果操作失败（例如参数无效、保存配置失败等），将返回非 0 的 `code` 和具体的错误信息 `msg`。

```json
{
  "code": -1,
  "msg": "Failed to save configuration", // 示例错误信息
  "data": null
}
```

## 在线测试

您可以在下方输入自动启动模式代码进行在线测试。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
  
发送请求

### 响应结果:

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
