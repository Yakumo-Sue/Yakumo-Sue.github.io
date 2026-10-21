/* Keep Fluid as an untouched submodule. Add this site's sidebar through its injector. */
'use strict';

const path = require('node:path');
const fs = require('node:fs');

hexo.extend.filter.register('theme_inject', function(injects) {
  const sidebar = path.join(hexo.base_dir, 'site-layout/sidebar.ejs');
  // Register a reusable view without adding it to Fluid's postRight slot.
  hexo.theme.setView('inject/yakumo-sidebar.ejs', fs.readFileSync(sidebar, 'utf8'));
  injects.bodyEnd.file('yakumo-home-sidebar', path.join(hexo.base_dir, 'site-layout/home-sidebar.ejs'));
  injects.head.file('yakumo-post-head', path.join(hexo.base_dir, 'site-layout/post-head.ejs'));
});
