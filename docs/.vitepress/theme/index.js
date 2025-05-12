import DefaultTheme from 'vitepress/theme'

// Import our main SCSS file that includes Siyuan SCSS.
// Path is relative to this file (.vitepress/theme/index.js)
// SCSS file is at .vitepress/styles/index.scss
import '../styles/index.scss'

export default {
  ...DefaultTheme,
  // You can enhance the app or override components here if needed later
  // enhanceApp({ app, router, siteData }) {
    // ...
  // }
} 