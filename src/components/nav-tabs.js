import { define, escapeHtml, escapeIcon, parseOptions } from '../helpers.js';

class SeNavTabs extends HTMLElement {
  static observedAttributes = ['value', 'variant', 'label'];
  get options() { return this._options; }
  set options(value) { this._options = value; if (this.isConnected) this.render(); }
  get value() { return this.getAttribute('value') || ''; }
  set value(value) { this.setAttribute('value', value); }
  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  render() {
    this.innerHTML = `<nav class="se-nav-tabs${this.getAttribute('variant') === 'pill' ? ' se-nav-tabs--pill' : ''}" aria-label="${escapeHtml(this.getAttribute('label') || 'Section navigation')}">${parseOptions(this).map(item => `<${item.disabled ? 'span' : 'a'} class="se-nav-tabs__item"${item.disabled ? ' aria-disabled="true"' : ` href="${escapeHtml(item.href || '#')}"`}${String(item.id) === this.value ? ' aria-current="page"' : ''}>${item.icon ? `<se-icon name="${escapeIcon(item.icon)}"></se-icon>` : ''}${escapeHtml(item.label)}${item.count !== undefined ? `<span class="se-nav-tabs__count">${escapeHtml(item.count)}</span>` : ''}</${item.disabled ? 'span' : 'a'}>`).join('')}</nav>`;
  }
}
define('se-nav-tabs', SeNavTabs);
