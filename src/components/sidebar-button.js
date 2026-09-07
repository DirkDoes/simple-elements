import { define, escapeHtml } from '../helpers.js';

class SeSidebarButton extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const label = this.getAttribute('label') || this.textContent.trim() || 'Navigation item';
    const icon = this.getAttribute('icon');
    const disabled = this.hasAttribute('disabled');
    const content = `${icon ? `<se-icon name="${escapeHtml(icon)}"></se-icon>` : ''}<span>${escapeHtml(label)}</span>`;
    this.innerHTML = this.getAttribute('href') && !disabled
      ? `<a class="se-sidebar-button" href="${escapeHtml(this.getAttribute('href'))}" title="${escapeHtml(label)}">${content}</a>`
      : `<button class="se-sidebar-button" type="button" title="${escapeHtml(label)}"${disabled ? ' disabled' : ''}>${content}</button>`;
  }
}

define('se-sidebar-button', SeSidebarButton);
