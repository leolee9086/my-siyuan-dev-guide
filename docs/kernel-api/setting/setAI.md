---
title: 配置 AI 设置
---
# 端点

/api/setting/setAI

# 配置 AI 设置

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/setting.go#L161 "查看源文件")

需要认证 需要管理员 只读模式下不可用

## 接口描述

配置思源笔记的 AI 相关设置。你需要传入一个包含 AI 配置的对象。

## 请求参数

请求体是一个 JSON 对象，代表 \`conf.AI\` 结构。主要包含以下字段：

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| Provider | string | 是 | AI 服务提供商。常见值：\`OpenAI\`, \`Custom\` (自定义兼容 OpenAI 接口的服务)。 |
| OpenAI | object | 是 | OpenAI 或兼容接口的详细配置。 |
| OpenAI.APIKey | string | 是 | 你的 OpenAI API Key 或自定义服务的访问凭证。 |
| OpenAI.APIModel | string | 是 | 要使用的 AI 模型，例如 \`gpt-3.5-turbo\`, \`gpt-4\` 等。 |
| OpenAI.APIBaseURL | string | 否 | API 的基础 URL。对于 OpenAI 官方服务，通常留空或使用默认值。对于自定义或代理服务，需要指定。 |
| OpenAI.APITimeout | number | 否 | API 请求超时时间（秒）。有效范围 5-600，默认为系统设定值（通常较长）。 |
| OpenAI.APIMaxTokens | number | 否 | 限制 AI 回复生成的最大 token 数。0 表示不限制（使用模型默认值）。 |
| OpenAI.APITemperature | number | 否 | 控制生成文本的创造性/随机性。值在 0 到 2 之间，默认为 1.0。 |
| OpenAI.APIMaxContexts | number | 否 | 控制对话时传递给 AI 的历史上下文轮数。有效范围 1-64，默认为 7。 |

## 返回值

返回更新后的 AI 配置对象。

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 更新后的 \`conf.AI\` 对象，结构同请求参数。 |

请求示例 返回示例 在线测试

```json
{
  "Provider": "OpenAI",
  "OpenAI": {
    "APIKey": "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "APIModel": "gpt-3.5-turbo",
    "APIBaseURL": "",
    "APITimeout": 60,
    "APIMaxTokens": 0,
    "APITemperature": 0.8,
    "APIMaxContexts": 10
  }
}
```

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "Provider": "OpenAI",
    "OpenAI": {
      "APIKey": "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "APIModel": "gpt-3.5-turbo",
      "APIBaseURL": "",
      "APITimeout": 60,
      "APIMaxTokens": 0,
      "APITemperature": 0.8,
      "APIMaxContexts": 10
    }
  }
}
```

API Token: 

接口地址: 

请求方法: 

请求参数 (JSON): { "Provider": "OpenAI", "OpenAI": { "APIKey": "YOUR\_API\_KEY", "APIModel": "gpt-3.5-turbo", "APIBaseURL": "", "APITimeout": 60, "APIMaxTokens": 0, "APITemperature": 1.0, "APIMaxContexts": 7 } }

发送请求

