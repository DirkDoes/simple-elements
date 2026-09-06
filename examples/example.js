const pages = [
  ['foundations', 'Foundations', 'dashboard'],
  ['inputs', 'Text Inputs', 'type'],
  ['controls', 'Selection Controls', 'toggle-left'],
  ['selects', 'Dropdowns & Selects', 'list'],
  ['buttons', 'Buttons', 'mouse-pointer'],
  ['uploads', 'File Uploads', 'file-up'],
  ['contextual', 'Contextual', 'message-square'],
  ['content', 'Rich Content', 'code'],
  ['editors', 'Editors', 'edit'],
  ['badges', 'Badges', 'crown'],
  ['lists', 'Lists & Tables', 'table'],
  ['dates', 'Date & Time', 'calendar'],
  ['profiles', 'Profiles', 'users'],
  ['overlays', 'Overlays', 'zap'],
];

const requestedPage = location.hash.slice(1) || 'foundations';
const initialPage = pages.some(([id]) => id === requestedPage) ? requestedPage : 'foundations';
const sidebar = document.querySelector('se-sidebar');
sidebar.options = pages.map(([id, label, icon]) => ({ label, icon, href: `#${id}`, active: id === initialPage }));

document.querySelector('[data-icon-grid]').innerHTML = customElements.get('se-icon').names
  .map((name) => `<div class="demo-icon"><se-icon name="${name}"></se-icon><code>${name}</code></div>`)
  .join('');

const showPage = (id) => {
  const selected = pages.some(([pageId]) => pageId === id) ? id : 'foundations';
  document.querySelectorAll('[data-demo]').forEach((section) => { section.hidden = section.dataset.demo !== selected; });
  document.querySelectorAll('.se-sidebar__link').forEach((link) => link.classList.toggle('se-sidebar__link--active', link.getAttribute('href') === `#${selected}`));
  document.querySelector('.demo-main').scrollTop = 0;
};

showPage(initialPage);
sidebar.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (link) showPage(link.hash.slice(1));
});
addEventListener('hashchange', () => showPage(location.hash.slice(1)));
document.querySelectorAll('[data-open]').forEach((button) => button.addEventListener('click', () => document.getElementById(button.dataset.open).open()));
document.querySelector('.demo-mobile__theme').addEventListener('click', (event) => {
  document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  event.currentTarget.innerHTML = `<se-icon name="${document.documentElement.dataset.theme === 'dark' ? 'moon' : 'sun'}"></se-icon>`;
});
