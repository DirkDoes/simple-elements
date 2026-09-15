# Breadcrumbs

Set `options` as JSON or an array property of `{ label, href, icon }`. Ancestors render as native links. The final item is a non-link with aria-current="page". `label` sets the navigation landmark name (default Breadcrumb). Icons accept the shared icon format.

```html
<se-breadcrumbs options='[{"label":"Acme","href":"/acme"},{"label":"Website"}]'></se-breadcrumbs>
```
