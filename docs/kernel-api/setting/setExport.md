---
title: 设置导出配置
---
# 端点

/api/setting/setExport

# 设置导出配置

需要认证 管理员权限 非只读模式

## 接口描述

更新导出相关的配置信息。这些配置项对应于思源笔记"设置 - 导出"面板中的选项。

成功调用此接口后，相关配置将保存到 `conf.json` 文件中的 `export` 部分，并返回更新后的配置对象。

## 请求参数 (JSON Body)

请求体需要包含一个完整的 `Export` 配置对象。以下是该对象的字段说明：

| 参数名 | 类型 | 描述 | 默认值 (参考 `conf.NewExport()`) |
| --- | --- | --- | --- |
| `paragraphBeginningSpace` | boolean | 导出 Markdown 时，是否在段落开头添加两个空格（模拟中文首行缩进）。 | `false` |
| `addTitle` | boolean | 导出时是否添加文档标题。 | `true` |
| `blockRefMode` | number | 内容块**引用**的导出模式： `2`: 锚文本指向原始块（形如：源块内容 (siyuan://blocks/块ID "可选悬浮提示")）。 `3`: 仅锚文本（形如：源块内容）。 `4`: 块引转为 Markdown 脚注形式，并附带锚点哈希（形如：\[\[块ID 前几位哈希\](siyuan://blocks/块ID "可选悬浮提示")\]）。 | `4` |
| `blockEmbedMode` | number | 内容块**嵌入**的导出模式： `0`: 使用原始文本（将嵌入块的内容直接插入）。 `1`: 使用 Markdown Blockquote 形式（将嵌入块内容作为引用块）。 | `1` |
| `blockRefTextLeft` | string | 内容块引用导出时，锚文本左侧添加的符号。 | 空字符串 `""` |
| `blockRefTextRight` | string | 内容块引用导出时，锚文本右侧添加的符号。 | 空字符串 `""` |
| `tagOpenMarker` | string | 标签开始标记符。 | `#` |
| `tagCloseMarker` | string | 标签结束标记符。 | `#` |
| `fileAnnotationRefMode` | number | 文件标注引用的导出模式： `0`: 文件名 - 页码 - 锚文本。 `1`: 仅锚文本。 | `0` |
| `pandocBin` | string | Pandoc 可执行文件的绝对路径。如果提供，思源会校验其有效性。若无效，则会使用内置或已配置的 Pandoc 路径。 | 空字符串 `""` (表示使用思源自动检测或内置的 Pandoc) |
| `markdownYFM` | boolean | Markdown 导出时是否添加 YAML Front Matter。 | `false` |
| `pdfFooter` | string | PDF 导出时的页脚内容。可以使用 `%page` 代表当前页码，`%pages` 代表总页数。 | `"%page / %pages"` |
| `docxTemplate` | string | 导出为 Docx 格式时使用的自定义模板文件（`.docx`）的绝对路径。 | 空字符串 `""` (表示使用默认模板) |
| `pdfWatermarkStr` | string | PDF 导出时添加的水印文本内容，或者指向包含水印图片的文件的绝对路径。 | 空字符串 `""` |
| `pdfWatermarkDesc` | string | PDF 导出时水印的描述信息，通常为 JSON 字符串，包含位置（如 `type`: "diagonal", "center", "header", "footer"），大小，透明度（`opacity`: 0-1），颜色（`color`: "#RRGGBB"）等。具体格式需参考 Pandoc 相关配置。 | 空字符串 `""` |
| `imageWatermarkStr` | string | 图片导出时添加的水印文本内容，或者指向包含水印图片的文件的绝对路径。 | 空字符串 `""` |
| `imageWatermarkDesc` | string | 图片导出时水印的描述信息，格式类似 `pdfWatermarkDesc`。 | 空字符串 `""` |

## 返回值

操作成功时，返回包含更新后 `Export` 对象的标准响应结构：

```
{
    "code": 0,
    "msg": "",
    "data": {
        "paragraphBeginningSpace": false,
        "addTitle": true,
        "blockRefMode": 4,
        "blockEmbedMode": 1,
        "blockRefTextLeft": "",
        "blockRefTextRight": "",
        "tagOpenMarker": "#",
        "tagCloseMarker": "#",
        "fileAnnotationRefMode": 0,
        "pandocBin": "",
        "markdownYFM": false,
        "pdfFooter": "%page / %pages",
        "docxTemplate": "",
        "pdfWatermarkStr": "",
        "pdfWatermarkDesc": "",
        "imageWatermarkStr": "",
        "imageWatermarkDesc": ""
    }
}
```

如果操作失败（例如 Pandoc路径无效），`code` 将是非零值，`msg` 中会包含错误信息，`data` 可能包含 `{"closeTimeout": 5000}`。

## 在线测试

API Token: (从思源"设置-关于"中获取)  

请求参数 (Export JSON 对象):  
{ "paragraphBeginningSpace": false, "addTitle": true, "blockRefMode": 4, "blockEmbedMode": 1, "blockRefTextLeft": "", "blockRefTextRight": "", "tagOpenMarker": "#", "tagCloseMarker": "#", "fileAnnotationRefMode": 0, "pandocBin": "", "markdownYFM": false, "pdfFooter": "%page / %pages", "docxTemplate": "", "pdfWatermarkStr": "", "pdfWatermarkDesc": "", "imageWatermarkStr": "", "imageWatermarkDesc": "" }

从 /api/system/getConf 加载当前导出配置 发送请求

响应:
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
