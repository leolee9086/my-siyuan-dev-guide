---
title: 发布广播消息
---
# 端点

/api/broadcast/publish

# 发布广播消息

需要认证 管理员权限

## 接口描述

此 API 用于向一个或多个指定的广播频道推送（发布）多条消息。消息可以是字符串类型，也可以是二进制文件类型。

## 请求格式

`multipart/form-data`

请求体通过 multipart/form-data 格式传递，其中每个表单字段的 `name` 对应一个频道名称，`value` 可以是该频道的字符串消息，或者是一个文件作为二进制消息。

### 请求参数 (form-data)

-   **频道名称 (动态表单字段名)**: `string`
    
    表单的每个字段名代表一个频道名称。例如，如果要向名为 "updates" 的频道发送消息，则表单字段名应为 "updates"。
    
-   **消息内容 (表单字段值)**: `string` 或 `File`
    
    对应于频道名称字段的值：
    
    -   如果是字符串消息，则直接提供字符串内容。一个频道可以接收多个同名字段的字符串消息。
    -   如果是二进制消息，则上传一个文件。文件的原始文件名会被用作消息的一个标识。一个频道可以接收多个文件。

## 返回值

返回一个 JSON 对象，其中 `data.results` 数组包含了每条消息的发送结果。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示整体请求成功处理（具体每条消息的成功与否见 \`data.results\`） |
| msg | string | 错误信息，成功时为空字符串 |
| data | object | 包含发送结果的对象 |
|   ↳ results | array | 一个数组，每个元素代表一条消息的发送结果 |
|     ↳ code | number | 单条消息的发送结果码，0 表示成功 |
|     ↳ msg | string | 单条消息的发送错误信息 |
|     ↳ channel | object | 目标频道信息 |
|       ↳ name | string | 频道名称 |
|       ↳ count | number | 当前频道的订阅者数量 |
|     ↳ message | object | 已发送消息的描述信息 |
|       ↳ type | string | 消息类型，"string" 或 "binary" |
|       ↳ size | number | 消息大小 (字节) |
|       ↳ filename | string | 文件名 (如果是二进制消息) |

请求示例

返回示例

### 请求示例

向频道 "channel1" 发送字符串 "hello" 和 "world"，并向 "channel2" 发送文件 "data.bin":

```

POST /api/broadcast/publish HTTP/1.1
Host: 127.0.0.1:6806
Authorization: YOUR_API_TOKEN_HERE (如果需要)
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="channel1"

hello
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="channel1"

world
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="channel2"; filename="data.bin"
Content-Type: application/octet-stream

(这里是 data.bin 文件的二进制内容)
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

### 返回示例 (成功)

```

{
  "code": 0,
  "msg": "",
  "data": {
    "results": [
      {
        "code": 0,
        "msg": "",
        "channel": {
          "name": "channel1",
          "count": 1
        },
        "message": {
          "type": "string",
          "size": 5,
          "filename": ""
        }
      },
      {
        "code": 0,
        "msg": "",
        "channel": {
          "name": "channel1",
          "count": 1
        },
        "message": {
          "type": "string",
          "size": 5,
          "filename": ""
        }
      },
      {
        "code": 0,
        "msg": "",
        "channel": {
          "name": "channel2",
          "count": 1
        },
        "message": {
          "type": "binary",
          "size": 12345, // 假设文件大小为 12345 字节
          "filename": "data.bin"
        }
      }
    ]
  }
}
```

## 备注

-   如果目标频道不存在，但存在活动的 SSE (Server-Sent Events) 订阅者，则会自动创建该频道。
-   响应中的 `channel.count` 反映的是消息发送操作执行时，该频道的订阅者数量。

