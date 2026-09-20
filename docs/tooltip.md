# Tooltip

```html
<se-tooltip content="Edit profile">
  <se-button icon="edit" aria-label="Edit profile"></se-button>
</se-tooltip>
```

The tooltip appears on hover or keyboard focus. Keep an accessible label on icon-only triggers.

Tooltips use the browser top layer so table cells, sticky clipping, and scrolling containers cannot cut them off. Hover or focus the child control to show the tooltip; Escape dismisses it. Use an accessible icon button for a keyboard-focusable info indicator.
