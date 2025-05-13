---
title: 重载 UI (reloadUI)
---
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/system.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/system.go) 或 [kernel/api/ui.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/ui.go) 中的源码为准。
>
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)

# 端点

POST /api/ui/reloadUI

# reloadUI

[源文件 (GitHub)](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/system.go "查看源文件")

需要认证

## 接口描述

此 API 端点用于触发整个思源笔记用户界面的重载。调用此接口后，思源笔记的前端将刷新，其效果等同于用户在思源笔记界面中手动执行"设置"菜单下的"重载界面"操作。

这个接口在以下情况特别有用：
*   应用新的主题或主题的部分更改后。
*   修改了某些需要刷新界面才能生效的自定义设置或代码片段。
*   插件或挂件执行了可能影响全局 UI 的操作后。

由于 `/api/ui/reloadUI` 的功能与 `/api/system/reloadUI` 完全相同，您可以认为它们是同一接口的两个不同入口。

## 请求参数

此接口**不需要**任何请求体参数。发送请求时，请求体可以为空对象 `{}`，或者不包含 `Content-Type` 和请求体。

## 返回值

成功时，接口会返回一个标准的操作结果对象。

| 参数名 | 类型   | 描述                                     |
| :----- | :----- | :--------------------------------------- |
| code   | number | 返回码，`0` 表示成功，其他值表示失败。     |
| msg    | string | 返回信息。成功时通常为空字符串 `""`。    |
| data   | null   | 成功时，此字段通常为 `null`。            |

## 请求示例

```json
POST /api/ui/reloadUI
Authorization: Token your-api-token
Content-Type: application/json

{}
```
或者（如果服务器接受无 Content-Type 的 POST）：
```
POST /api/ui/reloadUI
Authorization: Token your-api-token
```

## 返回示例 (成功)

```json
{
  "code": 0,
  "msg": "",
  "data": null
}
```

## 在线测试

<script setup>
import apiTester from "@theme/components/ApiTester.vue"
</script>
<ClientOnly>
<apiTester
  title='测试 reloadUI (UI)'
  endpoint='/api/ui/reloadUI'
  method='POST'
  :params="[]"
/>
</ClientOnly>



