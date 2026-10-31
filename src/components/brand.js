import { define, escapeHtml, escapeIcon, connectMinimized } from '../helpers.js';

class SeBrand extends HTMLElement {
  connectedCallback() {
    this._disconnectContext = connectMinimized(this);
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const icon = this.getAttribute('icon') || 'dashboard';
    const compactIcon = this.getAttribute('compact-icon') || icon;
    const href = this.getAttribute('href');
    const isAsset = (source) => /^(?:data:|https?:|[./\\])|\.svg(?:$|[?#])/i.test(source);
    const renderIcon = (source) => isAsset(source) && !source.trim().startsWith('{') ? `<img src="${escapeHtml(source)}" alt="">` : `<se-icon name="${escapeIcon(source)}"></se-icon>`;
    this.toggleAttribute('data-wide-icon', isAsset(icon));
    const asset = (source, mode) => source ? `<span class="se-brand__asset se-brand__asset--${mode}">${renderIcon(source)}</span>` : '';
    const identity = href ? 'a' : 'span';
    const identityAttributes = href ? ` href="${escapeHtml(href)}" aria-label="${escapeHtml(this.getAttribute('label') || 'Home')}"` : '';
    this.innerHTML = `<${identity} class="se-brand__identity"${identityAttributes}><span class="se-brand__logo">${asset(icon, 'full-light')}${asset(compactIcon, 'compact-light')}</span>${this.hasAttribute('label') ? `<strong>${escapeHtml(this.getAttribute('label'))}</strong>` : ''}</${identity}>`;
  }
  disconnectedCallback() { this._disconnectContext?.(); }
}

define('se-brand', SeBrand);
