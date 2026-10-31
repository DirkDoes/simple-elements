# Panel toggle

```html
<se-panel-toggle for="resources" mode="collapse" variant="menu" label="Toggle resources"></se-panel-toggle>
<nav id="resources" aria-label="Resources">...</nav>
```

`for` targets an element id in the same document/root. `mode="collapse"` (default) toggles native `hidden` and exposes `aria-expanded` and `aria-controls`. Keep a collapse trigger outside its target so it remains reachable; a trigger inside its own target is disabled.

`mode="minimize"` toggles the target's `data-se-minimized` context between `true` and `false`. The stable label and `aria-pressed` describe a presentation toggle. It may live inside its target. Multiple triggers stay synchronized, including application changes to the target state. Removed and reinserted controls reconnect.

`variant` is `default`, `edge` (small circular rotating chevron), or `menu`. The app positions it, sets responsive visibility, and chooses panel dimensions. `label` overrides the accessible name. Missing targets disable the button.

The bubbling `change` event contains `{ target, mode, minimized, collapsed }`. Collapse does not erase minimized state. Minimize does not change child group disclosure state.

## Edge placement and animation

`placement="edge-end"` or `placement="edge-start"` anchors the control to the matching inline edge of its nearest positioned ancestor; the default `placement="inline"` stays in normal flow. Use `variant="edge"`, a parent with `position:relative`, and put scrolling on an inner child so the circle can straddle the edge without clipping. `--se-toggle-offset` controls the top offset (default 1.25rem).

A cancelable bubbling `beforetoggle` event provides `{ target, mode }`. Applications can prevent its default to implement an animated overlay, and then manage the target's hidden state. The control keeps its ARIA state synchronized. The showcase's application helper demonstrates animation, reduced motion, focus restoration, Escape, dismissal, and breakpoint cleanup. Width animations belong in the application's panel CSS, not in the toggle.
