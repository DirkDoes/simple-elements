import { define } from '../helpers.js';

class SeBlockquote extends HTMLElement {
  connectedCallback() { this.classList.add('se-blockquote'); }
}

define('se-blockquote', SeBlockquote);
