import { define, escapeHtml } from '../helpers.js';

class SeSidebarGroup extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const content = this.innerHTML;
    const label = escapeHtml(this.getAttribute('label') || 'Group');
    const icon = this.getAttribute('icon');
    const href = this.getAttribute('href');
    const heading = `${icon ? `<se-icon name="${escapeHtml(icon)}"></se-icon>` : ''}<span><strong>${label}</strong>${this.getAttribute('subtext') ? `<small>${escapeHtml(this.getAttribute('subtext'))}</small>` : ''}</span>`;
    this.innerHTML = `<div class="se-sidebar-group__head">${href ? `<a href="${escapeHtml(href)}">${heading}</a><button type="button" aria-label="Toggle ${label}" aria-expanded="${!this.hasAttribute('collapsed')}"><se-icon name="chevron"></se-icon></button>` : `<button type="button" aria-expanded="${!this.hasAttribute('collapsed')}">${heading}<se-icon name="chevron"></se-icon></button>`}</div><div class="se-sidebar-group__content"><div>${content}</div></div>`;
    const toggle = href ? this.querySelector('.se-sidebar-group__head > button') : this.querySelector('.se-sidebar-group__head button');
    toggle.addEventListener('click', () => { this.toggleAttribute('collapsed'); toggle.setAttribute('aria-expanded', String(!this.hasAttribute('collapsed'))); });
  }
}

define('se-sidebar-group', SeSidebarGroup);
