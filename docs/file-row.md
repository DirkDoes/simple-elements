# File row

```html
<se-file-row filename="report.pdf" size="2.4 MB" action="trash" clickable></se-file-row>
```

`action` accepts `trash` or `x`. `clickable` makes the row interactive. The remove action emits `remove` with `event.detail.filename`.
