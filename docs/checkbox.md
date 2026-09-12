# Checkbox

```html
<se-checkbox label="Email me updates" name="updates" value="yes" checked></se-checkbox>
<se-checkbox variant="switch" label="Enable alerts"></se-checkbox>
```

Attributes: `variant`, `label`, `name`, `value`, `checked`, and `disabled`. `variant` accepts `checkbox`, `radio`, or `switch`; it changes presentation without changing native checkbox semantics. Read the `checked` property; native change events bubble from the internal checkbox. Use `se-theme-switch` for light, system, and dark selection.
