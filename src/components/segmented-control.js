import { define, emit, escapeHtml, parseOptions } from '../helpers.js';

class SeSegmentedControl extends HTMLElement {
  set options(value) { this._options = value; if (this.isConnected) this.render(); }
  get options() { return this._options; }
  get value() { return this.querySelector('input:checked')?.value || this.getAttribute('value') || ''; }
  set value(value) { this.setAttribute('value', value); if (this.isConnected) this.render(); }
  connectedCallback() { if (!this.dataset.ready) { this.dataset.ready = 'true'; this.render(); } }

  render() {
    const options = parseOptions(this);
    const requested = this.getAttribute('value');
    const selectedIndex = Math.max(0, options.findIndex((option) => String(option.id) === requested));
    const selected = options[selectedIndex];
    const suppliedName = this.getAttribute('name') || '';
    const name = escapeHtml(suppliedName || (this._groupName ||= `se-segmented-${crypto.randomUUID()}`));
    const detachedForm = suppliedName ? '' : ` form="${name}"`;
    const label = this.getAttribute('label') || '';
    const groupLabel = this.getAttribute('aria-label') || label || 'Choose an option';
    const disabled = this.hasAttribute('disabled');
    this.innerHTML = `<fieldset class="se-segmented" aria-label="${escapeHtml(groupLabel)}" style="--se-segment-count:${Math.max(1, options.length)};--se-segment-index:${selectedIndex}">${label ? `<legend class="se-segmented__label">${escapeHtml(label)}</legend>` : ''}<div class="se-segmented__options">${options.map((option, index) => { const optionLabel = option.label || option.ariaLabel || String(option.id); return `<label class="se-segmented__option"><input type="radio" name="${name}"${detachedForm} value="${escapeHtml(option.id)}"${index === selectedIndex ? ' checked' : ''}${disabled || option.disabled ? ' disabled' : ''} aria-label="${escapeHtml(optionLabel)}"><span>${option.icon ? `<se-icon name="${escapeHtml(option.icon)}"></se-icon>` : ''}${option.label ? `<strong>${escapeHtml(option.label)}</strong>` : ''}</span></label>`; }).join('')}</div></fieldset>`;
    if (!selected) this.querySelector('.se-segmented__options')?.setAttribute('hidden', '');
    this.querySelectorAll('input').forEach((input, index) => input.addEventListener('change', (event) => {
      event.stopPropagation();
      this.setAttribute('value', input.value);
      this.querySelector('.se-segmented').style.setProperty('--se-segment-index', index);
      emit(this, 'change', { value: input.value, option: options[index] });
    }));
  }
}

define('se-segmented-control', SeSegmentedControl);
