import { define, emit, escapeHtml } from '../helpers.js';

const tones = new Set(['gray', 'brand', 'success', 'warning', 'error', 'info', 'important']);
const icons = { gray: 'bell', brand: 'info', success: 'check', warning: 'alert', error: 'alert', info: 'info', important: 'zap' };
let order = 0;
const stackToasts = () => {
  let offset = 0;
  const toasts = [...document.querySelectorAll('se-toast[open]')].sort((left, right) => right._order - left._order);
  toasts.forEach((toast, index) => {
    toast.style.setProperty('--se-toast-offset', `${offset}px`);
    toast.style.setProperty('--se-toast-shadow', index === toasts.length - 1 ? 'var(--se-shadow-lg)' : 'none');
    offset += toast.offsetHeight + 8;
  });
};

class SeToast extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    this.render();
    if (this.hasAttribute('open')) this.open();
  }
  disconnectedCallback() { clearTimeout(this._timer); requestAnimationFrame(stackToasts); }
  render() {
    const tone = tones.has(this.getAttribute('tone')) ? this.getAttribute('tone') : 'gray';
    const message = this.getAttribute('message') || this.textContent.trim() || 'Notification';
    const icon = this.getAttribute('icon') || icons[tone];
    const action = this.getAttribute('action') || '';
    const href = this.getAttribute('href');
    const actionMarkup = action
      ? href ? `<a class="se-toast__action" href="${escapeHtml(href)}">${escapeHtml(action)}</a>` : `<button class="se-toast__action" type="button" data-action>${escapeHtml(action)}</button>`
      : '';
    this.innerHTML = `<div class="se-toast se-toast--${tone}" role="${['error', 'warning'].includes(tone) ? 'alert' : 'status'}" aria-live="${['error', 'warning'].includes(tone) ? 'assertive' : 'polite'}"><se-icon name="${escapeHtml(icon)}" aria-hidden="true"></se-icon><span class="se-toast__message">${escapeHtml(message)}</span>${actionMarkup}<button class="se-toast__dismiss" type="button" aria-label="Dismiss notification"><se-icon name="x" aria-hidden="true"></se-icon></button></div>`;
    this.querySelector('.se-toast__dismiss').addEventListener('click', () => this.close());
    this.querySelector('[data-action]')?.addEventListener('click', () => emit(this, 'action', {}));
  }
  open() {
    this._order = ++order;
    this.setAttribute('open', '');
    requestAnimationFrame(stackToasts);
    clearTimeout(this._timer);
    const duration = Number(this.getAttribute('duration') ?? 5000);
    if (Number.isFinite(duration) && duration > 0) this._timer = setTimeout(() => this.close(), duration);
  }
  close() {
    clearTimeout(this._timer);
    if (!this.hasAttribute('open')) return;
    this.removeAttribute('open');
    requestAnimationFrame(stackToasts);
    emit(this, 'close', {});
  }
}

define('se-toast', SeToast);
