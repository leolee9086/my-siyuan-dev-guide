---
title: HTML转块DOM
---
# 端点

/api/lute/html2BlockDOM

# HTML转块DOM

需要认证

## 接口描述

将输入的HTML文本转换为思源笔记内部使用的块DOM（Document Object Model）结构。这对于需要将外部HTML内容导入并解析为思源块结构的场景非常有用。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| html | string | 是 | 要转换的HTML文本 |
| id | string | 否 | 指定生成的根块ID（可选，若不提供则自动生成） |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 转换后的块DOM结构 (JSON格式) |
| data.id | string | 根块ID |
| data.type | string | 根块类型 (通常是'NodeDocument') |
| data.children | array | 子块列表，每个子块包含ID, 类型, 内容, 属性等信息 |

请求示例

返回示例

### 请求示例

```
POST /api/lute/html2BlockDOM HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "html": "<h1>标题1</h1><p>段落内容。</p><ul><li>列表项</li></ul>"
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "id": "20240418001000-abcdefg", // 示例ID，实际会生成
    "type": "NodeDocument",
    "children": [
      {
        "id": "20240418001000-hijklmn",
        "type": "NodeHeading",
        "spec": "h1",
        "children": [
          {
            "type": "NodeText",
            "text": {
              "content": "标题1"
            }
          }
        ]
      },
      {
        "id": "20240418001000-opqrstu",
        "type": "NodeParagraph",
        "children": [
          {
            "type": "NodeText",
            "text": {
              "content": "段落内容。"
            }
          }
        ]
      },
      {
        "id": "20240418001000-vwxyz01",
        "type": "NodeList",
        "spec": "ul",
        "children": [
          {
            "id": "20240418001000-2345678",
            "type": "NodeListItem",
            "children": [
              {
                 "id": "20240418001000-9abcdef",
                 "type": "NodeParagraph",
                 "children": [
                    {
                        "type": "NodeText",
                        "text": {
                            "content": "列表项"
                        }
                    }
                 ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

