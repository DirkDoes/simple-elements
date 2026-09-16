# Breadcrumbs

Set `options` as JSON or an array property of `{ label, href, icon }`. Ancestors render as native links. The final item is a non-link with aria-current="page". `label` sets the navigation landmark name (default Breadcrumb). Icons accept the shared icon format.

```html
<se-breadcrumbs options='[{"label":"Acme","href":"/acme"},{"label":"Website"}]'></se-breadcrumbs>
```

`variant` defaults to `default`, the compact trail. Use `variant="header"` for larger, stronger labels with more padding in a top bar. Both variants use a rounded background on link hover instead of an underline. The current item remains a non-interactive label.

```html
<se-topbar>
  <se-layout-brand label="Acme" icon="box" compact></se-layout-brand>
  <se-breadcrumbs variant="header"
    options='[{"label":"Acme","href":"/acme"},{"label":"Website"}]'>
  </se-breadcrumbs>
</se-topbar>
```

When composing this header, give the compact brand `width: auto; flex: none` so the breadcrumb sits beside it. Both variants accept a single item; deciding whether to hide a single-scope breadcrumb belongs to the application. See the Contextual sidebar example in [Multi-scope navigation](multi-scope-navigation.md).
