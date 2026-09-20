# List header

```html
<se-list-header>Recent activity</se-list-header>
```

An optional structural header shared by lists and tables. Inside a table, put one element inside it for each column.

## Sticky header

Add `sticky` inside a collection to pin the header to the top of its nearest scrolling ancestor. It stays constrained to the collection and leaves one visible row before the bottom, so the header and final row scroll away together. Set `--se-list-header-top` when your app has a fixed toolbar. Sticky collections allow overflow so an internal horizontal scrollbar does not intercept sticky positioning; place the entire table in a sized scrolling container if you need both horizontal and vertical scrolling.

Sticky headers keep the collection’s rounded corners while pinned. Rows are clipped at the header’s lower edge so they cannot show behind or above it. The bottom reserve adapts to the last visible row when branches collapse.

Header cells may contain components such as `se-select` or `se-button`. Interactive cells allow focus effects to overflow, and popups escape the table through the top layer. Column dividers retain their spacing but omit the vertical stroke in the header. See Column controls in the File system pattern.

While sticky, the entire collection—including its background and borders—is clipped at the header’s current top edge. The rounded clipping boundary moves with the header, so no portion of the table remains visible above it.

Sticky headers use a content-level stacking order below responsive navigation overlays.
