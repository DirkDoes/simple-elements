import { define, escapeIcon, emit, escapeHtml } from '../helpers.js';

class SeModal extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready || this._scheduled) return;
    this._scheduled = true;
    queueMicrotask(() => this.render());
  }
  render() {
    if (!this.isConnected || this.dataset.ready) return;
    this.dataset.ready = 'true';
    const children = [...this.childNodes];
    const content = '<span data-modal-content></span>';
    children.forEach(node => node.remove());
    const requestedSize = this.getAttribute('size') || 'small';
    const size = ['small', 'medium', 'large'].includes(requestedSize) ? requestedSize : 'small';
    const expanded = size !== 'small';
    const requestedTone = this.getAttribute('tone') || 'error';
    const tone = ['gray', 'brand', 'success', 'warning', 'error', 'info', 'important'].includes(requestedTone) ? requestedTone : 'error';
    const title = escapeHtml(this.getAttribute('title') || '');
    const icon = this.getAttribute('icon') ? `<span class="se-modal__icon se-modal__icon--${tone}"><se-icon name="${escapeIcon(this.getAttribute('icon'))}"></se-icon></span>` : '';
    const footer = '<div class="se-modal__actions" data-modal-footer hidden></div>';
    const body = expanded
      ? `<header class="se-modal__header"><div class="se-modal__heading">${icon}<span><se-title level="section">${title}</se-title>${this.getAttribute('subtitle') ? `<se-text muted>${escapeHtml(this.getAttribute('subtitle'))}</se-text>` : ''}</span></div><div class="se-modal__header-end" data-modal-header-end></div><button class="se-close" type="button" aria-label="Close"><se-icon name="x"></se-icon></button></header><div class="se-modal__content">${content}</div>${footer}`
      : `<div class="se-modal__header-end se-modal__header-end--small" data-modal-header-end></div><div class="se-modal__body"><se-empty-state tone="${tone}" icon="${this.getAttribute('icon') ? escapeHtml(this.getAttribute('icon')) : 'none'}" title="${title}"${this.getAttribute('subtitle') ? ` subtitle="${escapeHtml(this.getAttribute('subtitle'))}"` : ''}>${content}</se-empty-state></div>${footer}`;
    this.innerHTML = `<div title="" class="se-overlay se-modal se-modal--${size}" role="dialog" aria-modal="true" aria-label="${escapeHtml(this.getAttribute('title') || 'Dialog')}"><div class="se-modal__panel" tabindex="-1">${body}</div></div>`;
    for (const node of children) {
      const region = node.nodeType === 1 ? node.getAttribute('data-se-region') : null;
      const target = region === 'footer' ? this.querySelector('[data-modal-footer]') : region === 'header-end' ? this.querySelector('[data-modal-header-end]') : this.querySelector('[data-modal-content]');
      target.append(node);
      if (region === 'footer') target.hidden = false;
    }
    const bodyTarget = this.querySelector('[data-modal-content]');
    bodyTarget.replaceWith(...bodyTarget.childNodes);
    this.addEventListener('click', (event) => {
      const action = event.target.closest('[data-modal-action]');
      if (!action || !this.querySelector('[data-modal-footer]')?.contains(action)) return;
      if (action.dataset.modalAction === 'cancel') this.close();
      if (action.dataset.modalAction === 'confirm' && this.dispatchEvent(new CustomEvent('confirm', { bubbles: true, cancelable: true, detail: {} }))) this.close();
    });
    this.querySelector('.se-close')?.addEventListener('click', () => this.close());
    this.querySelector('.se-overlay').addEventListener('click', (event) => { if (this.hasAttribute('dismissible') && event.target === event.currentTarget) this.close(); });
    this._escape = (event) => { if (event.key === 'Escape' && this.opened) this.close(); };
    document.addEventListener('keydown', this._escape);
    if (this.hasAttribute('open')) this.open();
  }
  disconnectedCallback() { document.removeEventListener('keydown', this._escape); }
  get opened() { return this.querySelector('.se-overlay')?.classList.contains('se-overlay--open'); }
  open() { this.querySelector('.se-overlay')?.classList.add('se-overlay--open'); (this.querySelector('.se-modal__panel :is([autofocus], input, button)') || this.querySelector('.se-modal__panel'))?.focus(); }
  close() { this.querySelectorAll('se-select, se-menu, se-popover').forEach(element => element.close()); this.querySelector('.se-overlay')?.classList.remove('se-overlay--open'); emit(this, 'close', {}); }
}

define('se-modal', SeModal);
