---
title: 检查更新
---
# 端点

/api/system/checkUpdate

[← 返回 System API 列表](../pages/system.html)

# 检查更新

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/system.go)

`POST /api/system/checkUpdate`

## 描述

检查思源笔记是否有新版本可用。该 API 会从官方服务器获取最新版本信息，并与当前安装的版本进行比较，判断是否需要更新。同时也会获取更新日志和下载链接。

## 请求参数

请求体需要是 JSON 格式，但不需要特定参数。可以是一个空的 JSON 对象 `{}`。

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 包含更新信息。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "currentVer": "2.7.7",           // 当前版本
    "latestVer": "2.7.8",            // 最新版本
    "needUpdate": true,              // 是否需要更新
    "changelogs": "## 改进功能\\n- 改进A\\n- 改进B",  // 更新日志
    "downloads": {                   // 各平台下载链接
      "windows": {
        "downloadURL": "https://example.com/siyuan-2.7.8-win.exe"
      },
      "macOS": {
        "downloadURL": "https://example.com/siyuan-2.7.8-mac.dmg"
      },
      "linux": {
        "downloadURL": "https://example.com/siyuan-2.7.8-linux.AppImage"
      },
      "android": {
        "downloadURL": "https://example.com/siyuan-2.7.8.apk"
      },
      "ios": {
        "downloadURL": "https://apps.apple.com/app/siyuan/id1583226508"
      }
    }
  }
}
```

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

思源笔记 API 文档
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
