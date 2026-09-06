import { define, emit, escapeHtml } from '../helpers.js';

class SeDatetimePicker extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const [date = '', time = ''] = (this.getAttribute('value') || '').split('T');
    const disabled = this.hasAttribute('disabled');
    const joined = this.getAttribute('variant') === 'joined';
    const partLabels = this.hasAttribute('show-part-labels');
    this.innerHTML = `<fieldset class="se-datetime${joined ? ' se-datetime--joined' : ''}${partLabels ? ' se-datetime--part-labels' : ''}"${disabled ? ' disabled' : ''}><legend class="se-label">${escapeHtml(this.getAttribute('label') || 'Date and time')}${this.hasAttribute('required') ? '<span class="se-required">*</span>' : ''}</legend><div class="se-datetime__fields"><se-date-picker label="Date" value="${escapeHtml(date)}"${this.hasAttribute('min') ? ` min="${escapeHtml(this.getAttribute('min').split('T')[0])}"` : ''}${this.hasAttribute('max') ? ` max="${escapeHtml(this.getAttribute('max').split('T')[0])}"` : ''}></se-date-picker><se-time-picker label="Time" value="${escapeHtml(time)}" step="${escapeHtml(this.getAttribute('step') || '300')}"></se-time-picker></div><input type="hidden" name="${escapeHtml(this.getAttribute('name') || '')}" value="${escapeHtml(this.getAttribute('value') || '')}"></fieldset>`;
    this.querySelectorAll('se-date-picker, se-time-picker').forEach((picker) => picker.addEventListener('change', () => this.sync()));
  }

  get value() { return this.querySelector('input')?.value || ''; }
  set value(value) { const [date = '', time = ''] = (value || '').split('T'); this.querySelector('se-date-picker').value = date; this.querySelector('se-time-picker').value = time; this.sync(false); }
  sync(notify = true) { const date = this.querySelector('se-date-picker').value; const time = this.querySelector('se-time-picker').value; this.querySelector('input').value = date && time ? `${date}T${time}` : ''; if (notify) emit(this, 'change', { value: this.value }); }
}

define('se-datetime-picker', SeDatetimePicker);
