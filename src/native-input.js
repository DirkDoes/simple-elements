import { define, escapeHtml } from './helpers.js';

export const defineNativeInput = (tag, type, fallbackLabel) => define(tag, class extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const id = this.getAttribute('id') || `${tag}-${crypto.randomUUID()}`;
    const label = this.getAttribute('label') || fallbackLabel;
    const attributes = ['name', 'value', 'min', 'max', 'step'].map((name) => this.hasAttribute(name) ? `${name}="${escapeHtml(this.getAttribute(name))}"` : '').filter(Boolean).join(' ');
    this.innerHTML = `<label class="se-label" for="${escapeHtml(id)}">${escapeHtml(label)}${this.hasAttribute('required') ? '<span class="se-required">*</span>' : ''}</label><input class="se-control" id="${escapeHtml(id)}" type="${type}" ${attributes}${this.hasAttribute('required') ? ' required' : ''}${this.hasAttribute('disabled') ? ' disabled' : ''}>`;
  }

  get value() { return this.querySelector('input')?.value || ''; }
  set value(value) { const input = this.querySelector('input'); if (input) input.value = value; }
});
