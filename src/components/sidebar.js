import { define, emit, escapeHtml, parseOptions } from '../helpers.js';

class SeSidebar extends HTMLElement {
  set options(value) { this._options = value; if (this.isConnected) this.render(); }
  get options() { return this._options; }
  connectedCallback() { if (!this.dataset.ready) { this.dataset.ready = 'true'; this.render(); } }
  render() {
    const options = parseOptions(this);
    this.innerHTML = `<aside class="se-sidebar"><header class="se-sidebar__header"><span class="se-sidebar__brand"><span class="se-sidebar__logo"><se-icon name="${escapeHtml(this.getAttribute('icon') || 'dashboard')}"></se-icon></span><span>${escapeHtml(this.getAttribute('label') || 'Simple Elements')}</span></span><button class="se-close se-sidebar__collapse" type="button" aria-label="Collapse sidebar"><se-icon name="panel-left-close"></se-icon></button></header><nav class="se-sidebar__nav"><se-title level="sidebar">${escapeHtml(this.getAttribute('heading') || 'Components')}</se-title>${options.map((option, index) => `<a class="se-sidebar__link${option.active || (!options.some((item) => item.active) && index === 0) ? ' se-sidebar__link--active' : ''}" href="${escapeHtml(option.href || '#')}" data-index="${index}" title="${escapeHtml(option.label)}">${option.icon ? `<se-icon name="${escapeHtml(option.icon)}"></se-icon>` : ''}<span>${escapeHtml(option.label)}</span></a>`).join('')}</nav><footer class="se-sidebar__footer"><div class="se-sidebar__theme-row"><span>Theme</span><se-checkbox variant="light-dark-switch" label="Toggle dark mode" data-theme-control${document.documentElement.dataset.theme === 'dark' ? ' checked' : ''}></se-checkbox></div></footer></aside>`;
    const root = this.querySelector('.se-sidebar');
    this.querySelector('.se-sidebar__collapse').addEventListener('click', (event) => { root.classList.toggle('se-sidebar--collapsed'); event.currentTarget.innerHTML = `<se-icon name="${root.classList.contains('se-sidebar--collapsed') ? 'panel-left-open' : 'panel-left-close'}"></se-icon>`; });
    this.querySelector('[data-theme-control]').addEventListener('change', (event) => { const control = event.currentTarget; document.documentElement.dataset.theme = control.checked ? 'dark' : 'light'; emit(this, 'themechange', { theme: document.documentElement.dataset.theme }); });
    this.querySelectorAll('[data-index]').forEach((link) => link.addEventListener('click', () => { this.querySelector('.se-sidebar__link--active')?.classList.remove('se-sidebar__link--active'); link.classList.add('se-sidebar__link--active'); }));
  }
}

define('se-sidebar', SeSidebar);
