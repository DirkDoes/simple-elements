import { define, escapeHtml } from '../helpers.js';

class SeChatMessage extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    this.render();
  }

  render() {
    const mode = this.getAttribute('mode') === 'sent' ? 'sent' : 'received';
    const content = this.getAttribute('content') ?? this.innerHTML.trim();
    const title = this.getAttribute('title') || (mode === 'sent' ? 'You' : 'Assistant');
    const timestamp = this.getAttribute('timestamp');
    const profile = this.hasAttribute('profile');
    const initials = this.getAttribute('initials');
    const avatar = initials ? escapeHtml(initials) : `<se-icon name="${escapeHtml(this.getAttribute('icon') || (mode === 'sent' ? 'user' : 'zap'))}"></se-icon>`;
    const time = timestamp ? `<time>${escapeHtml(timestamp)}</time>` : '';
    this.innerHTML = `<article class="se-chat-message se-chat-message--${mode}"><div class="se-chat-message__row">${profile ? `<span class="se-chat-message__avatar">${avatar}</span>` : ''}<div class="se-chat-message__bubble"><header>${this.getAttribute('timestamp-position') === 'start' ? time : ''}<strong>${escapeHtml(title)}</strong>${this.getAttribute('timestamp-position') !== 'start' ? time : ''}</header><div class="se-chat-message__content">${content}</div></div></div></article>`;
  }
}

define('se-chat-message', SeChatMessage);
