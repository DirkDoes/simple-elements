import { define, escapeHtml, escapeIcon } from '../helpers.js';

class SeLayoutBrand extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const icon = this.getAttribute('icon') || 'dashboard';
    const compactIcon = this.getAttribute('compact-icon') || icon;
    const href = this.getAttribute('href');
    const isAsset = (source) => /^(?:data:|https?:|[./\\])|\.svg(?:$|[?#])/i.test(source);
    const renderIcon = (source) => isAsset(source) && !source.trim().startsWith('{') ? `<img src="${escapeHtml(source)}" alt="">` : `<se-icon name="${escapeIcon(source)}"></se-icon>`;
    this.toggleAttribute('data-wide-icon', isAsset(icon));
    const asset = (source, mode) => source ? `<span class="se-layout-brand__asset se-layout-brand__asset--${mode}">${renderIcon(source)}</span>` : '';
    const identity = href ? 'a' : 'span';
    const identityAttributes = href ? ` href="${escapeHtml(href)}"${this.hasAttribute('label') ? '' : ' aria-label="Home"'}` : '';
    this.innerHTML = `<${identity} class="se-layout-brand__identity"${identityAttributes}><span class="se-layout-brand__logo">${asset(icon, 'full-light')}${asset(compactIcon, 'compact-light')}</span>${this.hasAttribute('label') ? `<strong>${escapeHtml(this.getAttribute('label'))}</strong>` : ''}</${identity}>${this.hasAttribute('collapsible') ? '<button class="se-close se-layout-brand__collapse" type="button" data-sidebar-collapse aria-label="Collapse sidebar"><se-icon name="panel-left-close"></se-icon></button>' : ''}`;
  }
}

define('se-layout-brand', SeLayoutBrand);
