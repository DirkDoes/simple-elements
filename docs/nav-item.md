# Navigation item

```html
<nav aria-label="Project">
  <se-nav-item label="Issues" icon="circle-check" href="/issues" active>
    <se-badge data-se-region="end" text="3"></se-badge>
  </se-nav-item>
</nav>
```

A standalone native link (`href`) or button, usable in any container. Attributes: `label`, `icon`, `href`, `active`, `disabled`, `minimized`. Disabled items render a disabled button even when an href is supplied. Active items expose `aria-current="page"`; changes to active synchronize immediately.

The `end` region accepts non-interactive trailing content such as a badge. Content text provides the label when `label` is absent. Keep interactive controls outside the item rather than nesting buttons or links.

The nearest `data-se-minimized="true|false"` context controls icon-focused presentation. `minimized` forces it locally. Items without icons keep their labels; icon items keep accessible names and reveal top-layer tooltips on hover or focus. Escape dismisses the tooltip. The library never selects a route or resizes a parent.
