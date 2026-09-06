import { define, emit, escapeHtml, parseOptions } from '../helpers.js';

class SeMenu extends HTMLElement {
  set options(value) { this._options = value; if (this.isConnected) this.render(); }
  get options() { return this._options; }
  connectedCallback() { if (!this.dataset.ready) { this.dataset.ready = 'true'; this.render(); } }
  render() {
    const options = parseOptions(this);
    this.innerHTML = `<div class="se-menu"><button class="se-button se-button--secondary" type="button" aria-expanded="false">${escapeHtml(this.getAttribute('label') || 'More')}<se-icon name="more"></se-icon></button><div class="se-menu__items">${options.map((option, index) => `<button class="se-menu-item${option.danger ? ' se-menu-item--danger' : ''}${option.separator ? ' se-menu-item--separated' : ''}" type="button" data-index="${index}"${option.disabled ? ' disabled' : ''}>${option.icon ? `<se-icon name="${escapeHtml(option.icon)}"></se-icon>` : ''}${escapeHtml(option.label)}</button>`).join('')}</div></div>`;
    const root = this.querySelector('.se-menu');
    const trigger = this.querySelector('.se-button');
    trigger.addEventListener('click', () => { root.classList.toggle('se-menu--open'); trigger.setAttribute('aria-expanded', root.classList.contains('se-menu--open')); });
    this.querySelectorAll('[data-index]').forEach((button) => button.addEventListener('click', () => { root.classList.remove('se-menu--open'); emit(this, 'select', options[Number(button.dataset.index)]); }));
  }
}

define('se-menu', SeMenu);
