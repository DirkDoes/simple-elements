import { define, escapeIcon, escapeHtml } from '../helpers.js';

class SeProjectCard extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready || this._scheduled) return;
    this._scheduled = true;
    queueMicrotask(() => { if (this.isConnected) this.render(); });
  }
  render() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const regions = [...this.querySelectorAll(':scope > [data-se-region]')].filter(node => ['banner-start', 'banner-end', 'details-end'].includes(node.getAttribute('data-se-region')));
    const disabled = this.hasAttribute('disabled');
    const href = this.getAttribute('href');
    const tag = href && !disabled ? 'a' : 'button';
    const image = this.getAttribute('banner-image');
    const banner = image ? `<img src="${escapeHtml(image)}" alt="">` : `<se-icon name="${escapeIcon(this.getAttribute('icon') || 'package')}"></se-icon>`;
    const attributes = tag === 'a' ? ` href="${escapeHtml(href)}"` : ` type="button"${disabled ? ' disabled' : ''}`;
    this.innerHTML = `<${tag} title="" class="se-project-card"${attributes}><span class="se-project-card__banner">${banner}</span><span class="se-project-card__body"><strong>${escapeHtml(this.getAttribute('title') || 'Project')}</strong>${this.getAttribute('subtitle') ? `<span>${escapeHtml(this.getAttribute('subtitle'))}</span>` : ''}${this.getAttribute('metadata') ? `<small>${escapeHtml(this.getAttribute('metadata'))}</small>` : ''}</span></${tag}>`;
    for (const name of ['banner-start', 'banner-end', 'details-end']) {
      const nodes = regions.filter(node => node.getAttribute('data-se-region') === name);
      if (!nodes.length) continue;
      const container = document.createElement('span');
      container.className = 'se-project-card__region';
      container.dataset.region = name;
      container.append(...nodes);
      this.append(container);
    }
    const color = this.getAttribute('banner-color');
    if (!image && color && CSS.supports('color', color)) this.querySelector('.se-project-card__banner').style.background = color;
  }
}

define('se-project-card', SeProjectCard);
