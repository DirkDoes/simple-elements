import { define } from '../helpers.js';

class SeTopbar extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    this._setSearch = (open) => {
      const panel = this.querySelector('[data-mobile-search]');
      const toggle = this.querySelector('[data-mobile-search-toggle]');
      if (!panel || !toggle) return;
      if (open) this.querySelectorAll('se-sidebar-toggle').forEach((control) => { if (control.sidebar) control.sidebar.closed = true; });
      panel.hidden = !open;
      const button = toggle.matches('button') ? toggle : toggle.querySelector('button');
      if (!panel.id) panel.id = `se-mobile-search-${crypto.randomUUID()}`;
      button?.setAttribute('aria-controls', panel.id);
      button?.setAttribute('aria-expanded', String(open));
      if (open) panel.querySelector('input')?.focus();
    };
    this._click = (event) => {
      if (!event.target.closest('[data-mobile-search-toggle]')) return;
      this._setSearch(this.querySelector('[data-mobile-search]')?.hidden);
    };
    this._sidebarChange = (event) => {
      if (!event.detail.closed && [...this.querySelectorAll('se-sidebar-toggle')].some((control) => control.sidebar === event.target)) this._setSearch(false);
    };
    this._scroll = () => this._setSearch(false);
    this.addEventListener('click', this._click);
    document.addEventListener('closedchange', this._sidebarChange);
    document.addEventListener('scroll', this._scroll, true);
    setTimeout(() => this._setSearch(false));
  }
  disconnectedCallback() {
    document.removeEventListener('closedchange', this._sidebarChange);
    document.removeEventListener('scroll', this._scroll, true);
  }
}

define('se-topbar', SeTopbar);
