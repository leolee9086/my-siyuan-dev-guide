---
title: 快速创建与思源API交互的MCP工具
---

# 快速创建与思源API交互的MCP工具

在将思源笔记的强大功能集成到您的 MCP (Model Context Protocol) 应用中时，您可能需要将许多思源的 HTTP API 封装为标准的 MCP 工具。为了简化这一过程，我们提供一个辅助函数 `createSiyuanMcpToolDefinition`，您可以将其复制到您的项目中，用它来快速生成 MCP 工具的定义。

此辅助函数旨在与 `@modelcontextprotocol/sdk` 中的 `McpServer` 配合使用，用于注册**非 HUI (Human-User Interface) 的纯 MCP 工具**。

## 辅助函数：`createSiyuanMcpToolDefinition`

以下是辅助函数的 TypeScript 源代码。您可以将其复制到您的项目中，例如放在一个 `utils/siyuanToolHelper.ts` 文件里。

```typescript
import { z, ZodRawShape, ZodTypeAny } from 'zod';
import { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js'; // 调整为实际的McpServer中ToolCallback的导入路径
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js'; // 调整为实际的McpError等的导入路径

// 假设您有一个通用的思源 API 调用函数，类似这样：
// 您需要根据您的项目调整此函数的实现或导入
async function callSiyuanAPI<T = any>(
    kernelServePath: string,
    accessToken: string | undefined,
    endpoint: string,
    payload?: any,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'POST'
): Promise<T> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (accessToken) {
        headers['Authorization'] = `Token ${accessToken}`;
    }

    let fullUrl = `${kernelServePath}${endpoint}`;
    const fetchOptions: RequestInit = {
        method,
        headers,
    };

    if (method === 'GET' && payload && typeof payload === 'object') {
        const params = new URLSearchParams();
        for (const key in payload) {
            if (Object.prototype.hasOwnProperty.call(payload, key)) {
                params.append(key, payload[key]);
            }
        }
        if (params.toString()) {
            fullUrl += `?${params.toString()}`;
        }
    } else if (payload !== undefined && method !== 'GET') {
        fetchOptions.body = JSON.stringify(payload);
    }
    
    console.log(`[callSiyuanAPI] Request: ${method} ${fullUrl} Payload:`, payload);

    const response = await fetch(fullUrl, fetchOptions);
    
    console.log(`[callSiyuanAPI] Response Status: ${response.status}`);

    if (response.status === 204) { // No Content
        return undefined as T;
    }

    let responseDataText: string | null = null;
    try {
        responseDataText = await response.text();
    } catch (e) {
        // 如果读取text失败，但状态码指示成功，可能是一个确实没有body的成功响应
        if (response.ok) return undefined as T;
        // 否则，抛出读取text的错误
        throw new McpError(ErrorCode.NetworkError, `Siyuan API call failed for ${method} ${endpoint}: Failed to read response text, status ${response.status}`);
    }

    if (!response.ok) {
        console.error(`[callSiyuanAPI] Error Response Text for ${method} ${endpoint}:`, responseDataText);
        let errorMsg = `Siyuan API call failed: ${response.status} ${response.statusText}`;
        try {
            const errorJson = JSON.parse(responseDataText);
            errorMsg += ` - ${errorJson.msg || errorJson.message || 'Unknown API error'}`;
        } catch (e) {
            // Not a JSON error response, use the text if available
            errorMsg += ` - Response: ${responseDataText || '(empty response body)'}`;
        }
        throw new McpError(ErrorCode.UpstreamError, errorMsg);
    }

    if (!responseDataText) { // 应该在 204 之后，但作为额外检查
        return undefined as T;
    }

    try {
        const jsonData = JSON.parse(responseDataText);
        // 检查是否是思源标准响应格式
        if (typeof jsonData === 'object' && jsonData !== null && 
            'code' in jsonData && 'msg' in jsonData && 'data' in jsonData) {
            if (jsonData.code !== 0) {
                console.error(`[callSiyuanAPI] Siyuan API Error for ${method} ${endpoint}:`, jsonData);
                throw new McpError(ErrorCode.UpstreamError, `Siyuan API error for ${method} ${endpoint} (code ${jsonData.code}): ${jsonData.msg}`);
            }
            return jsonData.data as T;
        }
        // 如果不是标准格式但请求成功，直接返回解析的JSON
        return jsonData as T;
    } catch (e) {
        console.error(`[callSiyuanAPI] Failed to parse Siyuan API response as JSON for ${method} ${endpoint}. Response text:`, responseDataText, e);
        // 如果解析失败，但HTTP状态码是成功的，可能返回的是非JSON的文本
        // 对于期望JSON的调用者，这里应该视为错误。但如果允许纯文本，可以返回 responseDataText
        throw new McpError(ErrorCode.OutputParsingError, `Failed to parse Siyuan API response as JSON for ${method} ${endpoint}.`);
    }
}


interface SiyuanToolDefinition<InputShape extends ZodRawShape> {
    name: string;
    description: string;
    inputShape: InputShape;
    handler: ToolCallback<InputShape>; // McpServer.tool 所需的 Handler 类型
}

/**
 * 创建一个 MCP 工具定义，用于与思源 API 交互。
 *
 * @param toolName 工具的唯一名称。
 * @param toolDescription 工具的描述信息。
 * @param siyuanApiEndpoint 要调用的思源 API 端点 (例如 "/api/notebook/lsNotebooks")。
 * @param siyuanApiMethod 调用思源 API 的 HTTP 方法 (GET, POST, PUT, DELETE)。
 * @param inputShape 定义工具输入参数的 ZodRawShape。
 * @param transformSiyuanResponse 一个回调函数，接收从思源 API 返回的 data 部分、
 *                                工具的原始输入参数和 MCP 的 extra 上下文对象。
 *                                它需要将思源的响应数据转换为 MCP 工具期望的输出格式。
 * @param defaultSiyuanApiUrl 可选的默认思源 API URL。
 * @param defaultSiyuanApiToken 可选的默认思源 API Token。
 * @returns 一个包含 name, description, inputShape 和 handler 的对象，可用于 McpServer.tool() 注册。
 */
export function createSiyuanMcpToolDefinition<
    InputShape extends ZodRawShape,
    SiyuanResponseData = any,
    McpOutputContent extends Array<{ type: 'text'; text: string } | {type: 'object'; data: any; [key: string]: any;}> = Array<{ type: 'text'; text: string }>
>(
    toolName: string,
    toolDescription: string,
    siyuanApiEndpoint: string,
    siyuanApiMethod: 'GET' | 'POST' | 'PUT' | 'DELETE',
    inputShape: InputShape,
    transformSiyuanResponse: (
        siyuanData: SiyuanResponseData,
        toolArgs: z.infer<ZodObject<InputShape>>, // 推断出的工具参数类型
        extra: any // MCP ToolCallback 提供的 extra 对象
    ) => Promise<{ content: McpOutputContent }>,
    defaultSiyuanApiUrl: string = 'http://127.0.0.1:6806',
    defaultSiyuanApiToken?: string
): SiyuanToolDefinition<InputShape> {
    
    const handler: ToolCallback<InputShape> = async (args, extra) => {
        // 从 extra 或环境变量中获取 API URL 和 Token
        // 这里的 'extra.config' 是一个假设，您需要根据您的 McpServer 设置调整
        const apiUrl = extra?.config?.siyuanApiUrl || process.env.SIYUAN_API_URL || defaultSiyuanApiUrl;
        const apiToken = extra?.config?.siyuanApiToken || process.env.SIYUAN_API_TOKEN || defaultSiyuanApiToken;

        if (!apiUrl) {
            throw new McpError(ErrorCode.ConfigurationError, "Siyuan API URL is not configured.");
        }
        // 注意：某些API可能不需要Token，callSiyuanAPI 应能处理 token 为 undefined 的情况

        try {
            const siyuanResponseData = await callSiyuanAPI<SiyuanResponseData>(
                apiUrl,
                apiToken,
                siyuanApiEndpoint,
                args, // 将工具的参数直接作为 payload 传递给 callSiyuanAPI
                siyuanApiMethod
            );

            // 调用用户提供的转换函数来处理思源的响应
            return transformSiyuanResponse(siyuanResponseData, args, extra);
        } catch (error) {
            if (error instanceof McpError) {
                // 如果已经是 McpError，直接重新抛出
                throw error;
            }
            // 其他类型的错误，包装成 McpError
            console.error(`[${toolName} Handler] Error during Siyuan API call or data transformation:`, error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error in tool handler';
            throw new McpError(ErrorCode.InternalError, `Tool ${toolName} failed: ${errorMessage}`);
        }
    };

    return {
        name: toolName,
        description: toolDescription,
        inputShape,
        handler,
    };
}
```

### 参数详解

*   `toolName: string`
    *   您的工具在 MCP 服务器中注册的唯一名称。
*   `toolDescription: string`
    *   关于工具功能的简短描述。
*   `siyuanApiEndpoint: string`
    *   您希望此工具调用的思源 HTTP API 的端点路径。例如：`/api/system/version` 或 `/api/notebook/lsNotebooks`。
*   `siyuanApiMethod: 'GET' | 'POST' | 'PUT' | 'DELETE'`
    *   调用上述思源 API 端点时使用的 HTTP 方法。
*   `inputShape: ZodRawShape`
    *   一个符合 Zod `RawShape` 格式的对象，用于定义此 MCP 工具期望接收的输入参数及其类型。例如：`{ noteId: z.string().describe("要获取内容的笔记ID") }`。如果工具不需要参数，可以传入空对象 `{}`。
*   `transformSiyuanResponse: (siyuanData: SiyuanResponseData, toolArgs: z.infer<ZodObject<InputShape>>, extra: any) => Promise<{ content: McpOutputContent }>`
    *   这是一个核心的回调函数，由您来实现。
    *   **`siyuanData`**: 这是从 `callSiyuanAPI` 函数成功调用思源 API后，从标准响应结构 (`{code, msg, data}`) 中提取的 `data` 部分。其类型 `SiyuanResponseData` 可以是 `any`，或者您根据特定 API 的返回类型来指定。
    *   **`toolArgs`**: 这是传递给当前 MCP 工具的、经过 Zod 校验和类型推断后的参数对象。
    *   **`extra`**: 这是 MCP `ToolCallback` 提供的 `extra` 上下文对象，可能包含服务器实例、配置信息等。
    *   此函数**必须**返回一个 Promise，该 Promise 解析为一个符合 MCP 工具输出格式的对象，通常是 `{ content: [{ type: 'text', text: '...' }] }` 或包含更复杂对象的数组。`McpOutputContent` 泛型参数允许您定义更具体的输出类型。
*   `defaultSiyuanApiUrl: string` (可选)
    *   默认的思源内核服务地址，默认为 `http://127.0.0.1:6806`。
*   `defaultSiyuanApiToken?: string` (可选)
    *   默认的思源 API Token。

### `callSiyuanAPI` 辅助函数说明

上面提供的 `createSiyuanMcpToolDefinition` 依赖一个名为 `callSiyuanAPI` 的函数。这个函数封装了实际调用思源 HTTP API 的逻辑，包括：
-   设置 `Content-Type` 和 `Authorization` (如果提供了 Token) 请求头。
-   根据 HTTP 方法 (GET/POST等) 处理 `payload` (GET请求时转换为查询参数，其他方法时作为 JSON 请求体)。
-   执行 `fetch` 请求。
-   处理响应：
    -   检查 HTTP 状态码，非 2xx 抛出错误。
    -   处理 204 No Content 情况。
    -   尝试将响应体解析为 JSON。
    -   如果响应是思源的标准格式 (`{code, msg, data}`)，则检查 `code` 是否为 0。若非 0，则抛出包含 `msg` 的错误；否则，返回 `data` 部分。
    -   如果响应不是思源标准格式但请求成功，则直接返回解析后的 JSON 对象。

**重要**: 您需要将此 `callSiyuanAPI` 函数的实现集成到您的项目中，或者替换为您项目中已有的、功能类似的思源 API 调用函数。确保其导入路径在 `createSiyuanMcpToolDefinition` 中是正确的。

## 使用示例

假设您想创建一个 MCP 工具来获取当前思源笔记的版本。

1.  **准备 `createSiyuanMcpToolDefinition` 和 `callSiyuanAPI`**
    确保这两个函数已在您的项目中可用（例如，已复制到 `utils/siyuanToolHelper.ts` 并正确配置了导入）。

2.  **定义工具**

    ```typescript
    // In your tool registration file (e.g., tools.ts or mcpServerSetup.ts)
    import { z } from 'zod';
    import { createSiyuanMcpToolDefinition } from './utils/siyuanToolHelper'; // 调整路径
    import { McpServer } from '@modelcontextprotocol/sdk/server'; // 调整路径

    // 示例 1: 获取思源版本 (无输入参数)
    const getSiyuanVersionTool = createSiyuanMcpToolDefinition(
        'getSiyuanVersion',
        '获取当前思源笔记的版本号。',
        '/api/system/version', // Siyuan API endpoint
        'POST',                 // Siyuan API method (根据文档，version是POST)
        {},                     // No input parameters for this tool
        async (siyuanData: string) => { // Siyuan的 /api/system/version 返回的 data 是版本字符串
            return {
                content: [{ type: 'text', text: `思源笔记版本: ${siyuanData}` }]
            };
        }
    );

    // 示例 2: 根据ID获取笔记的Markdown内容 (需要输入参数)
    const getNoteMarkdownByIdTool = createSiyuanMcpToolDefinition(
        'getNoteMarkdownById',
        '根据提供的块ID获取其Markdown内容。',
        '/api/export/exportMdContent',
        'POST',
        { // inputShape: 定义工具接收的参数
            blockId: z.string().min(1, "blockId 不能为空").describe("要导出Markdown的块ID")
        },
        async (siyuanData: { hPath: string; markdown: string }, toolArgs) => {
            // /api/export/exportMdContent 返回的 data 包含 hPath 和 markdown
            return {
                content: [
                    { type: 'text', text: `笔记 "${toolArgs.blockId}" (路径: ${siyuanData.hPath}) 的Markdown内容如下：` },
                    { type: 'text', text: siyuanData.markdown }
                ]
            };
        }
        // 可以为这个工具提供特定的默认Token或URL，如果它需要不同于全局的配置
        // 'http://127.0.0.1:6806',
        // 'your-specific-token-if-needed'
    );

    // 3. 注册到 McpServer 实例
    // (这部分代码通常在您的主服务启动脚本中)
    // const myMcpServer = new McpServer({ name: 'MyApplicationServer', version: '1.0.0' });
    
    // myMcpServer.tool(
    //     getSiyuanVersionTool.name,
    //     getSiyuanVersionTool.inputShape, // 直接使用生成的 inputShape
    //     getSiyuanVersionTool.handler    // 直接使用生成的 handler
    // );
    
    // myMcpServer.tool(
    //     getNoteMarkdownByIdTool.name,
    //     getNoteMarkdownByIdTool.inputShape,
    //     getNoteMarkdownByIdTool.handler
    // );

    // console.log('已注册自定义思源MCP工具！');
    
    // ... 启动您的 McpServer ...
    ```

### 如何在 `handler` 中获取 API URL 和 Token?

`createSiyuanMcpToolDefinition` 生成的 `handler` 会尝试通过以下顺序获取思源 API URL 和 Token：
1.  `extra.config.siyuanApiUrl` / `extra.config.siyuanApiToken` (假设您在 `McpServer` 的 `extra` 上下文中传递了这些配置)。
2.  环境变量 `process.env.SIYUAN_API_URL` / `process.env.SIYUAN_API_TOKEN`。
3.  函数调用时传入的 `defaultSiyuanApiUrl` / `defaultSiyuanApiToken`。

您需要根据您项目的实际配置方式调整 `handler` 内部获取 URL 和 Token 的逻辑，或者确保 `extra.config` 中包含这些值。

## 注意事项

-   **错误处理**: `callSiyuanAPI` 函数和生成的 `handler` 都包含基础的错误处理，会将错误包装为 `McpError`。您可以在 `transformSiyuanResponse` 中根据需要添加更细致的错误处理逻辑。
-   **依赖导入**: 请确保 `zod`, `@modelcontextprotocol/sdk/server/mcp.js` 和 `@modelcontextprotocol/sdk/types.js` 的导入路径与您项目中的实际路径一致。
-   **`callSiyuanAPI` 的通用性**: 提供的 `callSiyuanAPI` 是一个相对通用的版本。如果您的项目中有更完善或定制化的思源 API 调用函数，请优先使用您自己的，并相应调整 `createSiyuanMcpToolDefinition` 中调用它的部分。
-   **类型安全**: 利用 TypeScript 的泛型，您可以为 `SiyuanResponseData` 和 `McpOutputContent` 提供更精确的类型，以增强类型安全。

通过这个辅助函数，您可以更专注于定义工具的业务逻辑（如何处理思源数据并转换为MCP输出），而不是重复编写与思源API交互的模板代码。 