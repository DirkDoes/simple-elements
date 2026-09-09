import { define } from '../helpers.js';

class SeSidebarToggle extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    this.innerHTML = `<button class="se-sidebar-toggle" type="button"><se-icon name="menu"></se-icon></button>`;
    this.addEventListener('click', (event) => {
      if (!event.target.closest('button')) return;
      const sidebar = this.sidebar;
      if (!sidebar) return;
      sidebar.closed = !sidebar.closed;
      this.sync();
    });
    this.sync();
  }
  disconnectedCallback() { this._sidebar?.removeEventListener('closedchange', this._sync); }
  get sidebar() {
    const id = this.getAttribute('for');
    return (id ? document.getElementById(id.replace(/^#/, '')) : this.closest('se-sidebar')) || null;
  }
  sync() {
    const button = this.querySelector('button');
    if (!button) return;
    const sidebar = this.sidebar;
    if (sidebar !== this._sidebar) {
      this._sidebar?.removeEventListener('closedchange', this._sync);
      this._sidebar = sidebar;
      this._sync = () => this.sync();
      sidebar?.addEventListener('closedchange', this._sync);
    }
    const closed = !sidebar || sidebar.closed;
    button.disabled = !sidebar;
    if (sidebar?.id) button.setAttribute('aria-controls', sidebar.id);
    button.setAttribute('aria-expanded', String(!closed));
    button.setAttribute('aria-label', this.getAttribute('label') || (closed ? 'Open sidebar' : 'Close sidebar'));
  }
}

define('se-sidebar-toggle', SeSidebarToggle);
