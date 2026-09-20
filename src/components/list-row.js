import { define, emit } from '../helpers.js';

class SeListRow extends HTMLElement {
  static observedAttributes = ['level', 'collapsible', 'collapsed', 'variant'];
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  connectedCallback() { this.render(); requestAnimationFrame(() => { if (this.isConnected) this.render(); }); }
  render() {
    this.classList.add('se-list__row');
    this.setAttribute('role', this.parentElement?.matches('se-collection[type="table"]') ? 'row' : 'listitem');
    const level = Math.max(0, Number.parseInt(this.getAttribute('level') || '0', 10) || 0);
    this.style.setProperty('--se-list-row-indent', `${level * 1.25}rem`);
    let toggle = this.querySelector(':scope > :first-child > .se-list__toggle');
    if (!this.hasAttribute('collapsible')) { toggle?.remove(); return; }
    if (!this.firstElementChild) return;
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.type = 'button'; toggle.className = 'se-list__toggle';
      toggle.innerHTML = '<se-icon name="chevron"></se-icon>';
      toggle.addEventListener('click', event => {
        event.stopPropagation(); this.toggleAttribute('collapsed');
        emit(this, 'toggle', { collapsed: this.hasAttribute('collapsed') });
      });
      this.firstElementChild.prepend(toggle);
    }
    const collapsed = this.hasAttribute('collapsed');
    toggle.setAttribute('aria-expanded', String(!collapsed));
    toggle.setAttribute('aria-label', (collapsed ? 'Expand ' : 'Collapse ') + this.firstElementChild.textContent.trim());
  }
}

define('se-list-row', SeListRow);
