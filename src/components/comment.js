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
    const avatar = children.findLast(node => node.nodeType === 1 && node.getAttribute('data-se-region') === 'avatar');
    const author = this.getAttribute('author') || 'Anonymous';
    this.innerHTML = `<article class="se-comment" aria-label="Comment by ${escapeHtml(author)}"><header><strong>${escapeHtml(author)}</strong><time>${escapeHtml(this.getAttribute('timestamp') || '')}</time></header><div class="se-comment__body"></div><div class="se-comment__actions"><button type="button" class="se-comment__reply">Reply</button></div><div class="se-comment__replies" role="group" aria-label="Replies to ${escapeHtml(author)}"></div></article>`;
    if (avatar) {
      const column = document.createElement('div');
      column.className = 'se-comment__avatar';
      column.append(avatar);
      this.querySelector('article').prepend(column);
    }
    for (const node of children.filter(node => !(node.nodeType === 1 && node.getAttribute('data-se-region') === 'avatar'))) this.querySelector(node.nodeType === 1 && node.matches('se-comment') ? '.se-comment__replies' : node.nodeType === 1 && node.getAttribute('data-se-region') === 'reactions' ? '.se-comment__actions' : '.se-comment__body').append(node);
    this.querySelector('.se-comment__reply').onclick = () => emit(this, 'reply', { author });
  }
  get replies() { return this.querySelector(':scope > article > .se-comment__replies'); }
}
define('se-comment', SeComment);
