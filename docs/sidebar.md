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

`se-sidebar` accepts native `<header>`, `<section>`, and `<footer>` regions. Use one or many sections; style custom arrangements yourself. Add `collapsible` for the desktop edge control, `collapsed` to start compact, or `closed` to hide the full sidebar and control it with `se-sidebar-toggle`. Add `overlay` when the expanded desktop sidebar should float over page content; its collapsed rail remains in the layout. `layout-mode` defaults to `always`; set it to `responsive` for a closed, top-down navigation overlay below 768px, or use `mobile-only` and `desktop-only` for viewport visibility. Collapse controls are hidden in the responsive mobile context. Responsive sidebars restore their previous desktop state when the wider layout returns and close after a mobile navigation item is selected. `se-sidebar-chapter` provides animated navigation disclosure with dividers between chapters on mobile.

The `collapsed` and `closed` properties can also be assigned from JavaScript. The sidebar emits `collapsechange`, `closedchange`, and `themechange` events for state changes.
