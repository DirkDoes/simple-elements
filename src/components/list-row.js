import { define } from '../helpers.js';

class SeListRow extends HTMLElement {
  connectedCallback() {
    this.classList.add('se-list__row');
    this.setAttribute('role', 'listitem');
    const level = Math.max(0, Number.parseInt(this.getAttribute('level') || '0', 10) || 0);
    this.style.setProperty('--se-list-row-indent', `${level * 1.25}rem`);
  }
}

define('se-list-row', SeListRow);
