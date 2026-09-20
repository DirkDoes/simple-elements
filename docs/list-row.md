# List row

```html
<se-list-row>
  <se-icon name="user"></se-icon>
  <span><strong>Emma joined</strong><small>Two minutes ago</small></span>
  <se-badge tone="success" text="New"></se-badge>
</se-list-row>
```

Rows accept arbitrary Simple Elements or ordinary HTML. Their contents do not need to match other rows unless they are inside a table.

Inside `se-collection type="table"`, set `level="1"`, `level="2"`, and so on to indent the first cell for hierarchical rows.
Add the optional `guides` attribute to draw a subtle tree connector at the row's current indentation level.

## Collapsible rows

Add `collapsible` to show a keyboard-accessible chevron in the first cell. Add `collapsed` to start closed, or toggle that attribute in your app. Following sibling rows with greater `level` values are descendants, until the next row at the same or lower level. Nested collapsed states survive closing and reopening a parent. Keep rows inside one `se-collection` and wrap the first cell in an element such as `span`. The component emits `toggle` with `{ collapsed }` on user activation.

Chevrons remain opt-in: omit `collapsible` for a plain row, even if it has descendants. Disclosure changes animate for 160ms and respect reduced motion. `guides` now draws continuing sibling branches and muted ancestor lines through deeper descendants. Continuing sibling junctions are straight; only the final sibling curves. Edge uses square corners throughout. Use `guides="simple"` to restore the previous short connector style.

`variant="primary"` is the default surface. `variant="secondary"` gives a subtly different neutral row background and hover state. The Sticky file index uses secondary rows for files and primary rows for folders.
