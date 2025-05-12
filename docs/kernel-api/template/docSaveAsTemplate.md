---
title: 文档保存为模板
---
# 端点

/api/template/docSaveAsTemplate

# 文档保存为模板

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/template.go "查看源文件")

需要认证 需要管理员权限

## 接口描述

将指定文档的内容保存为一个新的模板文件。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 要作为模板保存的文档块 ID。 |
| name | string | 是 | 新模板的文件名（不含扩展名，例如 \`my-template\`）。 |
| content | string | 是 | 要保存为模板的内容（通常是文档的 Markdown 文本）。 |

## 返回值

操作成功时不返回 \`data\`。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | null | 成功时为 null |

请求示例 (cURL)

返回示例

### 请求示例 (cURL)

```
curl -X POST \
  http://127.0.0.1:6806/api/template/docSaveAsTemplate \
  -H 'Authorization: Token YOUR_API_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "id": "20231027163000-docid",
    "name": "我的文档模板",
    "content": "# 这是一个模板\n\n模板内容..."
}'
```

### 返回示例

```
{
    "code": 0,
    "msg": "",
    "data": null
}
```

