import { define, emit } from '../helpers.js';

class SeSidebar extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    if (this.hasAttribute('collapsible')) this.insertAdjacentHTML('beforeend', '<button class="se-sidebar__edge-collapse" type="button" data-sidebar-collapse aria-label="Collapse sidebar"><se-icon name="chevron"></se-icon></button>');
    this.addEventListener('click', (event) => {
      if (!event.target.closest('[data-sidebar-collapse]')) return;
      this.collapsed = !this.collapsed;
      emit(this, 'collapsechange', { collapsed: this.collapsed });
    });
    this.addEventListener('change', (event) => {
      const control = event.target.closest('se-checkbox[variant^="light-dark"]');
      if (!control) return;
      document.documentElement.dataset.theme = control.checked ? 'dark' : 'light';
      emit(this, 'themechange', { theme: document.documentElement.dataset.theme });
    });
  }
  get collapsed() { return this.hasAttribute('collapsed'); }
  set collapsed(value) {
    this.toggleAttribute('collapsed', Boolean(value));
    if (value) this.querySelectorAll('se-sidebar-group').forEach((group) => { group.collapsed = true; });
    this.querySelectorAll('[data-sidebar-collapse]').forEach((button) => {
      button.setAttribute('aria-label', value ? 'Expand sidebar' : 'Collapse sidebar');
      if (!button.classList.contains('se-sidebar__edge-collapse')) button.querySelector('se-icon')?.setAttribute('name', value ? 'panel-left-open' : 'panel-left-close');
    });
  }
}

define('se-sidebar', SeSidebar);
