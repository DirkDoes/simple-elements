import { define, escapeHtml } from '../helpers.js';

const variants = new Set(['gray', 'brand', 'success', 'warning', 'error', 'info', 'important']);

class SeBadge extends HTMLElement {
  static observedAttributes = ['tone', 'icon', 'text', 'aria-label'];
  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  render() {
    const tone = this.getAttribute('tone') || 'gray';
    const icon = this.getAttribute('icon') || '';
    const text = this.getAttribute('text') || (icon ? '' : 'Badge');
    variants.forEach((name) => this.classList.remove(`se-badge--${name}`));
    this.classList.add('se-badge', `se-badge--${variants.has(tone) ? tone : 'gray'}`);
    this.classList.toggle('se-badge--icon', Boolean(icon && !text));
    if (icon && !text) this.setAttribute('role', 'img'); else this.removeAttribute('role');
    this.innerHTML = `${icon ? `<se-icon name="${escapeHtml(icon)}"></se-icon>` : ''}${escapeHtml(text)}`;
  }
}

define('se-badge', SeBadge);
