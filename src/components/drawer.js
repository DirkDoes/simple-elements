import { define, emit, escapeHtml } from '../helpers.js';

class SeDrawer extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready || this._scheduled) return;
    this._scheduled = true;
    queueMicrotask(() => this.render());
  }
  render() {
    if (!this.isConnected || this.dataset.ready) return;
    this.dataset.ready = 'true';
    const content = this.innerHTML.trim();
    this.innerHTML = `<div class="se-overlay se-drawer" role="dialog" aria-modal="true" aria-label="${escapeHtml(this.getAttribute('title') || 'Drawer')}"><div class="se-drawer__panel"><header class="se-drawer__header"><se-title level="card">${escapeHtml(this.getAttribute('title') || '')}</se-title><button class="se-close" type="button" aria-label="Close"><se-icon name="x"></se-icon></button></header><div class="se-drawer__body">${content}</div></div></div>`;
    this.querySelector('.se-close').addEventListener('click', () => this.close());
    this.querySelector('.se-overlay').addEventListener('click', (event) => { if (event.target === event.currentTarget) this.close(); });
    this._escape = (event) => { if (event.key === 'Escape' && this.opened) this.close(); };
    document.addEventListener('keydown', this._escape);
    if (this.hasAttribute('open')) this.open();
  }
  disconnectedCallback() { document.removeEventListener('keydown', this._escape); }
  get opened() { return this.querySelector('.se-overlay')?.classList.contains('se-overlay--open'); }
  open() { this.querySelector('.se-overlay')?.classList.add('se-overlay--open'); this.querySelector('.se-close')?.focus(); }
  close() { this.querySelector('.se-overlay')?.classList.remove('se-overlay--open'); emit(this, 'close', {}); }
}

define('se-drawer', SeDrawer);
