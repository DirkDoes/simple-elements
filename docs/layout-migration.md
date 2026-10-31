# Layout migration to v0.17.0

Version 0.17.0 moves page layout into application HTML and CSS. This is a breaking revision: migrate the removed shell components and renamed navigation components using the table below.

Reusable panel toggles and resize handles support independent panels, optional drag-to-minimize or drag-to-collapse, and keyboard restoration. The Page Layout examples combine the previous multi-scope navigation patterns with responsive overlays, animated minimization, and split panes. The Workspaces pattern page has been removed.

| Previous | Replacement |
| --- | --- |
| `se-sidebar` | Native labelled `nav` / `aside`, application CSS |
| `se-topbar` | Native `header`, application CSS and search behavior |
| `se-sidebar-button` | `se-nav-item` |
| `se-sidebar-group` | `se-nav-group` |
| `se-sidebar-chapter` | `se-nav-section` |
| `se-layout-brand` | `se-brand` |
| `se-sidebar-toggle` | `se-panel-toggle for="id" mode="collapse"` |
| Sidebar `collapsed` / `data-sidebar-collapsed` | `data-se-minimized="true"`; app CSS defines icon-rail width |
| Sidebar `closed` | Native `hidden` |
| Sidebar `collapsible`, brand `collapsible` | Separate `se-panel-toggle mode="minimize" variant="edge"` |
| Sidebar `overlay`, `layout-mode`, `.se-page-layout*` | Application positioning, media queries, or a composed drawer |
| `--se-sidebar-width` | Application width; optionally `var(--se-resize-size,240px)` |

Navigation group/section `collapsed` continues to mean hidden children. Compact state no longer closes groups or changes ancestor state. Application code handles theme changes explicitly rather than relying on a sidebar listener. Existing table-specific `layout-mode` behavior is unaffected.

Update HTML tags, component imports, selectors, event handlers, and application styles. There are no compatibility shell aliases. See [page layout](page-layout.md) for complete recipes and state semantics. Only this repository's showcase is migrated here; external consuming apps must migrate separately.
