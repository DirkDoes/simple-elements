# Diff value

Text comparison for translation values, prose, and spreadsheet cells.

```html
<se-diff-value before="Save" after="Save changes"></se-diff-value>
<se-diff-value variant="stacked" before="Welcome" after="Welcome back"></se-diff-value>
```

| Attribute | Default | Purpose |
| --- | --- | --- |
| `before` | Omitted | Previous text. Omit for an addition. |
| `after` | Omitted | Current text. Omit for a removal. |
| `variant` | `inline` | Inline redline or `stacked` values. |

All attributes update live. Values are plain text. Omit `before` for an addition or `after` for a removal; an explicitly empty attribute represents an empty value. Identical values display neutrally. Empty values display “Empty”.

Previous text uses a red deletion treatment and current text uses a green insertion treatment, with visible Lucide minus/plus icons. The component exposes its inferred state as `data-change` (`added`, `removed`, `modified`, or `unchanged`). Compose it with existing collections and collapsible list rows to represent structured data; it does not compute tree or spreadsheet changes.

An optional `data-se-region="action"` places controls to the right of both values. In stacked mode it spans both lines; inline mode keeps it beside the combined change. Multiple controls, tooltips, and menus are supported. Without an action region the appearance stays the same. Controls retain their nodes and event listeners when attributes change. The application decides what each action does; no automatic undo is performed.

```html
<se-diff-value variant="stacked" before="Pay now" after="Complete purchase">
  <se-button data-se-region="action" variant="mini" icon="rotate-ccw"
    aria-label="Restore previous value"></se-button>
</se-diff-value>
```
