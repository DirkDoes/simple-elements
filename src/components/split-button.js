import { define, emit, escapeHtml, parseOptions } from '../helpers.js';

class SeSplitButton extends HTMLElement {
  set options(value) { this._options = value; if (this.isConnected) this.render(); }
  get options() { return this._options; }
  connectedCallback() { if (!this.dataset.ready) { this.dataset.ready = 'true'; this._selected = 0; this.render(); } }
  render() {
    const options = parseOptions(this);
    const selected = options[this._selected] || { label: this.getAttribute('label') || 'Action', icon: 'send' };
    this.innerHTML = `<div class="se-split"><button class="se-button se-button--brand" type="button">${selected.icon ? `<se-icon name="${escapeHtml(selected.icon)}"></se-icon>` : ''}${escapeHtml(selected.label)}</button><button class="se-button se-button--brand se-split__toggle" type="button" aria-label="Choose action" aria-expanded="false"><se-icon name="chevron"></se-icon></button><div class="se-split__menu">${options.map((option, index) => `<button class="se-menu-item" type="button" data-index="${index}">${option.icon ? `<se-icon name="${escapeHtml(option.icon)}"></se-icon>` : ''}${escapeHtml(option.label)}</button>`).join('')}</div></div>`;
    const root = this.querySelector('.se-split');
    this.querySelector('.se-split__toggle').addEventListener('click', () => root.classList.toggle('se-split--open'));
    this.querySelector('.se-split > .se-button').addEventListener('click', () => emit(this, 'action', selected));
    this.querySelectorAll('[data-index]').forEach((button) => button.addEventListener('click', () => { this._selected = Number(button.dataset.index); this.render(); emit(this, 'change', options[this._selected]); }));
  }
}

define('se-split-button', SeSplitButton);
