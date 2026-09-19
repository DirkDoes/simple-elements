# Spinner

An indeterminate loading indicator with `ring` (default), `dots`, and `bars` variants. It uses the theme's brand color and animates with CSS, without timers. Edge uses square ring/dot shapes. Its ring rotates slowly (12 seconds per turn), while the border highlight travels independently once per second. Both animations stop with reduced motion.

```html
<se-spinner label="Loading results"></se-spinner>
<se-spinner variant="dots" size="small"></se-spinner>
<se-spinner variant="bars" size="large"></se-spinner>
```

| Attribute | Default | Purpose |
| --- | --- | --- |
| `variant` | `ring` | `ring`, `dots`, or `bars`. Unknown values fall back to `ring`. |
| `size` | `medium` | `small` (16px), `medium` (20px), or `large` (32px). |
| `label` | `Loading` | Accessible description on the status indicator; not visible text or a native tooltip. |

All attributes update live. The spinner is inline, so it can sit beside a message or another component. Add and remove it as loading starts and finishes; the spinner does not disable other controls or load data. With reduced motion enabled, the animation stops and the loading symbol remains visible.

```html
<div style="display:flex;align-items:center;gap:.5rem" aria-busy="true">
  <se-spinner size="small" label="Loading documents"></se-spinner>
  <se-text muted>Loading documents…</se-text>
</div>
```
