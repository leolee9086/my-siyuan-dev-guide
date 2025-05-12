---
title: 获取集市插件列表
---
# 端点

/api/bazaar/getBazaarPlugin

# 获取集市插件列表

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go#L78 "查看源文件")

需要认证

## 接口描述

从官方集市获取可用的插件列表。可以通过关键词进行筛选。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| frontend | string | 是 | 前端类型，例如 "desktop" 或 "mobile"。用于筛选兼容的插件。 |
| keyword | string | 否 | 搜索关键词，用于在插件名称、描述、作者中进行模糊匹配。如果为空，则返回所有插件。 |

## 返回值

返回插件包信息列表。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 包含插件列表的对象。 |
| data.packages | object\[\] | 插件包信息数组。每个包包含以下字段（可能不完整）：
-   `name`: 包名 (string)
-   `author`: 作者 (string)
-   `version`: 版本号 (string)
-   `displayName`: 显示名称 (string)
-   `description`: 描述 (string)
-   `repoURL`: 仓库地址 (string)
-   `repoHash`: 仓库哈希 (string)
-   `iconURL`: 图标地址 (string)
-   `funding`: 赞助信息 (object, optional)
-   `installed`: 是否已安装 (boolean)
-   `hasUpdate`: 是否有更新 (boolean)

 |

请求示例 返回示例 在线测试

获取所有桌面端插件:

```json
{
  "frontend": "desktop",
  "keyword": ""
}
```

搜索包含 "enhance" 关键词的插件:

```json
{
  "frontend": "desktop",
  "keyword": "enhance"
}
```

成功返回 (部分示例):

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "packages": [
      {
        "name": "siyuan-plugin-sync-provider",
        "author": "Vanessa",
        "version": "0.1.0",
        "displayName": "同步服务提供", 
        "description": "提供 S3、WebDAV 同步支持。",
        "repoURL": "https://github.com/siyuan-note/plugin-sync-provider",
        "repoHash": "abcdef1234567890",
        "iconURL": "icon.png",
        "funding": {},
        "installed": true,
        "hasUpdate": false
      },
      {
        "name": "siyuan-plugin-periodic-notes",
        "author": "langren1353",
        "version": "1.2.0",
        "displayName": "周期笔记",
        "description": "用于创建和管理周期性笔记，如日记、周报等。",
        "repoURL": "https://github.com/langren1353/siyuan-plugin-periodic-notes",
        "repoHash": "fedcba0987654321",
        "iconURL": "icon.png",
        "funding": {},
        "installed": false,
        "hasUpdate": false
      }
      // ... more packages
    ]
  }
}
```

API Token: 

接口地址: 

请求方法: 

请求参数 (JSON): { "frontend": "desktop", "keyword": "" }

发送请求

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
