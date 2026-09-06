# Select

```html
<se-select name="plan" label="Plan" searchable options='[
  {"id":"basic","label":"Basic Plan"},
  {"id":"pro","label":"Pro Plan","description":"For growing teams","icon":"zap"}
]'></se-select>
```

Add `multiple` for multi-select and a comma-separated `value` for defaults. Options accept `id`, `label`, `description`, `icon`, `disabled`, `selected`, and `locked`. For JavaScript data, assign `element.options = [...]`. The component emits `change` with `event.detail.value` and creates hidden form inputs using `name`.
