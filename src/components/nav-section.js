import { define, escapeHtml } from '../helpers.js';

class SeNavSection extends HTMLElement {
  static observedAttributes = ['collapsed'];
  attributeChangedCallback() { this.sync(); }
  sync() {
    const content = this.querySelector(':scope > .se-nav-section__content');
    const toggle = this.querySelector(':scope > .se-nav-section__title');
    if (!content) return;
    if (!content.id) content.id = `se-section-${crypto.randomUUID()}`;
    toggle?.setAttribute('aria-controls', content.id);
    toggle?.setAttribute('aria-expanded', String(!this.collapsed));
    if (this.collapsed && content.contains(document.activeElement)) toggle?.focus();
    content.inert = this.collapsed;
    content.setAttribute('aria-hidden', String(this.collapsed));
  }
  get collapsed() { return this.hasAttribute('collapsed'); }
  set collapsed(value) { this.toggleAttribute('collapsed', Boolean(value)); }
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const children = [...this.childNodes];
    const collapsible = this.hasAttribute('collapsible');
    const expanded = !this.hasAttribute('collapsed');
    this.innerHTML = `${collapsible ? `<button class="se-nav-section__title" type="button" aria-expanded="${expanded}"><span>${escapeHtml(this.getAttribute('title') || 'Section')}</span><se-icon name="chevron"></se-icon></button>` : `<se-title level="sidebar">${escapeHtml(this.getAttribute('title') || 'Section')}</se-title>`}<div class="se-nav-section__content"><div></div></div>`;
    this.querySelector('.se-nav-section__content > div').append(...children);
    this.querySelector('.se-nav-section__title')?.addEventListener('click', (event) => {
      this.toggleAttribute('collapsed');
      event.currentTarget.setAttribute('aria-expanded', String(!this.hasAttribute('collapsed')));
    });
    this.sync();
  }
}

define('se-nav-section', SeNavSection);
