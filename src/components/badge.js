import { define } from '../helpers.js';

const variants = new Set(['gray', 'brand', 'success', 'warning', 'error', 'info', 'purple']);

class SeBadge extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute('variant') || 'gray';
    this.classList.add('se-badge', `se-badge--${variants.has(variant) ? variant : 'gray'}`);
    if (!this.textContent.trim()) this.classList.add('se-badge--icon');
  }
}

define('se-badge', SeBadge);
