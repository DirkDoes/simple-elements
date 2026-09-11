# Color picker

```html
<se-color-picker label="Accent" name="project[color]" value="#3b82f6"></se-color-picker>
<se-color-picker variant="palette" size="16" label="Status" name="project[status_color]"></se-color-picker>
<se-color-picker variant="palette" size="8" mode="inline" label="Priority" name="project[priority_color]"></se-color-picker>
```

The `label` is optional and omitted when not provided. The default `variant="gradient"` picker allows any hex color through a saturation/brightness gradient and hue slider. `variant="palette"` limits choices to a built-in fixed palette. `size="8"`, `size="16"` (default), and `size="32"` provide useful compact, standard, and expanded tiers; there is no universal color-count standard. The picker opens as a date-picker-style popover by default; use `mode="inline"` to show it directly in the form. Supports `name`, `value`, `label`, `mode`, `size`, `required`, and `disabled`.
