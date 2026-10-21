(() => {
  'use strict';
  const POSTS = window.BLOG_POSTS;
  const CATEGORIES = [...new Set(POSTS.map(p=>p.category))];
  const ALL_TAGS = [...new Set(POSTS.flatMap(p=>p.tags))];
  const SITE = '八云家的记事簿';
  const main = document.getElementById('main');
  const hero = document.getElementById('hero');
  const header = document.getElementById('site-header');
  const dialog = document.getElementById('search-dialog');
  let page = 1, currentRoute = '', currentPost = null, toastTimer;
  const paths = {
    search:'<circle cx="10.7" cy="10.7" r="6.7"/><path d="m16 16 4.5 4.5"/>',
    moon:'<path d="M20.4 14.1A8.5 8.5 0 0 1 9.9 3.6 8.5 8.5 0 1 0 20.4 14.1Z"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5"/>',
    menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
    close:'<path d="m6 6 12 12M6 18 18 6"/>',
    'arrow-down':'<path d="M12 4v16m-6-6 6 6 6-6"/>',
    'arrow-up':'<path d="M12 20V4m-6 6 6-6 6 6"/>',
    'arrow-right':'<path d="M4 12h16m-6-6 6 6-6 6"/>',
    chevron:'<path d="m9 5 7 7-7 7"/>',
    'chevron-left':'<path d="m15 5-7 7 7 7"/>',
    calendar:'<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4m8-4v4M4 11h16"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin:'<path d="m15 3 6 6-4 1-4 4v4l-3-1-3-3-1-3h4l4-4 1-4ZM9 15l-6 6"/>',
    mountain:'<path d="m2 19 7-12 6 12H2Zm11-4 4-8 6 12h-8M7 11l2 2 2-2"/><circle cx="15" cy="4" r="1"/>',
    bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    folder:'<path d="M3 7V5a2 2 0 0 1 2-2h5l3 3h6a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/>',
    tag:'<path d="m3 3 8 0 10 10-8 8L3 11V3Z"/><circle cx="7.5" cy="7.5" r="1"/>',
    rss:'<path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/>',
    sparkles:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>',
    list:'<path d="M9 5h12M9 12h12M9 19h12M3 5h1M3 12h1M3 19h1"/>',
    link:'<path d="m10 13 4-4m-6 7-2 2a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m4 0 2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0" transform="translate(1 0)"/>',
    book:'<path d="M12 6C9 3 5 3 2 4v15c3-1 7-1 10 2 3-3 7-3 10-2V4c-3-1-7-1-10 2Zm0 0v15"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]||paths.book}</svg>`;
  const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const url = (type,value) => `#${type}/${encodeURIComponent(value)}`;
  const postUrl = p => url('post',p.id);
  const strip = str => str.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
  function hydrate(root=document) { root.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon)); }
  function dateLabel(date) {return date.replaceAll('-','.');}
  function illustration(p) {
    if(p.art==='landscape') return `<img src="assets/mountain-lake.webp" alt="雪山与湖泊" loading="lazy" width="600" height="400"><div class="visual-caption">Hello, World.<small>EVERY STORY STARTS SOMEWHERE</small></div>`;
    const label = `<span class="art-label">${esc(p.eyebrow)}</span>`;
    if(p.art==='garden') return `<div class="art garden-art"><svg viewBox="0 0 160 160" aria-hidden="true"><path d="M81 129V56m0 44C43 103 38 77 37 64c26 0 43 12 44 36Zm0-19c2-31 20-44 45-46 1 27-17 45-45 46Z"/><path d="M81 116c-16-17-31-27-43-29m43-6c12-15 26-29 44-45M61 134h39m-46 8h53"/><path d="M79 57c-17-3-21-17-19-28 17 6 21 16 19 28Z"/></svg><i class="leaf-dot"></i>${label}</div>`;
    if(p.art==='books')return `<div class="art books-art"><div class="books-stack"><i class="book"></i><i class="book"></i><i class="book"></i></div><div class="little-cup"></div>${label}</div>`;
    if(p.art==='autumn')return `<div class="art autumn-art"><svg viewBox="0 0 180 160" aria-hidden="true"><path d="M21 139h138M87 136V78m0 25L66 82m21 31 22-22"/><path fill="#cfab7d" stroke="none" d="M87 25c-16 0-25 15-24 25-19 3-28 16-23 31 4 14 22 20 37 15 7 8 29 8 35-2 26 0 35-15 28-29-3-8-12-14-20-15 1-16-15-29-33-25Z"/><path d="M87 135V59m0 26L70 68m17 28 20-23"/><path d="m37 122 5-5 4 5-4 6-5-6m86 4 6-5 5 6-6 4-5-5" fill="#d4af7b" stroke="none"/><circle cx="143" cy="27" r="12" fill="#ead0a2" stroke="none"/></svg>${label}</div>`;
    if(p.art==='code')return `<div class="art code-art"><div class="code-window"><div class="code-window-head"><i></i><i></i><i></i></div><pre>.life {<br>  color: warmth;<br>  space: to breathe;<br>}</pre></div>${label}</div>`;
    if(p.art==='moon')return `<div class="art moon-art"><div class="moon-disc"></div><span class="star">✧</span>${label}</div>`;
    if(p.art==='desk')return `<div class="art desk-art"><svg viewBox="0 0 180 160" aria-hidden="true"><path d="M24 112h130M39 112v28m101-28v28M54 110V93h59v17M63 91V60h50v31M108 57l11-23 18 13-12 20-17-10Zm17 9 15 44m-10 0h21M77 74h22m-22 6h15"/><path d="M31 110V91h14v19m-11-18-3-20m9 20 6-20"/><circle cx="61" cy="31" r="3" fill="currentColor" stroke="none"/></svg>${label}</div>`;
    return `<div class="art pages-art"><svg viewBox="0 0 180 160" aria-hidden="true"><path fill="#f9f3eb" d="M90 50c-18-12-39-13-61-8v79c22-5 43-4 61 8 18-12 39-13 61-8V42c-22-5-43-4-61 8Z"/><path d="M90 50v79M43 57c12-2 25-1 35 4M43 70c12-2 25-1 35 4M43 83c12-2 25-1 35 4m24-26c11-5 23-6 35-4m-35 17c11-5 23-6 35-4m-35 17c11-5 23-6 35-4M117 42V27l7 4 7-4v15"/><path d="m45 18 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z"/></svg>${label}</div>`;
  }
  function tagLinks(tags) {return tags.map(t=>`<a class="tag" href="${url('tag',t)}">${esc(t)}</a>`).join('');}
  function profile() {return `<section class="side-card profile-card"><div class="profile-topography"></div><div class="avatar">${icon('mountain')}</div><h2>八云</h2><p class="profile-subtitle">LIFE IS A JOURNEY</p><p class="bio">一个收集灵感、慢慢写字的人。<br>在这里，与日常温柔相遇。</p><div class="profile-stats"><a href="#archives"><strong>${POSTS.length}</strong><small>文章</small></a><a href="#categories"><strong>${CATEGORIES.length}</strong><small>分类</small></a><a href="#tags"><strong>${ALL_TAGS.length}</strong><small>标签</small></a></div><a class="profile-about" href="#about">关于我 ${icon('arrow-right')}</a></section>`;}
  function sidebar() {return `<aside class="sidebar" aria-label="博客信息">${profile()}<section class="side-card notice"><h3 class="side-title">${icon('bell')}小站公告</h3><p>欢迎来到这间数字小屋。<br>愿文字能留住一点日常，也为你带来一点灵感。</p><small>初次见面，请多关照 ☺</small></section><section class="side-card category-card"><h3 class="side-title">${icon('folder')}文章分类</h3><div class="side-categories">${CATEGORIES.map(c=>`<a href="${url('category',c)}">${c}<span>${POSTS.filter(p=>p.category===c).length}</span></a>`).join('')}</div></section><section class="side-card tag-card"><h3 class="side-title">${icon('tag')}标签漫游</h3><div class="tag-cloud">${tagLinks(ALL_TAGS.slice(0,9))}<a class="tag more" href="#tags">全部标签 →</a></div></section><section class="side-card quote-card"><div class="quote-mark">“</div><p>在平凡的日子里，<br>发现不平凡的微光。</p><small>A NOTE TO SELF</small></section><a class="sidebar-rss" href="feed.xml" target="_blank" rel="noopener">${icon('rss')} 通过 RSS 订阅手记</a></aside>`;}
  function postCard(p,index) {return `<article class="post-card ${p.pinned?'featured':''}"><a href="${postUrl(p)}" class="post-visual ${p.art}" aria-label="阅读：${esc(p.title)}">${illustration(p)}</a><div class="post-card-body"><div class="post-category">${p.pinned?`<span class="pinned">${icon('pin')}置顶</span><span class="dot">/</span>`:''}<a href="${url('category',p.category)}">${esc(p.category)}</a></div><h3><a href="${postUrl(p)}">${esc(p.title)}</a></h3><p class="post-excerpt">${esc(p.excerpt)}</p><div class="post-meta"><span class="meta-item">${icon('calendar')}<time datetime="${p.date}">${dateLabel(p.date)}</time></span><span>·</span><span class="meta-item">${icon('clock')}${p.minutes} 分钟</span><a class="read-link" href="${postUrl(p)}">阅读全文 ${icon('arrow-right')}</a></div></div></article>`;}
  function renderHome(category='',shouldScroll=false) {
    const filtered=category?POSTS.filter(p=>p.category===category):POSTS;
    const pages=Math.ceil(filtered.length/4);
    page=Math.max(1,Math.min(page,pages||1));
    main.innerHTML=`<div class="content-grid" id="latest"><section aria-labelledby="latest-title"><div class="section-heading"><h2 id="latest-title"><i class="heading-line"></i>${category||'最近的记录'}</h2><span class="count">${String(filtered.length).padStart(2,'0')} ENTRIES</span></div><nav class="category-filters" aria-label="文章分类"><a href="#home" class="filter ${!category?'active':''}" ${!category?'aria-current="page"':''}>全部文章</a>${CATEGORIES.map(c=>`<a href="${url('category',c)}" class="filter ${category===c?'active':''}" ${category===c?'aria-current="page"':''}>${c}</a>`).join('')}</nav><div class="post-list">${filtered.slice((page-1)*4,page*4).map(postCard).join('')||'<div class="white-panel empty-state">这个分类还没有文章。</div>'}</div>${pages>1?`<nav class="pagination" aria-label="文章分页"><button data-page="${page-1}" ${page===1?'disabled':''} aria-label="上一页">${icon('chevron-left')}</button>${Array.from({length:pages},(_,i)=>`<button data-page="${i+1}" class="${page===i+1?'active':''}" ${page===i+1?'aria-current="page"':''}>${i+1}</button>`).join('')}<button data-page="${page+1}" ${page===pages?'disabled':''} aria-label="下一页">${icon('chevron')}</button><span class="page-note">共 ${filtered.length} 篇手记</span></nav>`:''}</section>${sidebar()}</div>`;
    if(shouldScroll) document.getElementById('latest').scrollIntoView({behavior:'smooth',block:'start'});
  }
  function intro(english,title,description) {return `<div class="page-intro"><p class="page-eyebrow">${english}</p><h1>${title}</h1><p>${description}</p></div>`;}
  function renderArchives() {
    const months=[...new Set(POSTS.map(p=>p.date.slice(0,7)))];
    main.innerHTML=intro('EVERY MOMENT COUNTS','时光归档','把散落的日子串成线，每一篇都是走过的痕迹。')+`<div class="content-grid inner-grid"><section class="white-panel"><div class="archive-summary">已经写下了 <strong>${POSTS.length}</strong> 篇手记。</div>${months.map(month=>`<h2 class="archive-year">${month.slice(0,4)} <span style="font:11px var(--sans);color:var(--muted)">/ 继续记录</span></h2><h3 class="archive-month">${Number(month.slice(5))} 月 <span style="font-size:10px;color:var(--muted)">· ${POSTS.filter(p=>p.date.startsWith(month)).length} 篇</span></h3><div class="archive-list">${POSTS.filter(p=>p.date.startsWith(month)).map(p=>`<div class="archive-row"><time datetime="${p.date}">${p.date.slice(5).replace('-','.')}</time><a href="${postUrl(p)}">${esc(p.title)}</a><a class="archive-category" href="${url('category',p.category)}">${p.category}</a></div>`).join('')}</div>`).join('')}</section>${sidebar()}</div>`;
  }
  function simplePost(p) {return `<article class="simple-post"><a href="${postUrl(p)}">${esc(p.title)}</a><p>${esc(p.excerpt)}</p><time datetime="${p.date}">${dateLabel(p.date)} · ${esc(p.category)}</time></article>`;}
  function renderTags(selected='') {
    const matched=selected?POSTS.filter(p=>p.tags.includes(selected)):POSTS;
    main.innerHTML=intro('WANDER BY A WORD','灵感标签','循着一个关键词，遇见相似的想法与不同的风景。')+`<div class="content-grid inner-grid"><section class="white-panel"><div class="large-tag-cloud">${ALL_TAGS.map(t=>`<a class="tag ${t===selected?'active':''}" href="${url('tag',t)}" ${t===selected?'aria-current="page"':''}>${esc(t)}<sup>${POSTS.filter(p=>p.tags.includes(t)).length}</sup></a>`).join('')}</div><p class="tags-note">${selected?`正在浏览「${esc(selected)}」下的 ${matched.length} 篇手记。 <a href="#tags" style="color:var(--accent)">查看全部</a>`:'点击一个标签，看看它串起了哪些故事。'}</p><div class="tag-post-results"><h2 class="tag-result-heading">${icon('tag')} ${selected?'# '+esc(selected):'所有手记'}</h2>${matched.map(simplePost).join('')||'<p class="empty-state">暂时没有这个标签的文章。</p>'}</div></section>${sidebar()}</div>`;
  }
  function renderCategories() {
    main.innerHTML=intro('A PLACE FOR EVERY IDEA','文章分类','按主题翻阅这里的记录。')+`<div class="content-grid inner-grid"><section class="white-panel">${CATEGORIES.map(c=>`<section style="margin-bottom:28px"><h2 class="tag-result-heading">${icon('folder')} <a href="${url('category',c)}">${c}</a><span style="font-size:10px;color:var(--muted);margin-left:auto">${POSTS.filter(p=>p.category===c).length} 篇</span></h2>${POSTS.filter(p=>p.category===c).map(simplePost).join('')}</section>`).join('')}</section>${sidebar()}</div>`;
  }
  function renderAbout() {
    main.innerHTML=intro('A LITTLE ABOUT THIS PLACE','你好，欢迎来到这里。','网络很大，很高兴我们在这间小屋相遇。')+`<div class="content-grid inner-grid"><section class="white-panel about-panel"><div class="about-cover" role="img" aria-label="山湖之间的一间小屋"></div><div class="about-content"><p class="page-eyebrow">NICE TO MEET YOU</p><h2>我是八云，一个认真记录的人。</h2><p>这是一片留给文字的小天地。把遇见的问题写清楚，把读过的内容慢慢消化，也把那些容易被忽略的生活片刻，好好收藏。</p><p>不一定每篇都有答案，但希望每篇都带着一点好奇和诚意。世界很热闹，这里可以慢一些。</p><h3>关于这本手记</h3><p>「八云家的记事簿」的灵感来自 Hexo 博客：清爽的排版、顺着时间展开的文章、可以随意漫游的标签。希望你在这里阅读时，像翻开一本熟悉的笔记。</p><h3>一些想持续关注的小事</h3><div class="interest-list"><span>⌘ 技术与创造</span><span>▤ 阅读与思考</span><span>↟ 自然与散步</span><span>✎ 写作与记录</span></div><p>愿每一次阅读都有一点收获，也愿每一个普通的日子，都有值得留下的微光。</p><div class="about-links"><a href="#archives">${icon('book')}翻翻以前的手记</a><a href="feed.xml" target="_blank" rel="noopener">${icon('rss')}RSS 订阅</a></div></div></section>${sidebar()}</div>`;
  }
  function renderPost(id) {
    const p=POSTS.find(p=>p.id===id);
    if(!p){render404();return;}
    currentPost=p;
    const headings=[...p.body.matchAll(/<h2 id="([^"]+)">([^<]+)<\/h2>/g)];
    const index=POSTS.indexOf(p),older=POSTS[index+1],newer=POSTS[index-1];
    main.innerHTML=`<nav class="post-breadcrumb" aria-label="面包屑"><a href="#home">首页</a>${icon('chevron')}<a href="${url('category',p.category)}">${p.category}</a>${icon('chevron')}<span class="breadcrumb-title">${esc(p.title)}</span></nav><div class="article-grid"><div><article class="article-panel"><header class="article-heading"><div class="post-category"><a href="${url('category',p.category)}">${p.category}</a></div><h1>${esc(p.title)}</h1><div class="post-meta"><span class="meta-item">${icon('calendar')}<time datetime="${p.date}">${dateLabel(p.date)}</time></span><span class="meta-item">${icon('clock')}约 ${p.minutes} 分钟阅读</span><span>作者 · 八云</span></div></header>${p.art!=='landscape'?`<div class="article-cover-art">${illustration(p)}</div>`:''}<div class="article-body">${p.body}</div><footer class="article-end"><div class="tag-cloud">${tagLinks(p.tags)}</div><button class="share-button" id="share-post">${icon('link')}复制文章链接</button></footer></article>${newer||older?`<nav class="post-navigation" aria-label="相邻文章">${newer?`<a href="${postUrl(newer)}"><small>← 上一篇</small><span>${esc(newer.title)}</span></a>`:'<span></span>'}${older?`<a href="${postUrl(older)}"><small>下一篇 →</small><span>${esc(older.title)}</span></a>`:'<span></span>'}</nav>`:''}</div><aside class="article-sidebar"><section class="side-card toc"><h2 class="side-title">${icon('list')}文章目录</h2>${headings.map((h,i)=>`<a href="${postUrl(p)}" data-toc="${h[1]}">${String(i+1).padStart(2,'0')} · ${esc(h[2])}</a>`).join('')}<div class="toc-progress">阅读进度 <span id="reading-percent">0%</span></div></section><div style="margin-top:20px">${profile()}</div></aside></div>`;
    document.title=p.title+' · '+SITE;
  }
  function render404(){currentPost=null;main.innerHTML=`<div class="not-found"><h1>404</h1><h2>这页手记，还没有写下。</h2><p>也许走错了一个路口，回到首页继续翻翻吧。</p><a href="#home">返回首页</a></div>`;document.title='未找到文章 · '+SITE;}
  function route() {
    let hash;try{hash=decodeURIComponent(location.hash.slice(1)||'home');}catch{hash='404';}
    const [section,...pieces]=hash.split('/'),value=pieces.join('/');
    const isHome=['home','latest','category'].includes(section);
    currentRoute=hash;currentPost=null;page=1;
    hero.hidden=!isHome;header.classList.toggle('solid',!isHome);header.classList.remove('floating');
    document.getElementById('mobile-nav').hidden=true;
    document.getElementById('menu-toggle').setAttribute('aria-expanded','false');
    document.querySelectorAll('[data-nav]').forEach(a=>{const active=a.dataset.nav===(isHome?'home':section==='tag'?'tags':section==='post'?'':section);a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    document.title=(section==='home'||section==='latest'?'记录生活，保持热爱':{archives:'时光归档',categories:'文章分类',tags:'灵感标签',tag:value,category:value,about:'关于这里'}[section]||'阅读手记')+' · '+SITE;
    if(isHome)renderHome(section==='category'?value:'');
    else if(section==='archives')renderArchives();
    else if(section==='tags'||section==='tag')renderTags(value);
    else if(section==='categories')renderCategories();
    else if(section==='about')renderAbout();
    else if(section==='post')renderPost(value);
    else render404();
    hydrate(main);window.scrollTo({top:0,behavior:'instant'});
    if(section==='latest'||section==='category')requestAnimationFrame(()=>document.getElementById('latest').scrollIntoView({block:'start',behavior:'instant'}));
    updateScroll();
  }
  function toast(message){const el=document.getElementById('toast');el.textContent=message;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),2600);}
  async function copy(text){try{await navigator.clipboard.writeText(text);return true;}catch{const area=document.createElement('textarea');area.value=text;area.style.cssText='position:fixed;opacity:0;';document.body.append(area);area.select();const success=document.execCommand('copy');area.remove();return success;}}
  function search(){
    const raw=document.getElementById('search-input').value.trim();
    const q=raw.toLocaleLowerCase();
    const words=q.split(/\s+/).filter(Boolean);
    const results=q?POSTS.filter(p=>{const hay=[p.title,p.excerpt,p.category,...p.tags,strip(p.body)].join(' ').toLocaleLowerCase();return words.every(w=>hay.includes(w));}):POSTS.slice(0,4);
    document.getElementById('search-results').innerHTML=`<p class="search-label">${q?`找到 ${results.length} 篇相关手记`:'不妨从这篇手记开始'}</p>`+(results.length?results.map(p=>`<a class="search-result" href="${postUrl(p)}"><strong>${esc(p.title)}</strong><p>${esc(p.excerpt)}</p><small>${dateLabel(p.date)} · ${esc(p.category)} · ${p.tags.map(t=>'#'+esc(t)).join(' ')}</small></a>`).join(''):`<div class="empty-state">${icon('search')}还没有找到相关的手记。<small>试试「博客」「写作」或「日常」等关键词。</small></div>`);
  }
  function openSearch(){search();if(!dialog.open)dialog.showModal();requestAnimationFrame(()=>document.getElementById('search-input').focus());}
  function updateThemeButton(){const dark=document.documentElement.dataset.theme==='dark';const b=document.getElementById('theme-toggle');b.innerHTML=icon(dark?'sun':'moon');b.setAttribute('aria-label',dark?'切换为浅色模式':'切换为深色模式');b.setAttribute('aria-pressed',String(dark));}
  let ticking=false;
  function updateScroll(){
    ticking=false;
    const isHome=!hero.hidden;
    header.classList.toggle('floating',isHome&&window.scrollY>82);
    document.getElementById('back-top').hidden=window.scrollY<450;
    let percent=0;
    if(currentPost){const article=document.querySelector('.article-panel');if(article){const start=article.offsetTop;const length=Math.max(1,article.offsetHeight-window.innerHeight+100);percent=Math.min(100,Math.max(0,(window.scrollY-start+80)/length*100));const readEl=document.getElementById('reading-percent');if(readEl)readEl.textContent=Math.round(percent)+'%';const headings=[...document.querySelectorAll('.article-body h2')];let active=headings[0]?.id;for(const h of headings){if(h.getBoundingClientRect().top<180)active=h.id;}document.querySelectorAll('[data-toc]').forEach(a=>a.classList.toggle('active',a.dataset.toc===active));}}
    document.querySelector('.reading-progress').style.width=percent+'%';
  }
  document.addEventListener('click',async e=>{
    const link=e.target.closest('a');
    if(link?.classList.contains('skip-link')){e.preventDefault();main.focus({preventScroll:true});main.scrollIntoView({block:'start',behavior:'smooth'});return;}
    if(link&&link.closest('.search-results'))dialog.close();
    const pg=e.target.closest('[data-page]');if(pg&&!pg.disabled){page=Number(pg.dataset.page);renderHome(currentRoute.startsWith('category/')?currentRoute.slice(9):'',true);hydrate(main);return;}
    const toc=e.target.closest('[data-toc]');if(toc){e.preventDefault();document.getElementById(toc.dataset.toc)?.scrollIntoView({behavior:'smooth',block:'start'});return;}
    const copyButton=e.target.closest('.copy-code');if(copyButton){const code=copyButton.previousElementSibling.textContent;const ok=await copy(code);toast(ok?'代码已复制':'复制未成功，请选择代码手动复制');return;}
    if(e.target.closest('#share-post')){const ok=await copy(location.href);toast(ok?'文章链接已复制':'复制未成功，请从地址栏复制链接');return;}
    if(e.target.closest('.search-trigger'))openSearch();
    if(link&&link.hash===location.hash&&link.hash!=='#home'&&!link.hasAttribute('data-toc')){if(link.closest('#mobile-nav')){document.getElementById('mobile-nav').hidden=true;document.getElementById('menu-toggle').setAttribute('aria-expanded','false');}}
    if(link&&link.hash==='#home'&&location.hash==='#home')window.scrollTo({top:0,behavior:'smooth'});
  });
  document.getElementById('search-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  document.getElementById('search-input').addEventListener('input',search);
  document.getElementById('theme-toggle').addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;try{localStorage.setItem('yakumo-theme',theme);}catch{}updateThemeButton();});
  document.getElementById('menu-toggle').addEventListener('click',()=>{const nav=document.getElementById('mobile-nav');nav.hidden=!nav.hidden;document.getElementById('menu-toggle').setAttribute('aria-expanded',String(!nav.hidden));});
  document.getElementById('back-top').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(dialog.open)dialog.close();else openSearch();}if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)&&!dialog.open){e.preventDefault();openSearch();}});
  window.addEventListener('hashchange',route);
  window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateScroll);ticking=true;}},{passive:true});
  window.addEventListener('resize',updateScroll);
  hydrate();updateThemeButton();route();
})();
