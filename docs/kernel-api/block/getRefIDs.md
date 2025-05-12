---
title: 获取引用块信息 (`/api/block/getRefIDs`)
---
# 端点

/api/block/getRefIDs

# 获取引用块信息 (\`/api/block/getRefIDs\`)

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block.go#L445) [返回块 API 列表](../pages/block.html) [返回 API 主页](../index.html)

## 接口描述

获取指定定义块 (defID) 的所有反向链接（引用块 refID）的信息。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 要查询其引用的定义块 ID。 |

## 返回值

返回一个标准的 API 响应 JSON 对象。

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | `0` 表示成功，非 `0` 表示失败。 |
| msg | string | 如果失败，则包含错误信息。 |
| data | object | null | 包含反向链接信息的对象。如果查询失败或没有反链，可能为 `null` 或包含空数组/映射。 对象结构如下: |

请求示例

成功响应

失败响应

### 请求示例

```json
POST /api/block/getRefIDs HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-api-token

{
  "id": "20200812220454-5w92b1s" 
}
```

### 成功响应示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "refDefs": [
      {
        "refID": "20210915150909-8c1x7b2", 
        "defIDs": ["20200812220454-5w92b1s"]
      },
      {
        "refID": "20220101100000-abcdefg", 
        "defIDs": ["20200812220454-5w92b1s"]
      },
      {
        "refID": "20230210183000-hijklmn", 
        "defIDs": ["20200812220454-5w92b1s"]
      }
    ],
    "originalRefBlockIDs": {
       "20230210183000-hijklmn": "20230210183015-opqrstu" 
    }
  }
}
```

在上面的示例中，`refID` 为 \`20230210183000-hijklmn\` 的项实际上代表的是其内部的段落块 \`20230210183015-opqrstu\` 包含了对 \`20200812220454-5w92b1s\` 的引用。

### 失败响应示例 (参数错误)

```json
{
  "code": -1,
  "msg": "json: cannot unmarshal string into Go struct field .id of type string",
  "data": null
}
```

## 备注

-   此接口用于查找一个块被哪些其他块引用了（反向链接）。
-   **重要:** 当一个引用块（例如 \`((...))\`）本身位于一个段落块中，且该段落是某个列表项、引述块或超级块的**唯一内容**时，返回的 \`refDefs\` 中的 \`refID\` 将会是这个父块（列表项/引述块/超级块）的 ID，而不是段落块的 ID。
-   为了区分这种情况，可以检查 `originalRefBlockIDs` 这个映射。如果 \`refDefs\` 中的某个 \`refID\` 在 \`originalRefBlockIDs\` 中作为键存在，那么它对应的值才是真正包含引用的那个段落块的 ID。

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

© 2024 思源笔记 API 文档 (社区维护)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
