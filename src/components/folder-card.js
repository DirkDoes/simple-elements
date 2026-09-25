import { define, escapeIcon, escapeHtml } from '../helpers.js';

class SeFolderCard extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready || this._scheduled) return;
    this._scheduled = true;
    queueMicrotask(() => { if (this.isConnected) this.render(); });
  }
  render() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const regions = [...this.querySelectorAll(':scope > [data-se-region="details-end"]')];
    const disabled = this.hasAttribute('disabled');
    const href = this.getAttribute('href');
    const tag = href && !disabled ? 'a' : 'button';
    const requestedTone = this.getAttribute('tone') || 'brand';
    const tone = ['gray', 'brand', 'success', 'warning', 'error', 'info', 'important'].includes(requestedTone) ? requestedTone : 'brand';
    const attributes = tag === 'a' ? ` href="${escapeHtml(href)}"` : ` type="button"${disabled ? ' disabled' : ''}`;
    this.innerHTML = `<${tag} title="" class="se-folder-card se-folder-card--${tone}"${attributes}><span class="se-folder-card__icon"><se-icon name="${escapeIcon(this.getAttribute('icon') || 'folder')}"></se-icon></span><span><strong>${escapeHtml(this.getAttribute('title') || 'Folder')}</strong>${this.getAttribute('subtitle') ? `<small>${escapeHtml(this.getAttribute('subtitle'))}</small>` : ''}</span></${tag}>`;
    if (regions.length) {
      const container = document.createElement('span');
      container.className = 'se-folder-card__region';
      container.append(...regions);
      this.append(container);
    }
  }
}

define('se-folder-card', SeFolderCard);
