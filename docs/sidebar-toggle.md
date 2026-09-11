# Sidebar toggle

```html
<se-topbar layout-mode="mobile-only">
  <section data-start><se-sidebar-toggle for="app-sidebar"></se-sidebar-toggle></section>
</se-topbar>
<div class="se-page-layout__row">
  <se-sidebar id="app-sidebar" layout-mode="responsive">...</se-sidebar>
</div>
```

`se-sidebar-toggle` renders a square menu button that opens or closes the targeted `se-sidebar`. The `for` attribute is the sidebar element ID; `label` optionally overrides the accessible button label. `layout-mode` defaults to `always`; set it to `mobile-only` when a standalone toggle should appear only on mobile. Combine that mode with `floating` when an overlay button is deliberately preferred.
