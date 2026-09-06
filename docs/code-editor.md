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

Add `readonly` to allow focus, selection, copying, and form submission without allowing edits. Use `disabled` when the editor should also be skipped during form submission.
