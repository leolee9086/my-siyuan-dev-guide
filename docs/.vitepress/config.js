export default async () => {
  const { generateSidebar } = await import('vitepress-sidebar');

  const sidebar = generateSidebar([
    {
      documentRootPath: 'docs',
      scanStartPath: 'kernel-api',
      resolvePath: '/kernel-api/',
      useTitleFromFrontmatter: true,
      collapsed: true,
      hyphenToSpace: true,
      excludePattern: ['index.md', 'AInote.md']
    }
  ]);

  return {
    lang: 'zh-CN',
    title: '思源笔记开发文档',
    description: '思源笔记开发者文档和指南。',
    base: '/my-siyuan-dev-guide/',
    ignoreDeadLinks: true,
    srcExclude: ['**/AInote.md'],

    // 配置 Vue 编译器选项，更改插值分隔符
    vue: {
      compilerOptions: {
        delimiters: ['${', '}'] // 将分隔符改为 ${ 和 }
      }
    },

    themeConfig: {
      nav: [
        { text: '首页', link: '/' },
        { text: '指南', link: '/guide/' },
        { text: '文档首页', link: '/guide/' }, // 指向所有卡片的概览页
        { text: 'Kernel API', link: '/kernel-api/' }, // 对应“Kernel API (HTTP)”
        { text: '插件开发', link: '/guide/plugins.md' }, // 对应“插件开发指南”
        { text: '挂件开发', link: '/guide/widgets.md' }, // 对应“挂件开发指南”
        { text: 'CSS 代码片段', link: '/guide/snippets-css.md' },
        { text: 'JS 代码片段', link: '/guide/snippets-js.md' },
        { text: '模板片段', link: '/guide/snippets-template.md' }, // 对应“模板片段指南”
        { text: '主题开发', link: '/guide/themes.md' }  // 对应“主题开发指南”

      ],

      sidebar: {
        '/guide/': [
          {
            text: '入门和概览',
            items: [
              { text: '指南概览', link: '/guide/' },
              { text: 'HTTP API 使用', link: '/kernel-api/' },
              { text: '最佳实践', link: '/guide/best-practices' }
            ]
          },
          {
            text: 'CSS 代码片段',
            // collapsible: true, // 如果需要折叠，可以取消注释
            // collapsed: false,  // 默认展开状态
            items: [
              { text: 'CSS 片段指南', link: '/guide/snippets-css.md' },
              { text: '管理', link: '/guide/css-snippets/css-management.md' },
              { text: '加载机制', link: '/guide/css-snippets/css-loading-mechanism.md' },
              { text: '作用域与用途', link: '/guide/css-snippets/css-scope-and-usecases.md' },
              { text: '局限性与调试', link: '/guide/css-snippets/css-limitations-and-debugging.md' },
              { text: '代码示例', link: '/guide/css-snippets/css-snippet-examples.md' }
            ]
          }
        ],
        // Kernel API 的侧边栏使用 vitepress-sidebar 自动生成
        ...sidebar
      },

      editLink: {
        pattern: 'https://github.com/leolee9086/my-siyuan-dev-guide/edit/master/docs/:path',
        text: '在 GitHub 上编辑此页'
      },

      lastUpdated: true,
      lastUpdatedText: '最后更新于'
    }
  }
};


