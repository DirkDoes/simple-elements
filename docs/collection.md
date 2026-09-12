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

`type` accepts `list`, `table`, or `tree` and defaults to `list`. In table mode, `columns` accepts a CSS `grid-template-columns` value shared by the header and rows. Tree mode stays visually neutral and lets `se-tree-item` provide native disclosure behavior.
