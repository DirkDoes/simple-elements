# Profile

```html
<se-profile name="Sarah Jenkins" subtitle="Lead Designer" initials="SJ" tone="brand" clickable></se-profile>
```

Use `tone` for the avatar color (`gray`, `brand`, `success`, `warning`, `error`, `info`, or `important`). Add `compact` to show only the avatar; the same presentation is applied automatically inside a collapsed sidebar. Add `clickable` for a normal button, or provide an `options` JSON array or property for a context menu; `options` takes priority when both are present. The component emits `select` with the chosen option.

The profile stays within its container. Inside a collapsed `se-sidebar`, it reduces to its avatar; at narrower expanded widths, names and subtitles truncate with an ellipsis. Context menus prefer opening down and right, then flip toward available viewport space.

Attributes: `tone`, `name`, `subtitle`, `initials`, `clickable`, `options`, and `compact`.
