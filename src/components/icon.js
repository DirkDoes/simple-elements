import { icons as lucideIcons } from 'lucide';
import { iconNames } from '../icon-names.js';
import { define } from '../helpers.js';

const attributeName = (name) => name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
const iconMarkup = (nodes) => nodes.map(([tag, attributes]) =>
  `<${tag}${Object.entries(attributes).filter(([name]) => name !== 'key').map(([name, value]) => ` ${attributeName(name)}="${value}"`).join('')}/>`
).join('');

class SeIcon extends HTMLElement {
  static names = Object.freeze(Object.keys(iconNames));
  static observedAttributes = ['name'];
  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  render() {
    const nodes = lucideIcons[iconNames[this.getAttribute('name')] || 'AlertCircle'];
    this.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconMarkup(nodes)}</svg>`;
  }
}

define('se-icon', SeIcon);
