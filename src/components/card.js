import { define } from '../helpers.js';

class SeCard extends HTMLElement {
  connectedCallback() { this.classList.add('se-card'); }
}

define('se-card', SeCard);
