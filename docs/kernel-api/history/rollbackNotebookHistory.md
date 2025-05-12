---
title: 回滚笔记本历史
---
# 端点

/api/history/rollbackNotebookHistory

# 回滚笔记本历史

需要认证

**警告：这是一个非常危险的操作！** 回滚笔记本历史会将整个笔记本恢复到指定的历史版本，当前笔记本的所有内容都将被覆盖且无法撤销。请务必在执行前回滚前备份重要数据！

## 接口描述

将指定的笔记本恢复到其历史记录中的某个版本。需要提供从 \`getNotebookHistory\` 接口获取的历史版本文件路径。

## 请求参数

| 参数名 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| notebook | string | 是 | 要回滚的笔记本 ID |
| historyPath | string | 是 | 要回滚到的历史版本文件路径，通过 \`getNotebookHistory\` 接口获取 |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0表示成功 |
| msg | string | 返回信息，成功时通常为空或提示信息 |
| data | null | 无返回数据（操作直接修改笔记本内容） |

请求示例

返回示例

### 请求示例

```
POST /api/history/rollbackNotebookHistory HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token your-token

{
  "notebook": "20200812220439-obsxfyn",
  "historyPath": "history/notebook/20200812220439-obsxfyn/20231026153000.zip"
}
```

### 返回示例

```
{
  "code": 0,
  "msg": "笔记本已回滚至指定历史版本",
  "data": null
}
```

