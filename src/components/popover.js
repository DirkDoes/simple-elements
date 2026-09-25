import { define, escapeHtml, escapeIcon, openPopup } from '../helpers.js';

class SePopover extends HTMLElement {
  connectedCallback() {
    requestAnimationFrame(() => {
      if (!this.isConnected || this._ready) return;
      this._ready = true;
      const content = [...this.childNodes];
      const triggerNode = content.find(node => node.nodeType === 1 && node.getAttribute('data-se-region') === 'trigger');
      content.forEach(node => node.remove());
      const label = this.getAttribute('label') || 'Options';
      const icon = this.getAttribute('icon') || 'more';
      const id = 'se-popover-' + crypto.randomUUID();
      this.innerHTML = `<button type="button" class="se-button se-button--secondary${this.hasAttribute('icon-only') ? ' se-button--icon' : ''}" aria-label="${escapeHtml(label)}" aria-haspopup="dialog" aria-expanded="false" aria-controls="${id}"><se-icon name="${escapeIcon(icon)}"></se-icon>${this.hasAttribute('icon-only') ? '' : escapeHtml(label)}</button><div id="${id}" class="se-menu__items se-popover__panel" role="dialog" aria-label="${escapeHtml(label)}" popover="manual"></div>`;
      if (triggerNode) this.querySelector('button').replaceWith(triggerNode);
      this._trigger = triggerNode?.querySelector('button, a, input, [tabindex]') || triggerNode || this.querySelector('button');
      this._trigger.setAttribute('aria-haspopup', 'dialog');
      this._trigger.setAttribute('aria-expanded', 'false');
      this._trigger.setAttribute('aria-controls', id);
      this.querySelector('.se-popover__panel').append(...content.filter(node => node !== triggerNode));
      this._trigger.addEventListener('click', () => this._popup ? this.close() : this.open());
    });
  }
  open() {
    if (!this._ready || this._popup) return;
    const trigger = this._trigger;
    trigger.setAttribute('aria-expanded', 'true');
    this._popup = openPopup(trigger, this.querySelector('.se-popover__panel'), () => this.close());
    this.querySelector('.se-popover__panel :is(input, button, select, textarea)')?.focus({ preventScroll: true });
  }
  close() {
    this.querySelectorAll('se-select, se-menu, se-popover, se-date-picker').forEach(child => child.close());
    this._popup?.(); this._popup = null;
    this._trigger?.setAttribute('aria-expanded', 'false');
  }
  disconnectedCallback() { this.close(); }
}

define('se-popover', SePopover);
