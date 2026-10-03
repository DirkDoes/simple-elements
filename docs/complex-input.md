# Complex input

The [Complex input pattern](../examples/index.html#complex-input) demonstrates suggestions in `se-input` (including `type="textarea"`), `se-code-editor`, and `se-wysiwyg`.

Its first example offers underscore-separated mentions after `@` and filters them as you type, so `@al` still offers `alex_morgan`. The second offers functions and variables while typing a new code token, without requiring a special trigger character. These rules belong to the demo application; the components accept suggestions whenever they are supplied.

Set `completions` to a JSON array only while suggestions are available. Each item has required `text` and optional `description` and `icon` values. The application decides when to offer, filter, and clear suggestions. Up and Down cycle through the list, Tab or Enter inserts the selected text at the caret, and Escape dismisses the list. Clicking a suggestion also inserts it. The first suggestion is selected initially. If the word fragment before the caret prefixes the chosen text, insertion replaces that fragment. The component removes `completions` after insertion and emits a `completion` event with the chosen item in `event.detail.item`.

```html
<se-input label="Assignee" id="assignee"></se-input>
<script>
  const field = document.querySelector('#assignee');
  field.setAttribute('completions', JSON.stringify([
    { text: 'Alex Morgan', description: 'Product design', icon: 'user' },
    { text: 'Sam Rivera', description: 'Engineering' },
  ]));
</script>
```

`se-code-editor` retains its normal Tab indentation when no completions are present. WYSIWYG suggestions apply to the visual editor; its source view keeps its existing editing behavior.

For a remote suggestion source, fetch in the application and set `completions` when results arrive. Clear the attribute when there are no matches. Cancel or ignore older requests so a slow response cannot replace newer suggestions:

```js
let request;
field.addEventListener('input', async () => {
  request?.abort();
  request = new AbortController();
  const current = request;
  field.removeAttribute('completions');
  const query = field.value;
  if (query.length < 3) return;
  try {
    const response = await fetch(`/api/suggestions?q=${encodeURIComponent(query)}`, { signal: current.signal });
    const items = await response.json();
    if (current === request && items.length) field.setAttribute('completions', JSON.stringify(items));
  } catch (error) {
    if (error.name !== 'AbortError') throw error;
  }
});
```
