import { define, escapeHtml } from '../helpers.js';

class SeDiffValue extends HTMLElement {
  static observedAttributes = ['before', 'after', 'variant'];
  attributeChangedCallback() { if (this._rendered && this.isConnected) this.render(); }
  connectedCallback() {
    queueMicrotask(() => { if (this.isConnected) this.render(); });
  }
  render() {
    const before = this.getAttribute('before'), after = this.getAttribute('after');
    const change = before === after ? 'unchanged' : before === null ? 'added' : after === null ? 'removed' : 'modified';
    this.dataset.change = change;
    const text = value => escapeHtml(value === '' ? 'Empty' : value);
    const part = (tag, value, label, icon) => `<${tag} aria-label="${label}: ${text(value)}"><se-icon class="se-diff-value__sign" name="${icon}" aria-hidden="true"></se-icon>${text(value)}</${tag}>`;
    const values = `<span class="se-diff-value se-diff-value--${this.getAttribute('variant') === 'stacked' ? 'stacked' : 'inline'}">${change === 'unchanged' ? text(after ?? '—') : (before !== null ? part('del', before, 'Previous', 'minus') : '') + (after !== null ? part('ins', after, 'Current', 'plus') : '')}</span>`;
    if (this._rendered) { this.querySelector('.se-diff-value').outerHTML = values; return; }
    const actions = [...this.querySelectorAll(':scope > [data-se-region="action"]')];
    this.innerHTML = actions.length ? `<span class="se-diff-value-with-actions">${values}<span class="se-diff-value__actions"></span></span>` : values;
    if (actions.length) this.querySelector('.se-diff-value__actions').append(...actions);
    this._rendered = true;
  }
}

define('se-diff-value', SeDiffValue);
