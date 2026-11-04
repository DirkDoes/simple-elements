# Timeline

`se-timeline` is a native range input with current/end timestamps. `duration` (default 100), `value` (default 0), and `step` (default 1) use seconds. Zero step allows fractional values; zero duration disables seeking. Negative or non-finite values are clamped safely. `label` names the slider; `disabled` disables seeking and markers. Attributes update live, and the `value` property can be read or assigned.

`tone` sets the progress color: brand (default), gray, success, warning, error, info, important, or red. Red is a fixed vibrant red in both color modes, exclusive to Timeline and Timeline Range. The vertical-line playhead keeps a wider invisible drag target. Marker tones are independent.

```html
<se-timeline id="scrubber" duration="180" value="42">
  <se-timeline-range start="0" end="120" label="Buffered" tone="gray"></se-timeline-range>
  <se-timeline-marker at="60" label="Chapter two"><p>A new scene.</p></se-timeline-marker>
</se-timeline>
```

Direct range and marker children compose the track; repeat them freely. Child tags determine placement (no special region attribute is necessary). Range children paint in source order, followed by current-position progress and the playhead. To display only custom watched segments, set `--se-timeline-color: transparent` on the timeline and explicit tones on its ranges.

Native keyboard controls include arrows and Home/End. Time is exposed as `aria-valuetext`, following the [WAI slider guidance](https://www.w3.org/WAI/ARIA/apg/patterns/slider/).

`input` events report ongoing seeking; `change` reports a committed seek. Both bubble from the timeline with `event.detail.value` in seconds. Programmatic value changes do not emit user events. Marker activation emits both. The application owns playback, permissions, buffering and watched history:

```js
scrubber.addEventListener('input', event => {
  if (event.target === scrubber) video.currentTime = event.detail.value;
});
video.addEventListener('timeupdate', () => { scrubber.value = video.currentTime; });
video.addEventListener('loadedmetadata', () => {
  scrubber.setAttribute('duration', video.duration);
});
```

See [composed examples](timelines.md). This is a finite-duration scrubber, not an editing engine or a live-stream window.

The showcase lists these under **Regions & children**, with **Child element** connections. They do not use `data-se-region`. Named regions on other components remain explicitly labeled **data-se-region**.
