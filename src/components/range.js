import { define, escapeHtml } from '../helpers.js';

class SeRange extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const value = this.getAttribute('value') || '50';
    this.innerHTML = `<div class="se-range"><div class="se-range__head"><label class="se-label">${escapeHtml(this.getAttribute('label') || 'Range')}</label><output class="se-range__value">${escapeHtml(value)}${escapeHtml(this.getAttribute('suffix') || '')}</output></div><input type="range" name="${escapeHtml(this.getAttribute('name') || '')}" min="${escapeHtml(this.getAttribute('min') || '0')}" max="${escapeHtml(this.getAttribute('max') || '100')}" value="${escapeHtml(value)}"></div>`;
    const input = this.querySelector('input');
    input.addEventListener('input', () => { this.querySelector('output').textContent = input.value + (this.getAttribute('suffix') || ''); });
  }
}

define('se-range', SeRange);
