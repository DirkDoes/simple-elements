import { define, emit, escapeHtml } from '../helpers.js';
import { calendarDays, dateValue, parseDate } from '../calendar.js';

class SeDatePicker extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    this._selected = parseDate(this.getAttribute('value'));
    this._view = this._selected || new Date();
    const id = this.getAttribute('id') || `se-date-${crypto.randomUUID()}`;
    const disabled = this.hasAttribute('disabled');
    const months = Array.from({ length: 12 }, (_, month) => ({ id: month, label: new Intl.DateTimeFormat(this.getAttribute('locale') || undefined, { month: 'long' }).format(new Date(2020, month, 1)) }));
    this.innerHTML = `<label class="se-label" id="${escapeHtml(id)}-label">${escapeHtml(this.getAttribute('label') || 'Date')}${this.hasAttribute('required') ? '<span class="se-required">*</span>' : ''}</label><div class="se-date"><button class="se-control se-date__trigger" type="button" aria-labelledby="${escapeHtml(id)}-label" aria-haspopup="dialog" aria-expanded="false"${disabled ? ' disabled' : ''}><span></span><se-icon name="calendar"></se-icon></button><input type="hidden" name="${escapeHtml(this.getAttribute('name') || '')}" value="${escapeHtml(this.getAttribute('value') || '')}"><div class="se-date__popover" role="dialog" aria-label="Choose date" hidden><div class="se-date__nav"><button type="button" data-month="-1" aria-label="Previous month"><se-icon name="chevron"></se-icon></button><button class="se-date__heading" type="button" data-jump-toggle aria-expanded="false"><strong></strong></button><button type="button" data-month="1" aria-label="Next month"><se-icon name="chevron"></se-icon></button></div><div class="se-date__jump" hidden><se-select data-month-select value="${this._view.getMonth()}" options="${escapeHtml(JSON.stringify(months))}"></se-select><input data-year-input type="text" inputmode="numeric" aria-label="Year"></div><div class="se-date__week" aria-hidden="true"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div><div class="se-date__grid"></div><div class="se-date__footer"><button type="button" data-today>Today</button><button type="button" data-clear>Clear</button></div></div></div>`;
    this._outside = (event) => { if (!this.contains(event.target)) this.close(); };
    document.addEventListener('pointerdown', this._outside);
    this.querySelector('.se-date__trigger').addEventListener('click', () => this.querySelector('.se-date__popover').hidden ? this.open() : this.close());
    this.querySelectorAll('[data-month]').forEach((button) => button.addEventListener('click', () => { this._view = new Date(this._view.getFullYear(), this._view.getMonth() + Number(button.dataset.month), 1); this.renderCalendar(); }));
    this.querySelector('[data-jump-toggle]').addEventListener('click', (event) => { const jump = this.querySelector('.se-date__jump'); jump.hidden = !jump.hidden; event.currentTarget.setAttribute('aria-expanded', String(!jump.hidden)); });
    this.querySelector('[data-month-select]').addEventListener('change', (event) => { this._view = new Date(this._view.getFullYear(), Number(event.detail.value), 1); this.renderCalendar(); });
    this.querySelector('[data-year-input]').addEventListener('change', (event) => { this._view = new Date(Math.max(1, Math.min(9999, Number(event.target.value) || this._view.getFullYear())), this._view.getMonth(), 1); this.renderCalendar(); });
    this.querySelector('[data-year-input]').addEventListener('wheel', (event) => { event.preventDefault(); this._view = new Date(this._view.getFullYear() + (event.deltaY < 0 ? 1 : -1), this._view.getMonth(), 1); this.renderCalendar(); }, { passive: false });
    this.querySelector('[data-year-input]').addEventListener('keydown', (event) => { if (event.key === 'ArrowUp' || event.key === 'ArrowDown') { event.preventDefault(); this._view = new Date(this._view.getFullYear() + (event.key === 'ArrowUp' ? 1 : -1), this._view.getMonth(), 1); this.renderCalendar(); } });
    this.querySelector('[data-today]').addEventListener('click', () => this.select(new Date()));
    this.querySelector('[data-clear]').addEventListener('click', () => this.select(null));
    this.renderCalendar();
  }

  disconnectedCallback() { document.removeEventListener('pointerdown', this._outside); }
  get value() { return this.querySelector('input')?.value || ''; }
  set value(value) { this._selected = parseDate(value); if (this._selected) this._view = this._selected; this.querySelector('input').value = value || ''; this.renderCalendar(); }
  open() { this.querySelector('.se-date__popover').hidden = false; this.querySelector('.se-date__trigger').setAttribute('aria-expanded', 'true'); }
  close() { this.querySelector('.se-date__popover').hidden = true; this.querySelector('.se-date__trigger').setAttribute('aria-expanded', 'false'); }
  select(date) {
    const value = date ? dateValue(date) : '';
    if (date && ((this.getAttribute('min') && value < this.getAttribute('min')) || (this.getAttribute('max') && value > this.getAttribute('max')))) return;
    this._selected = date; this.querySelector('input').value = value; this.renderCalendar(); this.close(); emit(this, 'change', { value: this.value });
  }

  renderCalendar() {
    const locale = this.getAttribute('locale') || undefined;
    const min = this.getAttribute('min') || '';
    const max = this.getAttribute('max') || '';
    const selected = this._selected ? dateValue(this._selected) : '';
    this.querySelector('.se-date__trigger span').textContent = this._selected ? new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(this._selected) : this.getAttribute('placeholder') || 'Choose a date';
    this.querySelector('.se-date__nav strong').textContent = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(this._view);
    this.querySelector('[data-month-select]').value = this._view.getMonth();
    this.querySelector('[data-year-input]').value = String(this._view.getFullYear());
    this.querySelector('.se-date__grid').innerHTML = calendarDays(this._view.getFullYear(), this._view.getMonth()).map((date) => {
      const value = dateValue(date);
      const outside = date.getMonth() !== this._view.getMonth();
      const unavailable = (min && value < min) || (max && value > max);
      return `<button type="button" data-date="${value}"${outside ? ' data-outside' : ''}${value === dateValue(new Date()) ? ' data-today-date' : ''}${value === selected ? ' aria-pressed="true"' : ''}${unavailable ? ' disabled' : ''}>${date.getDate()}</button>`;
    }).join('');
    this.querySelectorAll('[data-date]').forEach((button) => button.addEventListener('click', () => this.select(parseDate(button.dataset.date))));
  }
}

define('se-date-picker', SeDatePicker);
