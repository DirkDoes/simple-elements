import { define, escapeHtml, escapeIcon, openPopup, emit } from '../helpers.js';

class SeTimelineMarker extends HTMLElement {
  static observedAttributes = ['at', 'label', 'icon'];
  connectedCallback() {
    setTimeout(() => {
      if (!this.isConnected || this._button) return;
      const content = [...this.childNodes];
      const id = 'se-marker-' + crypto.randomUUID();
      this.innerHTML = `<button type="button" class="se-timeline-marker__button" aria-controls="${id}" aria-expanded="false" aria-haspopup="dialog"></button><div class="se-timeline-marker__content" id="${id}" role="dialog" popover="manual"><div class="se-timeline-marker__body"></div></div>`;
      this._button = this.querySelector('button');
      this._panel = this.querySelector('[popover]');
      this._panel.querySelector('.se-timeline-marker__body').append(...content);
      this.update();
      this._button.addEventListener('click', () => {
        this.open();
        const value = Number(this.getAttribute('at')) || 0;
        this.closest('se-timeline')?.seek(value);
        emit(this, 'marker-select', { value });
      });
      for (const node of [this._button, this._panel]) {
        node.addEventListener('pointerenter', () => this.open());
        node.addEventListener('pointerleave', () => this.scheduleClose());
        node.addEventListener('focusin', () => { if (!this._closing) this.open(); });
        node.addEventListener('focusout', () => this.scheduleClose());
      }
      this.closest('se-timeline')?.refresh();
    });
  }
  attributeChangedCallback() { if (this._button) this.update(); }
  update() {
    const label = this.getAttribute('label') || 'Marker';
    this._button.setAttribute('aria-label', label + ' at ' + (this.getAttribute('at') || 0) + ' seconds');
    this._panel.setAttribute('aria-label', label);
    this._button.innerHTML = `<span class="se-timeline-marker__dot"></span><span class="se-timeline-marker__flag">${this.hasAttribute('icon') ? `<se-icon name="${escapeIcon(this.getAttribute('icon'))}"></se-icon>` : escapeHtml(label)}</span>`;
  }
  open() {
    clearTimeout(this._timer);
    if (this._popup || !this._panel.textContent.trim() && !this._panel.querySelector('.se-timeline-marker__body').children.length || this._button.disabled) return;
    this._button.setAttribute('aria-expanded', 'true');
    this._popup = openPopup(this._button, this._panel, () => this.close(), false, true);
  }
  scheduleClose() {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      if (!this.contains(document.activeElement) && !this._button.matches(':hover') && !this._panel.matches(':hover')) this.close();
    }, 180);
  }
  close() { this._closing = true; queueMicrotask(() => { this._closing = false; }); clearTimeout(this._timer); this._popup?.(); this._popup = null; this._button?.setAttribute('aria-expanded', 'false'); }
  disconnectedCallback() { this.close(); }
}
define('se-timeline-marker', SeTimelineMarker);
