import { define } from '../helpers.js';

class SeTable extends HTMLElement {
  connectedCallback() {
    this.classList.add('se-list', 'se-table');
    this.setAttribute('role', 'table');
    this.style.setProperty('--se-columns', this.getAttribute('columns') || 'repeat(auto-fit, minmax(8rem, 1fr))');
    this.querySelectorAll('se-list-header').forEach((header) => { header.setAttribute('role', 'row'); [...header.children].forEach((cell) => cell.setAttribute('role', 'columnheader')); });
    this.querySelectorAll('se-list-row').forEach((row) => { row.setAttribute('role', 'row'); [...row.children].forEach((cell) => cell.setAttribute('role', 'cell')); });
  }
}

define('se-table', SeTable);
