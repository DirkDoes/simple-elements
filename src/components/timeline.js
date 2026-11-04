import { define, emit } from '../helpers.js';

class SeTimeline extends HTMLElement {
  static observedAttributes = ['duration', 'value', 'step', 'label', 'disabled'];
  connectedCallback() {
    if (this._track) { this.observe(); this.refresh(); return; }
    setTimeout(() => {
      if (!this.isConnected || this._track) return;
      const children = [...this.childNodes];
      this.innerHTML = '<div class="se-timeline"><output class="se-timeline__current"></output><div class="se-timeline__track"><div class="se-timeline__base"></div><div class="se-timeline__progress"></div><input type="range" min="0"></div><span class="se-timeline__end"></span></div>';
      this._track = this.querySelector('.se-timeline__track');
      this._input = this.querySelector('input');
      this._track.append(...children);
      for (const type of ['input', 'change']) this._input.addEventListener(type, event => {
        event.stopPropagation();
        this.setAttribute('value', this._input.value);
        emit(this, type, { value: this.value });
      });
      this.addEventListener('pointermove', event => {
        this.querySelectorAll('se-timeline-marker').forEach(marker => {
          const rect = marker.getBoundingClientRect();
          marker.toggleAttribute('data-near', Math.abs(event.clientX - rect.left) < 80);
        });
      });
      this.addEventListener('pointerleave', () => this.querySelectorAll('[data-near]').forEach(marker => marker.removeAttribute('data-near')));
      this.observe();
      this.refresh();
    });
  }
  observe() {
    this._observer ||= new MutationObserver(() => this.refresh());
    this._observer.observe(this, { childList: true });
    this._observer.observe(this._track, { childList: true, subtree: true, attributes: true, attributeFilter: ['start', 'end', 'at', 'variant', 'position'] });
  }
  disconnectedCallback() { this._observer?.disconnect(); }
  attributeChangedCallback() { this.refresh(); }
  get duration() { const n = Number(this.getAttribute('duration') ?? 100); return Number.isFinite(n) ? Math.max(0, n) : 100; }
  get value() { const n = Number(this.getAttribute('value') ?? 0); return Number.isFinite(n) ? Math.max(0, Math.min(this.duration, n)) : 0; }
  set value(value) { this.setAttribute('value', value); }
  format(seconds) {
    const whole = Math.floor(seconds);
    return (whole >= 3600 ? Math.floor(whole / 3600) + ':' : '') + String(Math.floor(whole / 60) % 60).padStart(whole >= 3600 ? 2 : 1, '0') + ':' + String(whole % 60).padStart(2, '0');
  }
  seek(value) {
    if (this.hasAttribute('disabled')) return;
    this.value = value;
    emit(this, 'input', { value: this.value });
    emit(this, 'change', { value: this.value });
  }
  refresh() {
    if (!this._input) return;
    for (const child of [...this.children]) {
      if (child.matches('se-timeline-range, se-timeline-marker')) this._track.append(child);
    }
    const duration = this.duration;
    this._input.max = duration;
    const step = Number(this.getAttribute('step') ?? 1);
    this._input.step = Number.isFinite(step) && step > 0 ? step : 'any';
    this._input.value = this.value;
    this._input.disabled = this.hasAttribute('disabled') || !duration;
    this._input.setAttribute('aria-label', this.getAttribute('label') || 'Playback position');
    this._input.setAttribute('aria-valuetext', this.format(this.value) + ' of ' + this.format(duration));
    this.querySelector('.se-timeline__current').textContent = this.format(this.value);
    this.querySelector('.se-timeline__end').textContent = this.format(duration);
    this.style.setProperty('--se-timeline-time-width', this.format(duration).length + 'ch');
    this.style.setProperty('--se-timeline-progress', (duration ? this.value / duration * 100 : 0) + '%');
    const percent = value => (duration ? Math.max(0, Math.min(duration, Number(value) || 0)) / duration * 100 : 0);
    for (const child of this._track.children) {
      if (child.matches('se-timeline-range')) {
        const start = percent(child.getAttribute('start'));
        const end = percent(child.getAttribute('end'));
        child.style.setProperty('--se-timeline-start', start + '%');
        child.style.setProperty('--se-timeline-width', Math.max(0, end - start) + '%');
      }
      if (child.matches('se-timeline-marker')) {
        child.style.setProperty('--se-timeline-start', percent(child.getAttribute('at')) + '%');
        child.querySelector('button')?.toggleAttribute('disabled', this.hasAttribute('disabled'));
        if (this.hasAttribute('disabled')) child.close?.();
      }
    }
  }
}
define('se-timeline', SeTimeline);
