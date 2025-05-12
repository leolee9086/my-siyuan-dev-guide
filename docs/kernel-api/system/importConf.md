---
title: 导入配置 (importConf)
---
# 端点

/api/system/importConf

## 接口描述

此 API 端点 `POST /api/system/importConf` 用于导入用户配置。它接收一个上传的文件（通常是 `.zip` 压缩包或单个 `.json` 文件），并使用该文件的内容来更新或覆盖当前思源笔记应用的各项配置。

支持的配置项包括文件树、标签、编辑器、导出、关系图、UI 布局、系统设置、快捷键、搜索、闪卡、AI 及集市相关设置。

**警告：这是一个高风险操作，导入的配置会直接覆盖现有配置。强烈建议在执行此操作前备份当前配置 (通过 `/api/system/exportConf` API)。**

## 请求参数

此 API 的请求类型为 `multipart/form-data`。

-   **`file`** (file, 必需):
    -   包含配置数据的文件。
    -   可接受的文件类型：
        -   `.json`: 单个 JSON 配置文件。
        -   `.zip`: 包含一个 JSON 配置文件的 ZIP 压缩包 (压缩包内JSON文件名不限，但应只有一个JSON文件)。

**cURL 请求示例:**

```bash
# 导入 conf.json 文件
curl -X POST \
     -H "Authorization: YOUR_API_TOKEN" \
     -F "file=@/path/to/your/conf.json" \
     http://127.0.0.1:6806/api/system/importConf

# 导入 conf.zip 文件
curl -X POST \
     -H "Authorization: YOUR_API_TOKEN" \
     -F "file=@/path/to/your/conf.zip" \
     http://127.0.0.1:6806/api/system/importConf
```

## 响应体

**成功响应 (HTTP 200 OK):**

操作成功时，API 返回标准的成功 JSON 响应结构：

```json
{
    "code": 0,
    "msg": "",
    "data": null
}
```

**失败响应 (HTTP 200 OK, 但 code 非 0):**

如果操作过程中发生错误，API 仍可能返回 HTTP 200 OK，但 JSON 体内的 `code` 字段将为非零值 (通常为 `-1`)，`msg` 字段会包含错误描述。常见的错误原因包括：

-   上传文件处理失败 (如文件读取错误、非预期文件数量)。
-   文件类型不支持 (既不是 `.json` 也不是有效的 `.zip`)。
-   `.zip` 包解压失败或内容不符合预期 (例如，包含多个文件或没有文件)。
-   JSON 配置文件解析失败 (格式错误)。
-   内部服务器错误 (如临时目录创建失败)。

**失败响应示例:**

```json
{
    "code": -1,
    "msg": "invalid upload file", // 具体的错误信息会在此处显示
    "data": null
}
```

## 认证与授权

此 API 需要有效的用户认证和管理员权限，并且不能在只读模式下操作：

-   必须在 HTTP Header 中提供 `Authorization` 字段，其值为 API Token。
-   调用者必须具有管理员角色 (`model.CheckAdminRole`)。
-   不能在只读模式 (`model.CheckReadonly`) 下执行此操作，因为需要写入配置。

如果认证失败、权限不足或处于只读模式，服务器可能会返回相应的 HTTP 错误状态码 (如 401, 403) 或在 JSON 响应中指示错误。

## 备注

-   **重要:** 此操作会直接覆盖当前几乎所有的用户配置。请务必在导入前通过 `/api/system/exportConf` 备份现有配置。
-   导入操作完成后，部分设置可能需要重启思源笔记或刷新UI才能完全生效。
-   如果导入的 `.zip` 文件包含多个文件，或解压后没有找到 JSON 文件，操作将会失败。
-   导入的 JSON 文件必须是合法的思源配置格式。

> 感谢您对思源笔记的关注与支持！
> 
> [在爱发电上赞助我们](https://afdian.com/a/leolee9086?tab=feed)

© 2024-2025 [思源笔记 B3log.org](https://b3log.org/siyuan). All rights reserved.
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
