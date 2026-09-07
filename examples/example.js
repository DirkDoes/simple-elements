import { componentCatalog } from './catalog.js?v=204a2d2';

const titleFor = (tag) => tag.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
const pages = componentCatalog.map(({ tag, icon }) => [tag, titleFor(tag), icon]);

const requestedPage = location.hash.slice(1) || 'input';
const initialPage = pages.some(([id]) => id === requestedPage) ? requestedPage : 'input';
const sidebar = document.querySelector('se-sidebar');
sidebar.options = pages.map(([id, label, icon]) => ({ label, icon, href: `#${id}`, active: id === initialPage }));

const inputPage = document.querySelector('section[data-demo="template"]');
inputPage.dataset.demo = 'input';

const escapeAttribute = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;');
const controlMarkup = (attribute) => {
  if (attribute.control === 'boolean') return `<se-switch data-component-attribute="${attribute.name}" label="Enabled"></se-switch>`;
  if (attribute.control === 'select') return `<se-select data-component-attribute="${attribute.name}" clearable placeholder="No override" options="${escapeAttribute(JSON.stringify(attribute.options.map((value) => ({ id: value, label: titleFor(value) }))))}"></se-select>`;
  if (attribute.control === 'code') return `<se-code-editor data-component-attribute="${attribute.name}" language="${attribute.name === 'options' ? 'json' : 'html'}" wrap></se-code-editor>`;
  return `<se-input data-component-attribute="${attribute.name}" placeholder="No override"></se-input>`;
};
const defaultMarkup = (attribute) => {
  if (attribute.defaultValue === '') return '<span></span>';
  if (attribute.control === 'code' || String(attribute.defaultValue).length > 32) return `<se-code-editor class="demo-default-code" language="${attribute.name === 'options' ? 'json' : 'html'}" value="${escapeAttribute(attribute.defaultValue)}" readonly wrap></se-code-editor>`;
  return `<se-badge>${escapeAttribute(attribute.defaultValue)}</se-badge>`;
};
const renderComponentPage = (component) => {
  const { tag, description, markup, attributes } = component;
  const section = document.createElement('section');
  section.dataset.demo = tag;
  section.hidden = true;
  section.innerHTML = `<se-title level="section">${titleFor(tag)}</se-title><se-text muted>${description}</se-text><div class="demo-stack"><se-card class="demo-component-preview" data-component="${tag}"><div class="demo-template-heading"><se-title level="sidebar">Preview</se-title><se-switch label="Show code" data-component-code-toggle></se-switch></div><div data-component-preview></div><se-code-editor data-component-code language="html" readonly wrap hidden></se-code-editor></se-card><se-card class="demo-stack demo-component-attributes"><se-title level="sidebar">Attributes</se-title><se-table class="demo-template-table" columns="9rem minmax(15rem, 2fr) 10rem minmax(15rem, 1.4fr)"><se-list-header><span>Attribute</span><span>Description</span><span>Default</span><span>Override</span></se-list-header>${attributes.map((attribute) => `<se-list-row><strong data-description="${escapeAttribute(attribute.description)}">${attribute.name}</strong><span>${attribute.description}</span>${defaultMarkup(attribute)}${controlMarkup(attribute)}</se-list-row>`).join('')}</se-table></se-card></div>`;
  document.querySelector('.demo-content').append(section);
  const preview = section.querySelector('[data-component-preview]');
  const code = section.querySelector('[data-component-code]');
  const render = () => {
    const sourceTemplate = document.createElement('template');
    sourceTemplate.innerHTML = markup;
    const source = sourceTemplate.content.firstElementChild;
    const clone = source.cloneNode(true);
    section.querySelectorAll('[data-component-attribute]').forEach((control) => {
      const name = control.dataset.componentAttribute;
      const value = control.matches('se-switch') ? control.checked : control.value;
      if (name === 'content' && tag !== 'tooltip') { if (value) clone.innerHTML = value; return; }
      if (name === 'child-content') { if (value) clone.innerHTML = value; return; }
      if (control.matches('se-switch')) { if (value) clone.setAttribute(name, ''); else clone.removeAttribute(name); return; }
      if (value) clone.setAttribute(name, value);
    });
    const usageMarkup = clone.outerHTML;
    preview.replaceChildren(clone);
    if (component.action === 'open') {
      const opener = document.createElement('se-button');
      opener.textContent = `Open ${titleFor(tag)}`;
      opener.addEventListener('click', () => clone.open());
      preview.prepend(opener);
    }
    code.value = usageMarkup;
  };
  section.addEventListener('input', (event) => { if (event.target.closest('[data-component-attribute]')) render(); });
  section.addEventListener('change', (event) => {
    if (event.target.closest('[data-component-attribute]')) render();
    if (event.target.closest('[data-component-code-toggle]')) { const show = section.querySelector('[data-component-code-toggle]').checked; preview.hidden = show; code.hidden = !show; }
  });
  render();
};
componentCatalog.filter(({ custom }) => !custom).forEach(renderComponentPage);

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
