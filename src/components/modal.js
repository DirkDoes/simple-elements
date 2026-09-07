import { define, emit, escapeHtml } from '../helpers.js';

class SeModal extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready || this._scheduled) return;
    this._scheduled = true;
    queueMicrotask(() => this.render());
  }
  render() {
    if (!this.isConnected || this.dataset.ready) return;
    this.dataset.ready = 'true';
    const content = this.innerHTML.trim();
    const requestedSize = this.getAttribute('size') || 'small';
    const size = ['small', 'medium', 'large'].includes(requestedSize) ? requestedSize : 'small';
    const expanded = size !== 'small';
    const requestedVariant = this.getAttribute('variant') || 'error';
    const variant = ['gray', 'brand', 'success', 'warning', 'error', 'info', 'important'].includes(requestedVariant) ? requestedVariant : 'error';
    const title = escapeHtml(this.getAttribute('title') || '');
    const icon = this.getAttribute('icon') ? `<span class="se-modal__icon se-modal__icon--${variant}"><se-icon name="${escapeHtml(this.getAttribute('icon'))}"></se-icon></span>` : '';
    const actions = `<div class="se-modal__actions"><se-button variant="${expanded ? 'secondary' : 'ghost'}" text="${escapeHtml(this.getAttribute('cancel-label') || (expanded ? 'Close' : 'Cancel'))}" data-cancel></se-button><se-button variant="${escapeHtml(this.getAttribute('confirm-variant') || 'brand')}" text="${escapeHtml(this.getAttribute('confirm-label') || 'Confirm')}" data-confirm></se-button></div>`;
    this.innerHTML = `<div class="se-overlay se-modal se-modal--${size}" role="dialog" aria-modal="true" aria-label="${escapeHtml(this.getAttribute('title') || 'Dialog')}"><div class="se-modal__panel">${expanded ? `<header class="se-modal__header"><div class="se-modal__heading">${icon}<span><se-title level="section">${title}</se-title>${this.getAttribute('subtitle') ? `<se-text muted>${escapeHtml(this.getAttribute('subtitle'))}</se-text>` : ''}</span></div><button class="se-close" type="button" aria-label="Close"><se-icon name="x"></se-icon></button></header><div class="se-modal__content">${content}</div>${actions}` : `<div class="se-modal__body${this.hasAttribute('centered') ? ' se-modal__body--center' : ''}>${icon}<se-title level="section">${title}</se-title>${content}</div>${actions}`}</div></div>`;
    this.querySelector('[data-cancel]').addEventListener('click', () => this.close());
    this.querySelector('[data-confirm]').addEventListener('click', () => { emit(this, 'confirm', {}); this.close(); });
    this.querySelector('.se-close')?.addEventListener('click', () => this.close());
    this.querySelector('.se-overlay').addEventListener('click', (event) => { if (event.target === event.currentTarget) this.close(); });
    this._escape = (event) => { if (event.key === 'Escape' && this.opened) this.close(); };
    document.addEventListener('keydown', this._escape);
    if (this.hasAttribute('open')) this.open();
  }
  disconnectedCallback() { document.removeEventListener('keydown', this._escape); }
  get opened() { return this.querySelector('.se-overlay')?.classList.contains('se-overlay--open'); }
  open() { this.querySelector('.se-overlay')?.classList.add('se-overlay--open'); this.querySelector('.se-button')?.focus(); }
  close() { this.querySelector('.se-overlay')?.classList.remove('se-overlay--open'); emit(this, 'close', {}); }
}

define('se-modal', SeModal);
