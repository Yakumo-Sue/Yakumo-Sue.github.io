import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const requiredFiles = [
  'themes/fluid/_config.yml',
  'themes/fluid/layout/index.ejs',
  'themes/fluid/scripts/generators/index-generator.js'
];
const themeIsReady = () => requiredFiles.every((file) => existsSync(new URL(`../${file}`, import.meta.url)));

if (!themeIsReady()) {
  console.log('Fluid 主题尚未就绪，正在初始化 Git 子模块……');
  const result = spawnSync('git', ['submodule', 'update', '--init', '--recursive', '--', 'themes/fluid'], {
    cwd: root,
    stdio: 'inherit'
  });
  if (result.error || result.status !== 0 || !themeIsReady()) {
    console.error('无法载入 Fluid。请确认 Git 和网络可用，在项目根目录运行 git submodule update --init --recursive 后重试。');
    process.exit(1);
  }
}
