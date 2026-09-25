# File card

```html
<se-file-card title="report.pdf" subtitle="2.4 MB" icon="file" action="trash" clickable></se-file-card>
```

`title` is the filename and `subtitle` is its supporting text. `icon` accepts any Simple Elements icon and defaults to `file`. `action` accepts `trash` or `x`. `clickable` makes the card interactive. The remove action emits `remove` with `event.detail.filename`.

Use `tone="brand"` (default), `gray`, `success`, `warning`, `error`, `info`, or `important` to color the leading icon treatment.

Icon inputs support Lucide names, asset URLs, and the shared [icon configuration object](icon.md).

Set `error="Upload failed"` to replace the subtitle with the error message, switch the icon to the error tone, and show a red outline that wins over hover and focus. Removing `error` restores `subtitle` and `tone`. Flat retains a visible card outline.

A child marked `data-se-region="details-end"` appears beside the title and subtitle, for example a mini More button.
