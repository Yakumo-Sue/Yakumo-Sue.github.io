---
title: '使用Hexo搭建博客后出现Cannot GET/问题'
date: 2026-10-22 12:30:00
updated: 2026-10-22 12:30:00
permalink: posts/hexo-cannot-get/
categories: [随笔]
tags: [Hexo, Fluid, 故障排查]
description: npm run server 提示启动成功，首页却出现 Cannot GET /？从 Fluid 子模块、首页路由、文章与缓存逐步定位，并记录重新克隆后的实测结果。
---

终端已经显示 **Hexo is running at http://localhost:4000/**，浏览器却只剩下 **Cannot GET /**。遇到这种情况，先别急着重装整个博客：服务进程启动成功，只能说明它开始接收请求，并不保证首页已经生成。

本文结合 Hexo、Git 与 Fluid 的官方说明，以及本站的一次隔离复现，记录如何检查这个问题。**这次在测试副本中确认的触发条件是 Fluid 主题子模块未初始化；读者电脑上的具体原因仍需按日志核对。**

## 一、先区分“服务没启动”和“没有首页”

| 现象 | 优先检查 |
| --- | --- |
| 浏览器提示无法连接，终端没有启动成功日志 | 进程是否退出、端口与访问地址 |
| 终端报 EADDRINUSE | 4000 端口是否被另一进程占用 |
| 浏览器显示 Cannot GET /，请求返回 404 | 首页路由、主题模板、生成器与生成错误 |
| 首页正常，某一篇文章 404 | 文章日期、permalink、草稿或隐藏设置 |
| 页面能打开，图片或 CSS 丢失 | root、静态文件路径与主题资源 |

Hexo 的默认开发地址是 **http://localhost:4000/**。若端口冲突，可以运行：

~~~bash
npm run server -- --port 4001
~~~

随后应访问 **http://localhost:4001/**。不要只改命令里的端口，却继续刷新旧地址。

## 二、从 GitHub 克隆时，把 Fluid 子模块一起取回

本站把 Fluid 作为 Git 子模块放在 **themes/fluid/**，主仓库记录的是主题提交的位置，普通克隆不一定已经下载主题内容。最省事的完整克隆方式是：

~~~bash
git clone --recurse-submodules https://github.com/Yakumo-Sue/Yakumo-Sue.github.io.git
cd Yakumo-Sue.github.io
npm ci
npm run server
~~~

如果已经执行过普通 **git clone**，不用删除现有项目。在包含 **package.json** 和 **_config.yml** 的项目根目录运行：

~~~bash
git submodule update --init --recursive
git submodule status
npm ci
npm run server
~~~

其中 **--init** 初始化尚未初始化的子模块，**--recursive** 继续处理嵌套子模块。初始化成功后，确认下面这些文件实际存在：

~~~text
themes/fluid/_config.yml
themes/fluid/layout/index.ejs
themes/fluid/scripts/generators/index-generator.js
~~~

只看到一个空的 **themes/fluid/** 文件夹，并不表示主题已完整安装。若 Git 下载失败，先处理终端中的网络、代理或访问错误，再重试；不要用创建空 index.html 的方式掩盖缺少主题的问题。

### 本站增加的启动检查

本站现在通过 **preserver** 和 **prebuild** 钩子运行 **tooling/ensure-fluid.mjs**：主题完整时直接继续；主题缺失时调用 Git 初始化子模块；仍然失败则退出并显示修复命令。

~~~json
{
  "scripts": {
    "preserver": "node tooling/ensure-fluid.mjs",
    "server": "hexo server",
    "prebuild": "node tooling/ensure-fluid.mjs",
    "build": "hexo clean && hexo generate"
  }
}
~~~

这让遗漏 **--recurse-submodules** 更容易被发现。它需要本机已安装 Git，且网络能够访问主题仓库；失败时请阅读终端提示。直接执行 **npx hexo server** 不会经过 npm 的 **preserver** 钩子，因此日常预览优先使用 **npm run server**。

## 三、不要把“_posts 根目录必须有文章”当成通用原因

本站在修改之前，文章都放在 **source/_posts/** 的子目录中。重新从 GitHub 完整克隆、执行 **npm ci** 后，未提前生成 public，直接运行 **npm run server**，首页和两篇文章都返回了 **HTTP 200**。

因此，在这套 Hexo 8.1.2 与 Fluid v1.9.9 的配置中，**没有根目录 Markdown 并不会自动导致 Cannot GET /**。Hexo 支持带子目录的文章路径，官网命令说明也展示了 **source/_posts/about/me.md** 这样的路径。

这次仍将开篇文章移回根目录，便于管理；其他文章继续保留在子目录中：

~~~text
source/_posts/hello-world.md
source/_posts/技术手记/github-pages-hexo-fluid-chatgpt.md
source/_posts/随笔/hexo-cannot-get.md
~~~

文件夹名称不会自动成为分类。分类仍由文章 Front Matter 中的 **categories** 决定。搬动文章时，固定 **permalink** 可以保持旧链接，例如：

~~~yaml
---
title: 'Hello, World：在这里，开始记录'
permalink: posts/hello-world/
date: 2026-10-21 00:00:00
categories: [随想]
---
~~~

## 四、检查首页配置与生成结果

先检查根目录 **_config.yml**，不要误改成主题目录下的同名文件。本站的关键配置如下：

~~~yaml
theme: fluid
root: /
index_generator:
  path: ''
  per_page: 10
  order_by: date
per_page: 10
pagination_dir: page
~~~

**path: ''** 表示在站点根路径生成首页；**per_page: 10** 表示首页列表每页最多十篇；**order_by: date** 是从早到晚，**-date** 则相反。项目页面如果部署在 **/my-blog/** 等子路径，应根据实际地址调整 root 和访问路径。

接着停止正在运行的服务，再检查一次静态生成：

~~~bash
npx hexo clean
npm run build
~~~

确认 **public/index.html** 存在，同时阅读终端中最早出现的错误。检查路由和被识别到的文章也很有用：

~~~bash
npx hexo list route
npx hexo list post
~~~

如果没有首页路由，排查主题、首页生成器以及 **index_generator.path**。Fluid v1.9.9 自带首页生成逻辑，本站不需要为了这个问题再重复安装 **hexo-generator-index**。其他主题若依赖该插件，则应按其文档检查是否已安装。

若路由存在，但某篇文章没有列出来，再检查 **date** 是否是未来时间、文章是否还在 **_drafts**、是否设置了隐藏，以及 YAML 是否有缩进或引号错误。不要只因为文件在磁盘上，就认定它已经参与本次生成。

## 五、开发模式与静态模式不要混用

日常写作使用：

~~~bash
npm run server
~~~

它运行 **hexo server**，会处理内容并监听文件变化，通常不需要每次先执行 generate。若使用静态模式 **--static**，Hexo 只提供 **public/** 里的文件，需要先生成：

~~~bash
npm run build
npm run server -- --static
~~~

如果刚执行过 **hexo clean**，public 已被清理，立即启动静态模式就不能指望它自动补出首页。遇到缓存或内容未更新，可以停止服务、clean、重新构建，再启动；不要同时保留多个旧服务进程。

## 六、这次实际验证了什么

在 Linux、Node.js 24.19.0、npm 11.9.0 环境中，本次先用未修改的 GitHub 源码完成了对照检查：

| 条件 | 结果 |
| --- | --- |
| 完整克隆主仓库和 Fluid，文章仅在 _posts 子目录 | npm run server 正常，首页和两篇文章均为 200 |
| 在隔离副本中取消初始化 Fluid 子模块 | 服务提示启动成功，首页为 404，正文显示 Cannot GET / |
| 在缺少主题的副本中加入启动检查后执行 npm run server | 自动初始化 Fluid，首页与三篇文章均为 200，CSS 和首页脚本也正常返回 |

以上验证没有依赖提前生成的 public 首页。它能确认这套源码在该环境中的启动情况；如果另一台电脑仍有问题，优先保存终端日志、Node/npm 版本、**git submodule status** 和失败 URL，再逐项比对。

## 参考资料

- [Hexo：本地服务器与静态模式](https://hexo.io/docs/server)
- [Hexo：配置说明](https://hexo.io/docs/configuration)
- [Hexo：命令、路由列表与清理缓存](https://hexo.io/docs/commands)
- [Hexo：故障排除](https://hexo.io/docs/troubleshooting)
- [Git：git submodule](https://git-scm.com/docs/git-submodule)
- [npm：scripts 与 pre/post 钩子](https://docs.npmjs.com/cli/v11/using-npm/scripts)
- [Fluid v1.9.9：首页生成器源码](https://github.com/fluid-dev/hexo-theme-fluid/blob/v1.9.9/scripts/generators/index-generator.js)
