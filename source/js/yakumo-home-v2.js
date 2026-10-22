(() => {
  const board = document.querySelector('#board.yakumo-list-board');
  const arrow = document.querySelector('.scroll-down-bar');
  const navbar = document.getElementById('navbar');
  const column = document.querySelector('.yakumo-sidebar-column');
  const sidebar = column && column.querySelector('.yakumo-sidebar');
  if (!board || !sidebar) return;

  let scheduled = false;
  function update() {
    scheduled = false;
    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
    const reachedArticles = board.getBoundingClientRect().top <= navbarHeight;
    if (arrow) {
      arrow.classList.toggle('yakumo-arrow-hidden', reachedArticles);
      arrow.setAttribute('aria-hidden', String(reachedArticles));
    }
    board.style.setProperty('--yakumo-sidebar-top', `${navbarHeight + 16}px`);
    // Reserve the full card stack so even a short article list has room to pin.
    column.style.setProperty('--yakumo-sidebar-natural-height', `${sidebar.scrollHeight}px`);
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  }

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  addEventListener('pageshow', schedule);
  addEventListener('load', schedule, { once: true });
  if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(schedule);
    observer.observe(sidebar);
    for (const card of sidebar.children) observer.observe(card);
  }
  update();
})();
