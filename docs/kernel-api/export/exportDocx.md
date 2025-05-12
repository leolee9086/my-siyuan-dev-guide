---
title: 导出文档为Word
---
# 端点

/api/export/exportDocx

# 导出文档为Word

需要认证

## 接口描述

将指定的文档（包含其所有块）导出为 Microsoft Word (.docx) 文件。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| id | string | 是 | 要导出的文档ID |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息 |
| data | object | 返回数据 |
| data.hPath | string | 导出的Word文件的人类可读路径（相对于工作空间导出目录） |
| data.path | string | 导出的Word文件的绝对路径 |

**注意：** 导出的Word文件将保存在工作空间的 \`export\` 目录下。

请求示例

返回示例

### 请求示例

```
POST /api/export/exportDocx HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "id": "20220301153724-vy37rik"
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "",
  "data": {
    "hPath": "/export/思源笔记简介-20240417233500.docx",
    "path": "D:/SiYuan/data/export/思源笔记简介-20240417233500.docx"
  }
}
```

