import { define, escapeHtml, escapeIcon } from '../helpers.js';

class SeNavTab extends HTMLElement {
  static observedAttributes = ['active', 'badge', 'badge-tone'];
  attributeChangedCallback() { this.sync(); }
  sync() {
    const control = this.querySelector('.se-nav-tab');
    if (!control) return;
    if (this.hasAttribute('active')) control.setAttribute('aria-current', 'page');
    else control.removeAttribute('aria-current');
    let badge = control.querySelector('.se-nav-tab__badge');
    if (!this.hasAttribute('badge')) { badge?.remove(); return; }
    if (!badge) {
      badge = document.createElement('span');
      control.insertBefore(badge, control.querySelector('[data-se-region="end"]'));
    }
    badge.textContent = this.getAttribute('badge');
    const tone = this.getAttribute('badge-tone');
    const explicit = ['gray', 'brand', 'success', 'warning', 'error', 'info', 'important'].includes(tone);
    badge.className = `se-nav-tab__badge${explicit ? ` se-badge--${tone}` : ''}`;
    if (explicit) badge.dataset.tone = tone;
    else delete badge.dataset.tone;
  }
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const end = [...this.children].filter(child => child.getAttribute('data-se-region') === 'end');
    const label = this.getAttribute('label') || [...this.childNodes].filter(node => !end.includes(node)).map(node => node.textContent).join('').trim() || 'Navigation tab';
    const icon = this.getAttribute('icon');
    const disabled = this.hasAttribute('disabled');
    const content = `${icon ? `<se-icon name="${escapeIcon(icon)}"></se-icon>` : ''}<span>${escapeHtml(label)}</span>`;
    this.innerHTML = this.hasAttribute('href') && !disabled
      ? `<a class="se-nav-tab" href="${escapeHtml(this.getAttribute('href'))}">${content}</a>`
      : `<button class="se-nav-tab" type="button"${disabled ? ' disabled' : ''}>${content}</button>`;
    this.querySelector('.se-nav-tab').append(...end);
    this.sync();
  }
}

define('se-nav-tab', SeNavTab);
