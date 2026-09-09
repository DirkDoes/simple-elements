# Table

```html
<se-table columns="2fr 1fr auto">
  <se-list-header><span>Name</span><span>Status</span><span>Actions</span></se-list-header>
  <se-list-row><strong>Project Atlas</strong><se-badge tone="success" text="Active"></se-badge><se-button text="Open"></se-button></se-list-row>
</se-table>
```

`columns` accepts a CSS `grid-template-columns` value and applies it to every header and row. The component scrolls horizontally when the columns cannot fit. Use `<se-list>` instead when rows have unrelated structures.
