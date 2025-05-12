---
title: 获取启动进度
---
# 端点

/api/system/bootProgress

# 获取启动进度

请求方式: GET 或 POST

接口路径: /api/system/bootProgress

获取思源笔记启动进程的当前进度和详细信息，系统启动时页面可以通过此接口获取启动状态。

## 认证要求

需要在请求头中包含有效的 `Authorization` Token。

## 请求参数

此接口不需要任何参数。

## 返回值

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 错误信息，成功时为空 |
| data | object | 返回数据 |
| data.progress | number | 启动进度，范围从 0 到 100 |
| data.details | string | 启动详情描述，通常包含版本号和当前正在进行的操作 |

## 请求示例

```
{
    // 无需请求体
}
```

## 响应示例

```
{
    "code": 0,
    "msg": "",
    "data": {
        "progress": 63,
        "details": "v3.0.17 Indexing blocks..."
    }
}
```

## 在线测试

API Token:  保存

接口地址: 

请求方法: GET POST

请求参数:

发送请求

结果 cURL Fetch

// 结果将显示在这里

// cURL 命令将显示在这里

复制

// Fetch 代码将显示在这里

复制

© 2024 思源笔记

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
