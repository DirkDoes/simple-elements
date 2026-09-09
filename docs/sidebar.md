# Sidebar

```html
<se-sidebar collapsible>
  <header><se-layout-brand label="Simple Elements"></se-layout-brand></header>
  <section>
    <se-sidebar-chapter title="Workspace" collapsible>...</se-sidebar-chapter>
  </section>
  <footer><se-profile name="Sarah" initials="S"></se-profile></footer>
</se-sidebar>
```

`se-sidebar` accepts native `<header>`, `<section>`, and `<footer>` regions. Use one or many sections; style custom arrangements yourself. Add `collapsible` for the edge control, or `closed` to hide the full sidebar and control it with `se-sidebar-toggle`. `se-sidebar-chapter` provides animated navigation disclosure.
