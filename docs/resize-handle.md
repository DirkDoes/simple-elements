# Resize handle

```html
<div style="display:flex;min-height:240px">
  <section id="files" style="width:var(--se-resize-size,240px);flex:none" aria-label="Files">...</section>
  <se-resize-handle for="files" min="120" max="480" label="Files width"></se-resize-handle>
  <main style="flex:1;min-width:0">...</main>
</div>
```

The handle writes `--se-resize-size` on the target, in pixels. The application must use that variable for the chosen dimension; the component does not choose a page grid or change siblings. Put it on the controlled pane's physical end edge, or use `edge="start"` on the opposite edge. The app can place the handle in flex/grid or position it over an edge.

Attributes: `for`, `axis` (`x` width by default, `y` height), `edge` (`end` default or `start`), `min` (80px default), `max` (600px default), `label`, `disabled`. Configure bounds for the available space; the application owns responsive rules and can hide handles on small screens. Use height with `axis="y"` in a column flex container.

Pointer drag uses capture and supports mouse, pen, and touch. The edge glows using the current brand tokens on hover, focus, and drag. Keyboard: Left/Right for width, Up/Down for height; Shift increases the step from 10 to 40 pixels; Home/End choose the bounds. Escape or pointer cancellation restores the size from before the current drag.

The focusable `separator` exposes its orientation, target, pixel bounds, and current size. Hidden or minimized targets disable resizing by default; opt-in snapping keeps the separator keyboard-operable for restoration. The bubbling `input` event reports each adjustment and `change` reports a completed drag or keyboard adjustment: `{ target, size, axis }`.

## Edge and snap behavior

The handle occupies zero layout space. Its 10px pointer target straddles the pane boundary, with the visible line centered on that boundary. This avoids a gutter between differently colored panes. Place it between panes in flex, or use a zero-width/height track in an application grid.

`snap="minimize"` or `snap="collapse"` opts into a state change. `snap-threshold` is the distance beyond the minimum (default 40 pixels). Dragging past it highlights a pending snap; releasing applies `data-se-minimized="true"` or native `hidden`. Moving back before release cancels the pending snap. Escape/pointer cancellation restores the original size without changing state. The last expanded size is preserved, so the panel toggle or Enter restores it. With snapping enabled, Enter toggles the reduced state from the separator; drag resizing operates on expanded panes.

The cancelable bubbling `snap` event has `{ target, mode }`; prevent its default to handle the state in application code. `change` includes `state` for drag completion and Enter. Arrow/Home/End resizing continues to honor min/max without snapping.

During a drag, the handle marks its target `data-resizing`. Application CSS should disable size transitions under this marker so dragging tracks the pointer immediately. Smooth minimize/restore transitions and responsive sizing belong to the app. The library does not choose a compact width or persist sizes. In the phone recipes the app hides these controls entirely; the component itself remains usable with touch when an app wants it.
