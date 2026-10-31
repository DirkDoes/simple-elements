import { define, escapeIcon, escapeHtml, navigationTooltip, connectMinimized } from '../helpers.js';

class SeNavGroup extends HTMLElement {
  static observedAttributes = ['active', 'collapsed'];
  attributeChangedCallback() { this.syncActive(); this.syncDisclosure(); }
  syncDisclosure() {
    const content = this.querySelector(':scope > .se-nav-group__content');
    const toggle = this.querySelector(':scope > .se-nav-group__head > button:last-child');
    if (!content || !toggle) return;
    if (!content.id) content.id = `se-group-${crypto.randomUUID()}`;
    toggle.setAttribute('aria-controls', content.id);
    toggle.setAttribute('aria-expanded', String(!this.collapsed));
    if (this.collapsed && content.contains(document.activeElement)) toggle.focus();
    content.inert = this.collapsed;
    content.setAttribute('aria-hidden', String(this.collapsed));
  }
  syncActive() {
    const control = this.querySelector(':scope > .se-nav-group__head > :first-child');
    if (!control) return;
    if (this.getAttribute('variant') === 'page' && this.hasAttribute('active')) control.setAttribute('aria-current', 'page');
    else control.removeAttribute('aria-current');
  }
  connectedCallback() {
    this._disconnectContext = connectMinimized(this);
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const children = [...this.childNodes];
    const label = escapeHtml(this.getAttribute('label') || 'Group');
    const icon = this.getAttribute('icon');
    const page = this.getAttribute('variant') === 'page';
    const href = this.getAttribute('href');
    const heading = `${icon ? `<se-icon name="${escapeIcon(icon)}"></se-icon>` : ''}<span><strong>${label}</strong></span>`;
    const subtext = this.getAttribute('subtext') ? `<small class="se-nav-group__label">${escapeHtml(this.getAttribute('subtext'))}</small>` : '';
    this.innerHTML = `<div class="se-nav-group__head">${page ? `${href ? `<a href="${escapeHtml(href)}">${heading}</a>` : `<button type="button">${heading}</button>`}<button type="button" aria-label="Toggle ${label}" aria-expanded="${!this.hasAttribute('collapsed')}"><se-icon name="chevron"></se-icon></button>` : `<button type="button" aria-expanded="${!this.hasAttribute('collapsed')}">${heading}<se-icon name="chevron"></se-icon></button>`}</div><div class="se-nav-group__content"><div>${subtext}</div></div>`;
    this.querySelector('.se-nav-group__content > div').append(...children);
    this.syncActive();
    const toggle = this.querySelector('.se-nav-group__head > button:last-child');
    toggle.addEventListener('click', () => {
      this.collapsed = !this.collapsed;
    });
    const headingControl = this.querySelector('.se-nav-group__head > :first-child');
    headingControl.setAttribute('aria-label', this.getAttribute('label') || 'Group');
    navigationTooltip(this, headingControl, this.getAttribute('label') || 'Group');
    this.syncDisclosure();
  }
  disconnectedCallback() { this._disconnectContext?.(); }
  get collapsed() { return this.hasAttribute('collapsed'); }
  set collapsed(value) {
    this.toggleAttribute('collapsed', Boolean(value));
  }
}

define('se-nav-group', SeNavGroup);
