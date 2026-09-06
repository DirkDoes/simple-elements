import { define } from '../helpers.js';

class SeTitle extends HTMLElement {
  connectedCallback() {
    this.classList.add('se-title', `se-title--${this.getAttribute('level') || 'section'}`);
  }
}

define('se-title', SeTitle);
