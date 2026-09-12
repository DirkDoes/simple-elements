# Profile

```html
<se-profile name="Sarah Jenkins" subtitle="Lead Designer" initials="SJ" tone="brand" clickable></se-profile>
```

Use `tone` for the avatar color (`gray`, `brand`, `success`, `warning`, `error`, `info`, or `important`). Add `compact` to show only the avatar; the same presentation is applied automatically inside a collapsed sidebar. Add `clickable` for a normal button, or provide an `options` JSON array or property for a context menu; `options` takes priority when both are present. The component emits `select` with the chosen option.

Inside a collapsed `se-sidebar`, the profile automatically reduces to its avatar.

Attributes: `tone`, `name`, `subtitle`, `initials`, `clickable`, `options`, and `compact`.
