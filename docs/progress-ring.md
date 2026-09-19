# Progress ring

A compact percentage meter for confidence, completion, or other 0–100 scores. Only the outline fills; it is not a pie chart. Flat, Clean, and Studio use a circle; Edge uses a square outline. The colored stroke starts at the top and fills clockwise.

```html
<se-progress-ring value="82" label="Confidence" show-value></se-progress-ring>
<se-progress-ring value="40" label="Completion"></se-progress-ring>
```

| Attribute | Default | Purpose |
| --- | --- | --- |
| `value` | `0` | Percentage from 0 to 100; fractional values are supported. |
| `label` | `Progress` | Accessible meter name and automatic tooltip label. |
| `show-value` | Absent | Boolean attribute showing the percentage beside the ring. |
| `size` | `medium` | `small` (16px), `medium` (24px), or `large` (36px). |

The ring smoothly changes from red at 0 through bright yellow at 50 to green at 100. Colors adapt to light/dark mode and are independent of the brand color. The entire filled stroke uses the current score's color; no multicolor pie is drawn. At 0 only the neutral track remains; at 100 the outline is complete.

An automatic styled tooltip shows, for example, “Confidence: 82%” on hover or keyboard focus, using the library's existing tooltip styling. Escape dismisses it. No extra tooltip component or attribute is needed. The meter has an accessible label and value, so its meaning does not depend on color. The tooltip and optional visible percentage round to one decimal place.

## Live updates

```js
const score = document.querySelector('se-progress-ring');
score.value = 94.5;
// Equivalent: score.setAttribute('value', '94.5');
```

The numeric `value` property returns the clamped value. Values below 0 or above 100 are clamped; nonnumeric and infinite values become 0. All attributes update live without replacing the focused meter. This is a read-only indicator: it emits no input/change events and performs no calculations beyond display normalization. Convert fractions to percentages in the app (for example, `score.value = confidence * 100`). Reduced motion disables the fill transition.

The component uses `role="meter"` for a bounded score, not an indeterminate loading state. Use [Spinner](spinner.md) while the value is unknown. For a confidence use case, label it clearly and provide any explanation of how that confidence was calculated in the surrounding application.
