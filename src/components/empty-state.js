import { define, escapeHtml } from '../helpers.js';

class SeEmptyState extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const content = this.innerHTML.trim();
    const variant = ['brand', 'error', 'gray'].includes(this.getAttribute('variant')) ? this.getAttribute('variant') : 'gray';
    this.innerHTML = `<div class="se-empty-state se-empty-state--${variant}"><span class="se-empty-state__icon"><se-icon name="${escapeHtml(this.getAttribute('icon') || 'package')}"></se-icon></span><se-title level="card">${escapeHtml(this.getAttribute('title') || 'Nothing here yet')}</se-title>${this.getAttribute('text') ? `<se-text muted>${escapeHtml(this.getAttribute('text'))}</se-text>` : ''}${content ? `<div class="se-empty-state__actions">${content}</div>` : ''}</div>`;
  }
}

define('se-empty-state', SeEmptyState);
