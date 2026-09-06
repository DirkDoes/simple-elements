import { define, emit, escapeHtml } from '../helpers.js';

class SeFileRow extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const clickable = this.hasAttribute('clickable');
    const action = this.getAttribute('action');
    const content = `<span class="se-file__icon"><se-icon name="file"></se-icon></span><span class="se-file__content"><strong>${escapeHtml(this.getAttribute('filename') || '')}</strong><small>${escapeHtml(this.getAttribute('size') || '')}</small></span>`;
    this.innerHTML = `<div class="se-file">${clickable ? `<button class="se-file__main" type="button">${content}</button>` : `<span class="se-file__main">${content}</span>`}${action ? `<button class="se-file__remove" type="button" aria-label="Remove ${escapeHtml(this.getAttribute('filename') || 'file')}"><se-icon name="${action === 'trash' ? 'trash' : 'x'}"></se-icon></button>` : ''}<svg class="se-file__fold" viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24"/><path d="M1 1v20a3 3 0 0 0 3 3h20Z"/></svg></div>`;
    this.querySelector('.se-file__remove')?.addEventListener('click', (event) => { event.stopPropagation(); emit(this, 'remove', { filename: this.getAttribute('filename') }); });
  }
}

define('se-file-row', SeFileRow);
