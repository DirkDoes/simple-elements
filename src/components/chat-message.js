import { define, escapeHtml } from '../helpers.js';

class SeChatMessage extends HTMLElement {
  connectedCallback() {
    if (!this.dataset.ready) setTimeout(() => { if (this.isConnected && !this.dataset.ready) this.render(); });
  }
  render() {
    this.dataset.ready = 'true';
    const nodes = [...this.childNodes];
    const avatar = nodes.findLast(node => node.nodeType === 1 && node.getAttribute('data-se-region') === 'avatar');
    const mode = this.getAttribute('mode') === 'sent' ? 'sent' : 'received';
    const title = this.getAttribute('title') || (mode === 'sent' ? 'You' : 'Assistant');
    const timestamp = this.getAttribute('timestamp');
    const time = timestamp ? `<time>${escapeHtml(timestamp)}</time>` : '';
    this.innerHTML = `<article class="se-chat-message se-chat-message--${mode}"><div class="se-chat-message__row"><div class="se-chat-message__bubble"><header>${this.getAttribute('timestamp-position') === 'start' ? time : ''}<strong>${escapeHtml(title)}</strong>${this.getAttribute('timestamp-position') !== 'start' ? time : ''}</header><div class="se-chat-message__content"></div></div></div></article>`;
    if (avatar) this.querySelector('.se-chat-message__row').prepend(avatar);
    const body = this.querySelector('.se-chat-message__content');
    if (this.hasAttribute('content')) body.innerHTML = this.getAttribute('content');
    else body.append(...nodes.filter(node => !(node.nodeType === 1 && node.getAttribute('data-se-region') === 'avatar')));
  }
}
define('se-chat-message', SeChatMessage);
