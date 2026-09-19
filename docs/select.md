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
