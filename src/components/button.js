import { define } from '../helpers.js';

class SeButton extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready || this._scheduled) return;
    this._scheduled = true;
    queueMicrotask(() => this.render());
  }
  render() {
    if (!this.isConnected || this.dataset.ready) return;
    this.dataset.ready = 'true';
    const content = this.innerHTML;
    const variant = this.getAttribute('variant') || 'primary';
    const iconOnly = this.hasAttribute('icon-only') ? ' se-button--icon' : '';
    this.innerHTML = `<button class="se-button se-button--${variant}${iconOnly}" type="${this.getAttribute('type') || 'button'}"${this.hasAttribute('disabled') ? ' disabled' : ''}${this.getAttribute('aria-label') ? ` aria-label="${this.getAttribute('aria-label')}"` : ''}>${content}</button>`;
  }
}

define('se-button', SeButton);
