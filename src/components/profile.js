import { define, emit, escapeHtml, parseOptions } from '../helpers.js';

class SeProfile extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const options = parseOptions(this);
    const tag = !options.length && this.hasAttribute('clickable') ? 'button' : 'div';
    const variants = ['gray', 'brand', 'success', 'warning', 'error', 'info', 'important'];
    const tone = variants.includes(this.getAttribute('tone')) ? this.getAttribute('tone') : 'brand';
    const identity = `<span class="se-profile__avatar">${escapeHtml(this.getAttribute('initials') || '')}</span><span><strong>${escapeHtml(this.getAttribute('name') || '')}</strong>${this.getAttribute('subtitle') ? `<small>${escapeHtml(this.getAttribute('subtitle'))}</small>` : ''}</span>`;
    if (!options.length) { this.innerHTML = `<${tag} class="se-profile se-profile--${tone}"${tag === 'button' ? ' type="button"' : ''}>${identity}</${tag}>`; return; }
    this.innerHTML = `<div class="se-profile-menu"><button class="se-profile se-profile--${tone}" type="button" aria-haspopup="menu" aria-expanded="false">${identity}<se-icon class="se-profile__chevron" name="chevron"></se-icon></button><div class="se-profile-menu__items" role="menu">${options.map((option, index) => `<button type="button" role="menuitem" data-index="${index}"${option.disabled ? ' disabled' : ''}>${option.icon ? `<se-icon name="${escapeHtml(option.icon)}"></se-icon>` : ''}<span><strong>${escapeHtml(option.label || '')}</strong>${option.description ? `<small>${escapeHtml(option.description)}</small>` : ''}</span></button>`).join('')}</div></div>`;
    const menu = this.querySelector('.se-profile-menu');
    const trigger = this.querySelector('.se-profile');
    trigger.addEventListener('click', () => { menu.classList.toggle('se-profile-menu--open'); trigger.setAttribute('aria-expanded', String(menu.classList.contains('se-profile-menu--open'))); });
    this.querySelectorAll('[data-index]').forEach((button) => button.addEventListener('click', () => { menu.classList.remove('se-profile-menu--open'); trigger.setAttribute('aria-expanded', 'false'); emit(this, 'select', options[Number(button.dataset.index)]); }));
  }
}

define('se-profile', SeProfile);
