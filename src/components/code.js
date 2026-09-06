import { define } from '../helpers.js';
import { highlightCode } from '../syntax.js';

class SeCode extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const source = this.textContent;
    this.innerHTML = this.hasAttribute('block')
      ? `<pre class="se-code-block"><code>${highlightCode(source, this.getAttribute('language') || '')}</code></pre>`
      : `<code class="se-code-inline">${highlightCode(source, this.getAttribute('language') || '')}</code>`;
  }
}

define('se-code', SeCode);
