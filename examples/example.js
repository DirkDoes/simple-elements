import { componentCatalog, patternCatalog } from './catalog.js?v=5cefb1f';

const titleFor = (tag) => tag.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
const componentPages = componentCatalog.map(({ tag, icon }) => [tag, titleFor(tag), icon]);
const patternPages = patternCatalog.map(({ tag, icon }) => [tag, titleFor(tag), icon]);
const pages = [...componentPages, ...patternPages];

const requestedPage = location.hash.slice(1) || 'input';
const initialPage = pages.some(([id]) => id === requestedPage) ? requestedPage : 'input';
const sidebar = document.querySelector('se-sidebar');
const sidebarItems = (items) => items.map(([id, label, icon]) => `<se-sidebar-button label="${label}" icon="${icon}" href="#${id}"${id === initialPage ? ' active' : ''}></se-sidebar-button>`).join('');
const groups = [
  ['Page layout', 'panel-left-open', ['profile', 'layout-brand', 'sidebar', 'sidebar-button', 'sidebar-chapter', 'sidebar-group', 'topbar']],
  ['Form elements', 'text-input', ['checkbox', 'code-editor', 'date-picker', 'datetime-picker', 'file-upload', 'input', 'phone-input', 'radio', 'range', 'select', 'time-picker', 'wysiwyg']],
  ['Overlays', 'panel-right', ['drawer', 'menu', 'modal', 'tooltip']],
  ['Composing', 'list', ['card', 'empty-state', 'file-row', 'list', 'list-header', 'list-row', 'split-button', 'table']],
  ['Styling', 'badge', ['badge', 'blockquote', 'button', 'code', 'icon', 'markdown', 'text', 'title']],
];
const componentById = new Map(componentPages.map((page) => [page[0], page]));
sidebar.querySelector('[data-component-section] .se-sidebar-chapter__content > div').innerHTML = groups.map(([label, icon, ids], index) => `<se-sidebar-group label="${label}" icon="${icon}"${index ? ' collapsed' : ''}>${sidebarItems(ids.map((id) => componentById.get(id)).filter(Boolean))}</se-sidebar-group>`).join('');
sidebar.querySelector('[data-pattern-section] .se-sidebar-chapter__content > div').innerHTML = sidebarItems(patternPages);

const inputPage = document.querySelector('section[data-demo="template"]');
inputPage.dataset.demo = 'input';

const escapeAttribute = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;');
const formatHtml = (source) => {
  const template = document.createElement('template');
  template.innerHTML = source.trim();
  const formatNode = (node, depth = 0) => {
    const padding = '  '.repeat(depth);
    if (node.nodeType === Node.TEXT_NODE) return `${padding}${node.textContent.trim().replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')}`;
    const opening = node.outerHTML.slice(0, node.outerHTML.indexOf('>') + 1);
    const children = [...node.childNodes].filter((child) => child.nodeType !== Node.TEXT_NODE || child.textContent.trim());
    if (!children.length) return `${padding}${opening}</${node.localName}>`;
    if (children.length === 1 && children[0].nodeType === Node.TEXT_NODE) return `${padding}${opening}${node.innerHTML.trim()}</${node.localName}>`;
    return `${padding}${opening}\n${children.map((child) => formatNode(child, depth + 1)).join('\n')}\n${padding}</${node.localName}>`;
  };
  return [...template.content.childNodes].filter((node) => node.nodeType !== Node.TEXT_NODE || node.textContent.trim()).map((node) => formatNode(node)).join('\n');
};
const controlMarkup = (attribute) => {
  if (attribute.control === 'boolean') return `<se-checkbox variant="switch" data-component-attribute="${attribute.name}" label="Enabled"></se-checkbox>`;
  if (attribute.control === 'select') return `<se-select data-component-attribute="${attribute.name}" clearable placeholder="No override" options="${escapeAttribute(JSON.stringify(attribute.options.map((value) => ({ id: value, label: titleFor(value), ...(['icon', 'name'].includes(attribute.name) ? { icon: value } : {}) }))))}"></se-select>`;
  if (attribute.control === 'code') return `<se-code-editor data-component-attribute="${attribute.name}" language="${attribute.name === 'options' ? 'json' : 'html'}" wrap></se-code-editor>`;
  return `<se-input data-component-attribute="${attribute.name}" placeholder="No override"></se-input>`;
};
const defaultMarkup = (attribute) => {
  if (attribute.defaultValue === '') return '<span></span>';
  if (attribute.defaultValue === '[]') return '<se-badge text="[]"></se-badge>';
  if (attribute.control === 'code' || String(attribute.defaultValue).length > 32) return `<se-code-editor class="demo-default-code" language="${attribute.name === 'options' ? 'json' : 'html'}" value="${escapeAttribute(attribute.defaultValue)}" readonly wrap></se-code-editor>`;
  return `<se-badge text="${escapeAttribute(attribute.defaultValue)}"></se-badge>`;
};
const renderComponentPage = (component) => {
  const { tag, description, markup, attributes, previewSurface } = component;
  const contentAttribute = attributes.find(({ control }) => control === 'content');
  const order = ({ name }) => name === 'variant' ? 0 : name === 'type' ? 1 : 2;
  const tableAttributes = attributes.filter(({ control }) => control !== 'content').sort((left, right) => order(left) - order(right));
  const section = document.createElement('section');
  section.dataset.demo = tag;
  section.hidden = true;
  section.innerHTML = `<se-title level="section">${titleFor(tag)}</se-title><se-text muted>${description}</se-text><div class="demo-stack"><se-card class="demo-component-preview" data-component="${tag}"><div class="demo-template-heading"><se-title level="sidebar">Preview</se-title><se-checkbox variant="switch" label="Show code" data-component-code-toggle></se-checkbox></div><div data-component-preview${previewSurface ? ` data-preview-surface="${escapeAttribute(previewSurface)}"` : ''}></div><se-code-editor data-component-code language="html" readonly wrap hidden></se-code-editor></se-card><se-card class="demo-stack demo-component-attributes">${tableAttributes.length ? `<se-title level="sidebar">Attributes</se-title><se-table class="demo-template-table" columns="9rem minmax(15rem, 2fr) 10rem minmax(15rem, 1.4fr)"><se-list-header><span>Attribute</span><span>Description</span><span>Default</span><span>Override</span></se-list-header>${tableAttributes.map((attribute) => `<se-list-row><strong data-description="${escapeAttribute(attribute.description)}">${attribute.name}</strong><span>${attribute.description}</span>${defaultMarkup(attribute)}${controlMarkup(attribute)}</se-list-row>`).join('')}</se-table>` : ''}${contentAttribute ? `<div class="demo-component-content"><se-title level="sidebar">Content</se-title><se-code-editor data-component-attribute="${contentAttribute.name}" language="html" value="${escapeAttribute(formatHtml(contentAttribute.defaultValue))}" wrap></se-code-editor></div>` : ''}</se-card></div>`;
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
      const value = control.matches('se-checkbox') ? control.checked : control.value;
      if (name === 'content' && tag !== 'tooltip') { if (value) clone.innerHTML = value; return; }
      if (name === 'child-content') { if (value) clone.innerHTML = value; return; }
      if (control.matches('se-checkbox')) { if (value) clone.setAttribute(name, ''); else clone.removeAttribute(name); return; }
      if (value) clone.setAttribute(name, value);
    });
    let usageMarkup = clone.outerHTML;
    section.querySelectorAll('se-checkbox[data-component-attribute]').forEach((control) => { if (control.checked) usageMarkup = usageMarkup.replace(` ${control.dataset.componentAttribute}=""`, ` ${control.dataset.componentAttribute}`); });
    preview.replaceChildren(clone);
    if (component.action === 'open') {
      const opener = document.createElement('se-button');
      opener.setAttribute('text', `Open ${titleFor(tag)}`);
      opener.addEventListener('click', () => clone.open());
      preview.prepend(opener);
    }
    code.value = formatHtml(usageMarkup);
  };
  section.querySelectorAll('.demo-component-attributes [data-component-attribute]').forEach((control) => control.addEventListener(control.matches('se-input, se-code-editor') ? 'input' : 'change', render));
  section.querySelector('[data-component-code-toggle]').addEventListener('change', (event) => { preview.hidden = event.currentTarget.checked; code.hidden = !event.currentTarget.checked; });
  render();
};
componentCatalog.filter(({ custom }) => !custom).forEach(renderComponentPage);
const renderPatternPage = ({ tag, description, examples }) => {
  const section = document.createElement('section');
  section.dataset.demo = tag;
  section.className = 'demo-pattern-page';
  section.hidden = true;
  section.innerHTML = `<se-title level="section">${titleFor(tag)}</se-title><se-text muted>${description}</se-text>${examples.map(({ title, description: exampleDescription, markup }) => `<article class="demo-pattern-example"><header><se-title level="card">${title}</se-title><se-text muted>${exampleDescription}</se-text></header><se-card class="demo-pattern-example-card"><div class="demo-pattern-code"><se-title level="sidebar">Code</se-title><se-code-editor language="html" value="${escapeAttribute(formatHtml(markup))}" wrap></se-code-editor></div><div class="demo-pattern-result"><se-title level="sidebar">Preview</se-title><se-card class="demo-pattern-preview-card"><div data-pattern-preview></div></se-card></div></se-card></article>`).join('')}`;
  document.querySelector('.demo-content').append(section);
  section.querySelectorAll('.demo-pattern-example').forEach((example) => {
    const editor = example.querySelector('se-code-editor');
    const preview = example.querySelector('[data-pattern-preview]');
    const render = () => { const template = document.createElement('template'); template.innerHTML = editor.value; preview.replaceChildren(template.content.cloneNode(true)); };
    editor.addEventListener('input', render);
    render();
  });
};
patternCatalog.forEach(renderPatternPage);

const showPage = (id) => {
  const selected = pages.some(([pageId]) => pageId === id) ? id : 'input';
  document.querySelectorAll('[data-demo]').forEach((section) => { section.hidden = section.dataset.demo !== selected; });
  sidebar.querySelectorAll('se-sidebar-button').forEach((button) => button.toggleAttribute('active', button.querySelector('a')?.getAttribute('href') === `#${selected}`));
  document.querySelector('.demo-main').scrollTop = 0;
};

showPage(initialPage);
sidebar.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (link) showPage(link.hash.slice(1));
});
addEventListener('hashchange', () => showPage(location.hash.slice(1)));
document.querySelectorAll('[data-open]').forEach((button) => button.addEventListener('click', () => document.getElementById(button.dataset.open).open()));
document.querySelector('.demo-mobile__theme').addEventListener('change', (event) => { document.documentElement.dataset.theme = event.currentTarget.checked ? 'dark' : 'light'; });

const template = document.querySelector('[data-demo="input"]');
const renderTemplateInput = () => {
  const attributes = [...template.querySelectorAll('[data-template-attribute]')].flatMap((control) => {
    const name = control.dataset.templateAttribute;
    const value = control.matches('se-checkbox') ? control.checked : control.value;
    if (!value) return [];
    return [value === true ? name : `${name}="${String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"`];
  });
  const markup = `<se-input${attributes.length ? ` ${attributes.join(' ')}` : ''}></se-input>`;
  template.querySelector('[data-template-preview]').innerHTML = markup;
  template.querySelector('[data-template-code]').value = markup;
  const type = template.querySelector('[data-template-attribute="type"]').value || 'text';
  const defaults = customElements.get('se-input').defaultsFor(type);
  template.querySelector('[data-template-default="placeholder"]').setAttribute('text', defaults.placeholder);
  const iconDefault = template.querySelector('[data-template-default="icon"]');
  iconDefault.setAttribute('text', defaults.icon || '');
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
