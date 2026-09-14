import { define, escapeIcon, escapeHtml } from '../helpers.js';

class SeButton extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready || this._scheduled) return;
    this._scheduled = true;
    queueMicrotask(() => this.render());
  }
  render() {
    if (!this.isConnected || this.dataset.ready) return;
    this.dataset.ready = 'true';
    const variant = this.getAttribute('variant') || 'primary';
    const icon = this.getAttribute('icon') || '';
    const text = this.hasAttribute('text') ? this.getAttribute('text') : icon ? '' : 'Button';
    const iconOnly = icon && !text ? ' se-button--icon' : '';
    const label = this.getAttribute('aria-label') || text || icon;
    const content = `${icon ? `<se-icon name="${escapeIcon(icon)}"></se-icon>` : ''}${escapeHtml(text)}`;
    const common = `class="se-button se-button--${escapeHtml(variant)}${iconOnly}"${label ? ` aria-label="${escapeHtml(label)}"` : ''}`;
    this.innerHTML = this.hasAttribute('href') && !this.hasAttribute('disabled')
      ? `<a ${common} href="${escapeHtml(this.getAttribute('href'))}">${content}</a>`
      : `<button ${common} type="${escapeHtml(this.getAttribute('type') || 'button')}"${this.hasAttribute('disabled') ? ' disabled' : ''}>${content}</button>`;
  }
}

define('se-button', SeButton);
