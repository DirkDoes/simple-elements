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

export const placePopover = (trigger, popover) => {
  const triggerRect = trigger.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const gap = 8;
  popover.dataset.popoverY = innerHeight - triggerRect.bottom >= popoverRect.height + gap || triggerRect.top < popoverRect.height + gap ? 'down' : 'up';
  popover.dataset.popoverX = innerWidth - triggerRect.left >= popoverRect.width || triggerRect.right < popoverRect.width ? 'right' : 'left';
};

// Icon objects cross HTML attribute boundaries as JSON, never as SVG markup.
export const escapeIcon = (value) => escapeHtml(value && typeof value === 'object' ? JSON.stringify(value) : value);

// Sidebar sections scroll, so their tooltips use the top layer to avoid clipping.
export const sidebarTooltip = (host, trigger, label) => {
  const tip = document.createElement('span');
  tip.className = 'se-tooltip__bubble se-sidebar-tooltip';
  tip.setAttribute('role', 'tooltip');
  tip.setAttribute('popover', 'manual');
  tip.textContent = label;
  host.append(tip);
  const hide = () => { if (tip.matches(':popover-open')) tip.hidePopover(); };
  const show = () => {
    if (!host.closest('[data-sidebar-collapsed]') || trigger.matches(':disabled')) return;
    tip.showPopover();
    const rect = trigger.getBoundingClientRect();
    tip.style.left = `${Math.min(rect.right + 8, innerWidth - tip.offsetWidth - 8)}px`;
    tip.style.top = `${Math.max(8, Math.min(rect.top + (rect.height - tip.offsetHeight) / 2, innerHeight - tip.offsetHeight - 8))}px`;
  };
  trigger.addEventListener('pointerenter', show);
  trigger.addEventListener('pointerleave', hide);
  trigger.addEventListener('focus', show);
  trigger.addEventListener('blur', hide);
  trigger.addEventListener('click', hide);
  trigger.addEventListener('keydown', event => { if (event.key === 'Escape') hide(); });
};
