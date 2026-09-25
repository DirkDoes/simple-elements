# Migrate to v0.15.0

v0.15.0 standardizes labels and adds explicit child regions. Renamed/removed attributes have no legacy aliases.

| Component | Old | New |
| --- | --- | --- |
| `se-empty-state`, `se-empty-illustration` | `text` | `subtitle`; illustration `illustration-label` stays |
| `se-file-card` | `filename`, `subtext` | `title`, `subtitle` |
| `se-folder-card` | numeric `items` | free-text `subtitle` (include the unit, e.g. `24 items`) |
| `se-project-card`, `se-workspace-card` | `description` | `subtitle`; `metadata` stays |
| `se-profile` | `name` | `name` or `title` for the primary label; `name` wins if both are set; `subtitle` stays |
| `se-layout-brand` | `dark-icon`, `compact-dark-icon` | light/dark sources inside `icon` and `compact-icon` objects; plain strings still work |

Add `data-se-region` to direct children. Unmarked children remain in the normal body or panel. Multiple children may use one region.

| Component | Region(s) | Placement |
| --- | --- | --- |
| `se-modal` | `footer`, `header-end` | Footer controls; beside the heading on medium/large or top-left on small |
| `se-comment` | `reactions` | Beside Reply; nested comments still become replies automatically |
| `se-collapsible` | `heading-end` | Beside the heading; an unmarked first badge now stays in the body |
| `se-tooltip` | `trigger` | Hover/focus target; all other children become plain-text or HTML tooltip content |
| `se-menu`, `se-popover` | `trigger` | Optional custom trigger, replacing the generated button |
| `se-file-card`, `se-folder-card` | `details-end` | Right of the title/subtitle |
| `se-project-card` | `banner-start`, `banner-end`, `details-end` | Banner corners or right of title/subtitle |

## Modal and tooltip migration

```html
<se-modal id="delete-dialog" title="Delete project?" size="medium">
  <se-text>This cannot be undone.</se-text>
  <se-button data-se-region="footer" data-modal-action="cancel" text="Cancel"></se-button>
  <se-button data-se-region="footer" data-modal-action="confirm" variant="danger" text="Delete"></se-button>
</se-modal>

<se-tooltip>
  <se-button data-se-region="trigger" icon="info" aria-label="About sources"></se-button>
  Files used by this project.
</se-tooltip>
```

The modal no longer generates Cancel/Confirm buttons; remove `cancel-label`, `confirm-label`, and `confirm-variant`. A footer Confirm dispatches a bubbling, cancelable `confirm` event and closes only if it was not prevented. For asynchronous work, call `event.preventDefault()` synchronously, then `modal.close()` after success. Footer Cancel closes. A backdrop click closes only with `dismissible` (off by default); Escape and the close button still work. `close` remains available. Without footer children, there is no footer. Medium/large headings are more compact.

For tooltip, remove the old `content` attribute and `data-content` wrapper. Mark the trigger and put plain text or structured HTML in the other children. Menu `options` and `select` behavior stay unchanged; popover panel content stays as children.

## Other changes

`se-file-card error="Upload failed"` temporarily replaces the subtitle, uses the error tone, and displays a red outline even on hover/focus. Removing `error` restores the configured subtitle and tone. Flat file cards now retain a visible ordinary outline. The file-card `remove` event still has `event.detail.filename`, populated from `title`.

`se-code-editor` resizes its entire frame so line numbers and highlighting stay aligned. `readonly`, `disabled`, and `autosize` disable manual resizing. Card and modal titles no longer create native browser hover labels.
