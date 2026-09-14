import { icons as lucideIcons } from 'lucide';
import { iconNames } from '../icon-names.js';
import { define } from '../helpers.js';

const attributeName = (name) => name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
const iconMarkup = (nodes) => nodes.map(([tag, attributes]) =>
  `<${tag}${Object.entries(attributes).filter(([name]) => name !== 'key').map(([name, value]) => ` ${attributeName(name)}="${value}"`).join('')}/>`
).join('');

// Only paired artwork needs foreground tracking. Batch updates across all icons.
const adaptiveIcons = new Set();
let iconFrame = 0;
const refreshIcons = () => {
  if (iconFrame || !adaptiveIcons.size) return;
  iconFrame = requestAnimationFrame(() => {
    iconFrame = 0;
    for (const icon of adaptiveIcons) icon.updateArtwork();
  });
};
let iconObserver;
const watchIcons = () => {
  if (iconObserver) return;
  iconObserver = new MutationObserver((records) => {
    if (records.some(({ target, type }) => !target.closest?.('se-icon') || (type === 'attributes' && target.localName === 'se-icon'))) refreshIcons();
  });
  iconObserver.observe(document.documentElement, { attributes: true, subtree: true, childList: true });
  for (const event of ['pointerover', 'pointerout', 'pointerdown', 'pointerup', 'focusin', 'focusout', 'change', 'transitionend', 'animationend', 'load']) document.addEventListener(event, refreshIcons, true);
  window.addEventListener('resize', refreshIcons);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', refreshIcons);
};
let iconColorContext;
const lightForeground = (element) => {
  // Canvas resolves CSS colors including OKLCH/color-mix into sRGB channels.
  iconColorContext ||= document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  iconColorContext.clearRect(0, 0, 1, 1);
  iconColorContext.fillStyle = getComputedStyle(element).color;
  iconColorContext.fillRect(0, 0, 1, 1);
  const channels = [...iconColorContext.getImageData(0, 0, 1, 1).data].slice(0, 3).map((v) => {
    v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4;
  });
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722 > .179;
};
const iconAsset = (source) => {
  if (typeof source !== 'string' || !source || iconNames[source]) return false;
  if (!/^(?:data:image\/|https?:|[./\\])|\.(?:svg|png|webp|gif|jpe?g)(?:$|[?#])/i.test(source)) return false;
  try { return ['http:', 'https:', 'file:', 'data:'].includes(new URL(source, document.baseURI).protocol) && (!source.startsWith('data:') || source.startsWith('data:image/')); } catch { return false; }
};

class SeIcon extends HTMLElement {
  static names = Object.freeze(Object.keys(iconNames));
  static observedAttributes = ['name'];
  get icon() { try { return JSON.parse(this.getAttribute('name')); } catch { return this.getAttribute('name'); } }
  set icon(value) { this.setAttribute('name', typeof value === 'object' ? JSON.stringify(value) : value); }
  connectedCallback() { this.render(); }
  disconnectedCallback() { adaptiveIcons.delete(this); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  render() {
    adaptiveIcons.delete(this);
    const raw = this.getAttribute('name') || '';
    let config;
    try { config = JSON.parse(raw); } catch { config = raw; }
    config = config && typeof config === 'object' && !Array.isArray(config) ? config : { light: typeof config === 'string' ? config : raw };
    this._config = { light: typeof config.light === 'string' ? config.light : '', dark: typeof config.dark === 'string' ? config.dark : '', preserveLightColors: typeof config.preserveLightColors === 'boolean' ? config.preserveLightColors : true, preserveDarkColors: typeof config.preserveDarkColors === 'boolean' ? config.preserveDarkColors : undefined };
    this._artworkKey = null;
    this.updateArtwork();
    if (this._config.dark || this._config.preserveDarkColors !== undefined) {
      adaptiveIcons.add(this); watchIcons(); refreshIcons();
    }
  }
  updateArtwork() {
    const config = this._config;
    const light = !(config.dark || config.preserveDarkColors !== undefined) || lightForeground(this);
    const source = (!light && config.dark) || config.light || 'alert-circle';
    const preserve = !light ? (config.preserveDarkColors ?? config.preserveLightColors ?? true) : (config.preserveLightColors ?? true);
    const key = JSON.stringify([source, preserve]);
    if (key === this._artworkKey) return;
    this._artworkKey = key;
    if (iconAsset(source)) {
      if (preserve !== false) {
        const image = document.createElement('img');
        image.src = source; image.alt = ''; image.draggable = false;
        this.replaceChildren(image);
      } else {
        const mask = document.createElement('span');
        mask.className = 'se-icon__mask';
        mask.style.maskImage = `url(${JSON.stringify(source)})`;
        mask.style.webkitMaskImage = `url(${JSON.stringify(source)})`;
        this.replaceChildren(mask);
      }
    } else {
      const nodes = lucideIcons[Object.hasOwn(iconNames, source) ? iconNames[source] : 'AlertCircle'];
      this.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconMarkup(nodes)}</svg>`;
    }
  }
}

define('se-icon', SeIcon);
