# 八云手记

中文个人博客，记录技术、阅读、生活与灵感。由 Sites 版本迁移到 GitHub Pages。

- 网站：[https://yakumo-sue.github.io](https://yakumo-sue.github.io)
- 静态站点文件：`dist/`
- 文章数据：`dist/posts.js`，当前文章是示例内容。
- GitHub Pages 发布内容：`gh-pages` 分支，由 `.github/workflows/deploy.yml` 从 `dist/` 同步。

所有页面为静态 HTML/CSS/JavaScript，无构建依赖。封面是为此博客生成的山湖图像，其他封面为 CSS / SVG 图形。更新文章后，同步修改 `dist/feed.xml` 的 RSS 条目。

旧 Hexo 站点已经在当前版本中替换，之前的源代码仍可从 Git 历史查看和恢复。
