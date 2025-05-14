---
title: 获取全局关系图
---
> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)



# 端点

/api/graph/getGraph

[← 返回 Graph API 列表](../pages/graph.html)

# 获取全局关系图

[在 GitHub 上查看源码](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/graph.go#L50)

`POST /api/graph/getGraph`

## 描述

获取整个工作空间的全局关系图数据（节点和边）。可以提供关键词和配置项来过滤和定制关系图的显示。

此 API 会根据传入的 `conf` 参数更新并保存全局关系图的配置。

## 请求参数

请求体需要是 JSON 格式。

| 参数名 | 类型 | 描述 | 必需 |
| --- | --- | --- | --- |
| `k` | `string` | 搜索关键词，用于过滤关系图中的节点。空字符串表示不过滤。 | 是 |
| `conf` | `object` | 关系图配置对象，用于定制关系图的生成。具体字段可参考思源笔记关系图设置面板|是| 
| `reqId` | `any` | 请求标识符，会原样返回在响应中。 | 是 |

### `conf` 对象详情

`conf` 对象用于定制关系图的生成，其结构对应后端的 `GlobalGraph` 配置。它包含以下字段：

| 参数名             | 类型                                 | 描述                                                                 |
|--------------------|--------------------------------------|----------------------------------------------------------------------|
| `minRefs`          | `number`                             | 节点被引次数下限，低于此数量的节点将被隐藏。默认为 `0`（不限制）。            |
| `dailyNote`        | `boolean`                            | 是否显示来自日记的节点。默认为 `false`。                                |
| `type`             | `object`                             | 一个对象，用于按类型过滤节点。其内嵌字段见下方 `type 对象详情`。           |
| `d3`               | `object`                             | 一个对象，包含与 D3.js 力导向图相关的可视化配置。其内嵌字段见下方 `d3 对象详情`。 |

#### `type` 对象详情

`type` 对象内的所有字段均为 `boolean` 类型，用于控制是否显示对应类型的节点。默认为 `false` (即不显示该类型节点，除非设置为 `true`)。但实际默认值可能由 `conf.NewGlobalGraph()` 初始化决定，具体需参考后端实现。

| `type` 内参数名 | 类型    | 描述                         |
|-----------------|---------|------------------------------|
| `tag`           | `boolean` | 是否显示标签节点。             |
| `paragraph`     | `boolean` | 是否显示段落节点。             |
| `heading`       | `boolean` | 是否显示标题节点。             |
| `math`          | `boolean` | 是否显示数学公式块节点。       |
| `code`          | `boolean` | 是否显示代码块节点。           |
| `table`         | `boolean` | 是否显示表格节点。             |
| `list`          | `boolean` | 是否显示列表节点。             |
| `listItem`      | `boolean` | 是否显示列表项节点。           |
| `blockquote`    | `boolean` | 是否显示引述块节点。           |
| `super`         | `boolean` | 是否显示超级块 (Super Block) 节点。 |

#### `d3` 对象详情

`d3` 对象用于调整关系图的视觉表现和物理模拟参数。

| `d3` 内参数名     | 类型    | 描述                                       | 默认值 (参考 `newD3()`) |
|-------------------|---------|--------------------------------------------|-----------------------|
| `nodeSize`        | `number`  | 节点大小。                                 | `15.0`                |
| `linkWidth`       | `number`  | 连线宽度。                                 | `8.0`                 |
| `lineOpacity`     | `number`  | 连线透明度。                               | `0.36`                |
| `centerStrength`  | `number`  | 中心引力强度。                             | `0.01`                |
| `collideRadius`   | `number`  | 节点碰撞检测半径。                         | `600`                 |
| `collideStrength` | `number`  | 节点碰撞排斥强度。                         | `0.08`                |
| `linkDistance`    | `number`  | 连线的目标长度。                           | `400`                 |
| `arrow`           | `boolean` | 是否在连线上显示箭头，指示引用方向。       | `true`                |

## 响应结果

响应体是 JSON 格式。`code` 为 0 表示成功。`data` 字段包含关系图数据和配置。

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "nodes": [
      {
        "id": "20200812220555-lj3enxa",
        "label": "节点标题",
        "type": "NodeDocument", // 节点类型 (NodeDocument, NodeHeading, etc.)
        "value": 10, // 节点大小，可能基于引用数等计算
        "path": "/path/to/doc.sy",
        "box": "笔记本ID",
        "originalType": "d", // 原始类型
        "subType": "d" // 子类型
      },
      // ... more nodes
    ],
    "links": [
      {
        "source": "20200812220555-lj3enxa", // 源节点 ID
        "target": "20210101120000-abcdefg", // 目标节点 ID
        "label": "", // 边的标签 (通常为空)
        "value": 1 // 边的宽度
      },
      // ... more links
    ],
    "conf": { /* 当前生效的关系图配置对象 */ },
    "box": "", // 全局关系图，box ID 通常为空
    "reqId": "请求时传入的 reqId"
  }
}
```

## 在线测试

:::danger 注意
此操作会获取全局关系图数据，并可能根据传入的 `conf` 更新关系图配置。
在你的笔记很多的时候这个接口可能很慢
在不完全信任的网站或工具中输入您的 API Token 存在安全风险。
由于目前思源的apiToken并没有权限配置, 所以获得你的API token的人能够完全地控制你的思源
本站点的在线测试功能在您的浏览器本地运行，但仍建议您仅在测试环境或使用临时的 Token。
:::

<script setup>
import ApiTester from '@theme/components/ApiTester.vue';
</script>

<ClientOnly>
  <ApiTester
    title="测试 getGraph"
    endpoint="/api/graph/getGraph"
    method="POST"
    :params="[
      {
        name: 'k',
        label: '关键词 (k)',
        type: 'string',
        required: true,
        description: '搜索关键词，用于过滤关系图中的节点。空字符串表示不过滤。',
        defaultValue: ''
      },
      {
        name: 'conf',
        label: '配置 (conf)',
        type: 'json',
        required: true,
        description: '关系图配置对象。详情请参考文档中的 conf 对象详情。',
        defaultValue: {
          minRefs: 0,
          dailyNote: false,
          type: {
            tag: true,
            paragraph: false,
            heading: true,
            math: false,
            code: false,
            table: false,
            list: false,
            listItem: false,
            blockquote: false,
            super: false
          },
          d3: {
            nodeSize: 15.0,
            linkWidth: 8.0,
            lineOpacity: 0.36,
            centerStrength: 0.01,
            collideRadius: 600,
            collideStrength: 0.08,
            linkDistance: 400,
            arrow: true
          }
        }
      },
      {
        name: 'reqId',
        label: '请求 ID (reqId)',
        type: 'string', // 虽然 API 定义为 any，但通常是字符串或数字，这里用 string 方便输入
        required: true,
        description: '请求标识符，会原样返回在响应中。',
        defaultValue: 'getGraph-test-1'
      }
    ]"
  />
</ClientOnly>

> 注意：这是一个社区维护的文档，可能与官方最新版本存在差异。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

