# 开发、数据维护与发布

## 环境和命令

本项目由`npm create vite@9.3.1 projects/arknights -- --template react --no-interactive`创建。安装后的依赖锁使用React 19.3.1、Vite 8.3.5；最低Node.js为22.12。Vite脚手架版本与实际Vite构建工具版本是两件事，以各自记录及锁文件为准。

在`projects/arknights/`执行：

```bash
npm ci
npm run dev
npm test
npm run build
npm run preview
```

`npm run dev`用于热更新开发，`preview`用于已有`dist/`。开发端口以终端输出为准。浏览器中通过`#/story/u0001/1`等hash地址定位场景，刷新不要求服务端路由重写。

## React分工

- `App.jsx`加载资料、用hash路由选择组件、使用`lazy/Suspense`按页面分包，并提供页面错误边界。
- `context.jsx`保存资料、偏好、记录、弹窗和提示；读写localStorage失败不会阻断阅读。
- `Player.jsx`把故事、场景与句子游标分开；逐字计时和自动推进分别管理，副作用在离开页面时清理。文字显示状态绑定场景/行号，避免新句继承上一句的“已显示”状态。
- 地图采用真实底图加HTML标记；通过ResizeObserver测量视口，按统一比例缩放1200×800地图平面，并保持标记字号可读。坐标仅供导航。
- 所有资料文本由React作为文本渲染；外部来源仅接受http/https，图片失败显示占位。未使用`dangerouslySetInnerHTML`注入剧情。

## 数据修改

编辑`public/data/archive.json`后，同步生成压缩副本：

```bash
node --input-type=module -e "import {readFileSync,writeFileSync} from 'node:fs'; import {gzipSync} from 'node:zlib'; writeFileSync('public/data/archive.json.gz',gzipSync(readFileSync('public/data/archive.json')));"
npm run build
```

构建前检查稳定ID、计数、梳理标记、形态链接、本地图片和gzip一致性。数据校验不会认定剧情事实或年代正确，内容修订仍须对照原始来源。新增场景保持ID稳定，不应因插入一段内容而给之后所有旧节点重编号。

设定和国家条目编辑`src/lore.js`；新增资源放入`public/assets/`，在`sources.json`中记录来源及对应剧情。角色图多数是外链，外链失效时只有占位回退，不会自动下载替代图片。

## 与Hexo共存

仓库根`package.json`：

1. `prebuild`确保Fluid子模块存在，再为React子项目执行`npm ci`。
2. `build:arknights`调用`tooling/build-arknights.mjs`，执行测试与Vite构建，将`dist/`复制到`source/arknights/`。
3. `build`随后运行`hexo clean && hexo generate`，生成统一的`public/`。
4. `_config.yml`中`skip_render: [arknights/**]`保证React入口不套用Fluid模板。
5. 现有`.github/workflows/deploy.yml`继续在`main`推送后构建，将整个`public/`发布到`gh-pages`。无需额外工作流覆盖站点。

根目录完整验证：

```bash
npm ci
npm run build
```

根`.gitignore`单独允许`projects/arknights/public/`入库，因为它是图片和JSON源资料；根`public/`仍是忽略的Hexo成品目录。

根脚本会安装子项目锁定依赖；不需要手动把React的`node_modules`提交到Git。`source/arknights/`、`projects/arknights/dist/`和根`public/`均是生成产物，禁止把它们当作源文件修改。

Vite的`base:'./'`让构建资源可以放在`/arknights/`子目录；hash路由不向GitHub Pages请求不存在的章节文件。数据和图片加载统一经过`asset()`，CSS中的公共资源也由Vite按base处理。

## 验证与限制

`npm test`覆盖未知年代排序、实装排序、直接链接与旧进度冲突、非法游标、来源协议和中文断句。构建另做数据一致性检查。浏览器验收应覆盖首页、排序、搜索、播放器开始/下一段/LOG/续读、地图/设定、图谱、干员形态、图集及390px小屏导航。

这不是完整端到端自动化测试套件。动画精确度、Safari、真实触屏手势、屏幕阅读器及所有外链仍需进一步验收。最新发布结果以仓库Actions日志和公开页面为准。

## 常见问题

| 现象 | 排查 |
|---|---|
| 公共网址空白或资源404 | 检查Vite base、生成目录、Pages最近部署结果，勿直接打开源码index.html |
| 数据构建失败 | 查看校验项，尤其是gzip未同步、形态ID不存在和本地图片路径 |
| 看不到完整简介或异格 | 打开阅读设置中的完整档案模式，或主动展开当前条目 |
| 记录在另一台设备消失 | 记录只在当前origin和浏览器；本版支持导出，不提供云端同步或导入 |
| 头像显示文字占位 | 外链图片未成功加载，可通过原档案入口查阅；不是人物信息缺失的判断依据 |
| 音乐不播放 | 当前播放器无原始音轨；其他页提供塞壬唱片官方入口 |
