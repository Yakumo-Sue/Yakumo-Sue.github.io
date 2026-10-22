# 八云家的记事簿

基于 [Hexo](https://hexo.io/) 与 [Fluid](https://github.com/fluid-dev/hexo-theme-fluid) 的博客。主题以 Git 子模块固定在 `themes/fluid` 的 v1.9.9，站点的改动留在项目根目录，主题源码保持上游目录结构。

## 写一篇文章

1. 在 `source/_posts/` 新建一个 `.md` 文件，可按主题放入 `随想/`、`技术手记/` 等子目录；也可以运行 `npm run new -- "文章标题"`。
2. 在文件开头写好标题、日期、分类和标签：

   ```yaml
   ---
   title: 新文章标题
   date: 2026-10-21 20:00:00
   updated: 2026-10-21 20:00:00
   categories: [随想]
   tags: [记录]
   description: 一句话摘要
   ---
   ```

3. 在第二条 `---` 后写 Markdown。提交到 `main` 后，GitHub Actions 会运行 Hexo 并将 `public/` 的静态页面发布到 `gh-pages`。

## 本地预览

```bash
git clone --recurse-submodules https://github.com/Yakumo-Sue/Yakumo-Sue.github.io.git
cd Yakumo-Sue.github.io
npm ci
npm run server
```

浏览器打开 `http://localhost:4000/`。生成静态文件使用 `npm run build`，输出在 `public/`。

## 目录

| 路径 | 作用 |
| --- | --- |
| `source/_posts/**/*.md` | 博客文章的 Markdown 源文件，可按主题分子目录 |
| `source/about/index.md` | 关于页面 |
| `source/img/` | 徽标和封面图 |
| `_config.yml` | Hexo 站点配置 |
| `_config.fluid.yml` | Fluid 主题配置，覆盖主题默认值 |
| `themes/fluid/` | Fluid 官方主题 Git 子模块，固定 v1.9.9 |
| `site-layout/`、`scripts/`、`source/css/` | 右侧栏与本站样式定制 |
| `tooling/` | 给私有预览站复制构建结果的辅助脚本 |
| `.github/workflows/deploy.yml` | 从 Markdown 构建并部署 GitHub Pages |
| `public/` | 自动生成的静态文件，不提交到 `main` |

更新主题时运行 `git -C themes/fluid fetch --tags`、`git -C themes/fluid checkout <新版本标签>`，随后提交子模块指针。右侧栏与站点样式不直接修改上游主题。

移动已有文章到子目录时，若要保持原网址，在文章 Front Matter 中指定 `permalink`。例如 `source/_posts/随想/hello-world.md` 使用 `permalink: posts/hello-world/`。
