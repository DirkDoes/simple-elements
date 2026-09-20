# File system pattern

The examples page shows three ways to compose a project file view from existing components: a dense `se-collection type="table"` using row `level` and optional `guides`, a `se-collection type="tree"` with native disclosure items, and a spacious grid of `se-folder-card` and `se-file-card` elements.

The hierarchical table demonstrates a divider after Name and collapsible level-based rows. Sticky file index adds a long expandable table with a `sticky` header. Both use native component attributes, with no example JavaScript.

File filters demonstrates a search input with an icon-only custom popover and native fieldset groups for types, ownership/tags, and modified date. Its controls retain their values but do not filter the sample data. Sticky file index includes branches five and four levels deep for testing sibling guides and disclosure animation.

Filter variations: Hierarchical table uses a simple checkbox panel, File filters uses always-visible fieldset groups, and Folder and file cards uses collapsible native details/summary chapters. The controls work independently of the static sample data.
