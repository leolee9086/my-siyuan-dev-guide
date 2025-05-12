---
title: 使用Sprig渲染模板
---
# 端点

/api/template/renderSprig

# 使用Sprig渲染模板

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/template.go "查看源文件")

需要认证

## 接口描述

使用 [Sprig 库](https://masterminds.github.io/sprig/) 提供的扩展函数来渲染 Go template 模板字符串。Sprig 提供了许多实用的模板函数，例如字符串操作、数学计算、日期处理等。

**注意：** 此接口与 \`/api/template/render\` 的区别在于它额外支持 Sprig 库的函数。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| template | string | 是 | 包含 Sprig 函数的模板字符串。 |
| data | string | 是 | 用于渲染模板的 JSON 字符串数据。 |

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
  http://127.0.0.1:6806/api/template/renderSprig \
  -H 'Authorization: Token YOUR_API_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "template": "你好，{{ .name | upper }}！今天是 {{ now | date \"2006-01-02\" }}。",
    "data": "{\"name\": \"siyuan\"}"
}'
```

### 返回示例

```
{
    "code": 0,
    "msg": "",
    "data": "你好，SIYUAN！今天是 2023-10-27。" 
}
```

