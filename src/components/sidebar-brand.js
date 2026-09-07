import { define, escapeHtml } from '../helpers.js';

class SeSidebarBrand extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    this.innerHTML = `<span class="se-sidebar-brand__identity"><span class="se-sidebar-brand__logo"><se-icon name="${escapeHtml(this.getAttribute('icon') || 'dashboard')}"></se-icon></span><strong>${escapeHtml(this.getAttribute('label') || 'Simple Elements')}</strong></span>${this.hasAttribute('collapsible') ? '<button class="se-close se-sidebar-brand__collapse" type="button" data-sidebar-collapse aria-label="Collapse sidebar"><se-icon name="panel-left-close"></se-icon></button>' : ''}`;
  }
}

define('se-sidebar-brand', SeSidebarBrand);
