import { define, escapeHtml } from '../helpers.js';

class SeLayoutBrand extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    this.innerHTML = `<span class="se-layout-brand__identity"><span class="se-layout-brand__logo"><se-icon name="${escapeHtml(this.getAttribute('icon') || 'dashboard')}"></se-icon></span><strong>${escapeHtml(this.getAttribute('label') || 'Simple Elements')}</strong></span>${this.hasAttribute('collapsible') ? '<button class="se-close se-layout-brand__collapse" type="button" data-sidebar-collapse aria-label="Collapse sidebar"><se-icon name="panel-left-close"></se-icon></button>' : ''}`;
  }
}

define('se-layout-brand', SeLayoutBrand);
