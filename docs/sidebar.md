# Sidebar

```html
<se-sidebar label="Simple Elements" options='[
  {"label":"Dashboard","icon":"dashboard","href":"#dashboard"},
  {"label":"Settings","icon":"settings","href":"#settings"}
]'></se-sidebar>
```

Options accept `label`, `icon`, and `href`. The header button collapses the sidebar. The built-in theme control sets `data-theme` on `<html>` and emits `themechange`.
