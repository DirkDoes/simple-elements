# Layout brand

```html
<se-layout-brand icon="/assets/brand.svg" compact-icon="/assets/brand-compact.svg" collapsible></se-layout-brand>
```

Attributes: `icon`, `compact-icon`, `dark-icon`, `compact-dark-icon`, `label`, `href`, `compact`, and `collapsible`. String SVG paths preserve their original artwork colors. When `href` is provided, the brand becomes a home/navigation link. The collapse button controls the nearest `se-sidebar` when present and is hidden inside a sidebar with `layout-mode="responsive"` on mobile, while the brand itself can also be used in a top bar.


`icon` and `compact-icon` also accept the shared [icon object](icon.md). Both can specify `light`, `dark`, `preserveLightColors`, and `preserveDarkColors`; omit the separate dark attributes when using this format.

```html
<se-layout-brand
  icon='{"light":"/assets/brand-white.svg","dark":"/assets/brand-black.svg"}'
  compact-icon='{"light":"/assets/mark-white.svg","dark":"/assets/mark-black.svg"}'
  label="My app">
</se-layout-brand>
```

Object variants follow the icon's inherited foreground brightness. For backwards compatibility, `dark-icon` and `compact-dark-icon` still switch by the page's `data-theme="dark"` mode. If supplied together with object values, those legacy attributes select their corresponding dark-mode slots first; the object in the selected slot then resolves by foreground. Existing plain-path logos retain their original sizing and behavior.
