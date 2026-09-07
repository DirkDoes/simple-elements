import { define, escapeHtml } from '../helpers.js';

class SeSidebarSection extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const content = this.innerHTML;
    const collapsible = this.hasAttribute('collapsible');
    const expanded = !this.hasAttribute('collapsed');
    this.innerHTML = `${collapsible ? `<button class="se-sidebar-section__title" type="button" aria-expanded="${expanded}"><span>${escapeHtml(this.getAttribute('title') || 'Section')}</span><se-icon name="chevron"></se-icon></button>` : `<se-title level="sidebar">${escapeHtml(this.getAttribute('title') || 'Section')}</se-title>`}<div class="se-sidebar-section__content"><div>${content}</div></div>`;
    this.querySelector('.se-sidebar-section__title')?.addEventListener('click', (event) => {
      this.toggleAttribute('collapsed');
      event.currentTarget.setAttribute('aria-expanded', String(!this.hasAttribute('collapsed')));
    });
  }
}

define('se-sidebar-section', SeSidebarSection);
