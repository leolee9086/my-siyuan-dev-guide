---
title: 渲染模板
---
# 端点

/api/template/render

# 渲染模板

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/template.go "查看源文件")

需要认证

## 接口描述

使用 Go template 语法渲染给定的模板字符串。模板中可以包含变量、条件判断、循环等。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| path | string | 是 | 模板文件的绝对路径。 |
| data | string | 是 | 用于渲染模板的 JSON 字符串数据。 |
| id | string | 否 | 关联的块 ID，用于模板内部获取上下文信息（例如 `\{\{.Block.ID\}\}`）。 |

## 返回值

返回渲染后的结果字符串。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | string | 渲染后的模板内容。 |

请求示例 (cURL)

返回示例

### 请求示例 (cURL)

```
curl -X POST \
  http://127.0.0.1:6806/api/template/render \
  -H 'Authorization: Token YOUR_API_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "path": "/Users/user/Documents/SiYuan/templates/my_template.md",
    "data": "{\"name\": \"思源笔记\", \"version\": \"3.0.0\"}",
    "id": "20231027160000-abcdef"
}'
```

假设 \`my\_template.md\` 内容为：

```
你好，\{\{.name\}\}！当前版本是 \{\{.version\}\}。关联块ID：\{\{.Block.ID\}\}
```

### 返回示例

```json
{
    "code": 0,
    "msg": "",
    "data": "你好，思源笔记！当前版本是 3.0.0。关联块ID：20231027160000-abcdef"
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
