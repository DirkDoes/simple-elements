import { define, escapeHtml } from '../helpers.js';

class SeWorkspaceCard extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const disabled = this.hasAttribute('disabled');
    const href = this.getAttribute('href');
    const tag = href && !disabled ? 'a' : 'button';
    const attributes = tag === 'a' ? ` href="${escapeHtml(href)}"` : ` type="button"${disabled ? ' disabled' : ''}`;
    const title = this.getAttribute('title') || 'Workspace';
    const initials = this.getAttribute('initials') || title.slice(0, 2).toUpperCase();
    const image = this.getAttribute('image');
    const avatar = image ? `<img src="${escapeHtml(image)}" alt="" draggable="false">` : escapeHtml(initials);
    this.innerHTML = `<${tag} title="" class="se-workspace-card"${attributes}><span class="se-workspace-card__identity${image ? ' se-workspace-card__identity--image' : ''}" aria-hidden="true">${avatar}</span><span class="se-workspace-card__body"><strong>${escapeHtml(title)}</strong>${this.getAttribute('subtitle') ? `<span class="se-workspace-card__subtitle">${escapeHtml(this.getAttribute('subtitle'))}</span>` : ''}${this.getAttribute('metadata') ? `<small class="se-workspace-card__metadata">${escapeHtml(this.getAttribute('metadata'))}</small>` : ''}</span><se-icon class="se-workspace-card__arrow" name="arrow-right" aria-hidden="true"></se-icon></${tag}>`;
  }
}

define('se-workspace-card', SeWorkspaceCard);
