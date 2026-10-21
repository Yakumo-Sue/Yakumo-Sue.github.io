/* Keep Fluid as an untouched submodule. Add this site's sidebar through its injector. */
'use strict';

const path = require('node:path');

hexo.extend.filter.register('theme_inject', function(injects) {
  const sidebar = path.join(hexo.base_dir, 'site-layout/sidebar.ejs');
  injects.postRight.file('yakumo-sidebar', sidebar);
  injects.bodyEnd.file('yakumo-home-sidebar', path.join(hexo.base_dir, 'site-layout/home-sidebar.ejs'));
});
