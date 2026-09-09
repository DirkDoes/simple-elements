# Layout brand

```html
<se-layout-brand icon="/assets/brand.svg" compact-icon="/assets/brand-compact.svg" collapsible></se-layout-brand>
```

Attributes: `icon`, `compact-icon`, `dark-icon`, `compact-dark-icon`, `label`, `href`, `compact`, and `collapsible`. SVG artwork is rendered as-is and is never recolored. When `href` is provided, the brand becomes a home/navigation link. The collapse button controls the nearest `se-sidebar` when present, while the brand itself can also be used in a top bar.
