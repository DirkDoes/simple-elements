import { define, escapeHtml } from '../helpers.js';

class SeSwitch extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    this.innerHTML = `<label class="se-switch"><span>${escapeHtml(this.getAttribute('label') || this.textContent)}</span><span><input type="checkbox" name="${escapeHtml(this.getAttribute('name') || '')}"${this.hasAttribute('checked') ? ' checked' : ''}${this.hasAttribute('disabled') ? ' disabled' : ''}><span class="se-switch__track"></span></span></label>`;
  }
  get checked() { return this.querySelector('input')?.checked || false; }
}

define('se-switch', SeSwitch);
