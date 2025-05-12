---
title: 设置闪卡配置
---
# 端点

/api/setting/setFlashcard

# 设置闪卡配置

需要认证 管理员权限 非只读模式

## 接口描述

更新闪卡（制卡和复习）相关的配置信息。这些配置项对应于思源笔记 "设置 - 闪卡" 面板中的选项。

成功调用此接口后，相关配置将保存到 `conf.json` 文件中的 `flashcard` 部分，并返回更新后的配置对象。如果 `NewCardLimit` 或 `ReviewCardLimit` 小于0，将被重置为默认值（新卡20，复习卡200）。

## 请求参数 (JSON Body)

请求体需要包含一个完整的 `Flashcard` 配置对象。以下是该对象的字段说明及其默认值 (参考 `conf.NewFlashcard()`)：

| 参数名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| `newCardLimit` | number | 每日新卡上限。如果传入小于0的值，API会将其重置为20。 | `20` |
| `reviewCardLimit` | number | 每日复习卡上限。如果传入小于0的值，API会将其重置为200。 | `200` |
| `mark` | boolean | 是否启用标记块（高亮、加粗等）作为制卡来源。 | `true` |
| `list` | boolean | 是否启用列表项作为制卡来源。 | `true` |
| `superBlock` | boolean | 是否启用超级块作为制卡来源。 | `true` |
| `heading` | boolean | 是否启用标题块作为制卡来源。 | `true` |
| `deck` | boolean | 是否启用卡包（文档标题带有 `#卡包` 标签）作为制卡来源。 | `false` |
| `reviewMode` | number | 复习模式：`0`: 新旧混合`1`: 新卡优先`2`: 旧卡优先 | `0` |
| `requestRetention` | number | FSRS 算法参数：期望记忆保留率 (0.0 ~ 1.0)。 | (来自 `fsrs.DefaultParam().RequestRetention`) |
| `maximumInterval` | number | FSRS 算法参数：最大复习间隔天数。 | (来自 `fsrs.DefaultParam().MaximumInterval`) |
| `weights` | string | FSRS 算法参数：权重列表，逗号分隔的浮点数值字符串 (例如 "1.00, 1.50, ...")。 | (来自 `fsrs.DefaultParam().W`) |

## 返回值

操作成功时，返回包含更新后 `Flashcard` 对象的标准响应结构：

```
{
    "code": 0,
    "msg": "",
    "data": {
        "newCardLimit": 20,
        "reviewCardLimit": 200,
        "mark": true,
        "list": true,
        "superBlock": true,
        "heading": true,
        "deck": false,
        "reviewMode": 0,
        "requestRetention": 0.9, // 示例值，实际来自 FSRS 默认
        "maximumInterval": 36500, // 示例值
        "weights": "1.00, 1.50, ..." // 示例值
    }
}
```

## 在线测试

API Token: (从思源"设置-关于"中获取)  

请求参数 (Flashcard JSON 对象):  
{ "newCardLimit": 20, "reviewCardLimit": 200, "mark": true, "list": true, "superBlock": true, "heading": true, "deck": false, "reviewMode": 0, "requestRetention": 0.9, "maximumInterval": 36500, "weights": "" }

从 /api/system/getConf 加载当前闪卡配置 发送请求

响应:
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
