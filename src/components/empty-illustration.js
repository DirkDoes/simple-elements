import { define, escapeHtml } from '../helpers.js';
import { emptyIllustrations } from '../illustrations.js';

const emptyIllustrationLabels = {
  "analytics": "Results",
  "schedule": "Schedule",
  "files-2": "Files",
  "folders-2": "Projects",
  "team-2": "Team",
  "invoices": "Invoice",
  "questionnaires": "Your feedback",
  "schedule-2": "Schedule",
  "timeline": "Timeline",
  "inbox": ""
};

let emptyIllustrationId = 0;

class SeEmptyIllustration extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready) return;
    this.dataset.ready = 'true';
    const content = [...this.childNodes];
    const requestedVariant = this.getAttribute('variant');
    const variant = Object.hasOwn(emptyIllustrations, requestedVariant) ? requestedVariant : 'start';
    const label = this.getAttribute('illustration-label') ?? emptyIllustrationLabels[variant] ?? '';
    const artwork = emptyIllustrations[variant].replace('{{illustration-label}}', () => escapeHtml(label));
    // Inline gradient IDs must stay unique when illustrations repeat on a page.
    const prefix = 'se-illustration-' + ++emptyIllustrationId + '-';
    const svg = artwork.replace(/id="([^"]+)"/g, 'id="' + prefix + '$1"').replace(/url\(#([^)]+)\)/g, 'url(#' + prefix + '$1)');
    const title = this.getAttribute('title');
    const subtitle = this.getAttribute('subtitle');
    this.innerHTML = `<div class="se-empty-state se-empty-illustration" title=""><div class="se-empty-illustration__art">${svg}</div>${title ? `<se-title level="card">${escapeHtml(title)}</se-title>` : ''}${subtitle ? `<se-text muted>${escapeHtml(subtitle)}</se-text>` : ''}</div>`;
    if (content.some(node => node.nodeType !== 3 || node.textContent.trim())) {
      const actions = document.createElement('div');
      actions.className = 'se-empty-state__actions';
      actions.append(...content);
      this.firstElementChild.append(actions);
    }
  }
}

define('se-empty-illustration', SeEmptyIllustration);
