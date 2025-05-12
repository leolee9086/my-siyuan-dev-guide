---
title: 获取笔记本配置
---
# 端点

/api/notebook/getNotebookConf

[← 返回 Notebook API 列表](./index.html)

# 获取笔记本配置

[在 GitHub 上查看源码 (notebook.go)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/notebook.go#L301) [BoxConf 定义 (box.go)](https://github.com/siyuan-note/siyuan/blob/master/kernel/conf/box.go#L20)

需要认证

## 接口描述

获取指定笔记本的配置信息，包括笔记本的 ID、名称以及详细的配置对象 (`BoxConf`)。

此接口会调用内核的 `model.Conf.GetBox(notebookID).GetConf()` 方法来获取数据。

## 请求参数

请求体为一个 JSON 对象，包含以下字段：

| 参数名 | 类型 | 必需 | 描述 |
| --- | --- | --- | --- |
| notebook | string | 是 | 要获取配置的笔记本的 ID。 |

## 返回值

返回标准的 JSON 结构，其中 `data` 字段包含笔记本的 ID、名称和配置对象：

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功，其他表示失败。 |
| msg | string | 错误信息，成功时为空字符串。 |
| data | object | 成功时，包含笔记本配置信息的对象；失败或笔记本不存在时可能为 null。 |
| data.box | string | 笔记本的 ID。 |
| data.name | string | 笔记本的当前名称。 |
| data.conf | object | 笔记本的详细配置对象 (`BoxConf`)。 |

### `data.conf` (BoxConf) 对象结构

`BoxConf` 对象包含以下字段：

| 字段名 | 类型 | 描述 |
| --- | --- | --- |
| name | string | 笔记本名称。 |
| sort | number | 排序字段（用于自定义排序时的顺序）。 |
| icon | string | 笔记本图标的 Emoji 字符或图片文件名。 |
| closed | boolean | 笔记本是否处于关闭状态。 |
| refCreateSaveBox | string | 当通过块引用创建新文档时，默认保存到的目标笔记本 ID。如果为空，则保存在当前笔记本。 |
| refCreateSavePath | string | 当通过块引用创建新文档时，默认保存到的目标路径模板。 |
| docCreateSaveBox | string | 当直接新建文档时，默认保存到的目标笔记本 ID。如果为空，则保存在当前笔记本。 |
| docCreateSavePath | string | 当直接新建文档时，默认保存到的目标路径模板。 |
| dailyNoteSavePath | string | 新建日记时默认的保存路径模板。例如：`/daily note/\{\{now \| date "2006/01"\}\}/\{\{now \| date "2006-01-02"\}\}` |
| dailyNoteTemplatePath | string | 新建日记时使用的模板文档路径。 |
| sortMode | number | 文档列表的排序方式。具体值请参考 `kernel/util/sort.go` 中的 `SortMode*` 常量定义，例如 0 (文件名升序), 6 (自定义排序) 等。 |

请求示例

返回示例

### 请求示例 (JSON)

```json
{
  "notebook": "20200812220409-rng0qan"
}
```

### 成功返回示例

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "box": "20200812220409-rng0qan",
    "name": "我的知识库",
    "conf": {
      "name": "我的知识库",
      "sort": 0,
      "icon": "",
      "closed": false,
      "refCreateSaveBox": "",
      "refCreateSavePath": "",
      "docCreateSaveBox": "",
      "docCreateSavePath": "",
      "dailyNoteSavePath": "\/daily note\/\{\{now \| date \"2006/01\"\}\}\/\{\{now \| date \"2006-01-02\"\}\}"
    }
  }
}
```

### 失败返回示例 (例如，笔记本ID无效或未找到)

```json
{
  "code": -1, 
  "msg": "notebook [20200812220409-invalid] not found",
  "data": null
}
```
