import { define, emit, escapeHtml } from '../helpers.js';
import { parseTime, timeValue } from '../calendar.js';

class SeTimePicker extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    this._selected = parseTime(this.getAttribute('value'));
    const now = new Date();
    this._draft = this._selected || { hour: now.getHours(), minute: now.getMinutes() };
    const id = this.getAttribute('id') || `se-time-${crypto.randomUUID()}`;
    const disabled = this.hasAttribute('disabled');
    this.innerHTML = `<label class="se-label" id="${escapeHtml(id)}-label">${escapeHtml(this.getAttribute('label') || 'Time')}${this.hasAttribute('required') ? '<span class="se-required">*</span>' : ''}</label><div class="se-time"><button class="se-control se-time__trigger" type="button" aria-labelledby="${escapeHtml(id)}-label" aria-haspopup="dialog" aria-expanded="false"${disabled ? ' disabled' : ''}><span></span><se-icon name="clock"></se-icon></button><input type="hidden" name="${escapeHtml(this.getAttribute('name') || '')}" value="${escapeHtml(this.getAttribute('value') || '')}"><div class="se-time__popover" role="dialog" aria-label="Choose time" hidden><strong class="se-time__title">Choose time</strong><div class="se-time__columns"><div><small>Hour</small><div class="se-time__options" data-hours></div></div><span class="se-time__separator">:</span><div><small>Minute</small><div class="se-time__options" data-minutes></div></div></div><div class="se-time__footer"><button type="button" data-now>Now</button><button type="button" data-clear>Clear</button><button type="button" data-done>Done</button></div></div></div>`;
    this._outside = (event) => { if (!this.contains(event.target)) this.close(); };
    document.addEventListener('pointerdown', this._outside);
    this.querySelector('.se-time__trigger').addEventListener('click', () => this.querySelector('.se-time__popover').hidden ? this.open() : this.close());
    this.querySelector('[data-now]').addEventListener('click', () => { const date = new Date(); this._draft = { hour: date.getHours(), minute: date.getMinutes() }; this.apply(); });
    this.querySelector('[data-clear]').addEventListener('click', () => { this._selected = null; this.querySelector('input').value = ''; this.render(); this.close(); emit(this, 'change', { value: '' }); });
    this.querySelector('[data-done]').addEventListener('click', () => this.apply());
    this.render();
  }

  disconnectedCallback() { document.removeEventListener('pointerdown', this._outside); }
  get value() { return this.querySelector('input')?.value || ''; }
  set value(value) { this._selected = parseTime(value); if (this._selected) this._draft = this._selected; this.querySelector('input').value = value || ''; this.render(); }
  open() { this._draft = this._selected || this._draft; this.render(); this.querySelector('.se-time__popover').hidden = false; this.querySelector('.se-time__trigger').setAttribute('aria-expanded', 'true'); }
  close() { this.querySelector('.se-time__popover').hidden = true; this.querySelector('.se-time__trigger').setAttribute('aria-expanded', 'false'); }
  apply() { this._selected = { ...this._draft }; this.querySelector('input').value = timeValue(this._selected); this.render(); this.close(); emit(this, 'change', { value: this.value }); }

  render() {
    const step = Math.max(1, Math.min(30, Math.round(Number(this.getAttribute('step') || 300) / 60)));
    this.querySelector('.se-time__trigger span').textContent = this._selected ? timeValue(this._selected) : this.getAttribute('placeholder') || 'Choose a time';
    this.querySelector('[data-hours]').innerHTML = Array.from({ length: 24 }, (_, hour) => `<button type="button" data-hour="${hour}"${hour === this._draft.hour ? ' aria-pressed="true"' : ''}>${String(hour).padStart(2, '0')}</button>`).join('');
    this.querySelector('[data-minutes]').innerHTML = Array.from({ length: Math.ceil(60 / step) }, (_, index) => index * step).filter((minute) => minute < 60).map((minute) => `<button type="button" data-minute="${minute}"${minute === this._draft.minute ? ' aria-pressed="true"' : ''}>${String(minute).padStart(2, '0')}</button>`).join('');
    this.querySelectorAll('[data-hour]').forEach((button) => button.addEventListener('click', () => { this._draft.hour = Number(button.dataset.hour); this.render(); }));
    this.querySelectorAll('[data-minute]').forEach((button) => button.addEventListener('click', () => { this._draft.minute = Number(button.dataset.minute); this.render(); }));
  }
}

define('se-time-picker', SeTimePicker);
