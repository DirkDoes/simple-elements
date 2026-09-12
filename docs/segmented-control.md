# Segmented control

```html
<se-segmented-control
  label="View"
  name="view"
  value="grid"
  options='[
    {"id":"grid","label":"Grid","icon":"dashboard"},
    {"id":"list","label":"List"},
    {"id":"compact","icon":"table","ariaLabel":"Compact"}
  ]'>
</se-segmented-control>
```

`options` accepts items with an `id` and optional `label`, `icon`, `ariaLabel`, and `disabled` state. Options may use text, an icon, or both. The selected surface animates between options.

Use `value` for the selected option, `name` for native form submission, `label` for a visible group label, `aria-label` for an unlabeled group, and `disabled` to disable the whole control. The `value` and `options` properties can also be assigned from JavaScript. A bubbling `change` event includes `value` and `option`.
