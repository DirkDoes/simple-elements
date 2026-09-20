# Collection

Use one wrapper for lists, tables, and disclosure trees:

```html
<se-collection type="list">
  <se-list-row>First item</se-list-row>
  <se-list-row>Second item</se-list-row>
</se-collection>

<se-collection type="table" columns="2fr 1fr">
  <se-list-header><span>Name</span><span>Status</span></se-list-header>
  <se-list-row><span>Project Atlas</span><se-badge text="Active"></se-badge></se-list-row>
</se-collection>

<se-collection type="tree">
  <se-tree-item type="folder" label="Source" open>
    <se-tree-item type="file" label="index.js"></se-tree-item>
  </se-tree-item>
</se-collection>
```

`type` accepts `list`, `table`, or `tree` and defaults to `list`. In table mode, `columns` accepts a CSS `grid-template-columns` value shared by the header and rows. Add `mobile-columns` when related cells are combined or hidden with `layout-mode` on narrow screens. Their shared subgrid keeps header backgrounds and columns full-width, and constrained cell text truncates with an ellipsis. Tree mode stays visually neutral and lets `se-tree-item` provide native disclosure behavior.

## Column dividers

Use `dividers="1,4"` for vertical lines after columns 1 and 4 (one-based). Omit it for no dividers. It applies to header and row cells; the final column never gets an extra line. For hierarchies use `type="table"` and row `level` values. `type="tree"` retains the existing nested tree-item API.
