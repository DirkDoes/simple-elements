import { define } from '../helpers.js';

class SeProgressRing extends HTMLElement {
  static observedAttributes = ['value', 'label', 'show-value', 'size'];
  get value() {
    const number = Number(this.getAttribute('value'));
    return Number.isFinite(number) ? Math.max(0, Math.min(100, number)) : 0;
  }
  set value(value) { this.setAttribute('value', value); }
  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  render() {
    if (!this.querySelector('.se-progress-ring')) {
      const id = `se-progress-ring-${crypto.randomUUID()}`;
      this.innerHTML = `<span class="se-tooltip"><span class="se-progress-ring" role="meter" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-describedby="${id}"><svg viewBox="0 0 24 24" aria-hidden="true"><g class="se-progress-ring__round"><circle cx="12" cy="12" r="9" pathLength="100"></circle><circle class="se-progress-ring__value" cx="12" cy="12" r="9" pathLength="100"></circle></g><g class="se-progress-ring__square"><path d="M12 3H21V21H3V3H12" pathLength="100"></path><path class="se-progress-ring__value" d="M12 3H21V21H3V3H12" pathLength="100"></path></g></svg><span class="se-progress-ring__text" aria-hidden="true"></span></span><span class="se-tooltip__bubble" role="tooltip" id="${id}"></span></span>`;
      const tooltip = this.querySelector('[role="tooltip"]');
      this.addEventListener('keydown', event => { if (event.key === 'Escape') tooltip.hidden = true; });
      this.addEventListener('pointerenter', () => { tooltip.hidden = false; });
      this.addEventListener('focusin', () => { tooltip.hidden = false; });
    }
    const value = this.value;
    const label = this.getAttribute('label') || 'Progress';
    const size = ['small', 'medium', 'large'].includes(this.getAttribute('size')) ? this.getAttribute('size') : 'medium';
    const ring = this.querySelector('.se-progress-ring');
    const percentage = `${Number(value.toFixed(1))}%`;
    ring.className = `se-progress-ring se-progress-ring--${size}`;
    ring.setAttribute('aria-label', label);
    ring.setAttribute('aria-valuenow', value);
    ring.setAttribute('aria-valuetext', percentage);
    ring.toggleAttribute('data-empty', value === 0);
    ring.style.setProperty('--se-progress-value', value);
    const mix = value <= 50 ? value * 2 : (value - 50) * 2;
    const from = value <= 50 ? 'low' : 'middle';
    const to = value <= 50 ? 'middle' : 'high';
    ring.style.setProperty('--se-progress-color', `color-mix(in srgb, var(--se-progress-${from}) ${100 - mix}%, var(--se-progress-${to}) ${mix}%)`);
    const text = this.querySelector('.se-progress-ring__text');
    text.textContent = percentage;
    text.hidden = !this.hasAttribute('show-value');
    this.querySelector('[role="tooltip"]').textContent = `${label}: ${percentage}`;
  }
}

define('se-progress-ring', SeProgressRing);
