import { define, escapeHtml, escapeIcon } from '../helpers.js';

class SeAvatar extends HTMLElement {
  static observedAttributes = ['name', 'initials', 'image', 'icon', 'clickable', 'aria-label'];
  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  render() {
    const name = this.getAttribute('name') || '';
    const initials = this.getAttribute('initials') || name.trim().split(/\s+/).filter(Boolean).map(word => [...word][0]).slice(0, 2).join('').toUpperCase();
    const label = this.getAttribute('aria-label') || name || initials || 'Avatar';
    const tag = this.hasAttribute('clickable') && !this.closest('button.se-profile') ? 'button' : 'span';
    const focused = this.contains(document.activeElement);
    this.innerHTML = `<${tag} class="se-avatar" aria-label="${escapeHtml(label)}"${tag === 'button' ? ' type="button"' : ' role="img"'}></${tag}>`;
    const control = this.firstElementChild;
    const fallback = () => {
      control.classList.remove('se-avatar--image');
      control.innerHTML = initials ? `<span aria-hidden="true">${escapeHtml(initials)}</span>` : `<se-icon aria-hidden="true" name="${escapeIcon(this.getAttribute('icon') || 'user')}"></se-icon>`;
    };
    fallback();
    const image = this.getAttribute('image');
    if (image) {
      const img = document.createElement('img');
      img.alt = ''; img.draggable = false;
      img.addEventListener('error', fallback, { once: true });
      control.classList.add('se-avatar--image');
      control.replaceChildren(img);
      img.src = image;
    }
    if (focused && tag !== 'span') control.focus();
  }
}
define('se-avatar', SeAvatar);
