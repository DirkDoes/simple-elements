# Top bar

```html
<se-topbar>
  <section data-start><se-sidebar-toggle for="app-sidebar"></se-sidebar-toggle>Brand</section>
  <section data-center layout-mode="desktop-only"><se-input type="search"></se-input></section>
  <section data-end>
    <se-button icon="search" aria-label="Search" layout-mode="mobile-only" data-mobile-search-toggle></se-button>
    <se-profile name="Sarah" initials="SJ"></se-profile>
  </section>
  <section data-mobile-search hidden><se-input type="search"></se-input></section>
</se-topbar>
```

Use native elements marked with `data-start`, `data-center`, and `data-end` for the three top-bar regions. `layout-mode` defaults to `always`; set it to `mobile-only` or `desktop-only` to control viewport visibility. Below 768px, profiles become compact and layout brands use their compact artwork. A control marked `data-mobile-search-toggle` toggles the `data-mobile-search` overlay beneath the bar; that overlay closes when the page scrolls or its linked sidebar opens. Opening search also closes that sidebar, so only one overlay remains open.
