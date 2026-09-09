import { define } from '../helpers.js';

const blockquoteVariants = new Set(['gray', 'brand', 'success', 'warning', 'error', 'info', 'important']);

class SeBlockquote extends HTMLElement {
  connectedCallback() {
    const tone = this.getAttribute('tone') || 'brand';
    this.classList.add('se-blockquote', `se-blockquote--${blockquoteVariants.has(tone) ? tone : 'brand'}`);
  }
}

define('se-blockquote', SeBlockquote);
