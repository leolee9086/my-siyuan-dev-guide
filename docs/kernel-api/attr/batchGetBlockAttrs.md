---
title: 批量获取块属性
---
# 端点

/api/attr/batchGetBlockAttrs

# 批量获取块属性

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/attr.go "查看源文件")

需要认证

## 接口描述

一次性获取多个指定块的所有命名属性。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| ids | string\[\] | 是 | 要获取属性的块 ID 列表。 |

## 返回值

返回一个对象，键是块 ID，值是该块的属性键值对对象。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 块 ID 到属性对象（{attrName: attrValue}）的映射。如果某个块不存在或没有属性，则对应的键值可能不存在或值为空对象 {}。 |

请求示例 (cURL)

返回示例

### 请求示例 (cURL)

```
curl -X POST \
  http://127.0.0.1:6806/api/attr/batchGetBlockAttrs \
  -H 'Authorization: Token YOUR_API_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "ids": ["20231027140000-abcdef1", "20231027140000-abcdef2"]
}'
```

### 返回示例

```
{
    "code": 0,
    "msg": "",
    "data": {
        "20231027140000-abcdef1": {
            "custom-attr1": "value1",
            "updated": "1678886400000"
        },
        "20231027140000-abcdef2": {
            "custom-attr2": "value2" 
        }
    }
}
```

