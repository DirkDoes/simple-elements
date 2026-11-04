import { define, escapeIcon, emit, escapeHtml, parseOptions, placePopover, connectMinimized } from '../helpers.js';

class SeProfile extends HTMLElement {
  connectedCallback() {
    this._disconnectContext = connectMinimized(this);
    if (this.dataset.ready) return;
    setTimeout(() => { if (this.isConnected && !this.dataset.ready) this.render(); });
  }
  render() {
    this.dataset.ready = 'true';
    const options = parseOptions(this);
    const tag = !options.length && this.hasAttribute('clickable') ? 'button' : 'div';
    const avatar = [...this.children].findLast(child => child.getAttribute('data-se-region') === 'avatar');
    const name = this.getAttribute('name') || this.getAttribute('title') || '';
    const identity = `<span class="se-profile__text"><strong>${escapeHtml(name)}</strong>${this.getAttribute('subtitle') ? `<small>${escapeHtml(this.getAttribute('subtitle'))}</small>` : ''}</span>`;
    const interactive = options.length || tag === 'button';
    const controlTag = interactive ? 'button' : 'div';
    this.innerHTML = `<div class="se-profile-menu"><${controlTag} class="se-profile"${interactive ? ` type="button" aria-label="${escapeHtml(name || 'Profile')}"` : ''}${options.length ? ' aria-haspopup="menu" aria-expanded="false"' : ''}>${identity}${options.length ? '<se-icon class="se-profile__chevron" name="chevron"></se-icon>' : ''}</${controlTag}>${options.length ? `<div class="se-profile-menu__items" role="menu">${options.map((option, index) => `<button type="button" role="menuitem" data-index="${index}"${option.disabled ? ' disabled' : ''}>${option.icon ? `<se-icon name="${escapeIcon(option.icon)}"></se-icon>` : ''}<span><strong>${escapeHtml(option.label || '')}</strong>${option.description ? `<small>${escapeHtml(option.description)}</small>` : ''}</span></button>`).join('')}</div>` : ''}</div>`;
    if (avatar) this.querySelector('.se-profile').prepend(avatar);
    if (!options.length) return;
    const menu = this.querySelector('.se-profile-menu');
    const trigger = this.querySelector('.se-profile');
    trigger.addEventListener('click', () => { const open = menu.classList.toggle('se-profile-menu--open'); trigger.setAttribute('aria-expanded', String(open)); if (open) placePopover(trigger, this.querySelector('.se-profile-menu__items')); });
    this.querySelectorAll('[data-index]').forEach((button) => button.addEventListener('click', () => { menu.classList.remove('se-profile-menu--open'); trigger.setAttribute('aria-expanded', 'false'); emit(this, 'select', options[Number(button.dataset.index)]); }));
  }
  disconnectedCallback() { this._disconnectContext?.(); }
}

define('se-profile', SeProfile);
