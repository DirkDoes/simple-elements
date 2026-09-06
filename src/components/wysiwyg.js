import { define, escapeHtml } from '../helpers.js';

class SeWysiwyg extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    const initial = this.getAttribute('value') || this.innerHTML.trim();
    this.dataset.ready = 'true';
    const controls = [['bold', 'bold', 'Bold'], ['italic', 'italic', 'Italic'], ['underline', 'underline', 'Underline'], ['insertUnorderedList', 'list', 'Bulleted list'], ['insertOrderedList', 'list-ordered', 'Numbered list']];
    this.innerHTML = `${this.getAttribute('label') ? `<label class="se-label">${escapeHtml(this.getAttribute('label'))}</label>` : ''}<div class="se-wysiwyg"><div class="se-wysiwyg__toolbar">${controls.map(([command, icon, label]) => `<button type="button" data-command="${command}" aria-label="${label}"${this.hasAttribute('disabled') ? ' disabled' : ''}><se-icon name="${icon}"></se-icon></button>`).join('')}</div><div class="se-wysiwyg__editor" contenteditable="${!this.hasAttribute('disabled')}" role="textbox" aria-multiline="true" data-placeholder="${escapeHtml(this.getAttribute('placeholder') || 'Start writing...')}">${initial}</div><textarea hidden name="${escapeHtml(this.getAttribute('name') || '')}">${escapeHtml(initial)}</textarea></div>`;
    const editor = this.querySelector('.se-wysiwyg__editor');
    const input = this.querySelector('textarea');
    const sync = () => { input.value = editor.innerHTML; };
    editor.addEventListener('input', sync);
    this.querySelectorAll('[data-command]').forEach((button) => button.addEventListener('click', () => {
      editor.focus();
      // ponytail: execCommand keeps this dependency-free; replace with Selection/Range commands if browser support becomes insufficient.
      document.execCommand(button.dataset.command, false);
      sync();
    }));
    this.closest('form')?.addEventListener('reset', () => queueMicrotask(() => { editor.innerHTML = input.defaultValue; }));
  }
  get value() { return this.querySelector('textarea')?.value || ''; }
  set value(value) { const editor = this.querySelector('.se-wysiwyg__editor'); const input = this.querySelector('textarea'); if (editor && input) { editor.innerHTML = value; input.value = value; } }
}

define('se-wysiwyg', SeWysiwyg);
