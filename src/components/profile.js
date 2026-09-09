import { define, escapeHtml } from '../helpers.js';

class SeProfile extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const tag = this.hasAttribute('clickable') ? 'button' : 'div';
    const variants = ['gray', 'brand', 'success', 'warning', 'error', 'info', 'important'];
    const tone = variants.includes(this.getAttribute('tone')) ? this.getAttribute('tone') : 'brand';
    this.innerHTML = `<${tag} class="se-profile se-profile--${tone}"${tag === 'button' ? ' type="button"' : ''}><span class="se-profile__avatar">${escapeHtml(this.getAttribute('initials') || '')}</span><span><strong>${escapeHtml(this.getAttribute('name') || '')}</strong>${this.getAttribute('subtitle') ? `<small>${escapeHtml(this.getAttribute('subtitle'))}</small>` : ''}</span></${tag}>`;
  }
}

define('se-profile', SeProfile);
