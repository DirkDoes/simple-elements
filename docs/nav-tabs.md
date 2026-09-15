# Navigation tabs

Route links, not an ARIA tab widget. Set `options` as JSON or an array property of `{ id, label, href, icon, count, disabled }`. `value` selects the active route with aria-current="page". `variant` is underline (default) or pill. `label` names the navigation landmark. Links use native browser navigation and keyboard behavior; disabled items are not links. The row scrolls horizontally on narrow screens.

```html
<se-nav-tabs value="overview" options='[{"id":"overview","label":"Overview","href":"/overview"},{"id":"issues","label":"Issues","href":"/issues","count":12}]'></se-nav-tabs>
```
