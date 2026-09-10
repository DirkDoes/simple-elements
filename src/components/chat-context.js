import { define, escapeHtml } from '../helpers.js';

class SeChatContext extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const content = this.getAttribute('content') ?? this.innerHTML.trim();
    const variant = ['gray', 'brand', 'success', 'warning', 'error', 'info', 'important'].includes(this.getAttribute('variant')) ? this.getAttribute('variant') : 'brand';
    this.innerHTML = `<div class="se-chat-context se-chat-context--${variant}" role="status"><span class="se-chat-context__line"></span><span class="se-chat-context__icon"><se-icon name="${escapeHtml(this.getAttribute('icon') || 'info')}"></se-icon></span><span class="se-chat-context__content">${content}</span>${this.getAttribute('timestamp') ? `<time>${escapeHtml(this.getAttribute('timestamp'))}</time>` : ''}<span class="se-chat-context__line"></span></div>`;
  }
}

define('se-chat-context', SeChatContext);
