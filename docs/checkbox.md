# Checkbox

```html
<se-checkbox label="Email me updates" name="updates" value="yes" checked></se-checkbox>
<se-checkbox variant="switch" label="Enable alerts"></se-checkbox>
<se-checkbox variant="light-dark-switch" label="Dark mode"></se-checkbox>
```

Attributes: `variant`, `label`, `name`, `value`, `checked`, and `disabled`. `variant` accepts `checkbox`, `radio`, `switch`, `light-dark-switch`, or `light-dark-button`; it changes presentation without changing native checkbox semantics. Read the `checked` property; native change events bubble from the internal checkbox.
