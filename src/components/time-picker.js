import { define, emit, escapeHtml } from '../helpers.js';
import { parseTime, timeValue, wrapNumber } from '../calendar.js';

class SeTimePicker extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    this._selected = parseTime(this.getAttribute('value'));
    const now = new Date();
    this._draft = this._selected || { hour: now.getHours(), minute: now.getMinutes() };
    const id = this.getAttribute('id') || `se-time-${crypto.randomUUID()}`;
    const disabled = this.hasAttribute('disabled');
    this.innerHTML = `<label class="se-label" id="${escapeHtml(id)}-label">${escapeHtml(this.getAttribute('label') || 'Time')}${this.hasAttribute('required') ? '<span class="se-required">*</span>' : ''}</label><div class="se-time"><button class="se-control se-time__trigger" type="button" aria-labelledby="${escapeHtml(id)}-label" aria-haspopup="dialog" aria-expanded="false"${disabled ? ' disabled' : ''}><span></span><se-icon name="clock"></se-icon></button><input type="hidden" name="${escapeHtml(this.getAttribute('name') || '')}" value="${escapeHtml(this.getAttribute('value') || '')}"><div class="se-time__popover" role="dialog" aria-label="Choose time" hidden><strong class="se-time__title">Choose time</strong><div class="se-time__spinner"><label><small>Hour</small><input data-hour-input inputmode="numeric" aria-label="Hour"></label><span>:</span><label><small>Minute</small><input data-minute-input inputmode="numeric" aria-label="Minute"></label></div><div class="se-time__footer"><button type="button" data-now>Now</button><button type="button" data-clear>Clear</button></div></div></div>`;
    this._outside = (event) => { if (!this.contains(event.target)) this.close(); };
    document.addEventListener('pointerdown', this._outside);
    this.querySelector('.se-time__trigger').addEventListener('click', () => this.querySelector('.se-time__popover').hidden ? this.open() : this.close());
    this.querySelector('[data-now]').addEventListener('click', () => { const date = new Date(); this._draft = { hour: date.getHours(), minute: date.getMinutes() }; this.apply(); });
    this.querySelector('[data-clear]').addEventListener('click', () => { this._selected = null; this.querySelector('input').value = ''; this.render(); this.close(); emit(this, 'change', { value: '' }); });
    this.querySelectorAll('.se-time__spinner input').forEach((input) => {
      const part = input.hasAttribute('data-hour-input') ? 'hour' : 'minute';
      input.addEventListener('wheel', (event) => { event.preventDefault(); this.adjust(part, event.deltaY < 0 ? 1 : -1); }, { passive: false });
      input.addEventListener('keydown', (event) => { if (event.key === 'ArrowUp' || event.key === 'ArrowDown') { event.preventDefault(); this.adjust(part, event.key === 'ArrowUp' ? 1 : -1); } });
      input.addEventListener('change', () => { this._draft[part] = wrapNumber(Number.parseInt(input.value, 10) || 0, part === 'hour' ? 24 : 60); this.apply(false); });
    });
    this.render();
  }

  disconnectedCallback() { document.removeEventListener('pointerdown', this._outside); }
  get value() { return this.querySelector('input')?.value || ''; }
  set value(value) { this._selected = parseTime(value); if (this._selected) this._draft = this._selected; this.querySelector('input').value = value || ''; this.render(); }
  open() {
    this._draft = this._selected || this._draft; this.render(); this.querySelector('.se-time__popover').hidden = false; this.querySelector('.se-time__trigger').setAttribute('aria-expanded', 'true');
  }
  close() { this.querySelector('.se-time__popover').hidden = true; this.querySelector('.se-time__trigger').setAttribute('aria-expanded', 'false'); }
  apply(close = true) { this._selected = { ...this._draft }; this.querySelector('input').value = timeValue(this._selected); this.render(); if (close) this.close(); emit(this, 'change', { value: this.value }); }
  adjust(part, direction) { const step = part === 'minute' ? Math.max(1, Math.min(30, Math.round(Number(this.getAttribute('step') || 300) / 60))) : 1; this._draft[part] = wrapNumber(this._draft[part] + direction * step, part === 'hour' ? 24 : 60); this.apply(false); }

  render() {
    this.querySelector('.se-time__trigger span').textContent = this._selected ? timeValue(this._selected) : this.getAttribute('placeholder') || 'Choose a time';
    this.querySelector('[data-hour-input]').value = String(this._draft.hour).padStart(2, '0');
    this.querySelector('[data-minute-input]').value = String(this._draft.minute).padStart(2, '0');
  }
}

define('se-time-picker', SeTimePicker);
