import { define } from '../helpers.js';

class SeList extends HTMLElement {
  connectedCallback() { this.classList.add('se-list'); this.setAttribute('role', 'list'); }
}

define('se-list', SeList);
