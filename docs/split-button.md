# Split button

```html
<se-split-button
  variant="brand"
  type="submit"
  text="Publish Changes"
  icon="send"
  options='[
  {"id":"publish","label":"Publish Changes","icon":"send"},
  {"id":"draft","label":"Save as Draft","icon":"file"}
]'>
</se-split-button>
```

Assign `options` as JSON or JavaScript. Choosing an item emits `change`; clicking the primary action emits `action` with the selected option.

`variant`, `type`, `text`, `icon`, `disabled`, and `aria-label` match the corresponding button attributes. `label` remains available as a compatibility alias for fallback text.

Add `direct` to emit `action` immediately when a menu option is chosen instead of replacing the primary action. Each option accepts its own `label`, `icon`, and optional `disabled` state. Keyboard focus is drawn around the complete split button.
