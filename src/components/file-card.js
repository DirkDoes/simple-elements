import { define, escapeIcon, emit, escapeHtml } from '../helpers.js';

class SeFileCard extends HTMLElement {
  static observedAttributes = ['error', 'tone', 'subtitle'];
  attributeChangedCallback() { if (this.dataset.ready) this.sync(); }
  sync() {
    const file = this.querySelector('.se-file');
    if (!file) return;
    const requested = this.hasAttribute('error') ? 'error' : this.getAttribute('tone') || 'brand';
    const tone = ['gray', 'brand', 'success', 'warning', 'error', 'info', 'important'].includes(requested) ? requested : 'brand';
    file.className = `se-file se-file--${tone}`;
    const subtitle = this.querySelector('.se-file__content small');
    subtitle.textContent = this.hasAttribute('error') ? this.getAttribute('error') || '' : this.getAttribute('subtitle') || '';
    subtitle.hidden = !subtitle.textContent;
  }
  connectedCallback() {
    if (this.dataset.ready || this._scheduled) return;
    this._scheduled = true;
    queueMicrotask(() => { if (this.isConnected) this.render(); });
  }
  render() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const regions = [...this.querySelectorAll(':scope > [data-se-region="details-end"]')];
    const clickable = this.hasAttribute('clickable');
    const action = this.getAttribute('action');
    const requestedTone = this.hasAttribute('error') ? 'error' : this.getAttribute('tone') || 'brand';
    const tone = ['gray', 'brand', 'success', 'warning', 'error', 'info', 'important'].includes(requestedTone) ? requestedTone : 'brand';
    const content = `<span class="se-file__icon"><se-icon name="${escapeIcon(this.getAttribute('icon') || 'file')}"></se-icon></span><span class="se-file__content"><strong>${escapeHtml(this.getAttribute('title') || '')}</strong><small>${escapeHtml(this.getAttribute('subtitle') || '')}</small></span>`;
    this.innerHTML = `<div title="" class="se-file se-file--${tone}">${clickable ? `<button class="se-file__main" type="button">${content}</button>` : `<span class="se-file__main">${content}</span>`}${regions.length ? '<span class="se-file__region"></span>' : ''}${action ? `<button class="se-file__remove" type="button" aria-label="Remove ${escapeHtml(this.getAttribute('title') || 'file')}"><se-icon name="${action === 'trash' ? 'trash' : 'x'}"></se-icon></button>` : ''}<svg class="se-file__fold" viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24"/><path d="M1 1v20a3 3 0 0 0 3 3h20Z"/></svg></div>`;
    if (regions.length) this.querySelector('.se-file__region').append(...regions);
    this.sync();
    this.querySelector('.se-file__remove')?.addEventListener('click', (event) => { event.stopPropagation(); emit(this, 'remove', { filename: this.getAttribute('title') }); });
  }
}

define('se-file-card', SeFileCard);
