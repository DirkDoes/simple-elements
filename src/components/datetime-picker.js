import { define, emit, escapeHtml } from '../helpers.js';
import { calendarDays, dateValue, parseDate, parseTime, timeValue, wrapNumber } from '../calendar.js';

class SeDatetimePicker extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const variant = this.getAttribute('variant') || 'seperated';
    if (variant === 'combined') return this.connectSingle();
    const [date = '', time = ''] = (this.getAttribute('value') || '').split('T');
    const joined = variant === 'joined';
    this.innerHTML = `<fieldset class="se-datetime${joined ? ' se-datetime--joined' : ' se-datetime--part-labels'}"${this.hasAttribute('disabled') ? ' disabled' : ''}><legend class="se-label">${escapeHtml(this.getAttribute('label') || 'Date and time')}${this.hasAttribute('required') ? '<span class="se-required">*</span>' : ''}</legend><div class="se-datetime__fields"><se-date-picker label="Date" value="${escapeHtml(date)}"${this.hasAttribute('min') ? ` min="${escapeHtml(this.getAttribute('min').split('T')[0])}"` : ''}${this.hasAttribute('max') ? ` max="${escapeHtml(this.getAttribute('max').split('T')[0])}"` : ''}></se-date-picker><se-time-picker label="Time" value="${escapeHtml(time)}" step="${escapeHtml(this.getAttribute('step') || '300')}"></se-time-picker></div><input type="hidden" name="${escapeHtml(this.getAttribute('name') || '')}" value="${escapeHtml(this.getAttribute('value') || '')}"></fieldset>`;
    const datePicker = this.querySelector('se-date-picker');
    const timePicker = this.querySelector('se-time-picker');
    datePicker.addEventListener('change', (event) => { if (event.target !== datePicker) return; this.syncParts(); if (joined && datePicker.value) timePicker.open(); });
    timePicker.addEventListener('change', () => this.syncParts());
  }

  connectSingle() {
    const [date = '', time = ''] = (this.getAttribute('value') || '').split('T');
    const now = new Date();
    this._date = parseDate(date);
    this._time = parseTime(time);
    this._draftTime = this._time || { hour: now.getHours(), minute: now.getMinutes() };
    this._view = this._date || now;
    this._mode = 'date';
    const id = this.getAttribute('id') || `se-datetime-${crypto.randomUUID()}`;
    const months = Array.from({ length: 12 }, (_, month) => ({ id: month, label: new Intl.DateTimeFormat(this.getAttribute('locale') || undefined, { month: 'long' }).format(new Date(2020, month, 1)) }));
    this.innerHTML = `<label class="se-label" id="${escapeHtml(id)}-label">${escapeHtml(this.getAttribute('label') || 'Date and time')}${this.hasAttribute('required') ? '<span class="se-required">*</span>' : ''}</label><div class="se-datetime-single"><button class="se-control se-datetime-single__trigger" type="button" aria-labelledby="${escapeHtml(id)}-label" aria-haspopup="dialog" aria-expanded="false"${this.hasAttribute('disabled') ? ' disabled' : ''}><span></span><se-icon name="calendar"></se-icon></button><input type="hidden" name="${escapeHtml(this.getAttribute('name') || '')}" value="${escapeHtml(this.getAttribute('value') || '')}"><div class="se-datetime-single__popover" role="dialog" aria-label="Choose date and time" hidden><strong class="se-datetime-single__title"></strong><div data-date-panel><div class="se-date__nav"><button type="button" data-month="-1" aria-label="Previous month"><se-icon name="chevron"></se-icon></button><button class="se-date__heading" type="button" data-jump-toggle aria-expanded="false"><strong></strong></button><button type="button" data-month="1" aria-label="Next month"><se-icon name="chevron"></se-icon></button></div><div class="se-date__jump" hidden><se-select data-month-select value="${this._view.getMonth()}" options="${escapeHtml(JSON.stringify(months))}"></se-select><input data-year-input type="text" inputmode="numeric" aria-label="Year"></div><div class="se-date__week" aria-hidden="true"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div><div class="se-date__grid"></div><div class="se-datetime-single__footer"><button type="button" data-today>Today</button><button type="button" data-mode="time" aria-label="Choose time"><se-icon name="clock"></se-icon></button><span></span></div></div><div data-time-panel hidden><div class="se-time__spinner"><label><small>Hour</small><input data-hour-input inputmode="numeric" aria-label="Hour"></label><span>:</span><label><small>Minute</small><input data-minute-input inputmode="numeric" aria-label="Minute"></label></div><div class="se-datetime-single__footer"><button type="button" data-now>Now</button><button type="button" data-mode="date" aria-label="Choose date"><se-icon name="calendar"></se-icon></button><button type="button" data-done>Done</button></div></div></div></div>`;
    this._outside = (event) => { if (!this.contains(event.target)) this.close(); };
    document.addEventListener('pointerdown', this._outside);
    this.querySelector('.se-datetime-single__trigger').addEventListener('click', () => this.querySelector('.se-datetime-single__popover').hidden ? this.open() : this.close());
    this.querySelectorAll('[data-month]').forEach((button) => button.addEventListener('click', () => { this._view = new Date(this._view.getFullYear(), this._view.getMonth() + Number(button.dataset.month), 1); this.renderSingle(); }));
    this.querySelector('[data-jump-toggle]').addEventListener('click', (event) => { const jump = this.querySelector('.se-date__jump'); jump.hidden = !jump.hidden; event.currentTarget.setAttribute('aria-expanded', String(!jump.hidden)); });
    this.querySelector('[data-month-select]').addEventListener('change', (event) => { this._view = new Date(this._view.getFullYear(), Number(event.detail.value), 1); this.renderSingle(); });
    this.querySelector('[data-year-input]').addEventListener('change', (event) => { this._view = new Date(Math.max(1, Math.min(9999, Number(event.target.value) || this._view.getFullYear())), this._view.getMonth(), 1); this.renderSingle(); });
    this.querySelector('[data-year-input]').addEventListener('wheel', (event) => { event.preventDefault(); this._view = new Date(this._view.getFullYear() + (event.deltaY < 0 ? 1 : -1), this._view.getMonth(), 1); this.renderSingle(); }, { passive: false });
    this.querySelector('[data-year-input]').addEventListener('keydown', (event) => { if (event.key === 'ArrowUp' || event.key === 'ArrowDown') { event.preventDefault(); this._view = new Date(this._view.getFullYear() + (event.key === 'ArrowUp' ? 1 : -1), this._view.getMonth(), 1); this.renderSingle(); } });
    this.querySelectorAll('[data-mode]').forEach((button) => button.addEventListener('click', () => this.setMode(button.dataset.mode)));
    this.querySelector('[data-today]').addEventListener('click', () => { const current = new Date(); this._date = current; this._time = { hour: current.getHours(), minute: current.getMinutes() }; this._draftTime = { ...this._time }; this._view = current; this.syncSingle(); this.setMode('time'); });
    this.querySelector('[data-now]').addEventListener('click', () => { const current = new Date(); this._time = { hour: current.getHours(), minute: current.getMinutes() }; this._draftTime = { ...this._time }; this.syncSingle(); });
    this.querySelector('[data-done]').addEventListener('click', () => this.close());
    this.querySelectorAll('.se-time__spinner input').forEach((input) => {
      const part = input.hasAttribute('data-hour-input') ? 'hour' : 'minute';
      input.addEventListener('wheel', (event) => { event.preventDefault(); this.adjustSingleTime(part, event.deltaY < 0 ? 1 : -1); }, { passive: false });
      input.addEventListener('keydown', (event) => { if (event.key === 'ArrowUp' || event.key === 'ArrowDown') { event.preventDefault(); this.adjustSingleTime(part, event.key === 'ArrowUp' ? 1 : -1); } });
      input.addEventListener('change', () => { this._draftTime[part] = wrapNumber(Number.parseInt(input.value, 10) || 0, part === 'hour' ? 24 : 60); this._time = { ...this._draftTime }; this.syncSingle(); });
    });
    this.renderSingle();
  }

  disconnectedCallback() { document.removeEventListener('pointerdown', this._outside); }
  get output() { return this.matches('[variant="combined"]') ? this.querySelector(':scope > .se-datetime-single > input') : this.querySelector(':scope > fieldset > input'); }
  get value() { return this.output?.value || ''; }
  set value(value) { if (this.matches('[variant="combined"]')) { const [date = '', time = ''] = (value || '').split('T'); this._date = parseDate(date); this._time = parseTime(time); if (this._date) this._view = this._date; if (this._time) this._draftTime = this._time; this.syncSingle(false); } else { const [date = '', time = ''] = (value || '').split('T'); this.querySelector('se-date-picker').value = date; this.querySelector('se-time-picker').value = time; this.syncParts(false); } }
  syncParts(notify = true) { const date = this.querySelector('se-date-picker').value; const time = this.querySelector('se-time-picker').value; this.output.value = date && time ? `${date}T${time}` : ''; if (notify) emit(this, 'change', { value: this.value }); }
  open() { this.querySelector('.se-datetime-single__popover').hidden = false; this.querySelector('.se-datetime-single__trigger').setAttribute('aria-expanded', 'true'); }
  close() { this.querySelector('.se-datetime-single__popover').hidden = true; this.querySelector('.se-date__jump').hidden = true; this.querySelector('[data-jump-toggle]').setAttribute('aria-expanded', 'false'); this.querySelector('[data-month-select]')?.close(); this.querySelector('.se-datetime-single__trigger').setAttribute('aria-expanded', 'false'); }
  syncSingle(notify = true) { this.output.value = this._date && this._time ? `${dateValue(this._date)}T${timeValue(this._time)}` : ''; this.renderSingle(); if (notify) emit(this, 'change', { value: this.value }); }
  setMode(mode) {
    const popover = this.querySelector('.se-datetime-single__popover');
    const start = popover.offsetHeight;
    this._mode = mode; this.renderSingle();
    popover.style.height = 'auto';
    const end = popover.offsetHeight;
    popover.style.height = `${start}px`;
    popover.offsetHeight;
    requestAnimationFrame(() => { popover.style.height = `${end}px`; });
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(() => { popover.style.height = ''; }, 220);
  }
  adjustSingleTime(part, direction) { const step = part === 'minute' ? Math.max(1, Math.min(30, Math.round(Number(this.getAttribute('step') || 300) / 60))) : 1; this._draftTime[part] = wrapNumber(this._draftTime[part] + direction * step, part === 'hour' ? 24 : 60); this._time = { ...this._draftTime }; this.syncSingle(); }
  selectSingleDate(date) { this._date = date; this._view = date; this.syncSingle(); this.setMode('time'); }

  renderSingle() {
    const locale = this.getAttribute('locale') || undefined;
    const selected = this._date ? dateValue(this._date) : '';
    const min = this.getAttribute('min')?.split('T')[0] || '';
    const max = this.getAttribute('max')?.split('T')[0] || '';
    this.querySelector('.se-datetime-single__trigger span').textContent = this._date && this._time ? `${new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(this._date)} · ${timeValue(this._time)}` : this.getAttribute('placeholder') || 'Choose date and time';
    this.querySelector('.se-datetime-single__title').textContent = this._mode === 'date' ? '' : 'Choose time';
    this.querySelector('[data-date-panel]').hidden = this._mode !== 'date';
    this.querySelector('[data-time-panel]').hidden = this._mode !== 'time';
    this.querySelector('.se-date__nav strong').textContent = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(this._view);
    this.querySelector('[data-month-select]').value = this._view.getMonth();
    this.querySelector('[data-year-input]').value = String(this._view.getFullYear());
    this.querySelector('.se-date__grid').innerHTML = calendarDays(this._view.getFullYear(), this._view.getMonth()).map((date) => { const value = dateValue(date); const unavailable = (min && value < min) || (max && value > max); return `<button type="button" data-date="${value}"${date.getMonth() !== this._view.getMonth() ? ' data-outside' : ''}${value === dateValue(new Date()) ? ' data-today-date' : ''}${value === selected ? ' aria-pressed="true"' : ''}${unavailable ? ' disabled' : ''}>${date.getDate()}</button>`; }).join('');
    this.querySelectorAll('[data-date]').forEach((button) => button.addEventListener('click', () => this.selectSingleDate(parseDate(button.dataset.date))));
    this.querySelector('[data-hour-input]').value = String(this._draftTime.hour).padStart(2, '0');
    this.querySelector('[data-minute-input]').value = String(this._draftTime.minute).padStart(2, '0');
  }
}

define('se-datetime-picker', SeDatetimePicker);
