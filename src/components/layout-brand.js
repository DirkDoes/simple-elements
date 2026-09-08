import { define, escapeHtml } from '../helpers.js';

class SeLayoutBrand extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const icon = this.getAttribute('icon') || 'dashboard';
    const compactIcon = this.getAttribute('compact-icon') || icon;
    const darkIcon = this.getAttribute('dark-icon');
    const compactDarkIcon = this.getAttribute('compact-dark-icon');
    this.toggleAttribute('data-has-dark-icon', Boolean(darkIcon));
    this.toggleAttribute('data-has-compact-dark-icon', Boolean(compactDarkIcon));
    const isAsset = (source) => /^(?:data:|https?:|[./\\])|\.svg(?:$|[?#])/i.test(source);
    const renderIcon = (source) => isAsset(source) ? `<img src="${escapeHtml(source)}" alt="">` : `<se-icon name="${escapeHtml(source)}"></se-icon>`;
    this.toggleAttribute('data-wide-icon', isAsset(icon));
    const asset = (source, mode) => source ? `<span class="se-layout-brand__asset se-layout-brand__asset--${mode}">${renderIcon(source)}</span>` : '';
    this.innerHTML = `<span class="se-layout-brand__identity"><span class="se-layout-brand__logo">${asset(icon, 'full-light')}${asset(darkIcon, 'full-dark')}${asset(compactIcon, 'compact-light')}${asset(compactDarkIcon, 'compact-dark')}</span>${this.hasAttribute('label') ? `<strong>${escapeHtml(this.getAttribute('label'))}</strong>` : ''}</span>${this.hasAttribute('collapsible') ? '<button class="se-close se-layout-brand__collapse" type="button" data-sidebar-collapse aria-label="Collapse sidebar"><se-icon name="panel-left-close"></se-icon></button>' : ''}`;
  }
}

define('se-layout-brand', SeLayoutBrand);
