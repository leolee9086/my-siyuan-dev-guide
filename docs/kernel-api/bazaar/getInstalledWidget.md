---
title: getInstalledWidget
---

> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# 端点

/api/bazaar/getInstalledWidget

# getInstalledWidget

获取当前工作空间中\*\*已安装\*\*的挂件包列表。

**新手提示：** 这个 API 列出的是你已经下载到本地的挂件，而不是集市里所有可下载的挂件。方便你管理本地已安装的挂件资源。

**注意**: 此 API 需要认证。

## 地址

`POST /api/bazaar/getInstalledWidget`

## 请求体 (JSON)

```json
{
  "keyword": "可选的关键词"
}
```

-   `keyword`: (`string`) 可选。用于在已安装的挂件包中根据名称、作者或描述进行搜索。如果为空或不提供，则返回所有已安装的挂件包。

## 响应体 (JSON)

标准响应体，其中 \`data.packages\` 字段是一个数组，包含已安装的挂件包对象。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "packages": [
      {
        "name": "已安装挂件包名称",
        "author": "作者",
        "version": "版本号",
        "repoURL": "来源仓库地址", // 可能为空
        "repoHash": "来源仓库哈希", // 可能为空
        "description": "描述",
        "iconURL": "图标 URL",
        "displayName": "显示名称",
        "funding": [], // 赞助信息
        "localPath": "本地安装路径", // 相对于 data 目录
        // ... 可能还有其他字段
      }
      // ... 更多已安装的挂件包
    ]
  }
}
```

**注意:** \`packages\` 数组中每个对象的具体字段和结构取决于后端 \`model.InstalledWidgets\` 函数的实现。

## 示例

```javascript
// 获取所有已安装的挂件包
fetch('/api/bazaar/getInstalledWidget', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token YOUR_API_TOKEN' // 替换为你的 API Token
  },
  body: JSON.stringify({ keyword: "" })
})
.then(response => response.json())
.then(data => {
  if (data.code === 0) {
    console.log('获取已安装挂件包列表成功:', data.data.packages);
    // 处理 data.data.packages 列表
  } else {
    console.error('获取已安装挂件包列表失败:', data.msg);
  }
})
.catch(error => console.error('请求错误:', error));

// 搜索已安装的包含 "calendar" 关键词的挂件包
// fetch('/api/bazaar/getInstalledWidget', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Token YOUR_API_TOKEN' // 替换为你的 API Token
//   },
//   body: JSON.stringify({ keyword: "calendar" })
// })
// // ... 后续处理同上
```

## 在线测试

<script setup>
import apiTester from "@theme/components/ApiTester.vue"
</script>
<ClientOnly>
<apiTester
  title='测试 getInstalledWidget'
  endpoint='/api/bazaar/getInstalledWidget'
  method='POST'
  :params="[
    { name: 'keyword', label: '关键词', type: 'string', required: false, description: '可选。用于在已安装的挂件包中根据名称、作者或描述进行搜索。如果为空或不提供，则返回所有已安装的挂件包。' }
  ]"
/>
</ClientOnly>

### 通过辅助函数创建 MCP 工具示例

假设您已经在项目中引入了前文 [`快速创建与思源API交互的MCP工具`](../../guide/creating-mcp-siyuan-tools.md) 指南中定义的 `createSiyuanMcpToolDefinition` 辅助函数。
您可以使用它来快速为此 `/api/bazaar/getInstalledWidget` 端点创建一个 MCP 工具定义。

```typescript
// 假设 createSiyuanMcpToolDefinition 已经从您的工具辅助文件中导入
// import { createSiyuanMcpToolDefinition } from './path/to/siyuanToolHelper';
import { z } from 'zod';

// 为 /api/bazaar/getInstalledWidget 创建 MCP 工具
const getSiyuanInstalledWidgetsTool = createSiyuanMcpToolDefinition(
    'getSiyuanInstalledWidgets',
    '获取当前工作空间中已安装的挂件包列表，可根据关键词过滤。',
    '/api/bazaar/getInstalledWidget', // Siyuan API endpoint
    'POST',                          // Siyuan API method
    { // inputShape: 定义工具接收的参数
        keyword: z.string().optional().describe("可选的关键词，用于在已安装的挂件包中根据名称、作者或描述进行搜索。如果为空或不提供，则返回所有已安装的挂件包。")
    },
    async (siyuanApiResponse, toolArgs) => {
        // API 成功响应时, siyuanApiResponse.data 包含了 packages 数组
        if (siyuanApiResponse && siyuanApiResponse.data && siyuanApiResponse.data.packages) {
            const packages = siyuanApiResponse.data.packages;
            let message = `成功获取到 ${packages.length} 个已安装的挂件包。`;
            if (toolArgs.keyword && toolArgs.keyword.trim() !== '') {
                message = `根据关键词 \"${toolArgs.keyword}\" 成功获取到 ${packages.length} 个已安装的挂件包。`;
            }
            if (packages.length === 0) {
                message = toolArgs.keyword && toolArgs.keyword.trim() !== '' ? `未找到与关键词 \"${toolArgs.keyword}\" 匹配的已安装挂件包。` : '当前没有已安装的挂件包。';
            }
            return {
                content: [
                    { type: 'text', text: message },
                    { type: 'object', data: { packages } }
                ]
            };
        }
        // 处理 API 返回错误或数据格式不符的情况
        let errorMessage = '获取已安装挂件列表操作完成，但未从响应中提取到详细信息或列表为空。';
        if (siyuanApiResponse && siyuanApiResponse.msg) {
            errorMessage = `获取已安装挂件列表失败：${siyuanApiResponse.msg}`;
        }
        return {
            content: [{ type: 'text', text: errorMessage, style: 'error' }]
        };
    },
    'http://127.0.0.1:6806', // 默认思源 API URL
    'YOUR_SIYUAN_API_TOKEN'  // 请替换为您的思源 API Token 或留空以使用配置
);

// 然后您可以像这样将此工具注册到您的 McpServer:
// myMcpServer.tool(
//     getSiyuanInstalledWidgetsTool.name,
//     getSiyuanInstalledWidgetsTool.inputShape,
//     getSiyuanInstalledWidgetsTool.handler
// );

// 使用示例：
// const installedWidgets = await myMcpServer.callTool('getSiyuanInstalledWidgets', { keyword: 'calendar' });
// console.log(installedWidgets);
// const allInstalledWidgets = await myMcpServer.callTool('getSiyuanInstalledWidgets', {});
// console.log(allInstalledWidgets);

```
> **重要提示**: 在实际使用中，请确保 `createSiyuanMcpToolDefinition` 辅助函数已正确导入，并妥善管理您的思源 API Token，避免硬编码在代码中。建议通过环境变量或配置文件传递 Token。上面示例中的 `'YOUR_SIYUAN_API_TOKEN'` 仅为占位符。


> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
