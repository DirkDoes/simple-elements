import { define, emit, escapeHtml, parseOptions } from '../helpers.js';

class SeSplitButton extends HTMLElement {
  set options(value) { this._options = value; if (this.isConnected) this.render(); }
  get options() { return this._options; }
  connectedCallback() { if (!this.dataset.ready) { this.dataset.ready = 'true'; this._selected = 0; this.render(); } }
  render() {
    const options = parseOptions(this);
    const fallback = { label: this.getAttribute('text') || this.getAttribute('label') || 'Action', icon: this.getAttribute('icon') || '' };
    const selected = this.hasAttribute('direct') ? fallback : options[this._selected] || fallback;
    const variant = this.getAttribute('variant') || 'brand';
    const disabled = this.hasAttribute('disabled');
    const label = this.getAttribute('aria-label') || selected.label || selected.icon;
    this.innerHTML = `<div class="se-split se-split--${escapeHtml(variant)}"><button class="se-button se-button--${escapeHtml(variant)}" type="${escapeHtml(this.getAttribute('type') || 'button')}"${disabled ? ' disabled' : ''}${label ? ` aria-label="${escapeHtml(label)}"` : ''}>${selected.icon ? `<se-icon name="${escapeHtml(selected.icon)}"></se-icon>` : ''}${escapeHtml(selected.label)}</button><button class="se-button se-button--${escapeHtml(variant)} se-split__toggle" type="button" aria-label="Choose action" aria-expanded="false"${disabled ? ' disabled' : ''}><se-icon name="chevron"></se-icon></button><div class="se-split__menu">${options.map((option, index) => `<button class="se-menu-item" type="button" data-index="${index}"${option.disabled ? ' disabled' : ''}>${option.icon ? `<se-icon name="${escapeHtml(option.icon)}"></se-icon>` : ''}${escapeHtml(option.label)}</button>`).join('')}</div></div>`;
    const root = this.querySelector('.se-split');
    this.querySelector('.se-split__toggle').addEventListener('click', (event) => { const open = root.classList.toggle('se-split--open'); event.currentTarget.setAttribute('aria-expanded', String(open)); });
    this.querySelector('.se-split > .se-button').addEventListener('click', () => emit(this, 'action', selected));
    this.querySelectorAll('[data-index]').forEach((button) => button.addEventListener('click', () => {
      const option = options[Number(button.dataset.index)];
      if (this.hasAttribute('direct')) { root.classList.remove('se-split--open'); emit(this, 'action', option); return; }
      this._selected = Number(button.dataset.index);
      this.render();
      emit(this, 'change', option);
    }));
  }
}

define('se-split-button', SeSplitButton);
