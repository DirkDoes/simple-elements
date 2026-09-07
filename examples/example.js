const componentTags = ['badge', 'blockquote', 'button', 'card', 'checkbox', 'code-editor', 'code', 'date-picker', 'datetime-picker', 'drawer', 'file-row', 'file-upload', 'icon', 'input', 'list-header', 'list-row', 'list', 'markdown', 'menu', 'modal', 'phone-input', 'profile', 'radio', 'range', 'select', 'sidebar', 'split-button', 'switch', 'table', 'text', 'time-picker', 'title', 'tooltip', 'wysiwyg'];
const titleFor = (tag) => tag.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
const pages = componentTags.map((tag) => [tag, titleFor(tag), tag === 'icon' ? 'sparkles' : tag]);

const requestedPage = location.hash.slice(1) || 'input';
const initialPage = pages.some(([id]) => id === requestedPage) ? requestedPage : 'input';
const sidebar = document.querySelector('se-sidebar');
sidebar.options = pages.map(([id, label, icon]) => ({ label, icon, href: `#${id}`, active: id === initialPage }));

const oldSections = [...document.querySelectorAll('section[data-demo]')];
const inputPage = document.querySelector('section[data-demo="template"]');
inputPage.dataset.demo = 'input';
const samples = new Map();
oldSections.forEach((section) => section.querySelectorAll('*').forEach((element) => {
  const tag = element.localName;
  if (!tag?.startsWith('se-') || tag === 'se-sidebar' || samples.has(tag) || section === inputPage) return;
  samples.set(tag, element.outerHTML);
}));
oldSections.filter((section) => section !== inputPage).forEach((section) => section.remove());

const booleanAttributes = new Set(['checked', 'clearable', 'clickable', 'disabled', 'fixed', 'large', 'multiple', 'readonly', 'required', 'searchable', 'wrap']);
const describeAttribute = (name) => name.replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
const renderComponentPage = (tag) => {
  const sample = samples.get(`se-${tag}`) || `<se-${tag}></se-${tag}>`;
  const element = document.createElement('template');
  element.innerHTML = sample;
  const source = element.content.firstElementChild;
  const attributes = [...source.attributes].filter((attribute) => !['class', 'style', 'id', 'name'].includes(attribute.name));
  const section = document.createElement('section');
  section.dataset.demo = tag;
  section.hidden = true;
  section.innerHTML = `<se-title level="section">${titleFor(tag)}</se-title><se-text muted>Live ${titleFor(tag)} component reference. Preview the component, inspect its markup, and try attribute overrides.</se-text><div class="demo-stack"><se-card class="demo-component-preview"><div class="demo-template-heading"><se-title level="sidebar">Preview</se-title><se-switch label="Show code" data-component-code-toggle></se-switch></div><div data-component-preview></div><se-code-editor data-component-code language="html" readonly wrap hidden></se-code-editor></se-card><se-card class="demo-stack demo-component-attributes"><se-title level="sidebar">Attributes</se-title><se-table class="demo-template-table" columns="9rem minmax(15rem, 2fr) 10rem minmax(15rem, 1.4fr)"><se-list-header><span>Attribute</span><span>Description</span><span>Default</span><span>Override</span></se-list-header>${attributes.map((attribute) => `<se-list-row><strong data-description="${describeAttribute(attribute.name)} for this component.">${attribute.name}</strong><span>${describeAttribute(attribute.name)} for this component.</span>${attribute.value ? `<se-badge>${attribute.value}</se-badge>` : '<span></span>'}${booleanAttributes.has(attribute.name) ? `<se-switch data-component-attribute="${attribute.name}" label="Override"></se-switch>` : `<se-input data-component-attribute="${attribute.name}" placeholder="Override ${attribute.name}"></se-input>`}</se-list-row>`).join('')}</se-table></se-card></div>`;
  document.querySelector('.demo-content').append(section);
  const preview = section.querySelector('[data-component-preview]');
  const code = section.querySelector('[data-component-code]');
  const render = () => {
    const clone = source.cloneNode(true);
    section.querySelectorAll('[data-component-attribute]').forEach((control) => {
      const value = control.matches('se-switch') ? control.checked : control.value;
      if (value) clone.setAttribute(control.dataset.componentAttribute, value === true ? '' : value);
      else clone.removeAttribute(control.dataset.componentAttribute);
    });
    preview.replaceChildren(clone);
    code.value = clone.outerHTML;
  };
  section.addEventListener('input', (event) => { if (event.target.matches('[data-component-attribute]')) render(); });
  section.addEventListener('change', (event) => {
    if (event.target.matches('[data-component-attribute]')) render();
    if (event.target.closest('[data-component-code-toggle]')) { const show = section.querySelector('[data-component-code-toggle]').checked; preview.hidden = show; code.hidden = !show; }
  });
  render();
};
componentTags.filter((tag) => tag !== 'sidebar' && tag !== 'input').forEach(renderComponentPage);

const iconGrid = document.querySelector('[data-icon-grid]');
if (iconGrid) iconGrid.innerHTML = customElements.get('se-icon').names
  .map((name) => `<div class="demo-icon"><se-icon name="${name}"></se-icon><code>${name}</code></div>`)
  .join('');

const showPage = (id) => {
  const selected = pages.some(([pageId]) => pageId === id) ? id : 'input';
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

const template = document.querySelector('[data-demo="input"]');
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
  }
});
renderTemplateInput();
