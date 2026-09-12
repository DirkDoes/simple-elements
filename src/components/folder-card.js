import { define, escapeHtml } from '../helpers.js';

class SeFolderCard extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const disabled = this.hasAttribute('disabled');
    const href = this.getAttribute('href');
    const tag = href && !disabled ? 'a' : 'button';
    const count = Math.max(0, Number.parseInt(this.getAttribute('items') || '0', 10) || 0);
    const requestedTone = this.getAttribute('tone') || 'brand';
    const tone = ['gray', 'brand', 'success', 'warning', 'error', 'info', 'important'].includes(requestedTone) ? requestedTone : 'brand';
    const attributes = tag === 'a' ? ` href="${escapeHtml(href)}"` : ` type="button"${disabled ? ' disabled' : ''}`;
    this.innerHTML = `<${tag} class="se-folder-card se-folder-card--${tone}"${attributes}><span class="se-folder-card__icon"><se-icon name="${escapeHtml(this.getAttribute('icon') || 'folder')}"></se-icon></span><span><strong>${escapeHtml(this.getAttribute('title') || 'Folder')}</strong><small>${count} ${count === 1 ? 'item' : 'items'}</small></span></${tag}>`;
  }
}

define('se-folder-card', SeFolderCard);
