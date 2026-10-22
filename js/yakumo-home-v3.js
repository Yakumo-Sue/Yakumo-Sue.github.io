(() => {
  const arrow = document.querySelector('.scroll-down-bar');
  if (!arrow) return;

  let scheduled = false;
  function update() {
    scheduled = false;
    const hasScrolled = window.scrollY > 0;
    arrow.classList.toggle('yakumo-arrow-hidden', hasScrolled);
    arrow.setAttribute('aria-hidden', String(hasScrolled));
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  }

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('pageshow', schedule);
  addEventListener('load', schedule, { once: true });
  update();
})();
