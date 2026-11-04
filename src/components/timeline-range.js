import { define } from '../helpers.js';

class SeTimelineRange extends HTMLElement {
  static observedAttributes = ['label', 'start', 'end'];
  connectedCallback() { this.update(); }
  attributeChangedCallback() { if (this.isConnected) this.update(); }
  update() {
    this.setAttribute('role', 'img');
    this.setAttribute('aria-label', (this.getAttribute('label') || 'Range') + ': ' + (this.getAttribute('start') || 0) + '–' + (this.getAttribute('end') || 0) + ' seconds');
    this.setAttribute('data-label', this.getAttribute('label') || 'Range');
  }
}
define('se-timeline-range', SeTimelineRange);
