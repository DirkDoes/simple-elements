import { escapeHtml } from './helpers.js';

const choiceVariants = new Set(['checkbox', 'radio', 'switch', 'light-dark-switch', 'light-dark-button']);

export const connectChoice = (element, type, defaultVariant) => {
  if (element.dataset.ready) return;
  element.dataset.ready = 'true';
  const requested = element.getAttribute('variant') || defaultVariant;
  const variant = choiceVariants.has(requested) ? requested : defaultVariant;
  const label = element.getAttribute('label') || element.textContent;
  const value = ` value="${escapeHtml(element.getAttribute('value') || 'on')}"`;
  const control = variant === 'checkbox' ? '<se-icon name="check"></se-icon>' : variant.startsWith('light-dark') ? '<se-icon name="sun"></se-icon><se-icon name="moon"></se-icon>' : '';
  element.innerHTML = `<label class="se-choice se-choice--${variant}"><input type="${type}" name="${escapeHtml(element.getAttribute('name') || '')}"${value}${element.hasAttribute('checked') ? ' checked' : ''}${element.hasAttribute('disabled') ? ' disabled' : ''} aria-label="${escapeHtml(label || variant)}"><span class="se-choice__control">${control}</span>${label ? `<span class="se-choice__label">${escapeHtml(label)}</span>` : ''}</label>`;
};
