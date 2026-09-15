import { define, escapeHtml, escapeIcon, parseOptions } from '../helpers.js';

class SeBreadcrumbs extends HTMLElement {
  get options() { return this._options; }
  set options(value) { this._options = value; if (this.isConnected) this.render(); }
  connectedCallback() { this.render(); }
  render() {
    const options = parseOptions(this);
    this.innerHTML = `<nav class="se-breadcrumbs" aria-label="${escapeHtml(this.getAttribute('label') || 'Breadcrumb')}"><ol>${options.map((item, index) => `<li>${index ? '<span aria-hidden="true" class="se-breadcrumbs__separator">/</span>' : ''}${index < options.length - 1 && item.href ? `<a href="${escapeHtml(item.href)}">` : `<span${index === options.length - 1 ? ' aria-current="page"' : ''}>`}${item.icon ? `<se-icon name="${escapeIcon(item.icon)}"></se-icon>` : ''}${escapeHtml(item.label)}${index < options.length - 1 && item.href ? '</a>' : '</span>'}</li>`).join('')}</ol></nav>`;
  }
}
define('se-breadcrumbs', SeBreadcrumbs);
