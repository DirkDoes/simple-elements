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

Use `variant="mini"` with `icon-only` for a compact row action trigger (default variant: `secondary`). An option `{ "heading": "Manage", "separator": true }` renders a noninteractive section title with a divider above it. Ordinary action options below it still emit `select`; headings do not.

Provide a child with `data-se-region="trigger"` to replace the generated More button with your own control. The `options` array and `select` event work the same way.

```html
<se-menu options='[{"label":"Edit"}]'>
  <se-button data-se-region="trigger" variant="mini" icon="more" aria-label="Actions"></se-button>
</se-menu>
```
