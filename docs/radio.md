# Radio

```html
<se-radio label="Monthly" name="billing" value="monthly" checked></se-radio>
<se-radio label="Yearly" name="billing" value="yearly"></se-radio>
<se-radio variant="switch" label="Monthly billing" name="billing-style" value="monthly"></se-radio>
```

Radios with the same `name` form a native group. Attributes: `variant`, `label`, `name`, `value`, `checked`, and `disabled`. `variant` accepts `radio`, `checkbox`, or `switch`; it changes presentation without changing native radio semantics. Use `se-theme-switch` for light, system, and dark selection.
