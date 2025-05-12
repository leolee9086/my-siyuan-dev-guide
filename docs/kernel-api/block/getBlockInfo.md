---
title: 获取块信息
---
# 端点

/api/block/getBlockInfo

# 获取块信息

需要认证

## 接口描述

获取指定块的基本信息，包括所属笔记本、文档路径、根文档 ID 及标题等。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 块 ID |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 错误信息，成功时为空 |
| data | object | 块信息数据 |
| data.box | string | 笔记本 ID |
| data.path | string | 文档路径 |
| data.rootID | string | 根文档 ID |
| data.rootTitle | string | 根文档标题 |
| data.rootChildID | string | 根文档第一级子块 ID |
| data.rootIcon | string | 根文档图标 |

请求示例

返回示例

### 请求示例

```
POST /api/block/getBlockInfo HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-api-token

{
  "id": "20220714215400-dd0jbge"
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "box": "20220714215400-dd0jbge",
    "path": "/20220714215400-dd0jbge.sy",
    "rootID": "20220714215400-dd0jbge",
    "rootTitle": "文档标题",
    "rootChildID": "20220714215400-dd0jbge",
    "rootIcon": "1f4dd"
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
