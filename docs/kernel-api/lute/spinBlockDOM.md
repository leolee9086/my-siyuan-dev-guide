---
title: 处理块级 DOM (spinBlockDOM)
---
# 端点

/api/lute/spinBlockDOM

# 处理块级 DOM (spinBlockDOM)

需要认证

## 接口描述

接收一个块级 DOM 字符串，使用 Lute 引擎的 `SpinBlockDOM` 方法对其进行处理，并返回处理后的 DOM 字符串。

此方法通常用于规范化、优化或转换编辑器中的 DOM 结构。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| dom | string | 是 | 要处理的块级 DOM 字符串。 |

## 返回值

返回标准的 JSON 结构：

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功，其他表示失败。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 成功时，包含处理结果。 |
| data.dom | string | 经过 Lute 引擎处理后的块级 DOM 字符串。 |

请求示例

返回示例

### 请求示例 (JSON)

```
{
  "dom": "这是一个需要处理的段落。"
}
```

### 成功返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "dom": "这是一个需要处理的段落。" 
  }
}
```

### 失败返回示例 (例如，请求体为空)

```
{
  "code": -1, 
  "msg": "JSON parse error: unexpected end of JSON input", 
  "data": null
}
```

