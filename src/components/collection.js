import { define } from '../helpers.js';

class SeCollection extends HTMLElement {
  connectedCallback() {
    const requestedType = this.getAttribute('type') || 'list';
    const type = ['list', 'table', 'tree'].includes(requestedType) ? requestedType : 'list';
    this.classList.toggle('se-list', type !== 'tree');
    this.classList.toggle('se-table', type === 'table');

    if (type === 'tree') return;
    this.setAttribute('role', type);
    if (type === 'list') return;

    this.style.setProperty('--se-columns', this.getAttribute('columns') || 'repeat(auto-fit, minmax(8rem, 1fr))');
    this.querySelectorAll('se-list-header').forEach((header) => { header.setAttribute('role', 'row'); [...header.children].forEach((cell) => cell.setAttribute('role', 'columnheader')); });
    this.querySelectorAll('se-list-row').forEach((row) => { row.setAttribute('role', 'row'); [...row.children].forEach((cell) => cell.setAttribute('role', 'cell')); });
  }
}

define('se-collection', SeCollection);
