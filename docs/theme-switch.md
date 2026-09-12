# Theme switch

```html
<se-theme-switch name="theme" value="light"></se-theme-switch>
<se-theme-switch variant="segmented" mode="ternary" name="theme" value="system"></se-theme-switch>
<se-theme-switch variant="button" mode="binary" label="Theme"></se-theme-switch>
```

`variant` accepts `switch`, `segmented`, or `button`. `mode` accepts `binary` for light and dark or `ternary` to add system preference. `value` is always the string `light`, `system`, or `dark`; when `name` is set, that value is submitted through a native radio or hidden input.

The visible `label` is empty by default; use `aria-label` to override the default accessible name of “Theme”. Use `disabled` to prevent changes. The `value` property can also be read or assigned from JavaScript. A bubbling `change` event includes the selected value in `event.detail.value`.

The segmented variant composes `se-segmented-control`, including its animated selected surface.
