import { define, escapeHtml, bindTooltip } from '../helpers.js';

class SeTooltip extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready || this._scheduled) return;
    this._scheduled = true;
    queueMicrotask(() => this.render());
  }
  render() {
    if (!this.isConnected || this.dataset.ready) return;
    this.dataset.ready = 'true';
    const content = this.querySelector(':scope > [data-content]');
    content?.remove();
    const children = [...this.childNodes];
    children.forEach(node => node.remove());
    const id = `se-tooltip-${crypto.randomUUID()}`;
    this.innerHTML = `<span class="se-tooltip"><span class="se-tooltip__bubble se-tooltip__layer" id="${id}" role="tooltip" popover="manual">${escapeHtml(this.getAttribute('content') || '')}</span></span>`;
    const root = this.querySelector('.se-tooltip');
    const bubble = this.querySelector('[role="tooltip"]');
    if (content) bubble.replaceChildren(...content.childNodes);
    root.prepend(...children);
    const trigger = root.querySelector('button, a, input, [tabindex]') || root;
    const ids = new Set((trigger.getAttribute('aria-describedby') || '').split(' ').filter(Boolean));
    ids.add(id); trigger.setAttribute('aria-describedby', [...ids].join(' '));
    this._popup = bindTooltip(root, bubble);
  }
  disconnectedCallback() { this._popup?.(); }
}

define('se-tooltip', SeTooltip);
