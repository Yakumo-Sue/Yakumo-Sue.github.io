(() => {
  const board = document.querySelector('#board.yakumo-list-board');
  const arrow = document.querySelector('.scroll-down-bar');
  const navbar = document.getElementById('navbar');
  if (!board || !arrow) return;

  let scheduled = false;
  function update() {
    scheduled = false;
    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
    const reachedArticles = board.getBoundingClientRect().top <= navbarHeight;
    arrow.classList.toggle('yakumo-arrow-hidden', reachedArticles);
    arrow.setAttribute('aria-hidden', String(reachedArticles));
    board.style.setProperty('--yakumo-sidebar-top', `${navbarHeight + 16}px`);
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  }

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  addEventListener('pageshow', schedule);
  update();
})();
