import { define, emit } from '../helpers.js';

class SePanelToggle extends HTMLElement {
  static observedAttributes = ['for', 'mode', 'label', 'variant'];
  connectedCallback() {
    if (!this._button) {
      this.innerHTML = '<button class="se-panel-toggle" type="button"><se-icon name="chevron"></se-icon></button>';
      this._button = this.querySelector('button');
      this._button.addEventListener('click', () => {
        const target = this.target;
        if (!target) return;
        if (!this.dispatchEvent(new CustomEvent('beforetoggle', { bubbles: true, cancelable: true, detail: { target, mode: this.mode } }))) return;
        if (this.mode === 'minimize') {
          target.setAttribute('data-se-minimized', String(target.getAttribute('data-se-minimized') !== 'true'));
        } else {
          if (!target.hidden && target.contains(document.activeElement)) this._button.focus();
          target.hidden = !target.hidden;
        }
        this.sync();
        emit(this, 'change', { target, mode: this.mode, minimized: target.getAttribute('data-se-minimized') === 'true', collapsed: target.hidden });
      });
    }
    this._observer = new MutationObserver(() => this.sync());
    this._observer.observe(this.getRootNode(), { subtree: true, childList: true, attributes: true, attributeFilter: ['hidden', 'data-se-minimized', 'id'] });
    this.sync();
  }
  disconnectedCallback() { this._observer?.disconnect(); }
  attributeChangedCallback() { if (this._button) this.sync(); }
  get mode() { return this.getAttribute('mode') === 'minimize' ? 'minimize' : 'collapse'; }
  get target() { return this.getRootNode().getElementById?.(this.getAttribute('for')) || null; }
  sync() {
    const target = this.target;
    const minimized = target?.getAttribute('data-se-minimized') === 'true';
    const inactive = !target || (this.mode === 'collapse' && target.contains(this));
    this._button.disabled = inactive;
    this._button.setAttribute('aria-controls', target?.id || '');
    this._button.setAttribute('aria-label', this.getAttribute('label') || (this.mode === 'minimize' ? 'Minimize panel' : target?.hidden ? 'Expand panel' : 'Collapse panel'));
    this._button.removeAttribute(this.mode === 'minimize' ? 'aria-expanded' : 'aria-pressed');
    this._button.setAttribute(this.mode === 'minimize' ? 'aria-pressed' : 'aria-expanded', String(this.mode === 'minimize' ? minimized : !!target && !target.hidden));
    this.toggleAttribute('data-active', this.mode === 'minimize' ? minimized : !!target?.hidden);
    const icon = this.querySelector('se-icon');
    const name = this.getAttribute('variant') === 'menu' ? 'menu' : 'chevron';
    if (icon.getAttribute('name') !== name) icon.setAttribute('name', name);
  }
}
define('se-panel-toggle', SePanelToggle);
