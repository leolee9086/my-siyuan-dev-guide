---
title: 获取集市图标列表 (getBazaarIcon)
---

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# 获取集市图标列表

## 端点

`/api/bazaar/getBazaarIcon`

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go#L273 "查看 getBazaarIcon 接口的源码实现")

## 接口描述

此 API 端点用于从思源笔记官方集市获取可用的图标包列表。图标包可以用来自定义思源笔记界面中的各种图标,支持按关键词搜索。

## 认证与授权

此接口需要满足以下条件才能访问:

1. **用户认证** (`model.CheckAuth`): 需要有效的用户认证,并通过 `Authorization` HTTP 头部传递 API Token

## 请求方法

POST

## 请求参数

请求体应为 JSON 格式，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| keyword | string | 否 | 搜索关键词，用于在图标包名称、描述、作者中进行模糊匹配。为空时返回所有图标包 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码。0: 成功; -1: 服务器错误 |
| msg | string | 返回信息。失败时包含错误信息 |
| data | object | 返回数据 |

data 字段内容:

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| packages | object[] | 图标包信息数组。每个包包含以下字段: |

packages 数组中每个对象的字段:

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| name | string | 包名 |
| author | string | 作者 |
| version | string | 版本号 |
| displayName | string | 显示名称 |
| description | string | 描述 |
| repoURL | string | 仓库地址 |
| repoHash | string | 仓库哈希 |
| iconURL | string | 图标地址 |
| funding | object | 赞助信息(可选) |
| installed | boolean | 是否已安装 |
| hasUpdate | boolean | 是否有更新 |

## 示例

### 请求示例 (获取所有图标包)

```json
POST /api/bazaar/getBazaarIcon
Content-Type: application/json
Authorization: Token your-token

{
  "keyword": ""
}
```

### 请求示例 (搜索特定图标包)

```json
POST /api/bazaar/getBazaarIcon
Content-Type: application/json
Authorization: Token your-token

{
  "keyword": "emoji"
}
```

### 返回示例 (成功)

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "packages": [
      {
        "name": "emoji-icons",
        "author": "YourName",
        "version": "1.0.0",
        "displayName": "Emoji图标包", 
        "description": "一套可爱的emoji风格图标。",
        "repoURL": "https://github.com/yourname/emoji-icons",
        "repoHash": "abcdef1234567890",
        "iconURL": "preview.png",
        "funding": {},
        "installed": true,
        "hasUpdate": false
      }
      // ... more packages
    ]
  }
}
```

### 返回示例 (失败)

```json
{
  "code": -1,
  "msg": "获取图标包列表失败",
  "data": null
}
```

## 错误码说明

| 错误码 | 说明 |
| --- | --- |
| 0 | 成功 |
| -1 | 服务器错误 |

## 备注

- 返回的图标包列表会根据用户当前安装状态显示 `installed` 和 `hasUpdate` 标记
- 搜索是模糊匹配,会在图标包名称、描述、作者等字段中查找关键词
- 如果要获取已安装的图标包列表,请使用 `/api/bazaar/getInstalledIcon` 接口
- 图标包安装后需要重启思源笔记才能完全生效
- 建议在安装新图标包前备份当前的主题和外观设置
