export const define = (name, Component) => {
  if (!customElements.get(name)) customElements.define(name, Component);
};

export const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

export const parseOptions = (element) => {
  try {
    return element.options || JSON.parse(element.getAttribute('options') || '[]');
  } catch {
    return [];
  }
};

export const emit = (element, name, detail) => element.dispatchEvent(
  new CustomEvent(name, { bubbles: true, detail }),
);
