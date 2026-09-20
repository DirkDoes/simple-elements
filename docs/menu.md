# Menu

```html
<se-menu label="More" options='[
  {"label":"Edit","icon":"edit"},
  {"label":"Delete","icon":"trash","danger":true}
]'></se-menu>
```

Options accept `label`, `icon`, `disabled`, `danger`, and `separator`; assign the array as JSON in `options` or through the `options` property. The menu opens on click (or Enter/Space on the trigger). Selection emits `select` with the chosen option in `event.detail`.
The menu prefers opening down and right, then flips toward available viewport space.

Icon inputs support Lucide names, asset URLs, and the shared [icon configuration object](icon.md).

Use `icon-only` to hide the visible trigger label, retaining `label` as its accessible name. Menus use the browser top layer to escape table and modal clipping. Escape or an outside click dismisses them; they follow their trigger while scrolling and close when it leaves the scrolling area.

For custom content such as grouped filters, use [Popover](popover.md). Menu remains the compact shortcut for an array of actions.
