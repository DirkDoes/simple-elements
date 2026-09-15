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
    this.innerHTML = `<${tag} class="se-workspace-card"${attributes}><span class="se-workspace-card__identity" aria-hidden="true">${escapeHtml(initials)}</span><span class="se-workspace-card__body"><strong>${escapeHtml(title)}</strong>${this.getAttribute('description') ? `<span class="se-workspace-card__description">${escapeHtml(this.getAttribute('description'))}</span>` : ''}${this.getAttribute('metadata') ? `<small class="se-workspace-card__metadata">${escapeHtml(this.getAttribute('metadata'))}</small>` : ''}</span><se-icon class="se-workspace-card__arrow" name="arrow-right" aria-hidden="true"></se-icon></${tag}>`;
  }
}

define('se-workspace-card', SeWorkspaceCard);
