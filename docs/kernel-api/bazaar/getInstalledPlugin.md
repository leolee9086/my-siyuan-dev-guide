---
title: 获取已安装插件列表
---
# 端点

/api/bazaar/getInstalledPlugin

# 获取已安装插件列表

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go#L97 "查看源文件")

需要认证

## 接口描述

获取当前工作空间中已安装的插件列表。可以通过关键词进行筛选。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| frontend | string | 是 | 前端类型，例如 "desktop" 或 "mobile"。用于筛选兼容的插件。 |
| keyword | string | 否 | 搜索关键词，用于在插件名称、描述、作者中进行模糊匹配。如果为空，则返回所有已安装的插件。 |

## 返回值

返回已安装插件包信息列表。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 包含已安装插件列表的对象。 |
| data.packages | object\[\] | 已安装插件包信息数组。每个包包含的字段与 `/api/bazaar/getBazaarPlugin` 返回的结构类似，但可能包含本地特有信息（如启用状态 `enabled`）。具体字段可能包括：
-   `name`: 包名 (string)
-   `author`: 作者 (string)
-   `version`: 当前安装版本号 (string)
-   `displayName`: 显示名称 (string)
-   `description`: 描述 (string)
-   `repoURL`: 原始仓库地址 (string, 可能为空)
-   `iconURL`: 图标地址 (string)
-   `funding`: 赞助信息 (object, optional)
-   `enabled`: 是否已启用 (boolean)
-   `hasUpdate`: 是否有更新 (boolean)
-   ... (可能还有其他本地状态字段)

 |

请求示例 返回示例 在线测试

获取所有已安装的桌面端插件:

```json
{
  "frontend": "desktop",
  "keyword": ""
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
        "iconURL": "icon.png",
        "funding": {},
        "enabled": true,
        "hasUpdate": false
      }
      // ... more installed packages
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
