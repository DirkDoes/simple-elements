# Tooltip

```html
<se-tooltip content="Edit profile">
  <se-button icon="edit" aria-label="Edit profile"></se-button>
</se-tooltip>
```

The tooltip appears on hover or keyboard focus. Keep an accessible label on icon-only triggers.

Tooltips use the browser top layer so table cells, sticky clipping, and scrolling containers cannot cut them off. Hover or focus the child control to show the tooltip; Escape dismisses it. Use an accessible icon button for a keyboard-focusable info indicator.

Tooltips are centered above their trigger, moving below when there is insufficient space above and staying within the viewport. The automatic progress-ring tooltip uses the same behavior.

For structured content, add a child marked `data-content`. It takes priority over the plain-text `content` attribute. Other children remain the trigger. Text inside this content uses the same tooltip typography; use ordinary HTML for emphasis, lists, or line breaks.

```html
<se-tooltip content="Fallback text">
  <se-button icon="info" aria-label="About sources"></se-button>
  <span data-content><strong>Sources</strong><br>Files used by this project.</span>
</se-tooltip>
```

Keep tooltip content descriptive and non-interactive. Use `se-popover` for controls or links. The `content` attribute is always escaped as text, never interpreted as HTML.
