---
title: 追加块
---
# 端点

/api/block/appendBlock

# 追加块

需要认证

## 接口描述

该接口用于在一个指定的父块内容的末尾追加一个新的块。

## 实现链接

-   后端路由: [siyuan/kernel/api/router.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/router.go)
-   处理函数: [siyuan/kernel/api/block\_op.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/block_op.go#L361) (`appendBlock` 函数)

## 请求参数

| 参数名 | 类型 | 是否必须 | 描述 |
| --- | --- | --- | --- |
| data | string | 是 | 要追加的块的内容。 |
| dataType | string | 是 | 数据类型，可选值为 'markdown' 或 'dom'。如果为 'markdown'，服务器会自动转换为 'dom'。 |
| parentID | string | 是 | 目标父块的 ID。 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 包含执行的操作事务信息的对象。 |
| data.transactions | array | 事务数组。 |
| data.transactions\[\].doOperations | array | 执行的操作数组。 |
| data.transactions\[\].doOperations\[\].action | string | 操作类型，例如 "appendInsert"。 |
| data.transactions\[\].doOperations\[\].id | string | 新生成的块的 ID。 |
| data.transactions\[\].doOperations\[\].data | string | 新生成的块的 DOM 内容。 |
| data.transactions\[\].doOperations\[\].parentID | string | 父块 ID。 |

请求示例

返回示例

### 请求示例 (Markdown)

```json
{
  "data": "这是要追加的 Markdown 内容",
  "dataType": "markdown",
  "parentID": "20230517100000-ijklmnop"
}
```

### 请求示例 (DOM)

```json
{
  "data": "<div data-type=\"NodeParagraph\" data-node-id=\"20230518100000-uvwxyzab\">这是要追加的 DOM 内容</div>",
  "dataType": "dom",
  "parentID": "20230517100000-ijklmnop"
}
```

### 返回示例 (成功)

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "transactions": [
      {
        "doOperations": [
          {
            "action": "appendInsert",
            "id": "20230518100000-abcdefg1",
            "data": "<div data-type=\"NodeParagraph\" data-node-id=\"20230518100000-abcdefg1\">这是要追加的 Markdown 内容</div>",
            "parentID": "20230517100000-ijklmnop"
          }
        ]
      }
    ]
  }
}
```

### 返回示例 (失败)

```json
{
  "code": -1,
  "msg": "Invalid block ID pattern [无效的父ID]",
  "data": null
}
```

### 通过辅助函数创建 MCP 工具示例

假设您已经在项目中引入了前文 [`快速创建与思源API交互的MCP工具`](../../guide/creating-mcp-siyuan-tools.md) 指南中定义的 `createSiyuanMcpToolDefinition` 辅助函数。
您可以使用它来快速为此 `/api/block/appendBlock` 端点创建一个 MCP 工具定义。

```typescript
// 假设 createSiyuanMcpToolDefinition 已经从您的工具辅助文件中导入
// import { createSiyuanMcpToolDefinition } from './path/to/siyuanToolHelper';
import { z } from 'zod';

// 为 /api/block/appendBlock 创建 MCP 工具
const appendSiyuanBlockTool = createSiyuanMcpToolDefinition(
    'appendSiyuanBlock',
    '在指定的父块末尾追加新的内容块。',
    '/api/block/appendBlock', // Siyuan API endpoint
    'POST',                   // Siyuan API method
    { // inputShape: 定义工具接收的参数，与 API 文档一致
        data: z.string().describe("要追加的块的内容。"),
        dataType: z.enum(['markdown', 'dom']).describe("数据类型，'markdown' 或 'dom'。"),
        parentID: z.string().min(1, "parentID 不能为空").describe("目标父块的 ID。")
    },
    async (siyuanData, toolArgs) => {
        // /api/block/appendBlock 成功时返回的 data 结构如下：
        // interface SiyuanAppendBlockResponse {
        //     transactions: Array<{
        //         doOperations: Array<{
        //             action: string;
        //             id: string;     // 新块的 ID
        //             data: string;   // 新块的 DOM 内容
        //             parentID: string;
        //         }>;
        //     }>;
        // }
        
        // 我们可以提取新块的 ID 和内容进行返回
        if (siyuanData && siyuanData.transactions && siyuanData.transactions[0] && siyuanData.transactions[0].doOperations && siyuanData.transactions[0].doOperations[0]) {
            const newBlock = siyuanData.transactions[0].doOperations[0];
            return {
                content: [
                    { type: 'text', text: `成功在父块 ${toolArgs.parentID} 下追加了新块。` },
                    { type: 'object', data: { newBlockId: newBlock.id, newBlockContent: newBlock.data, parentId: newBlock.parentID } }
                ]
            };
        }
        return {
            content: [{ type: 'text', text: '块已追加，但未从响应中提取到详细信息。' }]
        };
    },
    'http://127.0.0.1:6806', // 默认思源 API URL
    'ubux6nysmb1w0drm'       // 演示用的默认思源 API Token
);

// 然后您可以像这样将此工具注册到您的 McpServer:
// myMcpServer.tool(
//     appendSiyuanBlockTool.name,
//     appendSiyuanBlockTool.inputShape,
//     appendSiyuanBlockTool.handler
// );
```

**注意**：

-   上述代码中的 `createSiyuanMcpToolDefinition` 和 `callSiyuanAPI` (被前者内部调用) 的具体实现，请参考 `my-siyuan-dev-guide/docs/guide/creating-mcp-siyuan-tools.md` 文档。
-   示例中的 `defaultSiyuanApiToken` 使用了您提供的 `'ubux6nysmb1w0drm'` 作为演示。在实际应用中，请确保 Token 的安全管理。
-   `transformSiyuanResponse` 回调函数解析了 `/api/block/appendBlock` 成功时的响应，并提取了新块的 ID 和内容。您可以根据需要调整返回给 MCP 客户端的信息。

