# TERRA ARCHIVE · 泰拉剧情档案

使用官方 `create-vite` React 模板创建的《明日方舟》非官方剧情向网站。React 19 管理页面与交互状态，Vite 8 负责开发服务、按页分包和生产构建。这里保留完整源码，`dist/` 和博客的 `source/arknights/` 均是生成目录。

- 网站：https://yakumo-sue.github.io/arknights/
- 开发博客：https://yakumo-sue.github.io/posts/arknights-vite-react-development/
- [功能与需求规格](docs/requirements.md)
- [发布与维护说明](docs/development.md)

## 开发

Node.js **22.12 或更新版本**。依赖的准确版本由 `package-lock.json` 固定。

```bash
cd projects/arknights
npm ci
npm run dev
```

以终端显示的地址为准。`npm test` 检查时间排序、续读边界和来源 URL；`npm run build` 先校验数据与资源，再输出 `dist/`；`npm run preview` 可预览生产构建。

## 范围

四个主入口：首页、总览、设定、其他；另有独立剧情播放器、全部剧情目录、组织关系概览、泰拉地区导航、干员列表与详情。支持 hash 深层链接、本机进度、搜索、基础剧透保护、减少动态效果及小屏布局。

当前资料截止 **2026-10-25**：688 个叙事单元、1558 个原创梳理场景、432 条干员列表记录。73 篇含扩展节点，其余条目为概要。播放器**不是逐字原文或完整原始演出**，没有原始音轨。年代为整理定位或未定；地图为概略阅读标点；图谱为 4 组组织关联；设定为 44 个原创导读入口；塞壬唱片提供官方入口。

游戏图片与设定归原权利方所有，详见 `public/assets/sources.json`。本地保存 8 张干员头像，其余头像按需外链并提供失败回退。没有自动追更或云端账号功能。

## 目录

| 位置 | 职责 |
|---|---|
| `src/App.jsx` | 数据加载、hash 路由、按页加载与错误边界 |
| `src/context.jsx` | 资料、偏好、本机进度和通用弹窗 |
| `src/components/` | 导航、页脚、搜索、设置、来源和基础组件 |
| `src/pages/` | 首页、时间轴、播放器、设定、干员、图谱、地图、图集 |
| `src/lib/archive.js` | 排序、游标恢复、来源检查、数据加载等纯函数 |
| `src/lore.js` | 国家、组织和六章原创导读 |
| `public/data/` | 剧情 JSON / gzip 与干员事实索引 |
| `public/assets/` | CG、Logo、地图、部分头像及字体许可 |
| `scripts/validate-data.mjs` | 编号、计数、形态链接、gzip 和资源校验 |

## GitHub Pages

在仓库根目录运行 `npm ci` 后运行 `npm run build`。根 `prebuild` 安装本项目的锁定依赖；构建工具执行测试、Vite 构建，将 `dist/` 复制到 `source/arknights/`，随后由 Hexo 生成整个博客。已有 GitHub Actions 在 `main` 提交后发布 `public/` 到 `gh-pages`，无须另建一条互相覆盖的发布流程。

更新数据后同步更新 gzip，并运行构建校验。不要手动维护生成目录。详细说明见 `docs/development.md`。
