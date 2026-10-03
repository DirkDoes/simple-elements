// A single, application-controlled suggestion list for native and rich-text editors.
export function attachCompletions(host, editable) {
  let items = [];
  let selected = 0;
  const menu = document.createElement('div');
  menu.className = 'se-completions';
  menu.setAttribute('role', 'listbox');
  menu.hidden = true;
  document.body.append(menu);
  const caretRect = () => {
    if (editable.isContentEditable) {
      const selection = document.getSelection();
      if (selection?.rangeCount && editable.contains(selection.anchorNode)) {
        const rect = selection.getRangeAt(0).getBoundingClientRect();
        if (rect.height) return rect;
      }
    } else if (editable.localName === 'textarea') {
      const style = getComputedStyle(editable);
      const mirror = document.createElement('div');
      Object.assign(mirror.style, {
        position: 'fixed', visibility: 'hidden', pointerEvents: 'none',
        width: `${editable.getBoundingClientRect().width}px`, boxSizing: style.boxSizing,
        padding: style.padding, border: style.border, font: style.font,
        letterSpacing: style.letterSpacing, lineHeight: style.lineHeight,
        whiteSpace: style.whiteSpace, overflowWrap: style.overflowWrap, tabSize: style.tabSize,
      });
      mirror.textContent = editable.value.slice(0, editable.selectionStart);
      const marker = document.createElement('span');
      marker.textContent = '\u200b';
      mirror.append(marker);
      document.body.append(mirror);
      const markerRect = marker.getBoundingClientRect();
      const mirrorRect = mirror.getBoundingClientRect();
      const fieldRect = editable.getBoundingClientRect();
      mirror.remove();
      return { left: fieldRect.left + markerRect.left - mirrorRect.left - editable.scrollLeft, bottom: fieldRect.top + markerRect.bottom - mirrorRect.top - editable.scrollTop };
    }
    return editable.getBoundingClientRect();
  };
  const position = () => {
    if (menu.hidden) return;
    const rect = caretRect();
    const width = Math.min(360, Math.max(240, editable.getBoundingClientRect().width), innerWidth - 16);
    menu.style.width = `${width}px`;
    menu.style.left = `${Math.max(8, Math.min(rect.left, innerWidth - width - 8))}px`;
    menu.style.top = `${rect.bottom + menu.offsetHeight + 8 > innerHeight ? Math.max(8, rect.bottom - menu.offsetHeight - 20) : rect.bottom + 4}px`;
  };
  const render = () => {
    menu.hidden = !items.length || document.activeElement !== editable;
    if (menu.hidden) { editable.removeAttribute('aria-activedescendant'); return; }
    menu.innerHTML = items.map((item, index) => `<div class="se-completions__item${index === selected ? ' se-completions__item--active' : ''}" role="option" id="${host._completionId}-${index}" aria-selected="${index === selected}">${item.icon ? `<se-icon name="${escapeIcon(item.icon)}"></se-icon>` : ''}<span class="se-completions__text">${escapeHtml(item.text)}</span>${item.description ? `<span class="se-completions__description">${escapeHtml(item.description)}</span>` : ''}</div>`).join('');
    editable.setAttribute('aria-activedescendant', `${host._completionId}-${selected}`);
    position();
  };
  const update = () => {
    try {
      const value = JSON.parse(host.getAttribute('completions') || '[]');
      items = Array.isArray(value) ? value.filter((item) => item && typeof item.text === 'string' && item.text).map((item) => ({ text: item.text, description: item.description || '', icon: item.icon || '' })) : [];
    } catch { items = []; }
    selected = 0;
    render();
  };
  const accept = () => {
    if (!items.length) return;
    const text = items[selected].text;
    if (editable.isContentEditable) {
      editable.focus();
      const selection = document.getSelection();
      if (selection?.rangeCount) {
        const range = selection.getRangeAt(0);
        const prefix = range.startContainer.nodeType === Node.TEXT_NODE ? range.startContainer.textContent.slice(0, range.startOffset).match(/[\w]+$/)?.[0] || '' : '';
        if (prefix && text.toLowerCase().startsWith(prefix.toLowerCase())) range.setStart(range.startContainer, range.startOffset - prefix.length);
        range.deleteContents();
        const node = document.createTextNode(text);
        range.insertNode(node);
        range.setStartAfter(node);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    } else {
      const start = editable.selectionStart;
      const prefix = editable.value.slice(0, start).match(/[\w]+$/)?.[0] || '';
      editable.setRangeText(text, prefix && text.toLowerCase().startsWith(prefix.toLowerCase()) ? start - prefix.length : start, editable.selectionEnd, 'end');
    }
    editable.dispatchEvent(new Event('input', { bubbles: true }));
    const item = items[selected];
    items = [];
    render();
    host.removeAttribute('completions');
    host.dispatchEvent(new CustomEvent('completion', { bubbles: true, detail: { item } }));
  };
  host._completionId = `se-completion-${crypto.randomUUID()}`;
  host._hasCompletions = () => items.length > 0;
  host._updateCompletions = update;
  editable.setAttribute('aria-autocomplete', 'list');
  editable.setAttribute('aria-controls', host._completionId);
  menu.id = host._completionId;
  editable.addEventListener('keydown', (event) => {
    if (!items.length || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); selected = (selected + (event.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length; render(); }
    if (event.key === 'Tab' || event.key === 'Enter') { event.preventDefault(); accept(); }
    if (event.key === 'Escape') { event.preventDefault(); items = []; render(); host.removeAttribute('completions'); }
  });
  editable.addEventListener('focus', render);
  editable.addEventListener('blur', () => queueMicrotask(render));
  editable.addEventListener('input', () => { if (items.length) render(); });
  menu.addEventListener('pointerdown', (event) => event.preventDefault());
  menu.addEventListener('click', (event) => { const option = event.target.closest('[role="option"]'); if (option) { selected = Number(option.id.slice(host._completionId.length + 1)); accept(); } });
  const observer = new MutationObserver(update);
  observer.observe(host, { attributes: true, attributeFilter: ['completions'] });
  const cleanup = () => { if (!host.isConnected) { menu.remove(); observer.disconnect(); window.removeEventListener('scroll', position, true); window.removeEventListener('resize', position); } };
  window.addEventListener('scroll', position, true);
  window.addEventListener('resize', position);
  host._disposeCompletions = cleanup;
  update();
}
