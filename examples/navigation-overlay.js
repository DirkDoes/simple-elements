// Application behavior shared by the showcase and copied into its editable recipes.
export function navigationOverlay({ panel, trigger, content = [], breakpoint = 767, desktopVisible = false }) {
  const media = matchMedia(`(max-width:${breakpoint}px)`);
  const backdrop = document.createElement('div');
  backdrop.className = 'navigation-backdrop';
  backdrop.hidden = true;
  backdrop.setAttribute('aria-hidden', 'true');
  panel.before(backdrop);
  let open = false;
  let generation = 0;
  let animations = [];
  let previousMinimized;
  const inertState = new Map();
  const place = () => {
    const top = trigger.closest('header')?.getBoundingClientRect().bottom || 0;
    panel.style.setProperty('--navigation-top', `${top}px`);
    backdrop.style.setProperty('--navigation-top', `${top}px`);
  };
  const animate = (element, frames) => {
    const animation = element.animate(frames, { duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 180, easing: 'ease-out', fill: 'both' });
    animations.push(animation);
    return animation.finished.catch(() => {});
  };
  const setOpen = async (value, returnFocus = true) => {
    if (!media.matches) return;
    open = value;
    const current = ++generation;
    animations.forEach(animation => animation.cancel());
    animations = [];
    place();
    if (open) {
      panel.hidden = false;
      panel.inert = false;
      backdrop.hidden = false;
      content.forEach(element => { if (!inertState.has(element)) inertState.set(element, element.inert); element.inert = true; });
      trigger.querySelector('button')?.setAttribute('aria-expanded', 'true');
      await Promise.all([
        animate(panel, [{ opacity: 0, transform: 'translateY(-12px)', clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, transform: 'none', clipPath: 'inset(0)' }]),
        animate(backdrop, [{ opacity: 0 }, { opacity: 1 }]),
      ]);
    } else {
      if (returnFocus || panel.contains(document.activeElement)) trigger.querySelector('button')?.focus();
      panel.inert = true;
      trigger.querySelector('button')?.setAttribute('aria-expanded', 'false');
      await Promise.all([
        animate(panel, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-12px)' }]),
        animate(backdrop, [{ opacity: 1 }, { opacity: 0 }]),
      ]);
      if (current !== generation) return;
      panel.hidden = true;
      backdrop.hidden = true;
      inertState.forEach((value, element) => { element.inert = value; });
      inertState.clear();
    }
    if (current === generation) {
      animations.forEach(animation => animation.cancel()); animations = [];
      if (open) panel.querySelector('a, button:not(:disabled), input')?.focus();
    }
  };
  const beforeToggle = event => { if (media.matches) { event.preventDefault(); setOpen(!open); } };
  const dismiss = () => setOpen(false);
  const escape = event => { if (open && event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); dismiss(); } };
  const navigate = event => { if (open && event.target.closest('a, se-nav-item')) setOpen(false); };
  const focus = event => { if (open && !panel.contains(event.target) && !trigger.contains(event.target)) setOpen(false, false); };
  const sync = () => {
    ++generation;
    animations.forEach(animation => animation.cancel()); animations = [];
    const restoreFocus = panel.contains(document.activeElement);
    open = false; backdrop.hidden = true; panel.inert = false;
    inertState.forEach((value, element) => { element.inert = value; }); inertState.clear();
    if (media.matches) {
      previousMinimized = panel.getAttribute('data-se-minimized');
      panel.setAttribute('data-se-minimized', 'false');
      panel.hidden = true;
    } else {
      if (previousMinimized === null) panel.removeAttribute('data-se-minimized');
      else if (previousMinimized !== undefined) panel.setAttribute('data-se-minimized', previousMinimized);
      panel.hidden = !desktopVisible;
    }
    if (restoreFocus && panel.hidden) {
      const button = trigger.querySelector('button');
      const destination = button?.getClientRects().length ? button : content.find(element => element.getClientRects().length);
      if (destination) { if (destination !== button) destination.tabIndex = -1; destination.focus(); }
    }
    place();
  };
  trigger.addEventListener('beforetoggle', beforeToggle);
  panel.addEventListener('click', navigate);
  backdrop.addEventListener('click', dismiss);
  document.addEventListener('keydown', escape);
  document.addEventListener('focusin', focus);
  window.addEventListener('resize', place);
  media.addEventListener('change', sync);
  sync();
  return {
    close: dismiss,
    destroy() {
      ++generation; animations.forEach(animation => animation.cancel());
      inertState.forEach((value, element) => { element.inert = value; });
      trigger.removeEventListener('beforetoggle', beforeToggle);
      panel.removeEventListener('click', navigate);
      document.removeEventListener('keydown', escape);
      document.removeEventListener('focusin', focus);
      window.removeEventListener('resize', place);
      media.removeEventListener('change', sync);
      backdrop.remove();
    },
  };
}

export const navigationOverlayStyles = `
.navigation-backdrop{position:fixed;inset:var(--navigation-top,64px) 0 0;z-index:20;background:color-mix(in srgb,var(--se-bg) 45%,transparent);backdrop-filter:blur(4px)}
.navigation-backdrop[hidden]{display:none}
@media(max-width:767px){[data-mobile-navigation]:not([hidden]){position:fixed;z-index:21;top:var(--navigation-top,64px);left:0;right:0;width:auto;height:auto;max-height:calc(100dvh - var(--navigation-top,64px) - 24px);overflow:auto;background:var(--se-surface);border-bottom:1px solid var(--se-border);box-shadow:var(--se-shadow-lg);padding:20px;overscroll-behavior:contain}}
`;
