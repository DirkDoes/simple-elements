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
