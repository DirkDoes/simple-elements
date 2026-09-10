# Range

```html
<se-range label="Volume" name="volume" min="0" max="100" value="50" suffix="%" fill steps="5" labels='["0%","25%","50%","75%","100%"]'></se-range>
```

Uses a styled native range input and updates its displayed value as the user drags. Values display with up to one decimal place by default; set `decimals` to change the maximum precision. Add `fill` to color the track up to the thumb. `steps` sets the number of positions with a minimum of two; omit it for a free-flow slider. Values between positions snap to the nearest one. `labels` accepts a JSON string array and uses only the first labels that match the configured positions.
