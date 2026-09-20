# Select

```html
<se-select name="plan" label="Plan" searchable options='[
  {"id":"basic","label":"Basic Plan"},
  {"id":"pro","label":"Pro Plan","description":"For growing teams","icon":"zap"}
]'></se-select>
```

Add `size="small"` for compact toolbars and dense controls. Use `placeholder` to change the empty trigger text. Add `multiple` for multi-select, `clearable` to let users clear a single selection, and a comma-separated `value` for defaults. Multi-select tags are already individually removable, so `clearable` has no effect on them. Options accept `id`, `label`, `description`, `icon`, `disabled`, `selected`, and `locked`. For JavaScript data, assign `element.options = [...]`. The component emits `change` with `event.detail.value` and creates hidden form inputs using `name`.

Supports `label`, `name`, `value`, `placeholder`, `options`, `size`, `multiple`, `searchable`, `clearable`, and `disabled`.

Icon inputs support Lucide names, asset URLs, and the shared [icon configuration object](icon.md).

Select lists (single and multiple) and action menus appear above modal footers and scrolling containers using the browser top layer. They flip upward when needed and stay within the viewport; long lists retain their own scrolling. Escape dismisses an open list before the modal.

`size="normal"` is the default field density; use `size="small"` for compact controls. Popup contents retain their usual layout.

## Async search

Use `searchable remote` to keep the existing UI while your app supplies results. `remote` disables local text filtering and emits `search` with `event.detail.query` on every edit. `empty-text` updates live and can show minimum-length, loading, no-results, or error messages in the usual empty-state position. The same API works with `multiple`.

```html
<se-select id="people" label="People" searchable remote multiple
  empty-text="Type at least 3 characters."></se-select>
```

```js
const select = document.querySelector('#people');
const minimum = 3;
let timer, controller;
let request = 0;

select.addEventListener('search', ({ detail: { query } }) => {
  clearTimeout(timer);
  controller?.abort();
  const current = ++request;
  query = query.trim();
  select.options = [];
  if (query.length < minimum) {
    select.setAttribute('empty-text', `Type at least ${minimum} characters.`);
    return;
  }
  select.setAttribute('empty-text', 'Searching…');
  timer = setTimeout(async () => {
    controller = new AbortController();
    try {
      const response = await fetch(`/api/people?q=${encodeURIComponent(query)}`, {
        signal: controller.signal
      });
      if (!response.ok) throw new Error('Search failed');
      const people = await response.json();
      if (current !== request) return;
      select.setAttribute('empty-text', 'No people found.');
      select.options = people.map(person => ({ id: person.id, label: person.name }));
    } catch (error) {
      if (current !== request || error.name === 'AbortError') return;
      select.setAttribute('empty-text', 'Could not load people. Try again.');
    }
  }, 250);
});
```

The app owns requests, debounce, minimum length, and stale-response handling. Return a limited result page rather than the entire dataset. Updating `options` keeps the open dropdown, search text/input, and focus intact. In remote mode, selected labels and submitted values remain available when later result pages omit those items. Supply initially selected records in `options` together with `value` so their labels are known. Remove `multiple` for single selection.
