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

For a combined mobile menu, use one native modal `dialog` with one hamburger. Move both sidebar elements into it below 768px, set `collapsed = false`, and show their labeled sections vertically, separated by a theme border. Override the default mobile sidebar hiding inside that dialog with `display: flex; width: 100%; height: auto`. Do not use each sidebar's independent `layout-mode="responsive"` for this arrangement. Restore their desktop positions and routing-controlled collapse state at the desktop breakpoint. Native `showModal()` provides focus containment, Escape dismissal, and an inert background. Close the menu after navigation and focus the new page heading.

The Multi Scope Navigation pattern contains a working example, including breakpoint changes and a single mobile menu.
