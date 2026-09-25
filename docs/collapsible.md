# Collapsible

Use `se-collapsible` to show or hide a section of content. Its native disclosure control works with mouse, touch, Enter, and Space.

```html
<se-collapsible title="Additional details" icon="info">
  <se-badge data-se-region="heading-end" tone="info" icon="sparkles" text="Optional"></se-badge>
  <se-text>More information about this item.</se-text>
</se-collapsible>
```

The `icon` attribute optionally adds a heading icon. Children marked `data-se-region="heading-end"` appear beside the heading. You can add more than one; unmarked children remain in the body.

Add `open` to start expanded. The `open` attribute and JavaScript `element.open` property stay in sync with user interaction. Listen for the native `toggle` event on the internal `details` element if your app needs to react to a change. Child elements are kept as live nodes, so forms and controls retain their state.

The section uses a simple left rule and a short disclosure animation. Reduced-motion preferences disable the animation.
