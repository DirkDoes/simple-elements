import { define } from '../helpers.js';

class SeListRow extends HTMLElement {
  connectedCallback() { this.classList.add('se-list__row'); this.setAttribute('role', 'listitem'); }
}

define('se-list-row', SeListRow);
