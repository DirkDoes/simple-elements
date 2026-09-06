import { define } from '../helpers.js';

const blockquoteVariants = new Set(['gray', 'brand', 'success', 'warning', 'error', 'info', 'purple']);

class SeBlockquote extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute('variant') || 'brand';
    this.classList.add('se-blockquote', `se-blockquote--${blockquoteVariants.has(variant) ? variant : 'brand'}`);
  }
}

define('se-blockquote', SeBlockquote);
