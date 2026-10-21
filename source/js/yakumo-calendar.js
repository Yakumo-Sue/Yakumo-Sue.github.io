(() => {
  function initCalendar() {
    const calendar = document.querySelector('.yakumo-calendar');
    if (!calendar) return;

    const posts = JSON.parse(calendar.dataset.posts || '[]');
    const days = calendar.querySelector('.yakumo-calendar-days');
    const monthLabel = calendar.querySelector('.yakumo-calendar-month');
    const today = new Date();
    const visible = new Date(today.getFullYear(), today.getMonth(), 1);

    function render() {
      const year = visible.getFullYear();
      const month = visible.getMonth();
      const numberOfDays = new Date(year, month + 1, 0).getDate();
      const startOffset = (new Date(year, month, 1).getDay() + 6) % 7;
      monthLabel.textContent = `${year}年${month + 1}月`;
      days.replaceChildren();

      for (let i = 0; i < startOffset; i++) {
        days.appendChild(document.createElement('span'));
      }
      for (let day = 1; day <= numberOfDays; day++) {
        const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const article = posts.find((post) => post.date === date);
        const cell = document.createElement(article ? 'a' : 'span');
        cell.className = 'yakumo-calendar-day';
        cell.textContent = String(day);
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
          cell.classList.add('is-today');
        }
        if (article) {
          cell.classList.add('has-post');
          cell.href = article.url;
          cell.title = `${date}：${article.title}`;
          cell.setAttribute('aria-label', cell.title);
        }
        days.appendChild(cell);
      }
    }

    calendar.querySelector('.yakumo-calendar-prev').addEventListener('click', () => {
      visible.setMonth(visible.getMonth() - 1);
      render();
    });
    calendar.querySelector('.yakumo-calendar-next').addEventListener('click', () => {
      visible.setMonth(visible.getMonth() + 1);
      render();
    });
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalendar, { once: true });
  } else {
    initCalendar();
  }
})();
