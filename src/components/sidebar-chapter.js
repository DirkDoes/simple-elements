import { define, escapeHtml } from '../helpers.js';

class SeSidebarChapter extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const content = this.innerHTML;
    const collapsible = this.hasAttribute('collapsible');
    const expanded = !this.hasAttribute('collapsed');
    this.innerHTML = `${collapsible ? `<button class="se-sidebar-chapter__title" type="button" aria-expanded="${expanded}"><span>${escapeHtml(this.getAttribute('title') || 'Chapter')}</span><se-icon name="chevron"></se-icon></button>` : `<se-title level="sidebar">${escapeHtml(this.getAttribute('title') || 'Chapter')}</se-title>`}<div class="se-sidebar-chapter__content"><div>${content}</div></div>`;
    this.querySelector('.se-sidebar-chapter__title')?.addEventListener('click', (event) => {
      this.toggleAttribute('collapsed');
      event.currentTarget.setAttribute('aria-expanded', String(!this.hasAttribute('collapsed')));
    });
  }
}

define('se-sidebar-chapter', SeSidebarChapter);
