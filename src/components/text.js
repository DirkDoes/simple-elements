import { define } from '../helpers.js';

class SeText extends HTMLElement {
  connectedCallback() {
    this.classList.add('se-text');
    if (this.hasAttribute('muted')) this.classList.add('se-text--muted');
    if (this.hasAttribute('small')) this.classList.add('se-text--small');
  }
}

define('se-text', SeText);
