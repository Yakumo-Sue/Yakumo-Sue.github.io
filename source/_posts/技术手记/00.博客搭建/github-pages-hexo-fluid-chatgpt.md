---
title: 'Github Page + Hexo + Fluid + ChatGPT 部署个人博客'
date: 2026-10-22 08:00:00
updated: 2026-10-22 08:00:00
permalink: posts/github-pages-hexo-fluid-chatgpt/
categories: [技术手记/00.博客搭建]
tags: [GitHub Pages, Hexo, Fluid, ChatGPT, 部署]
description: 从注册 GitHub、安装 Hexo 与 Fluid，到令牌权限、编写 deploy.yml、排查部署错误，一步步发布个人博客。
index_img: /img/blog-deploy/cover.svg
---

从零搭建一个博客时，最容易混淆的是四件事各自做什么：**Hexo** 把 Markdown 变成网页，**Fluid** 决定网页样式，**GitHub Pages** 托管公开的静态文件，**ChatGPT** 帮助梳理步骤、写作和检查代码。本站的源文件放在 [Yakumo-Sue.github.io](https://github.com/Yakumo-Sue/Yakumo-Sue.github.io)，主题以 Git 子模块保存在 **themes/fluid**。

![从 Markdown 到公开博客的发布流程](/img/blog-deploy/pipeline.svg)
*图 1：源码、构建结果和公开网页的关系。示意图，不是 GitHub 界面截图。*

下面先按新手可以复现的顺序走一遍，再给出**本站现用的 deploy.yml**。文末另有 GitHub 官方推荐的直接部署写法，两种发布方式只能选一种，不能把两份工作流同时启用。

## 一、准备账号与本地环境

### 1. 注册并验证 GitHub 账号

1. 打开 [GitHub 注册页](https://github.com/signup)，填写邮箱、密码与用户名，按页面提示完成验证。
2. 查收邮件并验证邮箱。未验证邮箱可能无法完成创建仓库等基本操作。
3. 登录后建议开启双重验证：头像 → **Settings** → **Password and authentication**。用户名会进入博客地址，所以先确定自己想用的名字。

用户主页仓库的名称必须是 **你的用户名.github.io**。例如用户名为 **Yakumo-Sue**，仓库就是 **Yakumo-Sue.github.io**，最终网址为 [https://yakumo-sue.github.io/](https://yakumo-sue.github.io/)。

### 2. 安装 Git 与 Node.js

从 [Git 官网](https://git-scm.com/downloads) 安装 Git，从 [Node.js 官网](https://nodejs.org/) 安装 Node.js。本站工作流使用 Node.js 22，Hexo 项目的 **package.json** 要求 Node.js 20 及以上。安装后重新打开终端，检查：

~~~bash
git --version
node --version
npm --version
~~~

如果命令找不到，先确认安装完成并重开终端，不必先修改博客文件。

## 二、创建仓库与 Hexo 项目

### 3. 创建 GitHub Pages 仓库

登录 GitHub，点击右上角 **+ → New repository**，仓库名填写 **USERNAME.github.io**（把 USERNAME 换成自己的用户名）。个人免费账号可选择 **Public**。第一次从本地推送时，先不要勾选创建 README、.gitignore 或许可证，避免与本地初始化结果冲突。点击 **Create repository**。

这里使用“用户主页”仓库。如果使用普通仓库名，例如 **my-blog**，网址会变成 **https://USERNAME.github.io/my-blog/**，Hexo 的 **url**、**root** 和站内以斜杠开头的图片路径也要跟着调整。

### 4. 初始化 Hexo

在一个准备存放博客的目录运行：

~~~bash
npm install -g hexo-cli
hexo init my-blog
cd my-blog
npm install
npm install --save hexo-server
~~~

这会产生根目录的 **_config.yml**、**package.json**、**source/** 和 **themes/**。本地生成后的 **public/** 是成品，不应当作为源码提交到 **main**。

### 5. 安装 Fluid，同时保留上游目录结构

Fluid 官方文档对普通新站推荐 npm 安装；本站为了在 **themes/fluid** 保留主题的 GitHub 文件夹结构，采用 **Git 子模块**并固定到 v1.9.9：

~~~bash
git init
git branch -M main
git submodule add https://github.com/fluid-dev/hexo-theme-fluid.git themes/fluid
git -C themes/fluid checkout v1.9.9
git add .gitmodules themes/fluid
~~~

以后在另一台电脑克隆时要带上子模块；工作流的 checkout 也必须写 **submodules: recursive**。不要直接改子模块内的文件：把本站配置放在根目录 **_config.fluid.yml**，把自定义 CSS 放在 **source/css/**，升级主题时才不会混在一起。

在根目录 **_config.yml** 中确认这些字段（保留文件里的其他设置）：

~~~yaml
title: 我的博客
author: 你的名字
language: zh-CN
timezone: Asia/Shanghai
url: https://USERNAME.github.io
root: /
permalink: posts/:title/
theme: fluid
~~~

再新建 **_config.fluid.yml**，放入需要覆盖的主题设置。例如：

~~~yaml
navbar:
  blog_title: 我的博客
index:
  banner_img: /img/banner.webp
  banner_img_height: 100
post:
  toc:
    enable: true
    placement: right
~~~

把图片放在 **source/img/banner.webp**。这里的 **_config.fluid.yml** 是站点根目录的覆盖配置，**themes/fluid/_config.yml** 是主题自带默认值。Fluid 的关于页需另建 **source/about/index.md**，并在 Front Matter 中写 **layout: about**。

## 三、用 Markdown 写文章与放图片

文章源码位于 **source/_posts/**。本站的开篇文章保存在 **source/_posts/hello-world.md**，本文放在 **source/_posts/技术手记/**，排错记录放在 **source/_posts/随笔/**。这只是源码组织方式；在 **_config.yml** 使用 **posts/:title/** 时，Hexo 的 **:title** 会包含相对于 _posts 的子目录。因此，若搬动旧文章但想保持原链接，请在文章头部指定 **permalink**。

~~~yaml
---
title: 'Hello, World：在这里，开始记录'
date: 2026-10-21 00:00:00
permalink: posts/hello-world/
categories: [随想]
tags: [博客, 写作, 日常]
description: 文章在首页显示的摘要
---
~~~

普通内容接在第二条分隔线后面。图片存入 **source/img/**，文章中用绝对路径引用，例如：

~~~markdown
![部署流程](/img/blog-deploy/pipeline.svg)
~~~

![博客仓库中最重要的目录与文件](/img/blog-deploy/folders.svg)
*图 2：Markdown 是源码，public/ 是构建产物。示意图。*

在项目根目录先运行：

~~~bash
npx hexo clean
npx hexo generate
npx hexo server
~~~

浏览器访问 **http://localhost:4000/**。本站还提供 **npm run build** 来生成 **public/**。每次改完 Markdown 都可以先在本地检查图片、目录与代码块。

## 四、分清两种 Token：本地推送与自动构建

### 6. 本地向 GitHub 推送

优先使用 [GitHub CLI](https://cli.github.com/) 的 **gh auth login**，或 Git Credential Manager 的浏览器授权。若必须使用个人访问令牌（PAT）完成 HTTPS Git 推送，可这样创建：

1. GitHub 头像 → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**。
2. 填写用途和较短的过期时间；**Resource owner** 选自己的账号。
3. **Repository access** 选 **Only select repositories**，只选博客仓库。
4. 在仓库权限中给 **Contents: Read and write**。如果所用令牌还要创建或修改 **.github/workflows/**，按 GitHub 的权限提示增加 **Workflows: Read and write**。
5. 生成后立即保存在可信的密码管理器中。命令行通过 HTTPS 提示输入密码时，输入 PAT，而不是 GitHub 登录密码。

不要把 PAT 写进 Markdown、工作流、Git 远程 URL、截图或发给 ChatGPT。令牌若泄露，立即在 GitHub 设置中撤销并重新生成。以上 PAT 是**本地身份凭据**，不是下面工作流的 **GITHUB_TOKEN**。

![本地 PAT 与工作流 GITHUB_TOKEN 的用途](/img/blog-deploy/tokens.svg)
*图 3：两种令牌所在的位置不同；站点页面不应包含任何真实令牌。*

### 7. GitHub Actions 的 GITHUB_TOKEN

GitHub 会为每次工作流运行自动创建 **GITHUB_TOKEN**，**不需要**去 Personal access tokens 页面手工生成，也不需要创建同名仓库 Secret。本站的工作流用 **permissions: contents: write** 授权它把生成的页面写到同仓库的 **gh-pages** 分支。权限只给需要写入分支的工作流。

如果将来要访问另一个仓库或第三方服务，才考虑单独的凭据。此时应在仓库 **Settings → Secrets and variables → Actions → New repository secret** 保存为 Secret，并在工作流使用 **secrets.名称**；不能把令牌明文提交进 deploy.yml。

## 五、编写 deploy.yml：本站现用的分支发布方案

在项目根目录创建 **.github/workflows/deploy.yml**，本站目前使用的完整内容如下：

~~~yaml
name: Build and publish Hexo

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive

      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: npm

      - run: npm ci
      - run: npm run build

      - name: Publish static files
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
          publish_branch: gh-pages
~~~

逐项理解它，之后排错才不会只靠复制粘贴：

1. **on.push.branches** 指定推送 **main** 自动执行；**workflow_dispatch** 允许在 Actions 页手动运行。
2. **permissions.contents: write** 给本次运行的内建令牌写仓库内容的权限。
3. **checkout** 取回源码与 Fluid 子模块；少了 **submodules: recursive**，CI 中可能找不到主题。
4. **setup-node** 使用与项目兼容的 Node.js 22，并缓存 npm 下载。
5. **npm ci** 严格按照 **package-lock.json** 安装；**npm run build** 执行 Hexo，输出到 **public/**。
6. **actions-gh-pages** 只把 **public/** 的构建结果提交到 **gh-pages**，不会把 node_modules 或 Markdown 当成网页。

**此方案的 Pages 设置**：第一次推送后等待 Actions 创建 **gh-pages** 分支。然后进入仓库 **Settings → Pages → Build and deployment**，将 **Source** 选为 **Deploy from a branch**，分支选 **gh-pages**、目录选 **/(root)**，点击 **Save**。

![GitHub Pages 的发布来源设置示意](/img/blog-deploy/pages-settings.svg)
*图 4：本站现用方案的设置路径；绘制的界面示意，并非真实账户截屏。*

GitHub 文档明确提醒：使用 **GITHUB_TOKEN** 的工作流向发布分支提交，**不会触发后续的 Pages 构建**。本站的历史运行中能看到 **Build and publish Hexo** 与 **pages build and deployment** 成功，但不能据此保证新仓库也会因该提交自动发布。如果遇到“工作流成功但公开网页未更新”，请使用下一节的**官方直接部署方案**，并切换 Pages 的 Source。不要同时跑两种 deploy.yml。

## 六、官方直接部署方案：不使用 gh-pages 分支

对于从零创建、希望避免发布分支触发问题的博客，GitHub 和 Hexo 官方文档采用 **upload-pages-artifact + deploy-pages**。把 Pages 的 **Source** 改为 **GitHub Actions**，并用下面内容**替换**前一节的 deploy.yml：

~~~yaml
name: Deploy Hexo to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: github-pages
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive

      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: npm

      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

      - id: deployment
        uses: actions/deploy-pages@v4
~~~

这里 **contents: read** 只用来读取源码；**pages: write** 和 **id-token: write** 用于直接部署 Pages。**upload-pages-artifact** 上传构建结果，**deploy-pages** 发布它；不再使用 **peaceiris/actions-gh-pages**，也无需写 **gh-pages** 分支。两套方案的 Pages Source 设置不同，这一点最容易漏掉。

## 七、提交、查看部署并继续写作

先检查项目的 **.gitignore** 包含 **node_modules/**、**public/**、**db.json** 和 **dist/**。本地把源码推送到刚创建的仓库：

~~~bash
git add -A
git commit -m "Create Hexo blog with Fluid"
git remote add origin https://github.com/USERNAME/USERNAME.github.io.git
git push -u origin main
~~~

如果之前已经配置过 origin，使用 **git remote -v** 检查，不必重复添加。推送后进入仓库 **Actions**，查看 **Build and publish Hexo** 或 **Deploy Hexo to GitHub Pages** 的运行日志；成功后在 **Settings → Pages** 查看公开地址，再打开博客首页和一篇文章核验链接与图片。部署可能需要几分钟。

之后发布新文章只需编辑 **source/_posts/** 下的 Markdown，先本地预览，再提交并推送 **main**。流水线会重新生成静态页面，无需手工上传 HTML。

### ChatGPT 在这条流程中做什么

可以让 ChatGPT 帮你拟标题、整理 Front Matter、审阅 deploy.yml、解释失败日志和绘制示意图。例如：

> 我使用 Hexo 8、Fluid 主题 Git 子模块、Node.js 22，仓库是 USERNAME.github.io。请检查这份 deploy.yml 是否包含子模块 checkout、npm ci、构建及 GitHub Pages 发布步骤，并指出与 Settings → Pages 选择不一致的地方。

把**配置片段和脱敏日志**给它即可。令牌、密码和仓库 Secret 的值不要放进提示词。本站的私有预览站与公开的 GitHub Pages 是两个发布目标；GitHub Pages 仍以仓库提交和 Actions 运行结果为准。

## 八、常见问题按什么顺序查

- **首页 404**：确认仓库名是否为 **USERNAME.github.io**，Pages Source 与当前 deploy.yml 是否配套，Actions 是否成功。
- **首页更新了，文章却 404**：检查文章的 **permalink**、新旧路径，以及生成后 **public/posts/** 中是否有对应目录。
- **图片或样式丢失**：用户主页仓库通常设置 **root: /**；项目页面要改站点路径，文章中的 **/img/** 绝对路径也要处理。
- **CI 报找不到 Fluid**：检查 **themes/fluid** 是否已提交为子模块，**.gitmodules** 是否存在，checkout 是否启用 **submodules: recursive**。
- **npm ci 失败**：本地安装依赖后提交更新过的 **package-lock.json**，使 package.json 与锁文件一致。
- **推送或发布时报 403**：本地确认登录或 PAT 对仓库有写入权限；CI 检查 **permissions**。不要为了排错公开令牌。
- **构建成功但网页还是旧的**：检查 **pages build and deployment** 是否执行；分支方案可按第六节改用官方直接部署方案。

## 参考资料

- [GitHub：创建账号](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github)
- [GitHub：配置 Pages 发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub：管理个人访问令牌](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- [GitHub：工作流中的 GITHUB_TOKEN](https://docs.github.com/en/actions/tutorials/authenticate-with-github_token)
- [GitHub：在 Actions 中使用 Secrets](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets)
- [Hexo：安装与 GitHub Pages 部署](https://hexo.io/zh-cn/docs/setup/) · [Pages 教程](https://hexo.io/zh-cn/docs/github-pages)
- [Hexo：永久链接](https://hexo.io/docs/permalinks)
- [Fluid：开始使用](https://fluid-dev.github.io/hexo-fluid-docs/start/)
- [peaceiris/actions-gh-pages 文档](https://github.com/peaceiris/actions-gh-pages)
