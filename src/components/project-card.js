import { define, escapeHtml } from '../helpers.js';

class SeProjectCard extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const disabled = this.hasAttribute('disabled');
    const href = this.getAttribute('href');
    const tag = href && !disabled ? 'a' : 'button';
    const image = this.getAttribute('banner-image');
    const banner = image ? `<img src="${escapeHtml(image)}" alt="">` : `<se-icon name="${escapeHtml(this.getAttribute('icon') || 'package')}"></se-icon>`;
    const attributes = tag === 'a' ? ` href="${escapeHtml(href)}"` : ` type="button"${disabled ? ' disabled' : ''}`;
    this.innerHTML = `<${tag} class="se-project-card"${attributes}><span class="se-project-card__banner">${banner}</span><span class="se-project-card__body"><strong>${escapeHtml(this.getAttribute('title') || 'Project')}</strong>${this.getAttribute('description') ? `<span>${escapeHtml(this.getAttribute('description'))}</span>` : ''}${this.getAttribute('metadata') ? `<small>${escapeHtml(this.getAttribute('metadata'))}</small>` : ''}</span></${tag}>`;
    const color = this.getAttribute('banner-color');
    if (!image && color && CSS.supports('color', color)) this.querySelector('.se-project-card__banner').style.background = color;
  }
}

define('se-project-card', SeProjectCard);
