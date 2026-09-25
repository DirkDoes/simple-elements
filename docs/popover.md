# Popover

A reusable, non-modal panel for custom controls. Use it for filters or supporting forms; keep [Menu](menu.md) for predefined action lists.

```html
<se-popover label="Filter files" icon="funnel" icon-only>
  <fieldset>
    <legend>File type</legend>
    <se-checkbox label="Documents"></se-checkbox>
    <se-checkbox label="Images"></se-checkbox>
  </fieldset>
  <fieldset>
    <legend>Ownership</legend>
    <se-select label="Owner" options='[{"id":"you","label":"You"}]'></se-select>
  </fieldset>
</se-popover>
```

- `label`: visible trigger label and accessible panel name; defaults to Options.
- `icon`: shared icon input, defaults to more. The included funnel icon suits filters.
- `icon-only`: square trigger with an accessible label.

Children are the content, preserved as live DOM elements. Native fieldset/legend elements receive grouped spacing and dividers inside the panel. Inputs and selects retain their values between openings. The panel opens by clicking the trigger or calling `open()`; `close()` dismisses it. Escape returns focus to the trigger. Outside clicks dismiss it. It follows its trigger while scrolling and closes when that trigger scrolls out of view. Select and date-picker popups can appear above it. The panel uses the browser top layer and fits within the viewport; tall content scrolls.

Filtering data is application behavior; this component only presents the controls. Keep a search input beside an icon-only popover for additional filters, as shown in the File system pattern.

For collapsible chapters, wrap groups in native `details` elements with a `summary` heading. Add `open` to expand a chapter initially. These receive matching chevrons, separators, and keyboard focus styling without JavaScript. See Folder and file cards in the File system pattern; Hierarchical table shows a simpler checkbox-only filter.

Provide a child with `data-se-region="trigger"` to replace the generated button. All other children stay in the panel.

```html
<se-popover label="Filters">
  <se-button data-se-region="trigger" variant="secondary" icon="funnel" text="Filters"></se-button>
  <se-checkbox label="Documents"></se-checkbox>
</se-popover>
```
