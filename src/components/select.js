import { define, escapeIcon, emit, escapeHtml, parseOptions, openPopup } from '../helpers.js';

class SeSelect extends HTMLElement {
  static observedAttributes = ['empty-text'];
  attributeChangedCallback() { const empty = this.querySelector('.se-select__empty'); if (empty) empty.textContent = this.emptyText; }
  get emptyText() { return this.getAttribute('empty-text') ?? ('No options ' + (this.hasAttribute('multiple') ? 'available' : 'found') + '.'); }
  set options(value) { this._options = value; if (this.isConnected) this.render(); }
  get options() { return this._options; }
  set value(value) { this._selected = new Set((Array.isArray(value) ? value : [value]).map(String).filter(Boolean)); if (this.isConnected) this.render(); }

  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    this._selected = new Set((this.getAttribute('value') || '').split(',').filter(Boolean));
    for (const option of parseOptions(this)) if (option.selected) this._selected.add(String(option.id));
    this.render();
    this._outside = (event) => { if (!this.contains(event.target)) this.close(); };
    document.addEventListener('pointerdown', this._outside);
  }

  disconnectedCallback() { this.close(); document.removeEventListener('pointerdown', this._outside); }
  get value() { return this.hasAttribute('multiple') ? [...this._selected] : [...this._selected][0] || ''; }
  open() { if (!this.hasAttribute('disabled')) { this.querySelector('.se-select').classList.add('se-select--open'); this.querySelector('.se-select__trigger').setAttribute('aria-expanded', 'true'); this._popup?.(); this._popup = openPopup(this.querySelector('.se-select__trigger'), this.querySelector('.se-select__menu'), () => this.close(), true); } }
  close() { this._popup?.(); this._popup = null; this.querySelector('.se-select')?.classList.remove('se-select--open'); this.querySelector('.se-select__trigger')?.setAttribute('aria-expanded', 'false'); }

  render() {
    const wasOpen = Boolean(this._popup);
    const search = this.querySelector('input[type="search"]');
    const focused = search && document.activeElement === search;
    this.close();
    const options = parseOptions(this);
    const multiple = this.hasAttribute('multiple');
    this._selectionLabels ||= new Map();
    if (!this.hasAttribute('remote')) this._selectionLabels.clear();
    for (const option of options) if (this._selected?.has(String(option.id))) this._selectionLabels.set(String(option.id), option);
    for (const id of this._selectionLabels.keys()) if (!this._selected?.has(id)) this._selectionLabels.delete(id);
    const selected = [...this._selectionLabels.values()];
    const value = selected.length ? (multiple
      ? `<span class="se-select__tags">${selected.map((option) => `<span class="se-select__tag">${option.icon ? `<se-icon name="${escapeIcon(option.icon)}"></se-icon>` : ''}${escapeHtml(option.label)}${option.locked ? '<se-icon name="lock"></se-icon>' : this.hasAttribute('disabled') ? '' : `<button type="button" data-remove="${escapeHtml(option.id)}" aria-label="Remove ${escapeHtml(option.label)}"><se-icon name="x"></se-icon></button>`}</span>`).join('')}</span>`
      : `<span class="se-select__value">${selected[0].icon ? `<se-icon name="${escapeIcon(selected[0].icon)}"></se-icon>` : ''}<strong>${escapeHtml(selected[0].label)}</strong></span>`)
      : `<span class="se-select__placeholder">${escapeHtml(this.getAttribute('placeholder') || (multiple ? 'Select multiple...' : 'Choose an option...'))}</span>`;
    const hidden = selected.map((option) => `<input type="hidden" name="${escapeHtml(this.getAttribute('name') || '')}${multiple ? '[]' : ''}" value="${escapeHtml(option.id)}">`).join('');
    const available = multiple ? options.filter((option) => !this._selected.has(String(option.id))) : options;
    const disabled = this.hasAttribute('disabled');
    const clearable = !multiple && this.hasAttribute('clearable') && selected.length && !disabled;
    const trigger = multiple
      ? `<div class="se-select__trigger" role="button" tabindex="${disabled ? '-1' : '0'}" aria-haspopup="listbox" aria-expanded="false" aria-disabled="${disabled}">${value}<span class="se-select__chevron"><se-icon name="chevron"></se-icon></span></div>`
      : `<button class="se-select__trigger" type="button" aria-haspopup="listbox" aria-expanded="false"${disabled ? ' disabled' : ''}>${value}<span class="se-select__chevron"><se-icon name="chevron"></se-icon></span></button>`;
    this.innerHTML = `<div class="se-select${multiple ? ' se-select--multiple' : ''}${disabled ? ' se-select--disabled' : ''}${clearable ? ' se-select--clearable' : ''}${this.getAttribute('size') === 'small' ? ' se-select--small' : ''}"><label class="se-label">${escapeHtml(this.getAttribute('label') || '')}</label>${hidden}<div class="se-select__control">${trigger}${clearable ? `<button class="se-select__clear" type="button" aria-label="Clear ${multiple ? 'selections' : 'selection'}"><se-icon name="x"></se-icon></button>` : ''}</div><div class="se-select__menu">${this.hasAttribute('searchable') ? '<div class="se-select__search"><se-icon name="search"></se-icon><input class="se-control" type="search" placeholder="Search options..." aria-label="Search options"></div>' : ''}<div class="se-select__options" role="listbox"${multiple ? ' aria-multiselectable="true"' : ''}>${available.map((option) => `<button class="se-select__option" type="button" role="option" data-id="${escapeHtml(option.id)}" aria-selected="${this._selected.has(String(option.id))}"${option.disabled ? ' disabled' : ''}>${option.icon ? `<se-icon name="${escapeIcon(option.icon)}"></se-icon>` : ''}<span><strong>${escapeHtml(option.label)}</strong>${option.description ? `<small>${escapeHtml(option.description)}</small>` : ''}</span></button>`).join('')}<div class="se-select__empty"${available.length ? ' hidden' : ''}>${escapeHtml(this.emptyText)}</div></div></div></div>`;
    this.querySelector('.se-select__trigger').addEventListener('click', () => this.querySelector('.se-select').classList.contains('se-select--open') ? this.close() : this.open());
    if (multiple) this.querySelector('.se-select__trigger').addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); this.querySelector('.se-select__trigger').click(); }
    });
    this.querySelectorAll('[data-id]').forEach((button) => button.addEventListener('click', () => {
      if (multiple) this._selected.has(button.dataset.id) ? this._selected.delete(button.dataset.id) : this._selected.add(button.dataset.id);
      else { this._selected.clear(); this._selected.add(button.dataset.id); }
      if (!multiple) this.close();
      this.render();
      if (multiple) this.open();
      emit(this, 'change', { value: this.value, option: options.find((option) => String(option.id) === button.dataset.id) });
    }));
    this.querySelectorAll('[data-remove]').forEach((button) => button.addEventListener('click', (event) => {
      event.stopPropagation();
      const option = this._selectionLabels.get(button.dataset.remove);
      if (!option?.locked) { this._selected.delete(button.dataset.remove); this.render(); emit(this, 'change', { value: this.value }); }
    }));
    this.querySelector('.se-select__clear')?.addEventListener('click', () => {
      this._selected.clear();
      this.render();
      emit(this, 'change', { value: this.value });
    });
    if (search) this.querySelector('input[type="search"]')?.replaceWith(search);
    const input = this.querySelector('input[type="search"]');
    const filter = () => {
      const term = (input?.value || '').toLowerCase();
      let visible = 0;
      this.querySelectorAll('[data-id]').forEach(button => {
        const option = parseOptions(this).find(item => String(item.id) === button.dataset.id);
        button.hidden = !this.hasAttribute('remote') && !((option.label + ' ' + (option.description || '')).toLowerCase().includes(term));
        if (!button.hidden) visible++;
      });
      this.querySelector('.se-select__empty').hidden = visible > 0;
    };
    if (!search) input?.addEventListener('input', event => {
      if (this.hasAttribute('remote')) emit(this, 'search', { query: event.target.value });
      else filter();
    });
    filter();
    if (wasOpen) this.open();
    if (focused) input?.focus({ preventScroll: true });
  }
}

define('se-select', SeSelect);
