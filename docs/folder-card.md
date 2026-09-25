# Folder card

```html
<se-folder-card title="Assets" subtitle="24 items" href="#assets"></se-folder-card>
```

Set `title`, `subtitle`, and optionally `icon`. The subtitle is free text, such as `24 items`. Add `href` for a native link, or omit it for a native button. `disabled` disables button behavior. Use `tone="brand"` (default), `gray`, `success`, `warning`, `error`, `info`, or `important` to color the icon treatment.

Icon inputs support Lucide names, asset URLs, and the shared [icon configuration object](icon.md).

A child marked `data-se-region="details-end"` appears beside the title and subtitle. Interactive children stay outside the card link or button.
