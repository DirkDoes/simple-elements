# Timeline Marker

`se-timeline-marker` places an annotation at `at` seconds (default 0). `label` names it (default Marker); `icon` optionally replaces the expanded text. `tone` uses the standard color families. `position` is above (default) or below. `expanded` keeps the full flag visible; otherwise it expands near the pointer, on hover, or on focus.

All child content becomes its preview body. Supply trusted HTML, images, or interactive components. Hover and keyboard focus open the preview; a short grace period allows moving into it. Tap/click opens it and seeks the nearest timeline. Escape or clicking outside dismisses it. Empty markers still seek without opening an empty panel. Native buttons support Enter and Space.

```html
<se-timeline-marker at="45" label="Review" icon="message-square">
  <strong>Review this moment</strong>
  <p>Check the transition into the next scene.</p>
</se-timeline-marker>
```

Activation emits a bubbling `marker-select` event with `detail.value`. A containing timeline additionally emits its input/change events. A standalone marker still opens content and emits marker-select. Timeline disabled state disables its marker buttons.

Choose above/below lanes or reduce nearby markers in your app for dense data. Automatic clustering and collision packing are not implemented.

Previews fit their content up to a compact 220px outer width (and the viewport). A static Playing Card works as preview content. Nearby markers expand within 80px horizontally while the pointer is over the timeline; proximity does not open the preview. Edge uses square dots and sharp frame corners.
