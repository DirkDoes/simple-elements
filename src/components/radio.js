import { define, escapeHtml } from '../helpers.js';

class SeRadio extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    this.innerHTML = `<label class="se-choice"><input type="radio" name="${escapeHtml(this.getAttribute('name') || '')}" value="${escapeHtml(this.getAttribute('value') || 'on')}"${this.hasAttribute('checked') ? ' checked' : ''}${this.hasAttribute('disabled') ? ' disabled' : ''}><span class="se-choice__box se-choice__box--radio"></span><span>${escapeHtml(this.getAttribute('label') || this.textContent)}</span></label>`;
  }
}

define('se-radio', SeRadio);
