import { define, escapeHtml } from '../helpers.js';

class SeTooltip extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready || this._scheduled) return;
    this._scheduled = true;
    queueMicrotask(() => this.render());
  }
  render() {
    if (!this.isConnected || this.dataset.ready) return;
    this.dataset.ready = 'true';
    const content = this.innerHTML;
    this.innerHTML = `<span class="se-tooltip">${content}<span class="se-tooltip__bubble" role="tooltip">${escapeHtml(this.getAttribute('content') || '')}</span></span>`;
  }
}

define('se-tooltip', SeTooltip);
