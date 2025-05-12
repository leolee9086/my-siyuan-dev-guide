---
title: 获取集市主题列表 (getBazaarTheme)
---

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# 获取集市主题列表

## 端点

`/api/bazaar/getBazaarTheme`

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go#L466 "查看 getBazaarTheme 接口的源码实现")

## 接口描述

此 API 端点用于从思源笔记官方集市获取可用的主题列表。主题可以改变思源笔记的整体外观风格，包括颜色、字体、布局等。支持按关键词搜索。

## 认证与授权

此接口需要满足以下条件才能访问:

1. **用户认证** (`model.CheckAuth`): 需要有效的用户认证,并通过 `Authorization` HTTP 头部传递 API Token

## 请求方法

POST

## 请求参数

请求体应为 JSON 格式，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| keyword | string | 否 | 搜索关键词，用于在主题名称、描述、作者中进行模糊匹配。为空时返回所有主题 |
| mode | number | 是 | 主题模式：0=亮色, 1=暗色 |
| update | boolean | 否 | 是否为更新操作，默认为false |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码。0: 成功; 1: 安装失败; -1: 服务器错误 |
| msg | string | 返回信息。失败时包含错误信息 |
| data | object | 返回数据 |

data 字段内容:

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| packages | object[] | 主题包信息数组 |
| appearance | object | 系统外观配置信息（仅在安装/卸载主题时返回） |

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
| modes | number[] | 支持的模式: 0=亮色, 1=暗色 |
| previews | object[] | 预览图列表，每个对象包含 screenshot(预览图URL) 和 mode(模式) |
| iconURL | string | 图标地址 |
| funding | object | 赞助信息(可选) |
| installed | boolean | 是否已安装 |
| hasUpdate | boolean | 是否有更新 |

## 示例

### 请求示例 (获取所有主题)

```json
POST /api/bazaar/getBazaarTheme
Content-Type: application/json
Authorization: Token your-token

{
  "keyword": "",
  "mode": 0
}
```

### 请求示例 (搜索特定主题)

```json
POST /api/bazaar/getBazaarTheme
Content-Type: application/json
Authorization: Token your-token

{
  "keyword": "dark",
  "mode": 1
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
        "name": "dark-plus",
        "author": "YourName",
        "version": "1.0.0",
        "displayName": "暗色主题增强版", 
        "description": "一个优雅的暗色主题。",
        "repoURL": "https://github.com/yourname/dark-plus",
        "repoHash": "abcdef1234567890",
        "modes": [1],
        "previews": [
          {
            "screenshot": "https://example.com/preview.png",
            "mode": 1
          }
        ],
        "iconURL": "icon.png",
        "funding": {},
        "installed": true,
        "hasUpdate": false
      }
      // ... more packages
    ],
    "appearance": {}
  }
}
```

### 返回示例 (失败)

```json
{
  "code": -1,
  "msg": "获取主题列表失败",
  "data": null
}
```

## 错误码说明

| 错误码 | 说明 |
| --- | --- |
| 0 | 成功 |
| 1 | 安装失败 |
| -1 | 服务器错误 |

## 备注

- 返回的主题列表会根据用户当前安装状态显示 `installed` 和 `hasUpdate` 标记
- 搜索是模糊匹配,会在主题名称、描述、作者等字段中查找关键词
- 如果要获取已安装的主题列表,请使用 `/api/bazaar/getInstalledTheme` 接口
- 主题安装后需要重启思源笔记才能完全生效
- 主题安装后会自动禁用"跟随系统切换外观模式"的设置
- 建议在安装新主题前备份当前的主题和外观设置
