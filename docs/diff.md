# Diff

Read-only line comparison. Attribute values are plain text, never HTML.

```html
<se-diff title="settings.json" language="json" variant="split"
  before='{"enabled":false}' after='{"enabled":true}'></se-diff>
```

| Attribute | Default | Purpose |
| --- | --- | --- |
| `before` | Empty | Previous source. Also a writable string property. |
| `after` | Empty | Current source. Also a writable string property. |
| `language` | Plain text | Existing syntax-highlighter language. |
| `variant` | `split` | `split` for aligned side-by-side rows or `unified` for one list. |
| `title` | Changes | Filename or heading and accessible table label. |
| `before-label` | Previous | Previous-version heading. |
| `after-label` | Current | Current-version heading. |

Attributes update live. Added/removed line counts, line numbers, Lucide plus/minus icons, and semantic backgrounds are automatic. Long lines scroll inside the viewer, including on phones. This presents changes; it does not edit, merge, or resolve them.

Comparison is line-based. It normalizes line endings and finds matching lines, including repeated lines. For an unmatched middle larger than one million comparison cells, it displays the middle as a removed/added block rather than allocating an unbounded matrix.

For sources loaded by the application, use the writable string properties instead of encoding multiline attribute values:

```javascript
const diff = document.querySelector('se-diff');
diff.before = previousSource;
diff.after = currentSource;
```
