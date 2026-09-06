import { define, emit, escapeHtml, parseOptions } from '../helpers.js';

class SeSelect extends HTMLElement {
  set options(value) { this._options = value; if (this.isConnected) this.render(); }
  get options() { return this._options; }

  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    this._selected = new Set((this.getAttribute('value') || '').split(',').filter(Boolean));
    for (const option of parseOptions(this)) if (option.selected) this._selected.add(String(option.id));
    this.render();
    this._outside = (event) => { if (!this.contains(event.target)) this.close(); };
    document.addEventListener('pointerdown', this._outside);
  }

  disconnectedCallback() { document.removeEventListener('pointerdown', this._outside); }
  get value() { return this.hasAttribute('multiple') ? [...this._selected] : [...this._selected][0] || ''; }
  open() { if (!this.hasAttribute('disabled')) { this.querySelector('.se-select').classList.add('se-select--open'); this.querySelector('.se-select__trigger').setAttribute('aria-expanded', 'true'); } }
  close() { this.querySelector('.se-select')?.classList.remove('se-select--open'); this.querySelector('.se-select__trigger')?.setAttribute('aria-expanded', 'false'); }

  render() {
    const options = parseOptions(this);
    const multiple = this.hasAttribute('multiple');
    const selected = options.filter((option) => this._selected?.has(String(option.id)));
    const value = selected.length ? (multiple
      ? `<span class="se-select__tags">${selected.map((option) => `<span class="se-select__tag">${option.icon ? `<se-icon name="${escapeHtml(option.icon)}"></se-icon>` : ''}${escapeHtml(option.label)}${option.locked ? '<se-icon name="lock"></se-icon>' : this.hasAttribute('disabled') ? '' : `<button type="button" data-remove="${escapeHtml(option.id)}" aria-label="Remove ${escapeHtml(option.label)}"><se-icon name="x"></se-icon></button>`}</span>`).join('')}</span>`
      : `<span class="se-select__value">${selected[0].icon ? `<se-icon name="${escapeHtml(selected[0].icon)}"></se-icon>` : ''}<strong>${escapeHtml(selected[0].label)}</strong></span>`)
      : `<span class="se-select__placeholder">${escapeHtml(this.getAttribute('placeholder') || (multiple ? 'Select multiple...' : 'Choose an option...'))}</span>`;
    const hidden = selected.map((option) => `<input type="hidden" name="${escapeHtml(this.getAttribute('name') || '')}${multiple ? '[]' : ''}" value="${escapeHtml(option.id)}">`).join('');
    const available = multiple ? options.filter((option) => !this._selected.has(String(option.id))) : options;
    const disabled = this.hasAttribute('disabled');
    const trigger = multiple
      ? `<div class="se-select__trigger" role="button" tabindex="${disabled ? '-1' : '0'}" aria-haspopup="listbox" aria-expanded="false" aria-disabled="${disabled}">${value}<span class="se-select__chevron"><se-icon name="chevron"></se-icon></span></div>`
      : `<button class="se-select__trigger" type="button" aria-haspopup="listbox" aria-expanded="false"${disabled ? ' disabled' : ''}>${value}<span class="se-select__chevron"><se-icon name="chevron"></se-icon></span></button>`;
    this.innerHTML = `<div class="se-select${multiple ? ' se-select--multiple' : ''}${disabled ? ' se-select--disabled' : ''}"><label class="se-label">${escapeHtml(this.getAttribute('label') || '')}</label>${hidden}${trigger}<div class="se-select__menu">${this.hasAttribute('searchable') ? '<div class="se-select__search"><se-icon name="search"></se-icon><input class="se-control" type="search" placeholder="Search options..." aria-label="Search options"></div>' : ''}<div class="se-select__options" role="listbox"${multiple ? ' aria-multiselectable="true"' : ''}>${available.map((option) => `<button class="se-select__option" type="button" role="option" data-id="${escapeHtml(option.id)}" aria-selected="${this._selected.has(String(option.id))}"${option.disabled ? ' disabled' : ''}>${option.icon ? `<se-icon name="${escapeHtml(option.icon)}"></se-icon>` : ''}<span><strong>${escapeHtml(option.label)}</strong>${option.description ? `<small>${escapeHtml(option.description)}</small>` : ''}</span></button>`).join('')}<div class="se-select__empty"${available.length ? ' hidden' : ''}>No options ${multiple ? 'available' : 'found'}.</div></div></div></div>`;
    this.querySelector('.se-select__trigger').addEventListener('click', () => this.querySelector('.se-select').classList.contains('se-select--open') ? this.close() : this.open());
    if (multiple) this.querySelector('.se-select__trigger').addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); this.querySelector('.se-select__trigger').click(); }
    });
    this.querySelectorAll('[data-id]').forEach((button) => button.addEventListener('click', () => {
      if (multiple) this._selected.has(button.dataset.id) ? this._selected.delete(button.dataset.id) : this._selected.add(button.dataset.id);
      else { this._selected.clear(); this._selected.add(button.dataset.id); }
      this.render();
      if (multiple) this.open();
      emit(this, 'change', { value: this.value, option: options.find((option) => String(option.id) === button.dataset.id) });
    }));
    this.querySelectorAll('[data-remove]').forEach((button) => button.addEventListener('click', (event) => {
      event.stopPropagation();
      const option = options.find((item) => String(item.id) === button.dataset.remove);
      if (!option?.locked) { this._selected.delete(button.dataset.remove); this.render(); emit(this, 'change', { value: this.value }); }
    }));
    this.querySelector('input[type="search"]')?.addEventListener('input', (event) => {
      const term = event.target.value.toLowerCase();
      let visible = 0;
      this.querySelectorAll('[data-id]').forEach((button) => {
        const option = options.find((item) => String(item.id) === button.dataset.id);
        button.hidden = !`${option.label} ${option.description || ''}`.toLowerCase().includes(term);
        if (!button.hidden) visible += 1;
      });
      this.querySelector('.se-select__empty').hidden = visible > 0;
    });
  }
}

define('se-select', SeSelect);
