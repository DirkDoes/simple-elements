import { define, emit } from '../helpers.js';

class SeSidebar extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    this.addEventListener('click', (event) => {
      if (!event.target.closest('[data-sidebar-collapse]')) return;
      this.toggleAttribute('collapsed');
      const collapsed = this.hasAttribute('collapsed');
      this.querySelectorAll('[data-sidebar-collapse]').forEach((button) => {
        button.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
        button.querySelector('se-icon')?.setAttribute('name', collapsed ? 'panel-left-open' : 'panel-left-close');
      });
      emit(this, 'collapsechange', { collapsed });
    });
    this.addEventListener('change', (event) => {
      const control = event.target.closest('se-checkbox[variant^="light-dark"]');
      if (!control) return;
      document.documentElement.dataset.theme = control.checked ? 'dark' : 'light';
      emit(this, 'themechange', { theme: document.documentElement.dataset.theme });
    });
  }
  get collapsed() { return this.hasAttribute('collapsed'); }
  set collapsed(value) { this.toggleAttribute('collapsed', Boolean(value)); }
}

define('se-sidebar', SeSidebar);
