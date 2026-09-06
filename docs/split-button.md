# Split button

```html
<se-split-button options='[
  {"id":"publish","label":"Publish Changes","icon":"send"},
  {"id":"draft","label":"Save as Draft","icon":"file"}
]'></se-split-button>
```

Assign `options` as JSON or JavaScript. Choosing an item emits `change`; clicking the primary action emits `action` with the selected option.
