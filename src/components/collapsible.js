import { define, escapeHtml, escapeIcon } from '../helpers.js';

class SeCollapsible extends HTMLElement {
  static observedAttributes = ['open'];

  connectedCallback() {
    if (this._details || this._scheduled) return;
    this._scheduled = true;
    queueMicrotask(() => { if (this.isConnected) this.render(); });
  }
  render() {
    if (this._details) return;
    const children = [...this.childNodes];
    this.innerHTML = `<details class="se-collapsible"${this.hasAttribute('open') ? ' open' : ''}><summary><span class="se-collapsible__heading">${this.hasAttribute('icon') ? `<se-icon name="${escapeIcon(this.getAttribute('icon'))}"></se-icon>` : ''}<span>${escapeHtml(this.getAttribute('title') || 'Details')}</span></span><se-icon class="se-collapsible__chevron" name="chevron"></se-icon></summary><div class="se-collapsible__content"></div></details>`;
    this._details = this.querySelector('details');
    for (const node of children) this.querySelector(node.nodeType === 1 && node.getAttribute('data-se-region') === 'heading-end' ? '.se-collapsible__heading' : '.se-collapsible__content').append(node);
    this._details.addEventListener('toggle', () => this.toggleAttribute('open', this._details.open));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this._details) this._details.open = newValue !== null;
  }

  get open() { return this._details?.open ?? this.hasAttribute('open'); }
  set open(value) { this.toggleAttribute('open', Boolean(value)); }
}

define('se-collapsible', SeCollapsible);
