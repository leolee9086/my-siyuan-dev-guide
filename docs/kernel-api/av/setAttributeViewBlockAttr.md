---
title: setAttributeViewBlockAttr
---
# 端点

/api/av/setAttributeViewBlockAttr

# setAttributeViewBlockAttr

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/av.go "查看源文件")

需要认证 需要管理员权限 需要写权限

## 接口描述

更新属性视图 (Attribute View) 中指定块（行）的某个属性（单元格）的值。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| avID | string | 是 | 属性视图的 ID。 |
| keyID | string | 是 | 要修改值的列 (Key) 的 ID。 |
| rowID | string | 是 | 要修改值的行 (Row) 的 ID，通常是关联块的 ID。 |
| cellID | string | 是 | 要修改值的单元格 (Cell) 的 ID。尽管可以通过 rowID 和 keyID 推断，但 API 仍要求显式传入。 |
| value | any | 是 | 要设置的新值。值的类型应与列定义的类型兼容。例如，对于数字列应传入 number，对于日期列应传入符合格式的 string 或 timestamp 等。 |

## 返回值

成功时返回更新后该行关联块的属性视图键信息，并通知前端刷新对应的属性视图。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 返回信息 |
| data | object | 返回更新后该行关联块的属性视图键信息（具体结构待确认，可能是一个包含键值对的对象）。 |

请求示例

返回示例 (可能结构)

### 请求示例 (更新文本列)

```
POST /api/av/setAttributeViewBlockAttr
Content-Type: application/json
Authorization: Token your-api-token

{
  "avID": "20231027150000-abcdefgh",
  "keyID": "key-text-1",
  "rowID": "20231029110000-blockid1",
  "cellID": "20231029110000-blockid1___key-text-1", 
  "value": "新的文本值"
}
```

### 请求示例 (更新数字列)

```
POST /api/av/setAttributeViewBlockAttr
Content-Type: application/json
Authorization: Token your-api-token

{
  "avID": "20231027150000-abcdefgh",
  "keyID": "key-number-1",
  "rowID": "20231029110000-blockid2",
  "cellID": "20231029110000-blockid2___key-number-1", 
  "value": 123.45
}
```

### 返回示例 (可能结构)

```
{
  "code": 0,
  "msg": "",
  "data": {
    // 返回的数据结构与 model.UpdateAttributeViewCell 的返回值相关
    // 可能包含更新后的块属性信息，例如：
    "key-text-1": {
        "type": "text",
        "text": {
            "content": "新的文本值"
        }
    }
    // ... 其他属性键
  }
}
```

