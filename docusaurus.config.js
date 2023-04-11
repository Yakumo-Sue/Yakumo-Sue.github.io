// @ts-nocheck
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Plugin} */
function MyPlugin(context, options) {
  return {
    name: 'my-plugin',
  };
}


/** @type {import('@docusaurus/types').Config} */
const config = {
  // 标题
  title: 'Yakumo-Sue’s Note Blog - 记录美好学习😀',
  // 标语
  tagline: '应当随时学习，学习一切；应该集中全力，以求知道得更多，知道一切。',
  // Icon
  favicon: 'img/Finis_Chaldea.png',

  // Set the production url of your site here
  url: 'https://Yakumo-Sue.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config. - GitHub pages 开发设置
  // If you aren't using GitHub pages, you don't need these. - 如果不需要则无需配置
  // Usually your GitHub org/user name. - 设置你的 Github 用户名
  organizationName: 'Yakumo-Sue',
  // Usually your repo name. - 设置 Github 仓库名
  projectName: 'Yakumo-Sue.github.io',
  // 开发分支
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // 插件配置区域
  plugins: [MyPlugin],

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          path: 'docs',
        },
        blog: {
          showReadingTime: true,
          path: 'blog',
          postsPerPage: 5,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      // 导航栏
      navbar: {
        hideOnScroll: true,
        title: 'Yakumo-Sue’s Study Journey',
        // 右侧 logo 设置
        logo: {
          alt: '这是 Logo',
          src: 'img/logo.png',
          srcDark: 'img/logoDark.png',
        },
        items: [
          // 文档书写
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          // 下拉列表
          {
            type: 'dropdown',
            label: '社区',
            position: 'left',
            items: [
              {
                label: 'Facebook',
                href: 'https://www.facebook.com',
              },
              // ... more items
            ],
          },
          // 博客记录
          {
            to: '/blog',
            label: 'Blog',
            position: 'left'
          },
          // 右侧图标
          {
            href: 'https://github.com/Yakumo-Sue',
            label: 'GitHub',
            position: 'right',
          },
          // 搜索栏
          {
            type: 'search',
            position: 'right',

          },
        ],
      },
      // 页面底部
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      // 主题设置
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      // 搜索设置 - 申请中
      // algolia: {
      // },
    }),
};

module.exports = config;
