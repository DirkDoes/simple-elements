import { define, escapeHtml } from '../helpers.js';
import { highlightCode } from '../syntax.js';

class SeCodeEditor extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const value = this.getAttribute('value') || this.textContent.trim();
    const language = this.getAttribute('language') || 'javascript';
    this.innerHTML = `${this.getAttribute('label') ? `<label class="se-label">${escapeHtml(this.getAttribute('label'))}</label>` : ''}<div class="se-editor"><pre class="se-editor__lines" aria-hidden="true"></pre><pre class="se-editor__highlight" aria-hidden="true"><code></code></pre><textarea name="${escapeHtml(this.getAttribute('name') || '')}" aria-label="${escapeHtml(this.getAttribute('label') || 'Code editor')}" spellcheck="false"${this.hasAttribute('autosize') ? ' data-autosize' : ''}${this.hasAttribute('readonly') ? ' readonly' : ''}${this.hasAttribute('disabled') ? ' disabled' : ''}>${escapeHtml(value)}</textarea></div>`;
    const textarea = this.querySelector('textarea');
    const highlight = this.querySelector('.se-editor__highlight');
    const lines = this.querySelector('.se-editor__lines');
    const sync = () => {
      highlight.querySelector('code').innerHTML = `${highlightCode(textarea.value, language)}\n`;
      lines.textContent = Array.from({ length: textarea.value.split('\n').length }, (_, index) => index + 1).join('\n');
      if (textarea.dataset.autosize !== undefined) { textarea.style.height = '0px'; textarea.style.height = `${textarea.scrollHeight}px`; }
    };
    textarea.addEventListener('input', sync);
    textarea.addEventListener('scroll', () => { highlight.scrollTop = textarea.scrollTop; highlight.scrollLeft = textarea.scrollLeft; lines.scrollTop = textarea.scrollTop; });
    textarea.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') return;
      event.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const lineStart = start === end ? start : textarea.value.lastIndexOf('\n', start - 1) + 1;
      const selectedEnd = start === end ? end : end - (textarea.value[end - 1] === '\n');
      const lineEnd = start === end ? end : (textarea.value.indexOf('\n', selectedEnd) + 1 || textarea.value.length + 1) - 1;
      const replacement = start === end ? '  ' : textarea.value.slice(lineStart, lineEnd).replace(/^/gm, '  ');
      textarea.setSelectionRange(lineStart, lineEnd);
      if (!document.execCommand('insertText', false, replacement)) {
        textarea.setRangeText(replacement, lineStart, lineEnd, 'end');
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
      if (start !== end) {
        const lines = replacement.split('\n').length;
        textarea.setSelectionRange(start + 2, end + (lines * 2));
      }
      sync();
    });
    sync();
  }
  get value() { return this.querySelector('textarea')?.value || ''; }
  set value(value) { const textarea = this.querySelector('textarea'); if (textarea) { textarea.value = value; textarea.dispatchEvent(new Event('input', { bubbles: true })); } }
}

define('se-code-editor', SeCodeEditor);
