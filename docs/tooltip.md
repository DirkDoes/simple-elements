# Tooltip

```html
<se-tooltip>
  <se-button data-se-region="trigger" icon="info" aria-label="About sources"></se-button>
  <strong>Sources</strong><br>Files used by this project.
</se-tooltip>
```

Mark the hover and focus target with `data-se-region="trigger"`. All other children become the tooltip content; plain text receives the same styling as structured HTML. The tooltip has no attributes. Keep icon-only triggers accessible and tooltip content descriptive and non-interactive; use [Popover](popover.md) for controls or links.

Tooltips use the browser top layer so tables and scrolling containers cannot clip them. They prefer centered above the trigger, move below when needed, and remain within the viewport. Escape dismisses an open tooltip.
