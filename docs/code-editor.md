# Code editor

```html
<se-code-editor
  label="Configuration"
  name="project[configuration]"
  language="json"
  value='{"enabled":true}'>
</se-code-editor>
```

The native textarea submits normally in HTML and Ruby on Rails forms. Languages: `json`, `markdown`, `html`, `css`, `javascript`, and `python`. Highlighting is intentionally visual only; it does not validate or execute code.

Add `readonly` to allow focus, selection, copying, and form submission without allowing edits or resizing. Use `disabled` when the editor should also be skipped during form submission.

Long lines scroll horizontally by default. Add `wrap` to wrap them visually; wrapped segments do not add line numbers.

Add `autosize` to grow and shrink the editor with its content while disabling manual resizing.

Tab inserts two spaces at the caret. With a selection, Tab indents every selected line and remains undoable with the browser's normal undo command.
