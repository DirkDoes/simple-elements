import { define } from '../helpers.js';

class SeListHeader extends HTMLElement {
  connectedCallback() { this.classList.add('se-list__header'); }
}

define('se-list-header', SeListHeader);
