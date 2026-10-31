import { define, escapeIcon, escapeHtml, navigationTooltip, connectMinimized } from '../helpers.js';

class SeNavItem extends HTMLElement {
  static observedAttributes = ['active'];
  attributeChangedCallback() { this.sync(); }
  sync() {
    const control = this.querySelector('.se-nav-item');
    if (!control) return;
    if (this.hasAttribute('active')) control.setAttribute('aria-current', 'page');
    else control.removeAttribute('aria-current');
  }
  connectedCallback() {
    this._disconnectContext = connectMinimized(this);
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const end = [...this.children].filter(child => child.getAttribute('data-se-region') === 'end');
    const label = this.getAttribute('label') || [...this.childNodes].filter(node => !end.includes(node)).map(node => node.textContent).join('').trim() || 'Navigation item';
    const icon = this.getAttribute('icon');
    const disabled = this.hasAttribute('disabled');
    const content = `${icon ? `<se-icon name="${escapeIcon(icon)}"></se-icon>` : ''}<span>${escapeHtml(label)}</span>`;
    this.innerHTML = this.getAttribute('href') && !disabled
      ? `<a class="se-nav-item" href="${escapeHtml(this.getAttribute('href'))}" aria-label="${escapeHtml(label)}">${content}</a>`
      : `<button class="se-nav-item" type="button" aria-label="${escapeHtml(label)}"${disabled ? ' disabled' : ''}>${content}</button>`;
    const control = this.querySelector('.se-nav-item');
    control.append(...end);
    navigationTooltip(this, control, label);
    this.sync();
  }
  disconnectedCallback() { this._disconnectContext?.(); }
}

define('se-nav-item', SeNavItem);
