import { define, escapeHtml } from '../helpers.js';

class SeSidebarGroup extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const content = this.innerHTML;
    const label = escapeHtml(this.getAttribute('label') || 'Group');
    const icon = this.getAttribute('icon');
    const page = this.getAttribute('variant') === 'page';
    const href = this.getAttribute('href') || '#';
    const heading = `${icon ? `<se-icon name="${escapeHtml(icon)}"></se-icon>` : ''}<span><strong>${label}</strong></span>`;
    const subtext = this.getAttribute('subtext') ? `<small class="se-sidebar-group__label">${escapeHtml(this.getAttribute('subtext'))}</small>` : '';
    this.innerHTML = `<div class="se-sidebar-group__head">${page ? `<a href="${escapeHtml(href)}">${heading}</a><button type="button" aria-label="Toggle ${label}" aria-expanded="${!this.hasAttribute('collapsed')}"><se-icon name="chevron"></se-icon></button>` : `<button type="button" aria-expanded="${!this.hasAttribute('collapsed')}">${heading}<se-icon name="chevron"></se-icon></button>`}</div><div class="se-sidebar-group__content"><div>${subtext}${content}</div></div>`;
    const toggle = page ? this.querySelector('.se-sidebar-group__head > button') : this.querySelector('.se-sidebar-group__head button');
    toggle.addEventListener('click', () => {
      const sidebar = this.closest('se-sidebar');
      if (!page && sidebar?.collapsed) {
        sidebar.collapsed = false;
        sidebar.dispatchEvent(new CustomEvent('collapsechange', { detail: { collapsed: false }, bubbles: true }));
        setTimeout(() => { this.collapsed = false; }, 200);
        return;
      }
      this.collapsed = !this.collapsed;
    });
  }
  get collapsed() { return this.hasAttribute('collapsed'); }
  set collapsed(value) {
    this.toggleAttribute('collapsed', Boolean(value));
    this.querySelector('.se-sidebar-group__head button')?.setAttribute('aria-expanded', String(!value));
  }
}

define('se-sidebar-group', SeSidebarGroup);
