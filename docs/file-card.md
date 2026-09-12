# File card

```html
<se-file-card filename="report.pdf" subtext="2.4 MB" icon="file" action="trash" clickable></se-file-card>
```

`subtext` accepts supporting text. `icon` accepts any Simple Elements icon and defaults to `file`. `action` accepts `trash` or `x`. `clickable` makes the card interactive. The remove action emits `remove` with `event.detail.filename`.

Use `tone="brand"` (default), `gray`, `success`, `warning`, `error`, `info`, or `important` to color the leading icon treatment.
