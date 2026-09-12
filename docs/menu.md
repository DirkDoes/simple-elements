# Menu

```html
<se-menu label="More" options='[
  {"label":"Edit","icon":"edit"},
  {"label":"Delete","icon":"trash","danger":true}
]'></se-menu>
```

Options accept `label`, `icon`, `disabled`, `danger`, and `separator`; assign the array as JSON in `options` or through the `options` property. The menu opens on hover, focus, or click. Selection emits `select` with the chosen option in `event.detail`.
