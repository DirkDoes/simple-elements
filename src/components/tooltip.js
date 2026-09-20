import { define, escapeHtml, openPopup } from '../helpers.js';

class SeTooltip extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready || this._scheduled) return;
    this._scheduled = true;
    queueMicrotask(() => this.render());
  }
  render() {
    if (!this.isConnected || this.dataset.ready) return;
    this.dataset.ready = 'true';
    const children = [...this.childNodes];
    children.forEach(node => node.remove());
    const id = `se-tooltip-${crypto.randomUUID()}`;
    this.innerHTML = `<span class="se-tooltip"><span class="se-tooltip__bubble se-tooltip__layer" id="${id}" role="tooltip" popover="manual">${escapeHtml(this.getAttribute('content') || '')}</span></span>`;
    const root = this.querySelector('.se-tooltip');
    const bubble = this.querySelector('[role="tooltip"]');
    root.prepend(...children);
    const hide = () => { this._popup?.(); this._popup = null; };
    const show = () => {
      if (this._popup) return;
      const trigger = root.querySelector('button, a, input, [tabindex]') || root;
      const ids = new Set((trigger.getAttribute('aria-describedby') || '').split(' ').filter(Boolean));
      ids.add(id); trigger.setAttribute('aria-describedby', [...ids].join(' '));
      this._popup = openPopup(root, bubble, hide);
    };
    root.addEventListener('pointerenter', show);
    root.addEventListener('pointerleave', () => { if (!root.contains(document.activeElement)) hide(); });
    root.addEventListener('focusin', show);
    root.addEventListener('focusout', event => { if (!root.contains(event.relatedTarget)) hide(); });
    root.addEventListener('keydown', event => { if (event.key === 'Escape') { event.stopPropagation(); hide(); } });
  }
  disconnectedCallback() { this._popup?.(); this._popup = null; }
}

define('se-tooltip', SeTooltip);
