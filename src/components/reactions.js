import { define, emit, escapeHtml, parseOptions } from '../helpers.js';

class SeReactions extends HTMLElement {
  get options() { return this._options; }
  set options(value) { this._options = value; if (this.isConnected) this.render(); }
  connectedCallback() { this.render(); }
  render() {
    const input = parseOptions(this);
    this._options = (Array.isArray(input) ? input : []).filter(item => item && typeof item.emoji === 'string').map(item => ({ emoji: item.emoji, count: Math.max(item.selected ? 1 : 0, Number.isFinite(Number(item.count)) ? Math.floor(Number(item.count)) : 0), selected: Boolean(item.selected) }));
    const choices = [...new Set([...this._options.map(item => item.emoji), '👍', '❤️', '🎉', '😂', '👀', '🙏'])];
    this.innerHTML = `<div class="se-reactions" role="group" aria-label="Reactions">${this._options.filter(item => item.count).map(item => `<button type="button" data-emoji="${escapeHtml(item.emoji)}" aria-pressed="${item.selected}" aria-label="${escapeHtml(item.emoji)} reaction, ${item.count}">${escapeHtml(item.emoji)} <span>${item.count}</span></button>`).join('')}<details><summary aria-label="Add reaction" title="Add reaction"><se-icon name="plus"></se-icon></summary><div class="se-reactions__picker" role="group" aria-label="Choose a reaction">${choices.map(emoji => `<button type="button" data-emoji="${escapeHtml(emoji)}" aria-label="React with ${escapeHtml(emoji)}">${escapeHtml(emoji)}</button>`).join('')}</div></details><span class="se-reactions__status" role="status"></span></div>`;
    this.querySelectorAll('[data-emoji]').forEach(button => button.onclick = () => {
      const emoji = button.dataset.emoji;
      let item = this._options.find(item => item.emoji === emoji);
      if (!item) { item = { emoji, count: 0, selected: false }; this._options.push(item); }
      item.selected = !item.selected;
      item.count += item.selected ? 1 : -1;
      const detail = { ...item };
      this.render();
      [...this.querySelectorAll('[data-emoji]')].find(button => button.dataset.emoji === emoji && button.matches('[aria-pressed]'))?.focus();
      if (!item.count) this.querySelector('summary').focus();
      this.querySelector('[role="status"]').textContent = `${emoji} reaction ${item.selected ? 'added' : 'removed'}`;
      emit(this, 'reactionchange', detail);
    });
    this.onkeydown = event => { if (event.key === 'Escape') { this.querySelector('details').open = false; this.querySelector('summary').focus(); } };
  }
}
define('se-reactions', SeReactions);
