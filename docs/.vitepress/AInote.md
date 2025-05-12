# 这个区段由开发者编写,未经允许禁止AI修改

# AInote for .vitepress Configuration

此文件记录 `docs/.vitepress/config.js` 的主要修改和原因。

## 2025-05-12

- **初始化配置**：首次创建 `config.js`，包含基本的语言、标题、描述。顶部导航包含"指南"，指向 `/guide/http-api`。侧边栏为 `/guide/` 配置了 `http-api` 和 `best-practices`。

## 2025-05-12 (纠正路径并集成 vitepress-sidebar)

- **修正目标文件路径问题**：确保所有文件操作均在 `vite-press-test` 项目内部进行，而不是工作区根目录。
- **安装 `vitepress-sidebar`**：通过 `pnpm add -D vitepress-sidebar` 安装了该插件。
- **创建 `guide/index.md` 和 `kernel-api/index.md`**：为新的导航结构创建了对应的入口 Markdown 文件。
    - `vite-press-test/docs/guide/index.md`
    - `vite-press-test/docs/kernel-api/index.md`
- **更新 `config.js`**：
    - 从 `vitepress-sidebar` 导入 `generateSidebar`。
    - **顶部导航 (`nav`)**：
        - 添加了 "首页" 指向 `/`。
        - "指南" 链接更新为 `/guide/`。
        - 新增 "内核接口" 顶级导航，指向 `/kernel-api/`。
    - **侧边栏 (`sidebar`)**：
        - 为 `/guide/` 路径配置了手动侧边栏，包含：
            - "指南概览" (`/guide/`)
            - "HTTP API 使用" (`/guide/http-api`)
            - "最佳实践" (`/guide/best-practices`)
        - 使用 `generateSidebar` 为 `/kernel-api/` 路径自动生成侧边栏。配置选项包括：
            - `documentRootPath: 'docs'`
            - `scanStartPath: 'kernel-api'`
            - `resolvePath: '/kernel-api/'`
            - `useTitleFromFrontmatter: true`
            - `collapsed: true`
            - `hyphenToSpace: true`
            - `excludeFiles: ['index.md']` (排除 `kernel-api` 的概览页)
    - **更新 `editLink.pattern`**：确保 GitHub 编辑链接指向 `vite-press-test/docs/` 内的正确路径。
- **原因**：
    - 统一导航结构，为即将添加的大量 Kernel API 文档做好准备。
    - 使用 `vitepress-sidebar` 自动化 Kernel API 的侧边栏生成，避免手动维护大量条目的繁琐和易错性。
    - 确保 `/guide/` 目录下有对应的 `index.md` 以正确显示该部分的概览页。

## 2025-05-12 (处理 vitepress-sidebar ESM 和配置错误)

- **解决 `vitepress-sidebar` 的 `ERR_REQUIRE_ESM` 问题**:
    - 修改 `config.js` 的导出方式为异步函数 (`export default async () => { ... }`)。
    - 在异步函数内部使用动态导入 `await import('vitepress-sidebar')` 来加载模块。
- **修正 `vitepress-sidebar` 的 `excludeFiles` 配置错误**:
    - 根据插件报错和文档，将 `generateSidebar` 配置中的 `excludeFiles: ['index.md']` 修改为 `excludePattern: ['index.md']`。
- **原因**:
    - `vitepress-sidebar` 是一个 ESM-only 包，直接在 CommonJS 风格的 `config.js` 中使用静态 `import` 会导致错误。动态导入是推荐的解决方法。
    - `excludeFiles` 不是 `vitepress-sidebar` 的有效配置选项，正确的选项是 `excludePattern`，用于指定排除文件的 glob 模式。

## 2025-05-12 13:07 HKT

- **优化 Kernel API 侧边栏生成配置**:
    - 在 `docs/.vitepress/config.js` 中，为 `/kernel-api/` 路径自动生成的侧边栏配置 (`generateSidebar`) 的 `excludePattern` 选项增加了 `'AInote.md'`。
    - 更新后的配置为 `excludePattern: ['index.md', 'AInote.md']`。
- **原因**:
    - `AInote.md` 是项目元数据文件，不应作为文档内容出现在导航侧边栏中。通过将其添加到排除列表，确保侧边栏的整洁和相关性。 