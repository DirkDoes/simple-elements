import { define, escapeHtml } from '../helpers.js';

class SeThoughtTrain extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    this.render();
  }

  render() {
    const collapsible = this.hasAttribute('collapsible');
    const clickable = this.hasAttribute('clickable');
    const expanded = collapsible && this.hasAttribute('open');
    const tag = collapsible || clickable ? 'button' : 'div';
    const content = this.getAttribute('content') ?? this.innerHTML.trim();
    const variant = ['gray', 'brand', 'success', 'warning', 'error', 'info', 'important'].includes(this.getAttribute('variant')) ? this.getAttribute('variant') : 'brand';
    this.innerHTML = `<div class="se-thought-train se-thought-train--${variant}"><${tag} class="se-thought-train__head"${tag === 'button' ? ' type="button"' : ''}${collapsible ? ` aria-expanded="${expanded}"` : ''}><span class="se-thought-train__marker"><se-icon name="${escapeHtml(this.getAttribute('icon') || 'activity')}"></se-icon></span><strong>${escapeHtml(this.getAttribute('title') || 'Thought process')}</strong>${collapsible ? '<se-icon class="se-thought-train__chevron" name="chevron"></se-icon>' : ''}</${tag}>${content ? `<div class="se-thought-train__content${collapsible && !expanded ? ' se-thought-train__content--collapsed' : ''}"${collapsible ? ` aria-hidden="${!expanded}"` : ''}><div>${content}</div></div>` : ''}</div>`;
    if (!collapsible) return;
    const trigger = this.querySelector('.se-thought-train__head');
    const details = this.querySelector('.se-thought-train__content');
    trigger.addEventListener('click', () => { const open = trigger.attributes.getNamedItem('aria-expanded')?.value !== 'true'; trigger.setAttribute('aria-expanded', String(open)); if (details) { details.classList.toggle('se-thought-train__content--collapsed', !open); details.setAttribute('aria-hidden', String(!open)); } });
  }
}

define('se-thought-train', SeThoughtTrain);
