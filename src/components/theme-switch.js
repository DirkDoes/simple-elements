import { define, emit, escapeHtml } from '../helpers.js';

const themes = {
  light: { label: 'Light', icon: 'sun' },
  system: { label: 'System', icon: 'settings' },
  dark: { label: 'Dark', icon: 'moon' },
};

class SeThemeSwitch extends HTMLElement {
  connectedCallback() { if (!this.dataset.ready) { this.dataset.ready = 'true'; this.render(); } }
  get value() { return this.querySelector('input:checked, input[type="hidden"]')?.value || this.getAttribute('value') || 'light'; }
  set value(value) { this.setAttribute('value', value); if (this.isConnected) this.render(); }

  render() {
    const mode = this.getAttribute('mode') === 'ternary' ? 'ternary' : 'binary';
    const options = mode === 'ternary' ? ['light', 'system', 'dark'] : ['light', 'dark'];
    const requested = this.getAttribute('value') || 'light';
    const value = options.includes(requested) ? requested : 'light';
    const requestedVariant = this.getAttribute('variant') || 'switch';
    const variant = ['switch', 'segmented', 'button'].includes(requestedVariant) ? requestedVariant : 'switch';
    const suppliedName = this.getAttribute('name') || '';
    const label = this.getAttribute('label') || '';
    const accessibleLabel = escapeHtml(this.getAttribute('aria-label') || label || 'Theme');
    const disabled = this.hasAttribute('disabled');

    if (variant === 'button' || variant === 'switch') {
      const theme = themes[value];
      const switchContent = options.map((option) => `<span class="se-theme__option"${option === value ? ' data-selected' : ''}><se-icon name="${themes[option].icon}"></se-icon><strong>${themes[option].label}</strong></span>`).join('');
      this.innerHTML = `<div class="se-theme se-theme--${variant} se-theme--${value}" style="--se-theme-count:${options.length};--se-theme-index:${options.indexOf(value)}"><input type="hidden" name="${escapeHtml(suppliedName)}" value="${value}"${disabled ? ' disabled' : ''}>${variant === 'switch' && label ? `<span class="se-theme__label">${escapeHtml(label)}</span>` : ''}<button class="${variant === 'switch' ? 'se-theme__options' : ''}" type="button" aria-label="${accessibleLabel}: ${theme.label}"${disabled ? ' disabled' : ''}>${variant === 'switch' ? switchContent : `<se-icon name="${theme.icon}"></se-icon>`}</button></div>`;
      this.querySelector('button').addEventListener('click', () => { this.value = options[(options.indexOf(value) + 1) % options.length]; emit(this, 'change', { value: this.value }); });
      return;
    }

    this.innerHTML = `<div class="se-theme se-theme--segmented"><se-segmented-control${label ? ` label="${escapeHtml(label)}"` : ''} aria-label="${accessibleLabel}"${suppliedName ? ` name="${escapeHtml(suppliedName)}"` : ''} value="${value}"${disabled ? ' disabled' : ''}></se-segmented-control></div>`;
    const control = this.querySelector('se-segmented-control');
    control.options = options.map((option) => ({ id: option, ...themes[option] }));
    control.addEventListener('change', (event) => { event.stopPropagation(); this.setAttribute('value', event.detail.value); emit(this, 'change', event.detail); });
  }
}

define('se-theme-switch', SeThemeSwitch);
