import { define, emit, escapeHtml } from '../helpers.js';

const paginationInteger = value => {
  const number = Number(value);
  return Number.isSafeInteger(number) && number > 0 ? number : 1;
};

class SePagination extends HTMLElement {
  static observedAttributes = ['page', 'pages', 'label', 'disabled'];
  get pages() { return paginationInteger(this.getAttribute('pages')); }
  set pages(value) { this.setAttribute('pages', value); }
  get page() { return Math.min(this.pages, paginationInteger(this.getAttribute('page'))); }
  set page(value) { this.setAttribute('page', value); }
  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }

  render() {
    const page = this.page, pages = this.pages;
    const disabled = this.hasAttribute('disabled');
    const focused = this.contains(document.activeElement) ? document.activeElement.dataset.paginationAction : null;
    const numbers = [1];
    const start = Math.max(2, Math.min(page - 1, pages - 3));
    const end = Math.min(pages - 1, Math.max(page + 1, 4));
    for (let number = start; number <= end; number++) numbers.push(number);
    if (pages > 1) numbers.push(pages);
    const button = number => `<button type="button" class="se-button se-button--${number === page ? 'brand' : 'ghost'}" data-pagination-action="${number}" data-page="${number}" aria-label="Page ${number}"${number === page ? ' aria-current="page"' : ''}${disabled ? ' disabled' : ''}>${number}</button>`;
    const items = numbers.map((number, index) => {
      const gap = number - (numbers[index - 1] || number);
      return `${gap === 2 ? button(number - 1) : gap > 2 ? '<span class="se-pagination__ellipsis" aria-hidden="true">…</span>' : ''}${button(number)}`;
    }).join('');
    this.innerHTML = `<nav class="se-pagination" aria-label="${escapeHtml(this.getAttribute('label') || 'Pagination')}"><button type="button" class="se-button se-button--secondary" data-pagination-action="previous" data-page="${page - 1}" aria-label="Previous page"${disabled || page === 1 ? ' disabled' : ''}><se-icon name="arrow-left" aria-hidden="true"></se-icon><span class="se-pagination__direction">Previous</span></button><div class="se-pagination__pages">${items}</div><span class="se-pagination__status" aria-live="polite" aria-atomic="true">Page ${page} of ${pages}</span><button type="button" class="se-button se-button--secondary" data-pagination-action="next" data-page="${page + 1}" aria-label="Next page"${disabled || page === pages ? ' disabled' : ''}><span class="se-pagination__direction">Next</span><se-icon name="arrow-right" aria-hidden="true"></se-icon></button></nav>`;
    this.querySelectorAll('button').forEach(control => control.addEventListener('click', () => {
      const next = Number(control.dataset.page);
      if (control.disabled || next === this.page) return;
      this.page = next;
      emit(this, 'change', { page: this.page, pages: this.pages });
    }));
    if (focused) {
      const target = [...this.querySelectorAll('button')].find(control => control.dataset.paginationAction === focused && !control.disabled);
      const current = this.querySelector('[aria-current="page"]:not(:disabled)');
      const fallback = current?.getClientRects().length ? current : this.querySelector('.se-pagination > button:not(:disabled)');
      (target || fallback)?.focus({ preventScroll: true });
    }
  }
}

define('se-pagination', SePagination);
