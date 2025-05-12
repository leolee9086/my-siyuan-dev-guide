---
title: /api/sync/performSync
---
# 端点

/api/sync/performSync

# /api/sync/performSync

执行一次常规的云端同步操作。

## API 端点详情

-   **路径:** `/api/sync/performSync`
-   **HTTP 方法:** `POST`
-   **认证:** 需要 (`model.CheckAuth`, `model.CheckAdminRole`, `model.CheckReadonly`)

## 请求参数 (JSON Body)

| 参数名 | 类型 | 是否必需 | 描述 |
| --- | --- | --- | --- |
| `app` | string | 是 | 发起同步的客户端 ID。不能为空。 |
| `force` | boolean | 否 | 是否强制同步。默认为 `false`。 |
| `pushMode` | string | 否 | 推送模式。可选值： - `""` (空字符串，默认): 正常双向同步。 - `"force-push"`: 强制推送本地更改到云端。 - `"force-pull"`: 强制从云端拉取数据覆盖本地。 |
| `pushOnly` | boolean | 否 | **\[已废弃\]** 兼容旧版参数。如果为 `true`，则等同于 `pushMode: "force-push"`。建议使用 `pushMode`。 |
| `cloudName` | string | 否 | 可选的云端数据仓库名称。如果提供此参数且与当前配置的云端目录名不同，内核会重置上次同步时间戳 (`lastSyncTime = 0`)，这通常意味着在下次同步时，会将本地所有数据变更推送到这个新的云端目录。 |

### 请求示例:

```json
{
    "app": "my-client-app-123",
    "force": false,
    "pushMode": ""
}
```

```json
{
    "app": "my-client-app-123",
    "pushMode": "force-push"
}
```

## 响应详情

API 调用会立即返回，同步操作在后台异步执行。

成功时，响应体中的 `data` 字段会包含一个表示同步初始进度的对象。后续的同步状态和结果需要通过 WebSocket (例如 `ws/sync/progress` 事件) 或轮询 `/api/sync/getSyncInfo` API 来获取。

### 响应 `data` 字段结构 (初始进度):

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| `current` | number | 当前已处理的项。 |
| `total` | number | 需要处理的总项数。 |
| `info` | string | 当前同步操作的描述信息。 |
| `msg` | string | 与 `info` 类似，可能是更详细或备用的信息。 |

_注意: `progress` 对象的具体字段和内容可能会因同步阶段和内核版本的不同而略有差异。_

### 成功响应示例 (`code: 0`):

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "current": 0,
        "total": 0,
        "info": "准备同步中...", // 或其他初始状态信息
        "msg": ""
    }
}
```

### 失败响应示例:

如果当前正在进行启动时同步 (boot sync) 或其他同步操作，API 会返回错误：

```json
{
    "code": -1,
    "msg": "Boot sync is in progress, please try again later", // 或 "Sync is in progress, please try again later"
    "data": null
}
```

## 重要提示

-   **异步执行:** 此 API 仅触发同步操作，实际同步过程在后台异步进行。不要依赖此 API 的直接返回结果来判断同步是否完成。
-   **状态追踪:** 强烈建议通过监听 WebSocket 事件 (如 `syncBegin`, `syncEnd`, `syncProgress`, `syncRetry`, `syncFail`, `syncLog` 等) 来获取详细的同步状态和结果。也可以通过轮询 `/api/sync/getSyncInfo` 来获取当前状态。
-   **`cloudName` 参数:** 使用此参数时请谨慎，因为它可能导致大量数据重新上传。

## 在线测试

客户端 App ID (app):   
  
强制同步 (force):   
  
推送模式 (pushMode): 正常同步 (空字符串) 强制推送 (force-push) 强制拉取 (force-pull)  
  
云端目录名 (cloudName, 可选):   
  
执行同步

### 响应:

```
点击按钮测试...
```

© 2024 SiYuan API Documentation
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
