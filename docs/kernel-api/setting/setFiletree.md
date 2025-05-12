---
title: 设置文件树配置
---
# 端点

/api/setting/setFiletree

# 设置文件树配置

需要认证 管理员权限 非只读模式

## 接口描述

更新文件树（文档列表侧边栏）相关的配置信息。这些配置项对应于思源笔记"设置 - 文件树"面板中的选项。

成功调用此接口后，相关配置将保存到 `conf.json` 文件中的 `filetree` 部分，并返回更新后的配置对象。

## 请求参数 (JSON Body)

请求体需要包含一个完整的 `FileTree` 配置对象。以下是该对象的字段说明：

| 参数名 | 类型 | 描述 | 默认值 (参考 `conf.NewFileTree()`) |
| --- | --- | --- | --- |
| `alwaysSelectOpenedFile` | boolean | 在文件树中是否总是自动选中（高亮）当前在编辑器中打开的文件。 | `false` |
| `openFilesUseCurrentTab` | boolean | 从文件树打开文档时，是否总是在当前已激活的页签中打开，而不是新建页签。 | `false` |
| `refCreateSaveBox` | string | 当通过块引用创建新文档时，该新文档默认保存到的笔记本的 ID。 | 空字符串 `""` (可能表示当前笔记本或遵循其他逻辑) |
| `refCreateSavePath` | string | 当通过块引用创建新文档时，该新文档在目标笔记本内的默认保存路径。会自动处理末尾的 `/`。 | 空字符串 `""` |
| `docCreateSaveBox` | string | 当直接（例如通过点击"+"号）创建新文档时，该新文档默认保存到的笔记本的 ID。 | 空字符串 `""` |
| `docCreateSavePath` | string | 当直接创建新文档时，该新文档在目标笔记本内的默认保存路径。 | 空字符串 `""` |
| `maxListCount` | number | 文件树中每个层级下最多列出的文档数量。 | `512` |
| `maxOpenTabCount` | number | 工作空间中允许同时打开的最大页签数量。有效范围 1-32。 | `8` |
| `allowCreateDeeper` | boolean | 是否允许创建超过 7 层深度的子文档。 | `false` |
| `removeDocWithoutConfirm` | boolean | 删除文档时是否跳过二次确认提示。 | `false` |
| `closeTabsOnStart` | boolean | 启动思源笔记时是否自动关闭所有上次打开的页签。 | `false` |
| `useSingleLineSave` | boolean | 是否使用单行格式来保存文档的 `.sy` 源文件和属性视图的 `.json` 文件。开启可以减小文件体积，但可读性下降。 | 同全局 `util.UseSingleLineSave` 初始值 |
| `sort` | number | 文件树的默认排序方式。具体值参考内核中的 `util.SortMode*` 常量定义，例如： `0`: 自定义排序 (`util.SortModeCustom`) `6`: 按创建时间升序 (`util.SortModeCreateASC`) `7`: 按创建时间降序 (`util.SortModeCreateDESC`) `8`: 按更新时间升序 (`util.SortModeUpdateASC`) `9`: 按更新时间降序 (`util.SortModeUpdateDESC`) `10`: 按字母升序 (`util.SortModeAlphanumASC`) `11`: 按字母降序 (`util.SortModeAlphanumDESC`) (更多类型请参考 `siyuan/kernel/util/sort.go`) | `0` (自定义排序) |

## 返回值

操作成功时，返回包含更新后 `FileTree` 对象的标准响应结构：

```
{
    "code": 0,
    "msg": "",
    "data": {
        "alwaysSelectOpenedFile": false,
        "openFilesUseCurrentTab": false,
        "refCreateSaveBox": "",
        "refCreateSavePath": "",
        "docCreateSaveBox": "",
        "docCreateSavePath": "",
        "maxListCount": 512,
        "maxOpenTabCount": 8,
        "allowCreateDeeper": false,
        "removeDocWithoutConfirm": false,
        "closeTabsOnStart": false,
        "useSingleLineSave": false, // 具体值取决于初始 util.UseSingleLineSave
        "sort": 0
    }
}
```

## 在线测试

API Token: (从思源"设置-关于"中获取)  

请求参数 (FileTree JSON 对象):  
{ "alwaysSelectOpenedFile": false, "openFilesUseCurrentTab": false, "refCreateSaveBox": "", "refCreateSavePath": "", "docCreateSaveBox": "", "docCreateSavePath": "", "maxListCount": 512, "maxOpenTabCount": 8, "allowCreateDeeper": false, "removeDocWithoutConfirm": false, "closeTabsOnStart": false, "useSingleLineSave": false, "sort": 0 }

从 /api/system/getConf 加载当前文件树配置 发送请求

响应:
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
