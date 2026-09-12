# Toast

```html
<se-toast tone="success" message="Changes saved." action="Undo" href="#details" open></se-toast>
```

The toast is fixed at the top of the screen and closes automatically after 5 seconds. `tone` accepts `gray`, `brand`, `success`, `warning`, `error`, `info`, or `important`; each tone supplies a status icon, or `icon` can override it. Set `message` for the text, `duration` in milliseconds (or `0` to disable automatic closing), and `action` for an optional action. Add `href` to render that action as a same-tab link; without it, the action is a button that emits `action`. The dismiss button emits `close`. Use `open()` and `close()` to control it.
