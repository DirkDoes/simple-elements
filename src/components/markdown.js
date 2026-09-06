import { define } from '../helpers.js';
import { renderMarkdown } from '../syntax.js';

class SeMarkdown extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    this.source = this.getAttribute('source') || this.textContent;
  }
  get source() { return this._source || ''; }
  set source(value) { this._source = String(value); this.innerHTML = renderMarkdown(this._source); }
}

define('se-markdown', SeMarkdown);
