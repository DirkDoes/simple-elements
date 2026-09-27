# Code

Inline code:

```html
<se-code>bundle install</se-code>
```

Highlighted block code:

```html
<se-code block language="javascript">const ready = true;</se-code>
```

Languages: `json`, `markdown`, `html`, `css`, `javascript`, and `python`. Aliases `js`, `md`, `htm`, and `py` are accepted.

Block code scrolls horizontally by default. Add `wrap` to wrap long visual lines instead.

Add the boolean `diff` to highlight added (`+`) and removed (`-`) rows while keeping the chosen `language`. It uses a full-row tint and colored marker; file headers and `@@` hunk markers have separate treatments. Diff presentation implies a block. `language="diff"` is shorthand for a plain-text patch; use `language="json" diff` (or another language) to retain syntax colors. `diff` and `language` update live.

```html
<se-code block language="javascript" diff>-const enabled = false;
+const enabled = true;</se-code>
```
