# Timeline Range

`se-timeline-range` describes an interval inside a timeline using `start` and `end` seconds (both default 0). The timeline clamps positions to its duration. Reversed intervals have zero width. Outside a timeline it renders a full-width swatch.

`variant="bar"` (default) layers a thin color on the track. `area` highlights an entire interval. `chapter` draws a separated chapter strip and its `label` below the track. Labels are always accessible, including when a narrow chapter truncates visible text.

`tone` supports gray, brand (default), success, warning, error, info, important and red. Red stays vibrant in both color modes and is exclusive to Timeline and Timeline Range. For a custom color, set `--se-timeline-color` on the range. Repeated ranges paint in source order; the current-position fill paints above them. Ranges are descriptive, not interactive or access restrictions. Use a marker at an interval boundary for interactive content.

```html
<se-timeline duration="120">
  <se-timeline-range start="0" end="30" variant="chapter" label="Intro"></se-timeline-range>
  <se-timeline-range start="30" end="120" variant="chapter" label="Main story"></se-timeline-range>
</se-timeline>
```
