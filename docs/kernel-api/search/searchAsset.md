---
title: 搜索资源文件
---
# 端点

/api/search/searchAsset

# 搜索资源文件

需要认证

## 接口描述

根据关键词和文件扩展名搜索工作空间中的资源文件（Assets）。

这个搜索主要基于文件名和文件路径进行匹配。

## 实现链接

-   后端路由: [siyuan/kernel/api/router.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/router.go)
-   处理函数: [siyuan/kernel/api/search.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/search.go) (`searchAsset` 函数)
-   核心逻辑: [siyuan/kernel/model/assets.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/model/assets.go) (`SearchAssetsByName` 函数)

## 请求参数

| 参数名 | 类型 | 是否必须 | 描述 |
| --- | --- | --- | --- |
| k | string | 是 | 搜索关键词，多个关键词可以用空格分隔。 |
| exts | array | 否 | 一个包含文件扩展名字符串的数组（例如 `[".png", ".jpg"]`），用于限定搜索的文件类型。如果为空或不提供，则搜索所有类型的资源文件。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 包含结果数据的对象。 |
| data.assets | array | 匹配到的资源文件信息对象数组。 |
| data.assets\[\].hName | string | 资源文件名，关键词会用 `<mark>` 标签高亮。 |
| data.assets\[\].path | string | 资源文件相对于 `data/` 目录的路径。 |
| data.assets\[\].updated | number | 文件最后更新时间戳 (秒)。 |
| data.k | string | 请求中传入的关键词 `k`。 |

请求示例

返回示例

### 请求示例 (搜索所有图片)

```json
{
  "k": "截图",
  "exts": [".png", ".jpg", ".jpeg", ".gif", ".bmp"]
}
```

### 请求示例 (搜索特定文件)

```json
{
  "k": "用户手册",
  "exts": [".pdf"]
}
```

### 返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "assets": [
      {
        "hName": "桌面<mark>截图</mark>_20231101.png",
        "path": "assets/桌面截图_20231101.png",
        "updated": 1667280000
      },
      {
        "hName": "项目<mark>截图</mark>.jpg",
        "path": "assets/项目截图.jpg",
        "updated": 1667193600
      }
    ],
    "k": "截图"
  }
}
```

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
