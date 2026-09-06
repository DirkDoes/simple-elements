# Menu

```html
<se-menu label="More" options='[
  {"label":"Edit","icon":"edit"},
  {"label":"Delete","icon":"trash","danger":true}
]'></se-menu>
```

Options accept `label`, `icon`, `disabled`, `danger`, and `separator`. The menu opens on hover, focus, or click. Selection emits `select` with the chosen option in `event.detail`.
