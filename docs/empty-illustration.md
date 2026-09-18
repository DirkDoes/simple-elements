# Empty illustration

Original SVG illustrations with one asset per variant. The artwork inherits the app's brand color and light/dark theme; no separate dark assets or network requests are needed.

```html
<se-empty-illustration
  variant="folders-2"
  illustration-label="Projects"
  title="No projects yet"
  text="Create your first project to get started.">
  <se-button variant="brand" icon="plus" text="Create project"></se-button>
</se-empty-illustration>
```

## Attributes and content

| Attribute | Default | Purpose |
| --- | --- | --- |
| `variant` | `start` | Selects one of the illustrations below. Unknown values fall back to `start`. |
| `illustration-label` | Variant-specific | Overrides the text inside the SVG. Omit for its default; an empty string hides it. |
| `title` | Omitted | Optional heading below the illustration. |
| `text` | Omitted | Optional supporting text below the heading. |

Child content appears below the text, using the same centered, wrapping action layout as `se-empty-state`. Existing child elements and their event listeners are preserved. Without title, text, or children, only the illustration is shown. Like `se-empty-state`, set attributes before inserting the element; recreate it to change the variant or copy afterward.

The illustration is decorative (hidden from assistive technology); put meaningful information in the title/text or surrounding content. Labels drawn inside the supplied artwork remain part of the illustration.

## Variants

Variants: `analytics`, `files`, `files-2`, `folders`, `folders-2`, `inbox`, `inventory`, `invoices`, `payments`, `questionnaires`, `schedule`, `schedule-2`, `search`, `start`, `team`, `team-2`, `team-3`, `timeline`, `translation`, `translation-2`, `workflow`.

### Labels inside the illustration

Use short labels that fit the artwork. This is separate from the optional title and supporting text below it. Other variants ignore this attribute.

| Variant | Default label |
| --- | --- |
| `analytics` | Results |
| `schedule` | Schedule |
| `files-2` | Files |
| `folders-2` | Projects |
| `team-2` | Team |
| `invoices` | Invoice |
| `questionnaires` | Your feedback |
| `schedule-2` | Schedule |
| `timeline` | Timeline |
| `inbox` | None; the supplied inbox has no text. Set `illustration-label` to add a label on its front. |

## Brand and theme

Use the existing [theme API](theme.md). Artwork colors update immediately through CSS, without recreating the element:

```js
SimpleElements.setBrandTheme({ primary: '#7c3aed' });
document.documentElement.dataset.theme = 'dark'; // or 'light'
```

Flat, Clean, Studio, and Edge use the same SVG geometry with their current surface and text colors. The artwork keeps its circular backdrop without ground shadows. The illustration has a transparent outer background so it fits both pages and cards.

For per-app or per-instance changes, override these optional CSS properties on a parent or the component:

| Property | Default role |
| --- | --- |
| `--se-illustration-width` | `24rem`, limited to the available width |
| `--se-illustration-accent` | `--se-primary` |
| `--se-illustration-accent-light` | `--se-primary-hover` |
| `--se-illustration-accent-strong` | `--se-primary-text` |
| `--se-illustration-soft` | `--se-primary-soft` |
| `--se-illustration-halo` | 7% primary mixed into the soft surface |
| `--se-illustration-surface` | `--se-surface` |
| `--se-illustration-line` | `--se-primary-border` |
| `--se-illustration-text` | `--se-text` |
| `--se-illustration-muted` | `--se-faint` |

```css
se-empty-illustration {
  --se-illustration-width: 28rem;
  --se-illustration-line: var(--se-border-strong);
}
```

The regular component bundle includes all 21 illustrations. Apps importing individual component modules can omit this component to omit its artwork entirely. The existing `se-empty-state` remains unchanged and uses the standard icon set.

The `title` attribute supplies the visible heading only; the illustration suppresses the browser’s native hover tooltip.
