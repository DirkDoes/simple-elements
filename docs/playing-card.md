# Playing Card

`se-playing-card` displays game artwork using `front` and `back` image URLs (including SVG). `face-down` switches to the back. Neither side is secret: this is a presentation component, not game security. Missing artwork shows a Front/Back placeholder; failed images show Image unavailable.

`label` optionally appears below the card and supplies its accessible name, followed by front/back. Without a label, the accessible name is Playing card. There is no title attribute or native hover tooltip.

- Static by default: no buttons, lift, or automatic actions.
- `clickable` makes the face a native button for application-defined click actions.
- `selectable` makes face activation toggle `selected` and emit `select` with `detail.selected`.
- `flip-mode` chooses the side control: `none` (default, no control), `button` (corner icon), or `switch` (Front / Back selector below the caption). Unknown values also show no control. Choosing a side sets `face-down` and emits `flip` with `detail.faceDown`. Side-selector clicks do not bubble as face clicks. Choosing the already active side does nothing.
- `disabled` disables both actions. `selected` can also be set directly by your application.

All buttons support Enter/Space. Focus is preserved across flips and selections. With `flip-mode="button"` or `"switch"`, press F while the pointer is over the card to flip. Selection and keyboard focus do not activate this shortcut. Disabled cards ignore the shortcut, as do held-key repeats and Ctrl/Alt/Meta combinations. The shortcut is active only while hovering and does not intercept typing in editable fields. Interactive cards lift and enlarge slightly on hover; static cards remain still.

```html
<se-playing-card front="/cards/front.svg" back="/cards/back.svg"
  label="Second Shot" selectable flip-mode="button"></se-playing-card>
```

Default width is 150px and aspect ratio is 5:7. Set normal CSS width on the host or `--se-playing-card-width`; set `--se-playing-card-ratio` for another ratio or `--se-playing-card-height` for an explicit face height. Images use contain to preserve the full artwork. The label sits outside the face dimensions. Flat/Clean use theme-rounded corners; Edge uses square corners. Artwork itself is never recolored.
