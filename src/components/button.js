import { define, escapeHtml } from '../helpers.js';

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
    this.innerHTML = `<button class="se-button se-button--${escapeHtml(variant)}${iconOnly}" type="${escapeHtml(this.getAttribute('type') || 'button')}"${this.hasAttribute('disabled') ? ' disabled' : ''}${label ? ` aria-label="${escapeHtml(label)}"` : ''}>${icon ? `<se-icon name="${escapeHtml(icon)}"></se-icon>` : ''}${escapeHtml(text)}</button>`;
  }
}

define('se-button', SeButton);
