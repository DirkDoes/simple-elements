# File row

```html
<se-file-row filename="report.pdf" subtext="2.4 MB" icon="file" action="trash" clickable></se-file-row>
```

`subtext` accepts any supporting text. `icon` accepts any Simple Elements icon and defaults to `file`. `action` accepts `trash` or `x`. `clickable` makes the row interactive. The remove action emits `remove` with `event.detail.filename`.
Use `variant="gray"`, `brand`, `success`, `warning`, `error`, `info`, or `important` to color the leading icon treatment.
