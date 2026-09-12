import { define } from '../helpers.js';

class SeCard extends HTMLElement {
  connectedCallback() {
    this.classList.add('se-card');
    const color = this.getAttribute('color');
    if (color && CSS.supports('color', color)) this.style.setProperty('--se-card-color', color);
  }
}

define('se-card', SeCard);
