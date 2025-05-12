---
title: 设置外观
---
# 端点

/api/setting/setAppearance

# 设置外观

需要认证 管理员权限 只读模式禁用

## 接口描述

更新思源笔记的整体外观配置。请求体应为一个完整的ในส่วน `conf.Appearance` 对象。

## 请求参数 (JSON Body)

请求体是一个代表外观配置的 JSON 对象 (`conf.Appearance`)。

| 参数名 | 类型 | 描述 | 示例值 |
| --- | --- | --- | --- |
| mode | number | 模式：0 表示明亮，1 表示暗黑。 | `0` |
| modeOS | boolean | 模式是否跟随操作系统设置。 | `true` |
| darkThemes | array | 暗黑模式下可用的主题列表。每个元素是一个包含 `name` (string) 和 `label` (string) 的对象。 | `[{"name": "midnight", "label": "午夜"}]` |
| lightThemes | array | 明亮模式下可用的主题列表。结构同 `darkThemes`。 | `[{"name": "daylight", "label": "日光"}]` |
| themeDark | string | 当前选择的暗黑模式主题的名称。 | `"midnight"` |
| themeLight | string | 当前选择的明亮模式主题的名称。 | `"daylight"` |
| themeVer | string | 当前选择主题的版本号。 | `"1.0.0"` |
| icons | array | 可用的图标包名称列表 (string)。 | `["material", "remixicon"]` |
| icon | string | 当前选择的图标包名称。 | `"material"` |
| iconVer | string | 当前选择图标包的版本号。 | `"1.0.0"` |
| codeBlockThemeLight | string | 明亮模式下代码块高亮主题的名称。 | `"github"` |
| codeBlockThemeDark | string | 暗黑模式下代码块高亮主题的名称。 | `"base16/dracula"` |
| lang | string | 选择的界面语言代码，例如 "zh\_CN", "en\_US"。 | `"zh_CN"` |
| themeJS | boolean | 是否允许当前主题执行 JavaScript。 | `false` |
| closeButtonBehavior | number | 主窗口关闭按钮行为：0 表示退出程序，1 表示最小化到系统托盘。 | `0` |
| hideStatusBar | boolean | 是否隐藏应用底部的状态栏。 | `false` |

## 返回值

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| code | number | 返回码，0 表示成功 |
| msg | string | 错误信息，成功时为空字符串 |
| data | object | 操作成功时，返回更新后的外观配置对象 (`conf.Appearance`)。 |

请求示例

返回示例 (成功)

### 请求示例 (部分字段)

```
POST /api/setting/setAppearance HTTP/1.1
Host: 127.0.0.1:6806
Content-Type: application/json
Authorization: Token YOUR_API_TOKEN

{
  "mode": 1, 
  "modeOS": false,
  "themeDark": "another-dark-theme",
  "lang": "en_US",
  "hideStatusBar": true
}
```

### 返回示例 (成功)

```
{
  "code": 0,
  "msg": "",
  "data": {
    "mode": 1,
    "modeOS": false,
    "darkThemes": [
      { "name": "midnight", "label": "午夜" },
      { "name": "another-dark-theme", "label": "Another Dark" }
      // ... 其他暗黑主题
    ],
    "lightThemes": [
      { "name": "daylight", "label": "日光" }
      // ... 其他明亮主题
    ],
    "themeDark": "another-dark-theme",
    "themeLight": "daylight", // 假设未改变
    "themeVer": "1.2.0",
    "icons": ["material", "custom-icons"],
    "icon": "material",
    "iconVer": "2.0.0",
    "codeBlockThemeLight": "github",
    "codeBlockThemeDark": "base16/dracula",
    "lang": "en_US",
    "themeJS": false,
    "closeButtonBehavior": 0,
    "hideStatusBar": true
  }
}
```

