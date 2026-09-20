import { define } from '../helpers.js';

class SeCollection extends HTMLElement {
  connectedCallback() {
    const requestedType = this.getAttribute('type') || 'list';
    const type = ['list', 'table', 'tree'].includes(requestedType) ? requestedType : 'list';
    this.classList.toggle('se-list', type !== 'tree');
    this.classList.toggle('se-table', type === 'table');

    this._observer?.disconnect();
    this._observer = new MutationObserver(() => this.sync());
    this._observer.observe(this, { childList: true, subtree: true, attributes: true, attributeFilter: ['level', 'collapsed', 'collapsible', 'dividers', 'guides'] });
    this.sync();
    if (type === 'tree') return;
    this.setAttribute('role', type);
    if (type === 'list') return;

    this.style.setProperty('--se-columns', this.getAttribute('columns') || 'repeat(auto-fit, minmax(8rem, 1fr))');
    if (this.hasAttribute('mobile-columns')) this.style.setProperty('--se-mobile-columns', this.getAttribute('mobile-columns'));
    this.querySelectorAll('se-list-header').forEach((header) => { header.setAttribute('role', 'row'); [...header.children].forEach((cell) => cell.setAttribute('role', 'columnheader')); });
    this.querySelectorAll('se-list-row').forEach((row) => { row.setAttribute('role', 'row'); [...row.children].forEach((cell) => cell.setAttribute('role', 'cell')); });
  }
  disconnectedCallback() { this._observer?.disconnect(); this.querySelectorAll('se-list-row').forEach(row => row._treeAnimation?.cancel()); }
  sync() {
    const dividers = new Set((this.getAttribute('dividers') || '').split(',').map(Number));
    const rows = [...this.children].filter(row => row.matches('se-list-row'));
    const levelOf = row => Math.max(0, parseInt(row.getAttribute('level') || '0', 10) || 0);
    const nextLevels = new Set(), hasNext = new Map();
    for (const row of [...rows].reverse()) {
      const level = levelOf(row);
      for (const depth of nextLevels) if (depth > level) nextLevels.delete(depth);
      hasNext.set(row, nextLevels.has(level));
      nextLevels.add(level);
    }
    const branches = new Map();
    const closed = [];
    for (const row of this.children) {
      if (!row.matches('se-list-row, se-list-header')) continue;
      if (this.matches('[type="table"]')) { row.setAttribute('role', 'row'); [...row.children].forEach(cell => cell.setAttribute('role', row.matches('se-list-header') ? 'columnheader' : 'cell')); }
      [...row.children].forEach((cell, index) => cell.toggleAttribute('data-column-divider', dividers.has(index + 1) && index < row.children.length - 1));
      if (!row.matches('se-list-row')) continue;
      const level = Math.max(0, parseInt(row.getAttribute('level') || '0', 10) || 0);
      while (closed.length && closed.at(-1) >= level) closed.pop();
      const hidden = closed.length > 0;
      if (row._treeHidden !== hidden) {
        const animate = row._treeHidden !== undefined && !matchMedia('(prefers-reduced-motion: reduce)').matches;
        const start = row.getBoundingClientRect().height;
        row._treeAnimation?.cancel();
        row._treeHidden = hidden;
        row.inert = hidden;
        if (hidden) row.setAttribute('aria-hidden', 'true'); else row.removeAttribute('aria-hidden');
        row.removeAttribute('data-tree-hidden');
        if (animate) {
          const end = hidden ? 0 : row.getBoundingClientRect().height;
          row._treeAnimation = row.animate([
            { height: start + 'px', opacity: hidden ? 1 : 0 },
            { height: end + 'px', opacity: hidden ? 0 : 1 }
          ], { duration: 160, easing: 'ease-out' });
          row.setAttribute('data-tree-animating', '');
          row._treeAnimation.onfinish = () => {
            row.toggleAttribute('data-tree-hidden', hidden);
            row.removeAttribute('data-tree-animating');
            row._treeAnimation = null;
          };
        } else { row.toggleAttribute('data-tree-hidden', hidden); row.removeAttribute('data-tree-animating'); }
      }
      for (const depth of branches.keys()) if (depth >= level) branches.delete(depth);
      const lines = [...branches].filter(([depth, continues]) => depth > 0 && continues);
      const cell = row.firstElementChild;
      if (cell) {
        cell.style.setProperty('--se-tree-lines', lines.map(() => 'linear-gradient(var(--se-border), var(--se-border))').join(',') || 'none');
        cell.style.setProperty('--se-tree-positions', lines.map(([depth]) => (depth * 1.25 - .75) + 'rem 0').join(',') || '0 0');
      }
      row.toggleAttribute('data-tree-continues', hasNext.get(row));
      branches.set(level, hasNext.get(row));
      if (row.hasAttribute('collapsible') && row.hasAttribute('collapsed')) closed.push(level);
    }
  }
}

define('se-collection', SeCollection);
