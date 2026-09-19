import { define, escapeIcon, emit, escapeHtml, parseOptions, openPopup } from '../helpers.js';

class SeMenu extends HTMLElement {
  set options(value) { this._options = value; if (this.isConnected) this.render(); }
  get options() { return this._options; }
  connectedCallback() { if (!this.dataset.ready) { this.dataset.ready = 'true'; this.render(); } }
  disconnectedCallback() { this.close(); }
  close() { this._popup?.(); this._popup = null; this.querySelector('.se-menu')?.classList.remove('se-menu--open'); this.querySelector('.se-button')?.setAttribute('aria-expanded', 'false'); }
  render() {
    this.close();
    const options = parseOptions(this);
    this.innerHTML = `<div class="se-menu"><button class="se-button se-button--secondary${this.hasAttribute('icon-only') ? ' se-button--icon' : ''}" aria-label="${escapeHtml(this.getAttribute('label') || 'More')}" type="button" aria-expanded="false">${this.hasAttribute('icon-only') ? '' : escapeHtml(this.getAttribute('label') || 'More')}<se-icon name="more"></se-icon></button><div class="se-menu__items">${options.map((option, index) => `<button class="se-menu-item${option.danger ? ' se-menu-item--danger' : ''}${option.separator ? ' se-menu-item--separated' : ''}" type="button" data-index="${index}"${option.disabled ? ' disabled' : ''}>${option.icon ? `<se-icon name="${escapeIcon(option.icon)}"></se-icon>` : ''}${escapeHtml(option.label)}</button>`).join('')}</div></div>`;
    const root = this.querySelector('.se-menu');
    const trigger = this.querySelector('.se-button');
    trigger.addEventListener('click', () => {
      if (this._popup) return this.close();
      root.classList.add('se-menu--open');
      trigger.setAttribute('aria-expanded', 'true');
      this._popup = openPopup(trigger, this.querySelector('.se-menu__items'), () => this.close());
    });
    this.querySelectorAll('[data-index]').forEach((button) => button.addEventListener('click', () => { this.close(); emit(this, 'select', options[Number(button.dataset.index)]); }));
  }
}

define('se-menu', SeMenu);
