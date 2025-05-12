// import { generateSidebar } from 'vitepress-sidebar'; // Comment out or remove static import

export default async () => { // Make the default export an async function
  const { generateSidebar } = await import('vitepress-sidebar'); // Use dynamic import

  return {
    lang: 'zh-CN',
    title: '思源笔记开发文档',
    description: '思源笔记开发者文档和指南。',
    base: '/my-siyuan-dev-guide/',

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
          ...generateSidebar([
            {
              documentRootPath: 'docs', 
              scanStartPath: 'kernel-api', 
              resolvePath: '/kernel-api/', 
              useTitleFromFrontmatter: true, 
              collapsed: true, 
              hyphenToSpace: true, 
              excludePattern: ['index.md', 'AInote.md']
            }
          ])
        },

        editLink: {
          pattern: 'https://github.com/leolee9086/siyuan-dev-guide/edit/main/vite-press-test/docs/:path',
          text: '在 GitHub 上编辑此页'
        },

        lastUpdated: true,
        lastUpdatedText: '最后更新于'
      }
    }
  }
