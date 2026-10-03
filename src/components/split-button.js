import { define, escapeIcon, emit, escapeHtml, parseOptions, placePopover } from '../helpers.js';

class SeSplitButton extends HTMLElement {
  set options(value) { this._options = value; if (this.isConnected) this.render(); }
  get options() { return this._options; }
  connectedCallback() {
    if (!this.dataset.ready) {
      this.dataset.ready = 'true';
      this._selected = 0;
      this._outside = event => { if (!this.contains(event.target)) this.close(); };
      this.addEventListener('keydown', event => {
        if (event.key === 'Escape' && this.querySelector('.se-split--open')) {
          event.stopPropagation();
          this.close();
          this.querySelector('.se-split__toggle').focus();
        }
      });
      this.render();
    }
  }
  disconnectedCallback() { this.close(); }
  close() {
    document.removeEventListener('pointerdown', this._outside);
    this.querySelector('.se-split')?.classList.remove('se-split--open');
    this.querySelector('.se-split__toggle')?.setAttribute('aria-expanded', 'false');
  }
  render() {
    this.close();
    const options = parseOptions(this);
    const fallback = { label: this.getAttribute('text') || this.getAttribute('label') || 'Action', icon: this.getAttribute('icon') || '' };
    const selected = this.hasAttribute('direct') ? fallback : options[this._selected] || fallback;
    const variant = this.getAttribute('variant') || 'brand';
    const disabled = this.hasAttribute('disabled');
    const label = this.getAttribute('aria-label') || selected.label || selected.icon;
    this.innerHTML = `<div class="se-split se-split--${escapeHtml(variant)}"><button class="se-button se-button--${escapeHtml(variant)}" type="${escapeHtml(this.getAttribute('type') || 'button')}"${disabled ? ' disabled' : ''}${label ? ` aria-label="${escapeHtml(label)}"` : ''}>${selected.icon ? `<se-icon name="${escapeIcon(selected.icon)}"></se-icon>` : ''}${escapeHtml(selected.label)}</button><button class="se-button se-button--${escapeHtml(variant)} se-split__toggle" type="button" aria-label="Choose action" aria-expanded="false"${disabled ? ' disabled' : ''}><se-icon name="chevron"></se-icon></button><div class="se-split__menu">${options.map((option, index) => `<button class="se-menu-item" type="button" data-index="${index}"${option.disabled ? ' disabled' : ''}>${option.icon ? `<se-icon name="${escapeIcon(option.icon)}"></se-icon>` : ''}${escapeHtml(option.label)}</button>`).join('')}</div></div>`;
    const root = this.querySelector('.se-split');
    const trigger = this.querySelector('.se-split__toggle');
    const position = () => placePopover(trigger, this.querySelector('.se-split__menu'));
    trigger.addEventListener('click', () => {
      if (root.classList.contains('se-split--open')) { this.close(); return; }
      root.classList.add('se-split--open');
      trigger.setAttribute('aria-expanded', 'true');
      position();
      document.addEventListener('pointerdown', this._outside);
    });
    root.addEventListener('pointerenter', position);
    root.addEventListener('focusin', position);
    this.querySelector('.se-split > .se-button').addEventListener('click', () => emit(this, 'action', selected));
    this.querySelectorAll('[data-index]').forEach((button) => button.addEventListener('click', () => {
      const option = options[Number(button.dataset.index)];
      if (this.hasAttribute('direct')) { this.close(); emit(this, 'action', option); return; }
      this._selected = Number(button.dataset.index);
      this.render();
      emit(this, 'change', option);
    }));
  }
}

define('se-split-button', SeSplitButton);
