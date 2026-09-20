import { define } from '../helpers.js';

class SeListHeader extends HTMLElement {
  static observedAttributes = ['sticky'];
  attributeChangedCallback() { this._update?.(); }
  connectedCallback() {
    this.classList.add('se-list__header');
    this._collection = this.parentElement;
    this._update = () => {
      if (!this.hasAttribute('sticky')) { this.style.translate = ''; this._shift = 0; this.removeAttribute('data-stuck'); if (this._collection) this._collection.style.clipPath = ''; this.parentElement?.querySelectorAll(':scope > se-list-row').forEach(row => row.style.clipPath = ''); return; }
      const rows = [...(this.parentElement?.children || [])].filter(row => row.matches('se-list-row') && !row.hasAttribute('data-tree-hidden'));
      const lastHeight = rows.at(-1)?.getBoundingClientRect().height || 0;
      const previous = this._shift || 0;
      const bottom = this.getBoundingClientRect().bottom - previous;
      this._shift = Math.min(0, this.parentElement.getBoundingClientRect().bottom - lastHeight - bottom);
      this.style.translate = '0 ' + this._shift + 'px';
      const header = this.getBoundingClientRect();
      const stuck = header.top > this.parentElement.getBoundingClientRect().top + 2;
      this.toggleAttribute('data-stuck', stuck);
      const table = this.parentElement;
      const top = Math.max(0, header.top - table.getBoundingClientRect().top);
      const radius = getComputedStyle(table).borderTopLeftRadius;
      table.style.clipPath = stuck ? 'inset(' + top + 'px 0 0 round ' + radius + ')' : '';
      for (const row of rows) {
        const rect = row.getBoundingClientRect();
        const cut = stuck ? Math.max(0, Math.min(rect.height, header.bottom - rect.top)) : 0;
        row.style.clipPath = cut ? 'inset(' + cut + 'px -100vmax 0)' : '';
      }
    };
    document.addEventListener('scroll', this._update, true);
    this._resize = new ResizeObserver(this._update);
    this._resize.observe(this.parentElement);
    this._resize.observe(this);
  }
  disconnectedCallback() { if (this._collection) { this._collection.style.clipPath = ''; this._collection.querySelectorAll(':scope > se-list-row').forEach(row => row.style.clipPath = ''); } document.removeEventListener('scroll', this._update, true); this._resize?.disconnect(); }
}

define('se-list-header', SeListHeader);
