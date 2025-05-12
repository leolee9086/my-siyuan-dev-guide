---
title: 导出日志 (exportLog)
---
# 端点

/api/system/exportLog

# 导出日志 (exportLog)

[首页](../index.html) | [System API](index.html) | [GitHub Source](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/system.go#L199)

## 功能描述

此 API 端点 `POST /api/system/exportLog` 用于将思源笔记的系统日志导出为一个 Zip 压缩文件。

导出的日志通常包含内核运行日志、界面交互日志等，主要用于问题诊断和开发者反馈。

## 请求参数

此 API 不需要任何请求参数。发送一个空的 JSON 对象 `{}` 或不发送请求体即可。

**请求示例:**

```json
{}
```

## 响应结果

成功的请求将返回一个 JSON 对象，`code` 为 0，`data` 包含一个名为 `zip` 的字段，其值为生成的日志压缩包的绝对路径。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "zip": "/path/to/your/siyuan/workspace/temp/log-YYYYMMDDHHmmss.zip" 
  }
}
```

如果导出过程中发生错误，将返回非 0 的 `code` 和具体的错误信息 `msg`。

```json
{
  "code": -1,
  "msg": "export system log failed: error message", // 示例错误信息
  "data": null
}
```

## 在线测试

您可以在下方直接点击"发送请求"进行在线测试，以导出系统日志。

API Token:   
Endpoint:   
Method:   
Parameters (JSON):  
{}  
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
