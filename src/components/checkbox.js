import { define, escapeHtml } from '../helpers.js';

class SeCheckbox extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    this.innerHTML = `<label class="se-choice"><input type="checkbox" name="${escapeHtml(this.getAttribute('name') || '')}" value="${escapeHtml(this.getAttribute('value') || 'on')}"${this.hasAttribute('checked') ? ' checked' : ''}${this.hasAttribute('disabled') ? ' disabled' : ''}><span class="se-choice__box"><se-icon name="check"></se-icon></span><span>${escapeHtml(this.getAttribute('label') || this.textContent)}</span></label>`;
  }
  get checked() { return this.querySelector('input')?.checked || false; }
}

define('se-checkbox', SeCheckbox);
