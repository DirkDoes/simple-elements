import { define, emit, escapeHtml } from '../helpers.js';

export const colorPalette = ['#0f172a', '#64748b', '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#a855f7', '#ec4899'];
const palettes = {
  8: ['#ef4444', '#f97316', '#f59e0b', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'],
  16: colorPalette,
  32: ['#ffffff', '#0f172a', '#fecaca', '#ef4444', '#fed7aa', '#f97316', '#fde68a', '#f59e0b', '#fef08a', '#eab308', '#d9f99d', '#84cc16', '#bbf7d0', '#22c55e', '#a7f3d0', '#10b981', '#99f6e4', '#14b8a6', '#a5f3fc', '#06b6d4', '#bae6fd', '#0ea5e9', '#bfdbfe', '#3b82f6', '#c7d2fe', '#6366f1', '#ddd6fe', '#8b5cf6', '#e9d5ff', '#a855f7', '#fbcfe8', '#ec4899'],
};

const defaultColor = colorPalette[12];
const validColor = (value) => /^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(value || '');
const normalizeColor = (value, fallback = defaultColor) => {
  if (!validColor(value)) return fallback;
  const hex = value.toLowerCase();
  return hex.length === 4 ? `#${[...hex.slice(1)].map((part) => part + part).join('')}` : hex;
};
const hexToHsv = (hex) => {
  const [r, g, b] = [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255);
  const max = Math.max(r, g, b);
  const delta = max - Math.min(r, g, b);
  let h = 0;
  if (delta) {
    if (max === r) h = 60 * (((g - b) / delta) % 6);
    else if (max === g) h = 60 * ((b - r) / delta + 2);
    else h = 60 * ((r - g) / delta + 4);
  }
  return { h: (h + 360) % 360, s: max ? delta / max : 0, v: max };
};
const hsvToHex = ({ h, s, v }) => {
  const c = v * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = v - c;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return `#${[r, g, b].map((channel) => Math.round((channel + m) * 255).toString(16).padStart(2, '0')).join('')}`;
};

class SeColorPicker extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    this._variant = this.getAttribute('variant') === 'palette' ? 'palette' : 'gradient';
    this._mode = this.getAttribute('mode') === 'inline' ? 'inline' : 'popover';
    this._palette = palettes[this.getAttribute('size')] || colorPalette;
    const requested = normalizeColor(this.getAttribute('value'));
    this._value = this._variant === 'palette' && !this._palette.includes(requested) ? defaultColor : requested;
    this._hsv = hexToHsv(this._value);
    this.render();
    this.bind();
  }

  disconnectedCallback() { document.removeEventListener('pointerdown', this._outside); }
  get value() { return this.querySelector('[data-value-input]')?.value || this._value || ''; }
  set value(value) {
    const next = normalizeColor(value);
    this._value = this._variant === 'palette' && !(this._palette || colorPalette).includes(next) ? defaultColor : next;
    this._hsv = hexToHsv(this._value);
    if (this.isConnected) this.renderValue();
  }
  open() {
    if (!this.hasAttribute('disabled')) {
      this.querySelector('.se-color-picker__popover').hidden = false;
      this.querySelector('.se-color-picker__trigger').setAttribute('aria-expanded', 'true');
    }
  }
  close() {
    this.querySelector('.se-color-picker__popover')?.setAttribute('hidden', '');
    this.querySelector('.se-color-picker__trigger')?.setAttribute('aria-expanded', 'false');
  }

  render() {
    const id = this.getAttribute('id') || `se-color-${crypto.randomUUID()}`;
    const label = this.getAttribute('label');
    const disabled = this.hasAttribute('disabled');
    const required = this.hasAttribute('required');
    const picker = this._variant === 'palette' ? this.paletteMarkup(disabled) : this.gradientMarkup(disabled);
    const trigger = `<button class="se-control se-color-picker__trigger" type="button" ${label ? `aria-labelledby="${escapeHtml(id)}-label"` : 'aria-label="Choose color"'} aria-haspopup="dialog" aria-expanded="false"${disabled ? ' disabled' : ''}><span class="se-color-picker__swatch" data-swatch></span><span class="se-color-picker__trigger-value" data-trigger-value></span><se-icon name="chevron"></se-icon></button>`;
    const body = `<div class="se-color-picker__body">${picker}</div>`;
    const content = this._mode === 'popover' ? `${trigger}<input type="hidden" data-value-input name="${escapeHtml(this.getAttribute('name') || '')}" value="${escapeHtml(this._value)}"${disabled ? ' disabled' : ''}><div class="se-color-picker__popover" role="dialog" aria-label="Choose color" hidden>${body}</div>` : `${body}<input type="hidden" data-value-input name="${escapeHtml(this.getAttribute('name') || '')}" value="${escapeHtml(this._value)}"${disabled ? ' disabled' : ''}>`;
    const labelMarkup = label ? `<label class="se-label" id="${escapeHtml(id)}-label">${escapeHtml(label)}${required ? '<span class="se-required">*</span>' : ''}</label>` : '';
    this.innerHTML = `${labelMarkup}<div class="se-color-picker se-color-picker--${this._variant} se-color-picker--${this._mode}">${content}</div>`;
    this.renderValue();
  }

  gradientMarkup(disabled) {
    return `<div class="se-color-picker__gradient" data-gradient tabindex="0" role="slider" aria-label="Choose saturation and brightness" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(this._hsv.v * 100)}" aria-valuetext="${escapeHtml(this._value)}"></div><input class="se-color-picker__hue" data-hue type="range" min="0" max="360" value="${this._hsv.h}" aria-label="Choose hue"${disabled ? ' disabled' : ''}><div class="se-color-picker__value"><span class="se-color-picker__swatch" data-swatch></span><input class="se-control" data-hex type="text" value="${escapeHtml(this._value)}" inputmode="text" spellcheck="false" aria-label="Hex color"${disabled ? ' disabled' : ''}></div>`;
  }

  paletteMarkup(disabled) {
    return `<div class="se-color-picker__palette" role="group" aria-label="Color options">${this._palette.map((color) => `<button type="button" data-color="${color}" aria-label="${color}" aria-pressed="${color === this._value}"${disabled ? ' disabled' : ''}><span style="background:${color}"></span></button>`).join('')}</div><div class="se-color-picker__value"><span class="se-color-picker__swatch" data-swatch></span><output data-hex aria-label="Selected color"></output></div>`;
  }

  bind() {
    this._outside = (event) => { if (!this.contains(event.target)) this.close(); };
    if (this._mode === 'popover') {
      document.addEventListener('pointerdown', this._outside);
      this.querySelector('.se-color-picker__trigger').addEventListener('click', () => this.querySelector('.se-color-picker__popover').hidden ? this.open() : this.close());
    }
    const gradient = this.querySelector('[data-gradient]');
    gradient?.addEventListener('pointerdown', (event) => { this.pickPoint(event); gradient.setPointerCapture?.(event.pointerId); });
    gradient?.addEventListener('pointermove', (event) => { if (event.buttons) this.pickPoint(event); });
    gradient?.addEventListener('keydown', (event) => {
      if (this.hasAttribute('disabled')) return;
      const step = event.shiftKey ? .1 : .01;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') this._hsv.s = Math.max(0, Math.min(1, this._hsv.s + (event.key === 'ArrowRight' ? step : -step)));
      else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') this._hsv.v = Math.max(0, Math.min(1, this._hsv.v + (event.key === 'ArrowUp' ? step : -step)));
      else return;
      event.preventDefault();
      this.select(hsvToHex(this._hsv), false);
    });
    this.querySelector('[data-hue]')?.addEventListener('input', (event) => { this._hsv.h = Number(event.target.value); this.select(hsvToHex(this._hsv), false); });
    this.querySelector('[data-hex]')?.addEventListener('change', (event) => { if (validColor(event.target.value)) this.select(event.target.value, false); else this.renderValue(); });
    this.querySelectorAll('[data-color]').forEach((button) => button.addEventListener('click', () => this.select(button.dataset.color, this._mode === 'popover')));
  }

  pickPoint(event) {
    if (this.hasAttribute('disabled')) return;
    const gradient = event.currentTarget;
    const rect = gradient.getBoundingClientRect();
    this._hsv.s = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    this._hsv.v = Math.max(0, Math.min(1, 1 - (event.clientY - rect.top) / rect.height));
    this.select(hsvToHex(this._hsv), false);
  }

  select(value, close = false) {
    const next = normalizeColor(value, this._value);
    this._value = this._variant === 'palette' && !this._palette.includes(next) ? this._value : next;
    this._hsv = hexToHsv(this._value);
    this.renderValue();
    if (close) this.close();
    emit(this, 'change', { value: this.value });
  }

  renderValue() {
    const value = this._value;
    this.querySelectorAll('[data-swatch]').forEach((swatch) => { swatch.style.backgroundColor = value; });
    this.querySelector('[data-trigger-value]')?.replaceChildren(document.createTextNode(value));
    if (this.querySelector('[data-value-input]')) this.querySelector('[data-value-input]').value = value;
    const hex = this.querySelector('[data-hex]');
    if (hex) hex.matches('output') ? hex.textContent = value : hex.value = value;
    const gradient = this.querySelector('[data-gradient]');
    if (gradient) {
      gradient.style.setProperty('--se-color-hue', `${this._hsv.h}deg`);
      gradient.style.setProperty('--se-color-saturation', `${this._hsv.s * 100}%`);
      gradient.style.setProperty('--se-color-brightness', `${(1 - this._hsv.v) * 100}%`);
      gradient.setAttribute('aria-valuenow', String(Math.round(this._hsv.v * 100)));
      gradient.setAttribute('aria-valuetext', value);
    }
    const hue = this.querySelector('[data-hue]');
    if (hue) hue.value = this._hsv.h;
    this.querySelectorAll('[data-color]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.color === value)));
  }
}

define('se-color-picker', SeColorPicker);
