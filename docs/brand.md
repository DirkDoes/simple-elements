# Brand

```html
<se-brand label="Acme" icon="box" href="/"></se-brand>
```

Identity artwork and an optional label/link, usable in headers, navigation, cards, or dialogs. Attributes: `icon`, `compact-icon`, `label`, `href`, `compact`, `minimized`. Icons accept the shared Lucide or asset/icon-object formats; compact artwork falls back to icon. SVG asset paths preserve original colors.

`compact`, `minimized`, or the nearest `data-se-minimized="true"` context shows compact artwork and hides the visible name. Home links retain their accessible name. A nested false context restores the normal presentation. Brand does not add collapse controls or choose placement; compose [panel toggle](panel-toggle.md) alongside it.
