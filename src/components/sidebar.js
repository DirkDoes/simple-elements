import { define, emit } from '../helpers.js';

class SeSidebar extends HTMLElement {
  static get observedAttributes() { return ['collapsed', 'closed']; }
  attributeChangedCallback(name) {
    if (name === 'collapsed') this.toggleAttribute('data-sidebar-collapsed', this.hasAttribute('collapsed'));
    if (name === 'closed') { this.setAttribute('aria-hidden', String(this.hasAttribute('closed'))); emit(this, 'closedchange', { closed: this.hasAttribute('closed') }); }
  }
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    if (this.getAttribute('layout-mode') === 'responsive') {
      this._media = matchMedia('(max-width: 767px)');
      this._responsive = ({ matches }) => {
        if (matches) {
          this._desktopClosed = this.closed;
          this._desktopCollapsed = this.collapsed;
          this.collapsed = false;
          this.closed = true;
        } else {
          this.collapsed = this._desktopCollapsed;
          this.closed = this._desktopClosed;
        }
      };
      this._desktopClosed = this.closed;
      this._desktopCollapsed = this.collapsed;
      this._responsive(this._media);
      this._media.addEventListener('change', this._responsive);
    }
    if (this.hasAttribute('collapsible')) this.insertAdjacentHTML('beforeend', '<button class="se-sidebar__edge-collapse" type="button" data-sidebar-collapse aria-label="Collapse sidebar"><se-icon name="chevron"></se-icon></button>');
    this.addEventListener('click', (event) => {
      if (event.target.closest('[data-sidebar-collapse]')) {
        this.collapsed = !this.collapsed;
        emit(this, 'collapsechange', { collapsed: this.collapsed });
      } else if (this._media?.matches && event.target.closest('se-sidebar-button')) {
        this.closed = true;
      }
    });
    this.addEventListener('change', (event) => {
      const control = event.target.closest('se-checkbox[variant^="light-dark"]');
      if (!control) return;
      document.documentElement.dataset.theme = control.checked ? 'dark' : 'light';
      emit(this, 'themechange', { theme: document.documentElement.dataset.theme });
    });
    this.collapsed = this.collapsed;
  }
  disconnectedCallback() {
    clearTimeout(this._transitionTimer);
    clearTimeout(this._overlayTimer);
    this._media?.removeEventListener('change', this._responsive);
  }
  get collapsed() { return this.hasAttribute('collapsed'); }
  set collapsed(value) {
    const wasCollapsed = this.collapsed;
    this.toggleAttribute('collapsed', Boolean(value));
    this.toggleAttribute('data-sidebar-collapsed', Boolean(value));
    if (this.hasAttribute('overlay')) {
      clearTimeout(this._overlayTimer);
      if (value && !wasCollapsed) {
        this.setAttribute('data-overlay-transitioning', '');
        this._overlayTimer = setTimeout(() => this.removeAttribute('data-overlay-transitioning'), 200);
      } else if (!value) this.removeAttribute('data-overlay-transitioning');
    }
    if (value) this.querySelectorAll('se-sidebar-group').forEach((group) => { group.collapsed = true; });
    this.querySelectorAll('[data-sidebar-collapse]').forEach((button) => {
      button.setAttribute('aria-label', value ? 'Expand sidebar' : 'Collapse sidebar');
      if (!button.classList.contains('se-sidebar__edge-collapse')) button.querySelector('se-icon')?.setAttribute('name', value ? 'panel-left-open' : 'panel-left-close');
    });
  }
  get closed() { return this.hasAttribute('closed'); }
  set closed(value) {
    if (Boolean(value) !== this.closed && this._media?.matches) {
      this.setAttribute('data-transitioning', '');
      clearTimeout(this._transitionTimer);
      this._transitionTimer = setTimeout(() => this.removeAttribute('data-transitioning'), 210);
    }
    this.toggleAttribute('closed', Boolean(value));
  }
}

define('se-sidebar', SeSidebar);
