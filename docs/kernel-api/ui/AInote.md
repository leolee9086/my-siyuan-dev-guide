# 这个区段由开发者编写,未经允许禁止AI修改

---

## [2025-05-14 02:05 织] - 改进 reloadUI.md 文档

- **文件**: `my-siyuan-dev-guide/docs/kernel-api/ui/reloadUI.md`
- **变更**:
    - **重写与独立化**: 将文档从一个简单的跳转页面重写为一个功能完整的独立 API 文档。
    - **详细描述**: 补充了接口的功能描述、适用场景、请求参数（明确指出无需参数）、返回值结构和示例。
    - **请求示例**: 提供了 `POST` 请求的示例，包括 `Authorization` Token 和空请求体。
    - **源文件链接**: 将源文件链接指向了 `kernel/api/system.go` (因为 `/api/ui/reloadUI` 与 `/api/system/reloadUI` 功能相同)。
    - **在线测试**: 仿照 `appendDailyNoteBlock.md` 的实现，添加了 `<apiTester>` 组件，允许用户直接在文档页面测试此 API。
        - `title`: '测试 reloadUI (UI)'
        - `endpoint`: '/api/ui/reloadUI'
        - `method`: 'POST'
        - `params`: `[]` (空数组，因为 API 无需参数)
    - **页脚清理**: 清理了原有多余和不正确的页脚信息，统一为标准的非官方声明，并更新了源码参考链接。
- **原因**: 响应用户要求，改进 `/api/ui/reloadUI` 的 API 文档，使其内容更充实、更准确，并增加在线测试功能，提升文档的实用性和用户体验。 