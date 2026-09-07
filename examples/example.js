const pages = [
  ['template', 'Template', 'package'],
  ['foundations', 'Foundations', 'dashboard'],
  ['inputs', 'Text Inputs', 'type'],
  ['controls', 'Selection Controls', 'toggle-left'],
  ['selects', 'Dropdowns & Selects', 'list'],
  ['buttons', 'Buttons', 'mouse-pointer'],
  ['uploads', 'File Uploads', 'file-up'],
  ['contextual', 'Contextual', 'message-square'],
  ['content', 'Rich Content', 'code'],
  ['quotes', 'Quotes', 'message-square'],
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

const template = document.querySelector('[data-demo="template"]');
const renderTemplateInput = () => {
  const attributes = [...template.querySelectorAll('[data-template-attribute]')].flatMap((control) => {
    const name = control.dataset.templateAttribute;
    const value = control.matches('se-switch') ? control.checked : control.value;
    if (!value) return [];
    return [value === true ? name : `${name}="${String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"`];
  });
  const markup = `<se-input${attributes.length ? ` ${attributes.join(' ')}` : ''}></se-input>`;
  template.querySelector('[data-template-preview]').innerHTML = markup;
  template.querySelector('[data-template-code]').value = markup;
  const type = template.querySelector('[data-template-attribute="type"]').value || 'text';
  const defaults = customElements.get('se-input').defaultsFor(type);
  template.querySelector('[data-template-default="placeholder"]').textContent = defaults.placeholder;
  const iconDefault = template.querySelector('[data-template-default="icon"]');
  iconDefault.textContent = defaults.icon || '';
  iconDefault.hidden = !defaults.icon;
};

template.addEventListener('input', (event) => {
  if (event.target.closest('se-input[data-template-attribute]')) renderTemplateInput();
});
template.addEventListener('change', (event) => {
  const control = event.target.closest('[data-template-attribute]');
  if (control && !control.matches('se-input')) renderTemplateInput();
  if (event.target.closest('[data-template-code-toggle]')) {
    const showCode = template.querySelector('[data-template-code-toggle]').checked;
    template.querySelector('[data-template-preview]').hidden = showCode;
    template.querySelector('[data-template-code]').hidden = !showCode;
    template.querySelector('[data-template-wrap-toggle]').hidden = !showCode;
  }
  if (event.target.closest('[data-template-wrap-toggle]')) {
    template.querySelector('[data-template-code]').toggleAttribute('wrap', template.querySelector('[data-template-wrap-toggle]').checked);
  }
});
renderTemplateInput();
