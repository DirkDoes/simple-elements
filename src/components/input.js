import { define, escapeHtml } from '../helpers.js';

const typeDefaults = {
  text: { placeholder: 'Enter some text...' },
  email: { placeholder: 'you@example.com', icon: 'mail' },
  password: { placeholder: 'Enter your password', icon: 'lock' },
  number: { placeholder: 'Enter a number...' },
  tel: { placeholder: 'Enter a phone number...', icon: 'phone' },
  url: { placeholder: 'https://example.com', icon: 'link' },
  search: { placeholder: 'Search...', icon: 'search' },
  textarea: { placeholder: 'Enter some text...' },
};

class SeInput extends HTMLElement {
  static defaultsFor(type = 'text') { return { ...(typeDefaults[type] || {}) }; }

  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const id = this.getAttribute('id') || `se-input-${crypto.randomUUID()}`;
    const type = this.getAttribute('type') || 'text';
    const textarea = type === 'textarea';
    const defaults = SeInput.defaultsFor(type);
    const icon = this.hasAttribute('icon') ? this.getAttribute('icon') : defaults.icon;
    const placeholder = this.hasAttribute('placeholder') ? this.getAttribute('placeholder') : defaults.placeholder || '';
    const error = this.getAttribute('error');
    const attrs = [
      `id="${id}"`,
      `name="${escapeHtml(this.getAttribute('name') || '')}"`,
      `placeholder="${escapeHtml(placeholder)}"`,
      this.hasAttribute('disabled') ? 'disabled' : '',
      this.hasAttribute('required') ? 'required' : '',
      this.hasAttribute('value') ? `value="${escapeHtml(this.getAttribute('value'))}"` : '',
    ].filter(Boolean).join(' ');
    const label = this.getAttribute('label');
    this.classList.toggle('se-field--error', Boolean(error));
    this.innerHTML = `${label ? `<label class="se-label" for="${id}">${escapeHtml(label)}${this.hasAttribute('required') ? '<span class="se-required">*</span>' : ''}</label>` : ''}
      <div class="se-input-wrap${icon ? ' se-input-wrap--icon' : ''}">
        ${icon ? `<se-icon name="${escapeHtml(icon)}"></se-icon>` : ''}
        ${textarea ? `<textarea class="se-control" ${attrs}${this.hasAttribute('autosize') ? ' data-autosize' : this.hasAttribute('fixed') ? ' data-fixed' : ''}>${escapeHtml(this.getAttribute('value') || '')}</textarea>` : `<input class="se-control" type="${escapeHtml(type)}" ${attrs}>`}
        ${error ? '<se-icon name="alert"></se-icon>' : ''}
        ${type === 'password' ? '<button class="se-password-toggle" type="button" aria-label="Show password"><se-icon name="eye"></se-icon></button>' : ''}
      </div>
      ${error || this.getAttribute('hint') ? `<small class="se-hint${error ? ' se-hint--error' : ''}">${escapeHtml(error || this.getAttribute('hint'))}</small>` : ''}`;
    const autosizeInput = this.querySelector('textarea[data-autosize]');
    if (autosizeInput) {
      const resize = () => { autosizeInput.style.height = '0px'; autosizeInput.style.height = `${autosizeInput.scrollHeight}px`; };
      autosizeInput.addEventListener('input', resize);
      resize();
    }
    this.querySelector('.se-password-toggle')?.addEventListener('click', (event) => {
      const input = this.querySelector('input');
      input.type = input.type === 'password' ? 'text' : 'password';
      event.currentTarget.innerHTML = `<se-icon name="${input.type === 'password' ? 'eye' : 'eye-off'}"></se-icon>`;
      event.currentTarget.setAttribute('aria-label', `${input.type === 'password' ? 'Show' : 'Hide'} password`);
    });
  }

  get value() { return this.querySelector('input, textarea')?.value || ''; }
  set value(value) { const input = this.querySelector('input, textarea'); if (input) input.value = value; }
}

define('se-input', SeInput);
