# Sidebar

```html
<se-sidebar layout-mode="responsive" collapsible>
  <header><se-layout-brand label="Simple Elements"></se-layout-brand></header>
  <section>
    <se-sidebar-chapter title="Workspace" collapsible>...</se-sidebar-chapter>
  </section>
  <footer layout-mode="desktop-only"><se-profile name="Sarah" initials="S"></se-profile></footer>
</se-sidebar>
```

`se-sidebar` accepts native `<header>`, `<section>`, and `<footer>` regions. Use one or many sections; style custom arrangements yourself. Add `collapsible` for the desktop edge control, `collapsed` to start compact, or `closed` to hide the full sidebar and control it with `se-sidebar-toggle`. Add `overlay` when the sidebar should always float over page content, whether expanded or collapsed. `layout-mode` defaults to `always`; set it to `responsive` for a closed, top-down navigation overlay below 768px, or use `mobile-only` and `desktop-only` for viewport visibility. Collapse controls are hidden in the responsive mobile context. Responsive sidebars restore their previous desktop state when the wider layout returns and close after a mobile navigation item is selected. `se-sidebar-chapter` provides animated navigation disclosure with dividers between chapters on mobile.

The default width is `16rem`; override `--se-sidebar-width` on the component when a layout needs a different expanded width.

The `collapsed` and `closed` properties can also be assigned from JavaScript. The sidebar emits `collapsechange`, `closedchange`, and `themechange` events for state changes.

## Visual variants and multiple sidebars

Omitting `variant` preserves the original appearance. `variant="primary"` uses a soft surface and a compact 4rem width when collapsed; `variant="secondary"` uses the normal surface with roomier navigation padding. Both support the same functionality. Neither variant automatically collapses.

Arrange sibling sidebars with normal flex/grid containers. Put the primary beside a column containing the topbar and a row containing the secondary and page content. The outer sidebar then spans the header and content height without nesting one sidebar inside another.

Application routing controls state: `primarySidebar.collapsed = Boolean(page.sidebar)`. Omit `collapsible` and any custom collapse controls when the application owns this state. Pages without secondary navigation expand the primary again.

For a combined mobile menu, use one `se-sidebar-toggle` targeting a `se-sidebar` with `layout-mode="responsive"`. Put organization and page navigation in separate `se-sidebar-chapter` elements inside it. Desktop sidebars can use `layout-mode="desktop-only"`; hide the combined mobile sidebar at desktop widths with layout CSS. The Multi Scope Navigation pattern shows the full markup and route handlers. This uses the sidebar's existing top-opening behavior rather than a modal dialog.

The Multi Scope Navigation pattern contains a working example with a single mobile menu.

In Clean and Flat light mode, the primary variant has a white surface when expanded and the page background gray when collapsed. Width and background color transition together; reduced-motion preferences disable this transition. Dark-mode colors are unchanged.
