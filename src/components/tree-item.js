import { define, escapeHtml } from '../helpers.js';

class SeTreeItem extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready || this._scheduled) return;
    this._scheduled = true;
    queueMicrotask(() => this.render());
  }
  render() {
    if (!this.isConnected || this.dataset.ready) return;
    this.dataset.ready = 'true';
    const children = [...this.childNodes];
    const folder = this.getAttribute('type') === 'folder';
    const disabled = this.hasAttribute('disabled');
    const selected = this.hasAttribute('selected');
    const label = escapeHtml(this.getAttribute('label') || (folder ? 'Folder' : 'File'));
    const icon = escapeHtml(this.getAttribute('icon') || (folder ? 'folder' : 'file'));
    const meta = this.getAttribute('meta') ? `<small>${escapeHtml(this.getAttribute('meta'))}</small>` : '';
    const content = `<se-icon class="se-tree-item__icon" name="${icon}"></se-icon><span>${label}</span>${meta}`;
    if (folder) {
      this.innerHTML = `<details${this.hasAttribute('open') ? ' open' : ''}><summary class="se-tree-item__row${selected ? ' se-tree-item__row--selected' : ''}"${selected ? ' aria-current="page"' : ''}${disabled ? ' aria-disabled="true"' : ''}><se-icon class="se-tree-item__chevron" name="chevron"></se-icon>${content}</summary><div class="se-tree-item__children"></div></details>`;
      this.querySelector('.se-tree-item__children').append(...children);
      const details = this.querySelector('details');
      details.addEventListener('toggle', () => this.toggleAttribute('open', details.open));
      if (disabled) this.querySelector('summary').addEventListener('click', (event) => event.preventDefault());
      return;
    }
    const href = this.getAttribute('href');
    const tag = href && !disabled ? 'a' : 'button';
    const attributes = tag === 'a' ? ` href="${escapeHtml(href)}"` : ` type="button"${disabled ? ' disabled' : ''}`;
    this.innerHTML = `<${tag} class="se-tree-item__row${selected ? ' se-tree-item__row--selected' : ''}"${attributes}${selected ? ' aria-current="page"' : ''}>${content}</${tag}>`;
  }
  get open() { return this.querySelector('details')?.open ?? this.hasAttribute('open'); }
  set open(value) { this.toggleAttribute('open', Boolean(value)); if (this.querySelector('details')) this.querySelector('details').open = Boolean(value); }
}

define('se-tree-item', SeTreeItem);
