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
          { text: '内核接口', link: '/kernel-api/' } 
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
            }
          ],
          // Kernel API 的侧边栏使用 vitepress-sidebar 自动生成
          ...sidebar
        },

        editLink: {
          pattern: 'https://github.com/leolee9086/my-siyuan-dev-guide/edit/main/docs/:path',
          text: '在 GitHub 上编辑此页'
        },

        lastUpdated: true,
        lastUpdatedText: '最后更新于'
      }
    }
  };


