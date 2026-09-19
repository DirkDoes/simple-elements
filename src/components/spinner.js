import { define, escapeHtml } from '../helpers.js';

class SeSpinner extends HTMLElement {
  static observedAttributes = ['variant', 'size', 'label'];
  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  render() {
    const variant = ['ring', 'dots', 'bars'].includes(this.getAttribute('variant')) ? this.getAttribute('variant') : 'ring';
    const size = ['small', 'medium', 'large'].includes(this.getAttribute('size')) ? this.getAttribute('size') : 'medium';
    this.innerHTML = `<span class="se-spinner se-spinner--${variant} se-spinner--${size}" role="status" aria-label="${escapeHtml(this.getAttribute('label') || 'Loading')}"><span aria-hidden="true">${variant === 'ring' ? '<i></i>' : '<i></i><i></i><i></i>'}</span></span>`;
  }
}

define('se-spinner', SeSpinner);
