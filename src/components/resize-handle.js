import { define, emit } from '../helpers.js';

class SeResizeHandle extends HTMLElement {
  static observedAttributes = ['for', 'axis', 'edge', 'min', 'max', 'label', 'disabled', 'snap', 'snap-threshold'];
  connectedCallback() {
    if (!this._bound) {
      this._bound = true;
      this.addEventListener('pointerdown', event => this.start(event));
      this.addEventListener('pointermove', event => {
        if (!this._drag || event.pointerId !== this._drag.id) return;
        const delta = (this.axis === 'x' ? event.clientX : event.clientY) - this._drag.position;
        this.resize(this._drag.size + delta * this.sign);
      });
      this.addEventListener('pointerup', () => this.finish());
      this.addEventListener('pointercancel', () => this.finish(true));
      this.addEventListener('lostpointercapture', () => this.finish());
      this.addEventListener('keydown', event => this.keydown(event));
    }
    this.setAttribute('role', 'separator');
    this._observer = new ResizeObserver(() => this.sync());
    this._attributes = new MutationObserver(() => this.sync());
    this._attributes.observe(this.getRootNode(), { subtree: true, childList: true, attributes: true, attributeFilter: ['hidden', 'data-se-minimized', 'id'] });
    this.sync();
  }
  disconnectedCallback() { this.finish(true); this._observer?.disconnect(); this._attributes?.disconnect(); }
  attributeChangedCallback() { if (this.isConnected && this._observer) { this.finish(true); this.sync(); } }
  get target() { return this.getRootNode().getElementById?.(this.getAttribute('for')) || null; }
  get axis() { return this.getAttribute('axis') === 'y' ? 'y' : 'x'; }
  get sign() { return this.getAttribute('edge') === 'start' ? -1 : 1; }
  get snap() { const mode = this.getAttribute('snap'); return ['minimize', 'collapse'].includes(mode) ? mode : null; }
  get reduced() { return !!this.target && (this.target.hidden || this.target.getAttribute('data-se-minimized') === 'true'); }
  get bounds() {
    const number = (name, fallback) => this.hasAttribute(name) && Number.isFinite(Number(this.getAttribute(name))) ? Number(this.getAttribute(name)) : fallback;
    const min = Math.max(0, number('min', 80));
    return { min, max: Math.max(min, number('max', 600)) };
  }
  get size() { return this.target?.getBoundingClientRect()[this.axis === 'x' ? 'width' : 'height'] || 0; }
  sync() {
    const target = this.target;
    if (target !== this._target) {
      this._observer?.disconnect();
      this._target = target;
      if (target) this._observer?.observe(target);
    }
    const disabled = this.hasAttribute('disabled') || !target || (!target.getClientRects().length && !(target.hidden && this.snap)) || (this.reduced && !this.snap);
    this.tabIndex = disabled ? -1 : 0;
    this.setAttribute('aria-disabled', String(disabled));
    this.setAttribute('aria-orientation', this.axis === 'x' ? 'vertical' : 'horizontal');
    this.setAttribute('aria-label', this.getAttribute('label') || target?.getAttribute('aria-label') || 'Resize panel');
    this.setAttribute('aria-controls', target?.id || '');
    const { min, max } = this.bounds;
    const value = Math.max(this.snap ? 0 : min, Math.min(max, this.size));
    this.setAttribute('aria-valuemin', String(this.snap ? 0 : min));
    this.setAttribute('aria-valuemax', String(max));
    this.setAttribute('aria-valuenow', String(Math.round(value)));
    this.setAttribute('aria-valuetext', this.hasAttribute('data-snap-pending') ? `Release to ${this.snap}` : this.reduced ? `${target.hidden ? 'Collapsed' : 'Minimized'}. Press Enter to restore` : `${Math.round(this.size)} pixels`);
  }
  resize(value) {
    const target = this.target;
    if (!target) return;
    const { min, max } = this.bounds;
    if (this._drag) {
      const requested = Number(this.getAttribute('snap-threshold') ?? 40);
      const threshold = Number.isFinite(requested) ? Math.max(1, requested) : 40;
      this.toggleAttribute('data-snap-pending', !!this.snap && value <= min - threshold);
    }
    const size = Math.max(min, Math.min(max, value));
    target.style.setProperty('--se-resize-size', `${size}px`);
    this.sync();
    emit(this, 'input', { target, size, axis: this.axis });
  }
  start(event) {
    this.sync();
    if (event.button !== 0 || this.getAttribute('aria-disabled') === 'true' || this.reduced) return;
    event.preventDefault();
    this.focus();
    this._drag = { id: event.pointerId, position: this.axis === 'x' ? event.clientX : event.clientY, size: this.size, original: this.target.style.getPropertyValue('--se-resize-size'), target: this.target };
    this.setPointerCapture(event.pointerId);
    this.setAttribute('data-dragging', '');
    this.target.setAttribute('data-resizing', '');
  }
  finish(cancel = false) {
    const drag = this._drag;
    if (!drag) return;
    const snap = !cancel && this.hasAttribute('data-snap-pending');
    this._drag = null;
    if (cancel) {
      if (drag.original) drag.target.style.setProperty('--se-resize-size', drag.original);
      else drag.target.style.removeProperty('--se-resize-size');
    }
    this.removeAttribute('data-dragging');
    this.removeAttribute('data-snap-pending');
    drag.target.removeAttribute('data-resizing');
    if (this.hasPointerCapture(drag.id)) this.releasePointerCapture(drag.id);
    if (snap) this.snapTarget(drag.original);
    this.sync();
    if (!cancel) emit(this, 'change', { target: drag.target, size: this.size, axis: this.axis, state: this.reduced ? (drag.target.hidden ? 'collapsed' : 'minimized') : 'expanded' });
  }
  snapTarget(original = this.target?.style.getPropertyValue('--se-resize-size')) {
    const target = this.target;
    if (!target || !this.snap) return;
    if (!this.dispatchEvent(new CustomEvent('snap', { bubbles: true, cancelable: true, detail: { target, mode: this.snap } }))) return;
    // Preserve the expanded size so either a toggle or Enter restores it.
    if (original) target.style.setProperty('--se-resize-size', original);
    else target.style.removeProperty('--se-resize-size');
    if (target.contains(document.activeElement)) this.focus();
    if (this.snap === 'minimize') target.setAttribute('data-se-minimized', 'true');
    else target.hidden = true;
    this.sync();
  }
  keydown(event) {
    if (event.key === 'Escape' && this._drag) { event.preventDefault(); this.finish(true); return; }
    if (this.getAttribute('aria-disabled') === 'true') return;
    if (event.key === 'Enter' && this.snap) {
      event.preventDefault();
      if (this.reduced) { this.target.hidden = false; this.target.setAttribute('data-se-minimized', 'false'); this.sync(); }
      else this.snapTarget();
      emit(this, 'change', { target: this.target, size: this.size, axis: this.axis, state: this.reduced ? (this.target.hidden ? 'collapsed' : 'minimized') : 'expanded' });
      return;
    }
    if (this.reduced) return;
    const decrease = this.axis === 'x' ? 'ArrowLeft' : 'ArrowUp';
    const increase = this.axis === 'x' ? 'ArrowRight' : 'ArrowDown';
    if (![decrease, increase, 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const step = event.shiftKey ? 40 : 10;
    this.resize(event.key === 'Home' ? this.bounds.min : event.key === 'End' ? this.bounds.max : this.size + (event.key === increase ? step : -step) * this.sign);
    emit(this, 'change', { target: this.target, size: this.size, axis: this.axis });
  }
}
define('se-resize-handle', SeResizeHandle);
