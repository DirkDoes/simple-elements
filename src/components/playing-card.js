import { define, escapeHtml, emit } from '../helpers.js';

class SePlayingCard extends HTMLElement {
  static observedAttributes = ['front', 'back', 'face-down', 'selected', 'disabled', 'clickable', 'selectable', 'flip-mode', 'label'];
  constructor() {
    super();
    this._hoverKeydown = event => {
      if (event.defaultPrevented || event.key.toLowerCase() !== 'f' || event.ctrlKey || event.metaKey || event.altKey || event.repeat || event.isComposing) return;
      if (event.target.closest?.('input, textarea, select') || event.target.isContentEditable) return;
      if (this.hasAttribute('disabled') || !['button', 'switch'].includes(this.getAttribute('flip-mode'))) return;
      event.preventDefault();
      this.flip(!this.hasAttribute('face-down'));
    };
    this.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') this.ownerDocument.addEventListener('keydown', this._hoverKeydown);
    });
    this.addEventListener('pointerleave', () => this.ownerDocument.removeEventListener('keydown', this._hoverKeydown));
  }
  disconnectedCallback() { this.ownerDocument.removeEventListener('keydown', this._hoverKeydown); }

  flip(faceDown) {
    if (this.hasAttribute('disabled') || !['button', 'switch'].includes(this.getAttribute('flip-mode')) || faceDown === this.hasAttribute('face-down')) return;
    this.toggleAttribute('face-down', faceDown);
    emit(this, 'flip', { faceDown });
  }
  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  render() {
    const flipMode = this.getAttribute('flip-mode') || 'none';
    const faceDown = this.hasAttribute('face-down');
    const selectable = this.hasAttribute('selectable');
    const interactive = selectable || this.hasAttribute('clickable');
    const disabled = this.hasAttribute('disabled');
    const source = this.getAttribute(faceDown ? 'back' : 'front');
    const label = this.getAttribute('label') || '';
    const name = label || 'Playing card';
    const accessible = name + (faceDown ? ', back' : ', front');
    const tag = interactive ? 'button' : 'div';
    const focused = this.contains(document.activeElement) ? document.activeElement.dataset.cardAction : null;
    this.innerHTML = `<div class="se-playing-card"><${tag} class="se-playing-card__face" data-card-action="activate" aria-label="${escapeHtml(accessible)}" ${interactive ? `type="button" ${selectable ? `aria-pressed="${this.hasAttribute('selected')}"` : ''} ${disabled ? 'disabled' : ''}` : 'role="img"'}>${source ? `<img src="${escapeHtml(source)}" alt="" draggable="false">` : `<span class="se-playing-card__placeholder">${faceDown ? 'Back' : 'Front'}</span>`}</${tag}>${flipMode === 'button' ? `<button type="button" class="se-playing-card__flip se-playing-card__flip--${flipMode}" data-card-action="flip" aria-label="Show ${faceDown ? 'front' : 'back'} of ${escapeHtml(name)}" ${disabled ? 'disabled' : ''}><se-icon name="rotate-ccw"></se-icon></button>` : ''}</div>${label ? `<div class="se-playing-card__label">${escapeHtml(label)}</div>` : ''}${flipMode === 'switch' ? `<div class="se-playing-card__sides" role="group" aria-label="Side of ${escapeHtml(name)}">${['front', 'back'].map(side => `<button type="button" data-card-action="${side}" aria-pressed="${faceDown === (side === 'back')}" ${disabled ? 'disabled' : ''}>${side === 'front' ? 'Front' : 'Back'}</button>`).join('')}</div>` : ''}`;
    const image = this.querySelector('img');
    image?.addEventListener('error', () => {
      const fallback = document.createElement('span');
      fallback.className = 'se-playing-card__placeholder';
      fallback.textContent = 'Image unavailable';
      image.replaceWith(fallback);
    }, { once: true });
    if (selectable) this.querySelector('[data-card-action="activate"]').addEventListener('click', () => {
      if (this.hasAttribute('disabled')) return;
      this.toggleAttribute('selected');
      emit(this, 'select', { selected: this.hasAttribute('selected') });
    });
    this.querySelectorAll('.se-playing-card__sides button, .se-playing-card__flip').forEach(button => button.addEventListener('click', event => {
      event.stopPropagation();
      const nextFaceDown = button.dataset.cardAction === 'flip' ? !this.hasAttribute('face-down') : button.dataset.cardAction === 'back';
      this.flip(nextFaceDown);
    }));
    if (focused) this.querySelector(`[data-card-action="${focused}"]`)?.focus({ preventScroll: true });
  }
}
define('se-playing-card', SePlayingCard);
