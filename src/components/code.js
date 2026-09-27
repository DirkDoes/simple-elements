import { define } from '../helpers.js';
import { highlightCode } from '../syntax.js';

class SeCode extends HTMLElement {
  static observedAttributes = ['diff', 'language'];
  attributeChangedCallback() { if (this.dataset.ready) this.render(); }
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    this._source = this.textContent;
    this.render();
  }
  render() {
    const language = this.getAttribute('language') || '';
    const diff = this.hasAttribute('diff') || language === 'diff';
    const highlighted = highlightCode(this._source, language, diff);
    this.innerHTML = this.hasAttribute('block') || diff
      ? `<pre class="se-code-block"><code>${highlighted}</code></pre>`
      : `<code class="se-code-inline">${highlighted}</code>`;
  }
}
define('se-code', SeCode);
