import { define, escapeHtml } from '../helpers.js';
import { compareLines, highlightCode } from '../syntax.js';

class SeDiff extends HTMLElement {
  static observedAttributes = ['before', 'after', 'language', 'variant', 'title', 'before-label', 'after-label'];
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  connectedCallback() { this.render(); }
  get before() { return this.getAttribute('before') || ''; }
  set before(value) { this.setAttribute('before', value ?? ''); }
  get after() { return this.getAttribute('after') || ''; }
  set after(value) { this.setAttribute('after', value ?? ''); }
  render() {
    const rows = compareLines(this.before, this.after);
    const language = this.getAttribute('language') || '';
    const split = this.getAttribute('variant') !== 'unified';
    const oldLabel = escapeHtml(this.getAttribute('before-label') || 'Previous');
    const newLabel = escapeHtml(this.getAttribute('after-label') || 'Current');
    const title = escapeHtml(this.getAttribute('title') || 'Changes');
    const added = rows.filter(row => row.type === 'added').length;
    const removed = rows.filter(row => row.type === 'removed').length;
    const sign = type => type === 'context' ? '' : `<se-icon name="${type === 'added' ? 'plus' : 'minus'}" aria-hidden="true"></se-icon>`;
    const code = row => `<span class="se-diff__sign" aria-label="${row.type === 'added' ? 'Added' : row.type === 'removed' ? 'Removed' : 'Unchanged'}">${sign(row.type)}</span><code>${highlightCode(row.text, language)}</code>`;
    const cell = (row, side) => row
      ? `<td class="se-diff__cell se-diff__cell--${row.type}"><span class="se-diff__number" aria-hidden="true">${row[side]}</span>${code(row)}</td>`
      : '<td class="se-diff__cell se-diff__cell--empty" aria-label="No corresponding line"></td>';
    let body = '';
    if (split) {
      for (let index = 0; index < rows.length;) {
        if (rows[index].type === 'context') {
          const row = rows[index++]; body += `<tr>${cell(row, 'oldLine')}${cell(row, 'newLine')}</tr>`;
          continue;
        }
        const oldRows = [], newRows = [];
        while (index < rows.length && rows[index].type !== 'context') {
          const row = rows[index++]; (row.type === 'removed' ? oldRows : newRows).push(row);
        }
        for (let pair = 0; pair < Math.max(oldRows.length, newRows.length); pair++) body += `<tr>${cell(oldRows[pair], 'oldLine')}${cell(newRows[pair], 'newLine')}</tr>`;
      }
    } else body = rows.map(row => `<tr class="se-diff__row--${row.type}"><td class="se-diff__number" aria-hidden="true">${row.oldLine ?? ''}</td><td class="se-diff__number" aria-hidden="true">${row.newLine ?? ''}</td><td class="se-diff__cell">${code(row)}</td></tr>`).join('');
    this.innerHTML = `<section class="se-diff" title=""><header class="se-diff__heading"><strong>${title}</strong><span class="se-diff__counts"><se-badge tone="success" icon="plus" text="${added}" aria-label="${added} added lines"></se-badge><se-badge tone="error" icon="minus" text="${removed}" aria-label="${removed} removed lines"></se-badge></span></header><div class="se-diff__scroll" tabindex="0" aria-label="Scrollable code comparison">${rows.length ? `<table class="se-diff__table se-diff__table--${split ? 'split' : 'unified'}" aria-label="${title}"><thead><tr>${split ? `<th scope="col">${oldLabel}</th><th scope="col">${newLabel}</th>` : `<th scope="col" colspan="3">${oldLabel} → ${newLabel}</th>`}</tr></thead><tbody>${body}</tbody></table>` : '<p class="se-diff__empty">No content to compare.</p>'}</div></section>`;
  }
}
define('se-diff', SeDiff);
