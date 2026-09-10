import { define, escapeHtml } from '../helpers.js';
import { highlightCode } from '../syntax.js';

const wysiwygInlineMarkdown = (value) => escapeHtml(value)
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/__([^_]+)__/g, '<strong>$1</strong>')
  .replace(/\*([^*]+)\*/g, '<em>$1</em>')
  .replace(/_([^_]+)_/g, '<em>$1</em>');

const wysiwygMarkdownToHtml = (source) => {
  const lines = source.split(/\r?\n/);
  const html = [];
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.trim()) continue;
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) { html.push(`<h${heading[1].length}>${wysiwygInlineMarkdown(heading[2])}</h${heading[1].length}>`); continue; }
    const list = /^\s*([-*]|\d+\.)\s+/.exec(line);
    if (list) {
      const ordered = /\d/.test(list[1]);
      const items = [];
      const pattern = ordered ? /^\s*\d+\.\s+/ : /^\s*[-*]\s+/;
      do { items.push(`<li>${wysiwygInlineMarkdown(lines[index].replace(pattern, ''))}</li>`); index += 1; } while (index < lines.length && pattern.test(lines[index]));
      index -= 1;
      html.push(`<${ordered ? 'ol' : 'ul'}>${items.join('')}</${ordered ? 'ol' : 'ul'}>`);
      continue;
    }
    if (/^>\s?/.test(line)) { html.push(`<blockquote>${wysiwygInlineMarkdown(line.replace(/^>\s?/, ''))}</blockquote>`); continue; }
    html.push(`<p>${wysiwygInlineMarkdown(line)}</p>`);
  }
  return html.join('');
};

const wysiwygHtmlToMarkdown = (html) => {
  const template = document.createElement('template');
  template.innerHTML = html
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, level, content) => `${'#'.repeat(Number(level))} ${content}\n\n`)
    .replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**')
    .replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, '*$2*')
    .replace(/<u[^>]*>([\s\S]*?)<\/u>/gi, '__$1__')
    .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, items) => `${items.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')}\n`)
    .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, items) => { let index = 0; return `${items.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_item, content) => `${++index}. ${content}\n`)}\n`; })
    .replace(/<br\s*\/?>(?=.)/gi, '\n')
    .replace(/<\/(p|div|blockquote)>/gi, '\n\n')
    .replace(/<[^>]+>/g, '');
  return template.content.textContent
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

class SeWysiwyg extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    const initial = this.getAttribute('value') || this.innerHTML.trim();
    this._formatMode = ['html', 'markdown', 'both'].includes(this.getAttribute('format')) ? this.getAttribute('format') : 'markdown';
    this._format = this._formatMode === 'html' ? 'html' : 'markdown';
    this._html = this._format === 'markdown' ? wysiwygMarkdownToHtml(initial) : initial;
    this._sourceVisible = false;
    this.dataset.ready = 'true';
    const controls = [['bold', 'bold', 'Bold'], ['italic', 'italic', 'Italic'], ['underline', 'underline', 'Underline'], ['insertUnorderedList', 'list', 'Bulleted list'], ['insertOrderedList', 'list-ordered', 'Numbered list']];
    this.innerHTML = `${this.getAttribute('label') ? `<label class="se-label">${escapeHtml(this.getAttribute('label'))}</label>` : ''}<div class="se-wysiwyg"><div class="se-wysiwyg__toolbar">${controls.map(([command, icon, label]) => `<button type="button" data-command="${command}" aria-label="${label}"${this.hasAttribute('disabled') ? ' disabled' : ''}><se-icon name="${icon}"></se-icon></button>`).join('')}<span class="se-wysiwyg__spacer"></span>${this._formatMode === 'both' ? `<se-select data-format size="small" value="markdown" aria-label="Source format" options='[{"id":"html","label":"HTML"},{"id":"markdown","label":"Markdown"}]'${this.hasAttribute('disabled') ? ' disabled' : ''}></se-select>` : ''}<button type="button" data-source-toggle aria-label="Show source" aria-pressed="false"${this.hasAttribute('disabled') ? ' disabled' : ''}><se-icon name="code"></se-icon></button></div><div class="se-wysiwyg__editor" contenteditable="${!this.hasAttribute('disabled')}" role="textbox" aria-multiline="true" data-placeholder="${escapeHtml(this.getAttribute('placeholder') || 'Start writing...')}">${this._html}</div><div class="se-wysiwyg__source-wrap" hidden><pre aria-hidden="true"><code></code></pre><textarea class="se-wysiwyg__source" spellcheck="false"${this.hasAttribute('disabled') ? ' disabled' : ''}></textarea></div><textarea hidden name="${escapeHtml(this.getAttribute('name') || '')}" data-value></textarea></div>`;
    const editor = this.querySelector('.se-wysiwyg__editor');
    const source = this.querySelector('.se-wysiwyg__source');
    const sourceWrap = this.querySelector('.se-wysiwyg__source-wrap');
    const sourceHighlight = sourceWrap.querySelector('code');
    const value = this.querySelector('[data-value]');
    const format = this.querySelector('se-select[data-format]');
    const toggle = this.querySelector('[data-source-toggle]');
    if (format) format.hidden = true;
    const sourceValue = () => this._format === 'markdown' ? wysiwygHtmlToMarkdown(this._html) : this._html;
    const highlightSource = () => { sourceHighlight.innerHTML = `${highlightCode(source.value, this._format)}\n`; };
    const sync = () => { this._html = editor.innerHTML; value.value = this._html; if (!this._sourceVisible) source.value = sourceValue(); };
    const convertTypedMarkdown = () => {
      const text = editor.textContent;
      if (text && /(^|\n)\s*(#{1,6}\s|[-*]\s|\d+\.\s|>\s|\*\*|__)/.test(text) && !editor.querySelector('*')) { editor.innerHTML = wysiwygMarkdownToHtml(text); }
    };
    editor.addEventListener('input', () => { convertTypedMarkdown(); sync(); });
    editor.addEventListener('paste', (event) => {
      const text = event.clipboardData?.getData('text/plain') || '';
      if (!/(^|\n)\s*(#{1,6}\s|[-*]\s|\d+\.\s|>\s|\*\*|__)/.test(text)) return;
      event.preventDefault();
      document.execCommand('insertHTML', false, wysiwygMarkdownToHtml(text));
      sync();
    });
    const applyRaw = (command) => {
      const wraps = { bold: ['**', '**'], italic: ['*', '*'], underline: ['<u>', '</u>'] }[command];
      if (!wraps) return;
      const start = source.selectionStart;
      const end = source.selectionEnd;
      const [open, close] = this._format === 'markdown' ? wraps : ({ bold: ['<strong>', '</strong>'], italic: ['<em>', '</em>'], underline: ['<u>', '</u>'] }[command]);
      source.setRangeText(`${open}${source.value.slice(start, end)}${close}`, start, end);
      source.setSelectionRange(start + open.length, end + open.length);
      source.focus();
      source.dispatchEvent(new Event('input', { bubbles: true }));
    };
    const runCommand = (command) => {
      if (this._sourceVisible) { applyRaw(command); return; }
      editor.focus();
      // ponytail: execCommand keeps this dependency-free; replace with Selection/Range commands if browser support becomes insufficient.
      document.execCommand(command, false);
      sync();
    };
    this.querySelectorAll('[data-command]').forEach((button) => button.addEventListener('click', () => runCommand(button.dataset.command)));
    editor.addEventListener('keydown', (event) => { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'b') { event.preventDefault(); runCommand('bold'); } });
    source.addEventListener('keydown', (event) => { const command = { b: 'bold', i: 'italic' }[event.key.toLowerCase()]; if ((event.ctrlKey || event.metaKey) && command) { event.preventDefault(); applyRaw(command); } });
    source.addEventListener('input', () => { this._html = this._format === 'markdown' ? wysiwygMarkdownToHtml(source.value) : source.value; editor.innerHTML = this._html; value.value = this._html; highlightSource(); });
    source.addEventListener('scroll', () => { sourceWrap.querySelector('pre').scrollTop = source.scrollTop; sourceWrap.querySelector('pre').scrollLeft = source.scrollLeft; });
    format?.addEventListener('change', (event) => { this._html = this._format === 'markdown' ? wysiwygMarkdownToHtml(source.value) : source.value; this._format = event.detail.value; source.value = sourceValue(); editor.innerHTML = this._html; value.value = this._html; highlightSource(); });
    toggle.addEventListener('click', () => { if (!this._sourceVisible) this._html = editor.innerHTML; this._sourceVisible = !this._sourceVisible; source.value = sourceValue(); editor.innerHTML = this._html; sourceWrap.hidden = !this._sourceVisible; editor.hidden = this._sourceVisible; if (format) format.hidden = !this._sourceVisible; toggle.innerHTML = `<se-icon name="${this._sourceVisible ? 'type' : 'code'}"></se-icon>`; toggle.setAttribute('aria-label', this._sourceVisible ? 'Show text editor' : 'Show source'); toggle.setAttribute('aria-pressed', String(this._sourceVisible)); value.value = this._html; highlightSource(); });
    value.value = this._html;
    value.defaultValue = this._html;
    source.value = sourceValue();
    highlightSource();
    this.closest('form')?.addEventListener('reset', () => queueMicrotask(() => { editor.innerHTML = value.defaultValue; this._html = value.defaultValue; sync(); }));
  }
  get value() { return this.querySelector('[data-value]')?.value || ''; }
  set value(value) { const editor = this.querySelector('.se-wysiwyg__editor'); const input = this.querySelector('[data-value]'); if (editor && input) { editor.innerHTML = value; input.value = value; this._html = value; } }
}

define('se-wysiwyg', SeWysiwyg);
