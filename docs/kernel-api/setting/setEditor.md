---
title: /api/setting/setEditor
---
# 端点

/api/setting/setEditor

# /api/setting/setEditor

设置编辑器相关配置。请求体应为一个完整的 `conf.Editor` 对象。

该 API 需要进行身份验证，请在请求头中包含 `Authorization` 字段，并确保用户角色为管理员且非只读模式。

## 请求

`POST`

### 参数 (JSON Body)

一个代表编辑器配置的 JSON 对象 (`conf.Editor`)。字段详情如下：

-   `allowHTMLBLockScript`: `boolean` - 允许执行 HTML 块内脚本
-   `fontSize`: `integer` - 字体大小
-   `fontSizeScrollZoom`: `boolean` - 字体大小是否支持滚轮缩放
-   `fontFamily`: `string` - 字体
-   `codeSyntaxHighlightLineNum`: `boolean` - 代码块是否显示行号
-   `codeTabSpaces`: `integer` - 代码块中 Tab 转换空格数 (0 表示不转换)
-   `codeLineWrap`: `boolean` - 代码块是否自动折行
-   `codeLigatures`: `boolean` - 代码块是否连字
-   `displayBookmarkIcon`: `boolean` - 是否显示书签图标
-   `displayNetImgMark`: `boolean` - 是否显示网络图片角标
-   `generateHistoryInterval`: `integer` - 生成历史时间间隔 (分钟)
-   `historyRetentionDays`: `integer` - 历史保留天数
-   `emoji`: `array` of `string` - 常用表情
-   `virtualBlockRef`: `boolean` - 是否启用虚拟引用
-   `virtualBlockRefExclude`: `string` - 虚拟引用关键字排除列表 (逗号分隔)
-   `virtualBlockRefInclude`: `string` - 虚拟引用关键字包含列表 (逗号分隔)
-   `blockRefDynamicAnchorTextMaxLen`: `integer` - 块引动态锚文本最大长度
-   `plantUMLServePath`: `string` - PlantUML 伺服地址
-   `fullWidth`: `boolean` - 是否使用最大宽度
-   `kaTexMacros`: `string` - KaTeX 宏定义 (JSON 字符串)
-   `readOnly`: `boolean` - 只读模式 (注意: 此 API 更新的是全局配置中的编辑器只读，另有 \`/api/setting/setEditorReadOnly\` 可单独快速切换 UI 只读状态)
-   `embedBlockBreadcrumb`: `boolean` - 嵌入块是否显示面包屑
-   `listLogicalOutdent`: `boolean` - 列表逻辑反向缩进
-   `listItemDotNumberClickFocus`: `boolean` - 单击列表项标记聚焦
-   `floatWindowMode`: `integer` - 浮窗触发模式 (0: 光标悬停, 1: Ctrl+悬停, 2: 不触发)
-   `dynamicLoadBlocks`: `integer` - 块动态加载数量 (48-1024)
-   `justify`: `boolean` - 是否两端对齐
-   `rtl`: `boolean` - 是否从右到左显示
-   `spellcheck`: `boolean` - 是否启用拼写检查
-   `onlySearchForDoc`: `boolean` - \[\[ 是否仅搜索文档块
-   `backlinkExpandCount`: `integer` - 反向链接默认展开数量
-   `backmentionExpandCount`: `integer` - 反链提及默认展开数量
-   `backlinkContainChildren`: `boolean` - 反向链接是否包含子块进行计算
-   `markdown`: `object` - Markdown 相关配置 (参考 `util.Markdown` 结构)
    -   `autoSpace`: `boolean`
    -   `chineseParagraphBeginningSpace`: `boolean`
    -   `gfmAutoLink`: `boolean`
    -   `hardLineBreak`: `boolean`
    -   `listIndent`: `integer`
    -   `paragraphBeginningSpace`: `boolean`
    -   `eastAsianLineBreak`: `boolean`
    -   `listItemIndent`: `integer`
    -   `toc`: `boolean`
    -   `codeBlockPreview`: `boolean`
    -   `footnotes`: `boolean`
    -   `sanitize`: `boolean`
    -   `linkify`: `boolean`
    -   `inlineMathAllowDigitAfterOpenMarker`: `boolean`
    -   `mathEngine`: `integer` (0: KaTeX, 1: MathJax)
    -   `mark`: `boolean`
    -   `sup`: `boolean`
    -   `sub`: `boolean`
    -   `kbd`: `boolean`
    -   `tag`: `boolean`
    -   `blockRef`: `boolean`
    -   `fileAnnotationRef`: `boolean`
    -   `setext`: `boolean`
    -   `listStyle`: `boolean`
    -   `paragraph`: `boolean`
    -   `heading`: `boolean`
    -   `codeBlock`: `boolean`
    -   `mathBlock`: `boolean`
    -   `table`: `boolean`
    -   `htmlBlock`: `boolean`
    -   `link`: `boolean`
    -   `autoLink`: `boolean`
    -   `textMark`: `boolean`
    -   `reference`: `boolean`
    -   `escape`: `boolean`
    -   `protyleMarkNetImg`: `boolean`
    -   `headingID`: `boolean`
    -   `autoPairPunctuation`: `boolean`
    -   `autoPairParentheses`: `boolean`
    -   `autoPairBrackets`: `boolean`
    -   `autoPairBraces`: `boolean`
    -   `autoPairQuotes`: `boolean`
    -   `autoPairBackticks`: `boolean`
    -   `autoPairEmphasis`: `boolean`
    -   `autoPairUnderscore`: `boolean`
    -   `autoPairDollar`: `boolean`
    -   `fixTermTypo`: `boolean`

_注意: 这是一个非常复杂的对象，建议先通过 `/api/system/getConf` 获取当前配置，在此基础上修改。_

### 示例请求 (部分字段)

```
{
    "fontSize": 18,
    "fontFamily": "霞鹜文楷",
    "codeLineWrap": true,
    "virtualBlockRef": true,
    "markdown": {
        "autoSpace": true,
        "hardLineBreak": false
    }
    // ... 其他 editor 配置项
}
```

## 响应

如果操作成功，将返回包含更新后编辑器配置对象 (`conf.Editor`) 的 JSON 数据。

```
{
    "code": 0,
    "msg": "",
    "data": {
        "allowHTMLBLockScript": false,
        "fontSize": 18,
        "fontFamily": "霞鹜文楷",
        // ... 其他所有 editor 配置项 ...
        "markdown": {
            "autoSpace": true,
            "hardLineBreak": false,
            // ... 其他 markdown 配置项 ...
        }
    }
}
```

如果操作失败，`code` 将是非零值，`msg` 中会包含错误信息。

## 在线测试

API Token: (从思源"设置-关于"中获取，或通过登录下方测试区的登录按钮获取)  

请求体 (JSON - `conf.Editor` 对象):  
从 /api/system/getConf 加载当前配置到下方  

发送请求

响应:
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
