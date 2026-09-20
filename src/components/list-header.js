import { define } from '../helpers.js';

class SeListHeader extends HTMLElement {
  static observedAttributes = ['sticky'];
  attributeChangedCallback() { this._update?.(); }
  connectedCallback() {
    this.classList.add('se-list__header');
    this._update = () => {
      if (!this.hasAttribute('sticky')) { this.style.translate = ''; this._shift = 0; this.removeAttribute('data-stuck'); return; }
      const rows = [...(this.parentElement?.children || [])].filter(row => row.matches('se-list-row') && !row.hasAttribute('data-tree-hidden'));
      const lastHeight = rows.at(-1)?.getBoundingClientRect().height || 0;
      const previous = this._shift || 0;
      const bottom = this.getBoundingClientRect().bottom - previous;
      this._shift = Math.min(0, this.parentElement.getBoundingClientRect().bottom - lastHeight - bottom);
      this.style.translate = '0 ' + this._shift + 'px';
      this.toggleAttribute('data-stuck', this.getBoundingClientRect().top > this.parentElement.getBoundingClientRect().top + 2);
    };
    document.addEventListener('scroll', this._update, true);
    this._resize = new ResizeObserver(this._update);
    this._resize.observe(this.parentElement);
    this._resize.observe(this);
  }
  disconnectedCallback() { document.removeEventListener('scroll', this._update, true); this._resize?.disconnect(); }
}

define('se-list-header', SeListHeader);
