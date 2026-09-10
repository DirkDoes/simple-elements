import { define, escapeHtml } from '../helpers.js';

class SeRange extends HTMLElement {
  set labels(value) { this._labels = value; if (this.isConnected) this.render(); }
  get labels() { return this._labels; }

  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    this.render();
  }

  render() {
    const min = Number(this.getAttribute('min') || 0);
    const max = Number(this.getAttribute('max') || 100);
    const requestedSteps = this.getAttribute('steps');
    const steps = requestedSteps === null || requestedSteps === '' ? 0 : Math.max(2, Number.parseInt(requestedSteps, 10) || 2);
    const step = steps && max !== min ? (max - min) / (steps - 1) : 'any';
    const decimals = Math.max(0, Math.min(10, Number.parseInt(this.getAttribute('decimals') ?? '1', 10) || 0));
    const requestedValue = Number(this.getAttribute('value') ?? 50);
    const clamp = (value) => Math.max(Math.min(min, max), Math.min(Math.max(min, max), value));
    const snap = (value) => step === 'any' ? clamp(value) : clamp(min + Math.round((clamp(value) - min) / step) * step);
    const value = snap(Number.isFinite(requestedValue) ? requestedValue : 50);
    const labels = Array.isArray(this._labels) ? this._labels : (() => { try { const parsed = JSON.parse(this.getAttribute('labels') || '[]'); return Array.isArray(parsed) ? parsed : []; } catch { return []; } })();
    const positions = Array.from({ length: steps }, (_, index) => index);
    this.innerHTML = `<div class="se-range${this.hasAttribute('fill') ? ' se-range--fill' : ''}"><div class="se-range__head"><label class="se-label">${escapeHtml(this.getAttribute('label') || 'Range')}</label><output class="se-range__value"></output></div><div class="se-range__control"><input type="range" name="${escapeHtml(this.getAttribute('name') || '')}" min="${escapeHtml(min)}" max="${escapeHtml(max)}" step="${escapeHtml(step)}" value="${escapeHtml(value)}"><div class="se-range__ticks" aria-hidden="true">${positions.map((index) => `<span style="left:${index / (steps - 1) * 100}%"></span>`).join('')}</div></div>${steps ? `<div class="se-range__labels" aria-hidden="true">${labels.slice(0, steps).map((label, index) => `<span style="left:${index / (steps - 1) * 100}%">${escapeHtml(label)}</span>`).join('')}</div>` : ''}</div>`;
    const input = this.querySelector('input');
    const range = this.querySelector('.se-range');
    const update = () => { const current = snap(Number(input.value)); input.value = current; const progress = max === min ? 0 : (current - min) / (max - min) * 100; range.style.setProperty('--se-range-progress', `${Math.max(0, Math.min(100, progress))}%`); this.querySelector('output').textContent = Number(current.toFixed(decimals)) + (this.getAttribute('suffix') || ''); };
    input.addEventListener('input', update);
    update();
  }
}

define('se-range', SeRange);
