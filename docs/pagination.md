# Pagination

A standalone control for tables, lists, and search results. It uses the current theme's button styles, highlights the current page, and inserts ellipses for long page ranges. In containers narrower than 32rem, it shows previous/next arrows and “Page X of Y”.

```html
<se-pagination page="4" pages="12" label="Results pages"></se-pagination>
```

| Attribute | Default | Purpose |
| --- | --- | --- |
| `page` | `1` | Current page (1-based), clamped to the available pages. |
| `pages` | `1` | Total number of pages. |
| `label` | `Pagination` | Accessible name of the navigation landmark. |
| `disabled` | Absent | Boolean attribute disabling all buttons, for example while loading results. |

`page` and `pages` are also numeric JavaScript properties. Changes to these attributes, `label`, and `disabled` update the control immediately. Invalid, nonpositive, fractional, or unsafe-integer values fall back to 1. With zero results, leave `pages="1"` or hide the control in your app.

Previous and next are disabled at their respective boundaries. Number buttons include the first/last page and a small range around the current page, so even very large page counts remain compact. The current page exposes `aria-current="page"`; all controls are native buttons with keyboard focus and do not submit forms or navigate to a URL.

## Connect it to your data

A user selecting another page updates `page` and emits a bubbling `change` event with `event.detail = { page, pages }`. Clicking the current page, clicking a disabled button, and programmatic updates do not emit this event. The component does not fetch, filter, or modify your table; the app owns those operations.

```html
<se-collection type="table" id="results">
  <!-- Your table headers and rows -->
</se-collection>
<se-pagination id="results-pages" pages="12"></se-pagination>

<script>
  const pagination = document.querySelector('#results-pages');
  pagination.addEventListener('change', (event) => {
    // Fetch or display this slice of your data, then update your table.
    const page = event.detail.page;
    console.log('Load page', page);
  });

  // When the result count changes:
  pagination.pages = 5;
  pagination.page = 1;
</script>
```

The control fills its container and centers the desktop buttons. Place it under any component; it has no dependency on a specific table or list implementation. The component showcase starts on page 4 of 12 so the range and ellipsis are visible.
