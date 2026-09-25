import { define, bindTooltip } from '../helpers.js';

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
    this.innerHTML = `<span class="se-tooltip"><div class="se-tooltip__bubble se-tooltip__layer" id="${id}" role="tooltip" popover="manual"></div></span>`;
    const root = this.querySelector('.se-tooltip');
    const bubble = this.querySelector('[role="tooltip"]');
    for (const node of children) (node.nodeType === 1 && node.getAttribute('data-se-region') === 'trigger' ? root : bubble).append(node);
    const trigger = root.querySelector('button, a, input, [tabindex]') || root.querySelector('[data-se-region="trigger"]') || root;
    const ids = new Set((trigger.getAttribute('aria-describedby') || '').split(' ').filter(Boolean));
    ids.add(id); trigger.setAttribute('aria-describedby', [...ids].join(' '));
    this._popup = bindTooltip(root, bubble);
  }
  disconnectedCallback() { this._popup?.(); }
}

define('se-tooltip', SeTooltip);
