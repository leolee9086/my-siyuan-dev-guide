---
title: 刷新虚拟块引用缓存
---
# 端点

/api/setting/refreshVirtualBlockRef

# 刷新虚拟块引用缓存

需要认证 管理员权限 只读模式禁用

## 接口描述

刷新（重置）虚拟块引用的缓存。当虚拟块引用的相关设置（例如，通过 `/api/setting/addVirtualBlockRefInclude` 或 `/api/setting/addVirtualBlockRefExclude` 修改了关键词列表，或者修改了虚拟引用的命名规则等）发生改变后，调用此接口可以清除旧的缓存，使得后续的虚拟引用查找能够基于最新的配置进行。操作成功后会广播一个 `setConf` 事件，通知前端配置已更新。

## 请求参数

此接口不需要参数。

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 错误信息，成功时为空字符串 |
| data | null | 成功时固定为 null。 |

请求示例

成功返回示例

### 请求示例

```
POST /api/setting/refreshVirtualBlockRef HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token YOUR_API_TOKEN

{}
```

### 成功返回示例

```
{
  "code": 0,
  "msg": "",
  "data": null
}
```

