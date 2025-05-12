---
title: 转移块引用 API (`/api/block/transferBlockRef`)
---
# 端点

/api/block/transferBlockRef

# 转移块引用 API (\`/api/block/transferBlockRef\`)

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block.go#L68) [返回块 API 列表](../pages/block.html) [返回 API 主页](../index.html)

## 接口描述

该接口用于将所有对源块（\`fromID\`）的引用转移到目标块（\`toID\`）。

执行后，所有原来引用 \`fromID\` 的块将改为引用 \`toID\`。原来引用 \`toID\` 的块保持不变。

与 [\`swapBlockRef\`](swapBlockRef.html) 不同，这是一个单向的引用转移。

## 请求

**方法:** POST

**路径:** \`/api/block/transferBlockRef\`

**认证:** 需要 Token

### 请求体 (JSON)

| 参数 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| \`fromID\` | string | 是 | 源块的 ID，即被替换引用的块。 |
| \`toID\` | string | 是 | 目标块的 ID，即新的引用目标。 |

### 请求示例

```json
{
    "fromID": "20230517100000-abcdefgh",
    "toID": "20230517100000-ijklmnop"
}
```

## 响应

### 成功响应 (200 OK)

成功转移引用后，返回一个空数据对象。

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

### 失败响应

如果请求失败（例如，ID 无效或块不存在），将返回错误信息。

```json
{
    "code": -1,
    "msg": "Invalid block ID pattern [无效的ID]", // 或 "Block not found [id=...]"
    "data": null
}
```

## 在线测试

fromID (必填): 

toID (必填): 

发送请求

### 测试结果:

© 2023 Siyuan Note API 文档

