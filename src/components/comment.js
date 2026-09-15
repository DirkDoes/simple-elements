import { define, emit, escapeHtml } from '../helpers.js';

class SeComment extends HTMLElement {
  connectedCallback() {
    // Wait for parser-created body content and nested replies.
    if (!this.dataset.ready) setTimeout(() => { if (this.isConnected) this.render(); });
  }
  render() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const children = [...this.childNodes];
    const author = this.getAttribute('author') || 'Anonymous';
    this.innerHTML = `<article class="se-comment" aria-label="Comment by ${escapeHtml(author)}"><header><se-profile name="${escapeHtml(author)}" initials="${escapeHtml(this.getAttribute('initials') || author.slice(0, 2))}" ${this.hasAttribute('image') ? `image="${escapeHtml(this.getAttribute('image'))}"` : ''} tone="gray"></se-profile><time>${escapeHtml(this.getAttribute('timestamp') || '')}</time></header><div class="se-comment__body"></div><div class="se-comment__actions"><button type="button" class="se-comment__reply">Reply</button></div><div class="se-comment__replies" role="group" aria-label="Replies to ${escapeHtml(author)}"></div></article>`;
    for (const node of children) this.querySelector(node.nodeType === 1 && node.matches('se-comment') ? '.se-comment__replies' : node.nodeType === 1 && node.matches('se-reactions') ? '.se-comment__actions' : '.se-comment__body').append(node);
    this.querySelector('.se-comment__reply').onclick = () => emit(this, 'reply', { author });
  }
  get replies() { return this.querySelector(':scope > article > .se-comment__replies'); }
}
define('se-comment', SeComment);
